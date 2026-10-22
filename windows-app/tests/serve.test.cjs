// Unit tests for the app:// file server (node --test tests/).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { resolveFile, parseRange, respond, mimeFor } = require('../electron/serve.cjs');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dosti-serve-'));
fs.writeFileSync(path.join(root, 'index.html'), '<html>home</html>');
fs.mkdirSync(path.join(root, 'media'));
fs.writeFileSync(path.join(root, 'media', 'clip.mp4'), Buffer.from('0123456789'));
fs.writeFileSync(path.join(root, 'media', 'my file.png'), 'png');

const req = (url, headers = {}) => ({ url, headers: new Headers(headers) });

test('resolves files and the root to index.html', () => {
  assert.strictEqual(resolveFile(root, 'app://dosti/'), path.join(root, 'index.html'));
  assert.strictEqual(resolveFile(root, 'app://dosti/media/clip.mp4'), path.join(root, 'media', 'clip.mp4'));
  assert.strictEqual(resolveFile(root, 'app://dosti/media/my%20file.png'), path.join(root, 'media', 'my file.png'));
});

test('falls back to index.html for app routes but not for missing assets', () => {
  assert.strictEqual(resolveFile(root, 'app://dosti/amenities'), path.join(root, 'index.html'));
  assert.strictEqual(resolveFile(root, 'app://dosti/missing.png'), path.join(root, 'missing.png'));
});

test('blocks path traversal outside the app folder', () => {
  assert.strictEqual(resolveFile(root, 'app://dosti/..%2F..%2Fwindows%2Fwin.ini'), null);
});

test('parses byte ranges', () => {
  assert.deepStrictEqual(parseRange('bytes=0-3', 10), { start: 0, end: 3 });
  assert.deepStrictEqual(parseRange('bytes=4-', 10), { start: 4, end: 9 });
  assert.deepStrictEqual(parseRange('bytes=-3', 10), { start: 7, end: 9 });
  assert.deepStrictEqual(parseRange('bytes=5-100', 10), { start: 5, end: 9 });
  assert.deepStrictEqual(parseRange('bytes=20-', 10), { invalid: true });
  assert.strictEqual(parseRange(null, 10), null);
  assert.strictEqual(parseRange('items=1-2', 10), null);
});

test('serves whole files with the right content type', async () => {
  const res = respond(root, req('app://dosti/index.html'));
  assert.strictEqual(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.strictEqual(await res.text(), '<html>home</html>');
});

test('serves partial content for video seeking', async () => {
  const res = respond(root, req('app://dosti/media/clip.mp4', { range: 'bytes=2-5' }));
  assert.strictEqual(res.status, 206);
  assert.strictEqual(res.headers.get('content-range'), 'bytes 2-5/10');
  assert.strictEqual(res.headers.get('content-type'), 'video/mp4');
  assert.strictEqual(await res.text(), '2345');
});

test('returns 416 for unsatisfiable ranges and 404 for missing files', () => {
  assert.strictEqual(respond(root, req('app://dosti/media/clip.mp4', { range: 'bytes=50-' })).status, 416);
  assert.strictEqual(respond(root, req('app://dosti/nope.jpg')).status, 404);
});

test('knows the media types the app ships', () => {
  assert.strictEqual(mimeFor('a.xml'), 'application/xml; charset=utf-8');
  assert.strictEqual(mimeFor('a.JPG'), 'image/jpeg');
  assert.strictEqual(mimeFor('a.woff2'), 'font/woff2');
});
