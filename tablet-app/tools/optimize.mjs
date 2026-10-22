// Usage: node optimize.mjs <srcRoot> <listFile> <outRoot>
// Writes optimized copies of every image in listFile (paths relative to srcRoot)
// to outRoot, and a manifest.json mapping original rel path -> optimized rel path.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

sharp.cache(false);
sharp.concurrency(4);
const [srcRoot, listFile, outRoot] = process.argv.slice(2);
const list = fs.readFileSync(listFile, 'utf8').split(/\r?\n/).filter(Boolean);

// Pick a strategy per asset: max long side + output format.
function plan(rel) {
  const r = rel.toLowerCase();
  if (r.includes('floor plan') || r.includes('unit plan') || r.includes('pridewinga_v03')) return { max: 3200, fmt: 'png' };
  if (r.includes('location1/')) return { max: 2560, fmt: 'png' };
  if (r.includes('master/')) return { max: 2160, fmt: 'png' };
  if (r.includes('tie-up/')) return { max: 1600, fmt: 'jpg' };
  if (/logo|qr\d|tree1|construction\.png|sideunit|pride12/.test(r)) return { max: 1200, fmt: 'png' };
  if (r.includes('clubhouseamenities/')) return { max: 2560, fmt: 'jpg' }; // opaque renders saved as RGBA png
  return { max: 2560, fmt: 'jpg' };
}

const manifest = {};
let before = 0, after = 0;
const work = list.map(rel => async () => {
  const src = path.join(srcRoot, rel);
  const { max, fmt } = plan(rel);
  const outRel = rel.replace(/\.(png|jpe?g)$/i, '.' + fmt);
  const dst = path.join(outRoot, outRel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  let img = sharp(src, { limitInputPixels: false }).rotate()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true });
  if (fmt === 'jpg') img = img.flatten({ background: '#000000' }).jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' });
  else img = img.png({ palette: true, quality: 90, effort: 8, compressionLevel: 9 });
  await img.toFile(dst);
  const a = fs.statSync(src).size, b = fs.statSync(dst).size;
  before += a; after += b;
  manifest[rel] = outRel;
  const meta = await sharp(dst).metadata();
  console.log(`${(a / 1e6).toFixed(1).padStart(6)}MB -> ${(b / 1e6).toFixed(2).padStart(6)}MB ${meta.width}x${meta.height} ${outRel}`);
});

// small worker pool
const queue = [...work];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await queue.shift()(); }));
fs.writeFileSync(path.join(outRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`TOTAL ${(before / 1e6).toFixed(0)}MB -> ${(after / 1e6).toFixed(1)}MB`);
