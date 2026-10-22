// Serves the built app (dist/) for the custom app:// protocol.
// Kept free of Electron imports so it can be unit-tested with plain Node.
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function mimeFor(file) {
  return MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

// Maps a request URL to a file inside root. Returns null for anything that
// would escape root (path traversal). Unknown routes fall back to index.html.
function resolveFile(root, requestUrl) {
  const { pathname } = new URL(requestUrl);
  let rel = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (rel === '') rel = 'index.html';
  const file = path.resolve(root, rel);
  const rootResolved = path.resolve(root);
  if (file !== rootResolved && !file.startsWith(rootResolved + path.sep)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  // SPA fallback only for extension-less paths; missing assets stay 404.
  if (!path.extname(rel)) return path.join(rootResolved, 'index.html');
  return file;
}

// Parses a single "bytes=start-end" range. Returns null when absent/invalid.
function parseRange(header, size) {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === '' && m[2] === '')) return null;
  let start, end;
  if (m[1] === '') {
    // suffix range: last N bytes
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start > end || start >= size) return { invalid: true };
  return { start, end };
}

// Builds a web Response for the request, honouring Range for media seeking.
function respond(root, request) {
  const file = resolveFile(root, request.url);
  if (!file || !fs.existsSync(file)) {
    return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain' } });
  }
  const size = fs.statSync(file).size;
  const type = mimeFor(file);
  const range = parseRange(request.headers.get('range'), size);
  if (range && range.invalid) {
    return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
  }
  if (range) {
    const stream = fs.createReadStream(file, { start: range.start, end: range.end });
    return new Response(Readable.toWeb(stream), {
      status: 206,
      headers: {
        'content-type': type,
        'content-length': String(range.end - range.start + 1),
        'content-range': `bytes ${range.start}-${range.end}/${size}`,
        'accept-ranges': 'bytes',
      },
    });
  }
  return new Response(Readable.toWeb(fs.createReadStream(file)), {
    status: 200,
    headers: { 'content-type': type, 'content-length': String(size), 'accept-ranges': 'bytes' },
  });
}

module.exports = { resolveFile, parseRange, respond, mimeFor };
