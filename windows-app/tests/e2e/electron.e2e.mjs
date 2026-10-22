// End-to-end smoke test of the packaged-style Electron app.
// Run: npm run build && node tests/e2e/electron.e2e.mjs [screenshotDir]
// Packaged: DOSTI_EXE="release/win-unpacked/Dosti Greater Thane.exe" node tests/e2e/electron.e2e.mjs
// Visits every screen, and fails on page errors, broken images, broken media,
// or any request that tries to leave the app (the app must work offline).
import { _electron as electron } from 'playwright-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const shotDir = process.argv[2] || path.join(appDir, 'test-results');
fs.mkdirSync(shotDir, { recursive: true });

const routes = [
  { hash: '/', name: 'home', tour: true },
  { hash: '/project_highlights', name: 'highlights' },
  { hash: '/location', name: 'location' },
  { hash: '/amenities', name: 'amenities' },
  { hash: '/masterplan', name: 'masterplan' },
  { hash: '/walkthrough', name: 'walkthrough', video: true },
  { hash: '/project_details', name: 'project-details' },
  { hash: '/building/1', name: 'building-pride-a' },
  { hash: '/building/5', name: 'building-charm-a' },
  { hash: '/floorplan/pridea', name: 'floorplan-pride-a' },
  { hash: '/floorplan/charma', name: 'floorplan-charm-a' },
  { hash: '/unit/101', name: 'unit-101' },
  { hash: '/about', name: 'about' },
  { hash: '/tie_up', name: 'tie-up' },
  { hash: '/specification', name: 'specification' },
  { hash: '/construction', name: 'construction', video: true },
  { hash: '/testimonials', name: 'testimonials', video: true },
  { hash: '/disclaimer', name: 'disclaimer' },
  { hash: '/brochure', name: 'brochure' },
];

const failures = [];
const external = [];
// DOSTI_EXE=path	o\Dosti Greater Thane.exe tests the packaged build instead of the source tree
const exe = process.env.DOSTI_EXE;
const app = exe
  ? await electron.launch({ executablePath: exe, args: [] })
  : await electron.launch({ args: [appDir], cwd: appDir });
const win = await app.firstWindow();
await win.waitForLoadState('domcontentloaded');

win.on('pageerror', (e) => failures.push(`pageerror: ${e.message}`));
win.on('console', (m) => { if (m.type() === 'error') failures.push(`console: ${m.text()}`); });
win.on('request', (r) => { const u = r.url(); if (!/^(app|data|blob|about|devtools):/.test(u)) external.push(u); });
// media elements abort their own range requests when seeking/leaving; that is expected
win.on('requestfailed', (r) => { if (!(/\.mp4$/.test(r.url()) && r.failure()?.errorText === 'net::ERR_ABORTED')) failures.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`); });
win.on('response', (r) => { if (r.status() >= 400) failures.push(`HTTP ${r.status()}: ${r.url()}`); });

for (const r of routes) {
  await win.evaluate((h) => { window.location.hash = h; }, r.hash);
  await win.waitForTimeout(1500);

  // every <img> and SVG <image> on the screen must have loaded
  const broken = await win.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((res) => { i.onload = i.onerror = res; }))));
    const bad = imgs.filter((i) => i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.src);
    const svgImgs = [...document.querySelectorAll('image')].map((i) => i.getAttribute('href'));
    for (const href of svgImgs) {
      const ok = await new Promise((res) => { const t = new Image(); t.onload = () => res(true); t.onerror = () => res(false); t.src = href; });
      if (!ok) bad.push(href);
    }
    return bad;
  });
  broken.forEach((b) => failures.push(`${r.name}: broken image ${b}`));

  if (r.video) {
    const v = await win.evaluate(async () => {
      const el = document.querySelector('video');
      if (!el) return { error: 'no <video>' };
      el.muted = true;
      for (let i = 0; i < 50 && el.readyState < 3; i++) await new Promise((res) => setTimeout(res, 100));
      try { await el.play(); } catch (e) { return { error: String(e) }; }
      await new Promise((res) => setTimeout(res, 800));
      // seeking exercises HTTP range support of the app:// protocol
      el.currentTime = Math.min(30, el.duration / 2);
      await new Promise((res) => setTimeout(res, 800));
      return { readyState: el.readyState, duration: el.duration, t: el.currentTime, w: el.videoWidth, err: el.error?.message };
    });
    if (v.error || v.err || !(v.duration > 0) || !(v.w > 0) || v.t < 1) failures.push(`${r.name}: video problem ${JSON.stringify(v)}`);
    else console.log(`  video ok ${r.name}: ${v.w}px ${v.duration.toFixed(0)}s, seeked to ${v.t.toFixed(1)}s`);
  }

  if (r.tour) {
    const frame = win.frames().find((f) => f.url().includes('/tour/'));
    let ok = false;
    for (let i = 0; i < 30 && frame && !ok; i++) {
      ok = await frame.evaluate(() => !!document.querySelector('#container canvas')).catch(() => false);
      if (!ok) await win.waitForTimeout(300);
    }
    if (!ok) failures.push('home: 360 tour did not render a canvas');
    else console.log('  360 tour rendered');
    await win.waitForTimeout(2500);
  }

  await win.screenshot({ path: path.join(shotDir, `${r.name}.png`) });
  console.log(`ok ${r.name}`);
}

// Navigation: tap a building on the project page and expect to land on its floors
await win.evaluate(() => { window.location.hash = '/project_details'; });
await win.waitForTimeout(800);
await win.getByRole('button', { name: 'Pride A' }).first().click();
await win.waitForTimeout(800);
if (!(await win.evaluate(() => window.location.hash)).startsWith('#/building/1')) failures.push('nav: project details -> building failed');

await app.close();

const uniqueExternal = [...new Set(external)];
uniqueExternal.forEach((u) => failures.push(`external request (app must be offline): ${u}`));
if (failures.length) {
  console.error(`\nFAILED (${failures.length}):\n` + failures.join('\n'));
  process.exit(1);
}
console.log(`\nAll ${routes.length} screens passed. Screenshots: ${shotDir}`);
