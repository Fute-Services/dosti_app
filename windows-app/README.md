# Dosti Greater Thane — Windows app

The Dosti Greater Thane web experience packaged as an offline Windows desktop app
(Electron). It opens full screen, like a sales-gallery kiosk.

## Use

- Install with `DostiGreaterThane-Setup-<version>.exe`, or run
  `DostiGreaterThane-Portable-<version>.exe` without installing.
- **F11** toggles full screen, **Esc** leaves full screen.
- No internet connection is needed.

## Develop

Requires Node 20+.

```bash
npm install
npm run dev        # web version in the browser (http://localhost:5173)
npm start          # build and open in Electron
npm run dist       # build the installer + portable exe into release/
```

## Test

```bash
npm run lint
npm test                              # unit tests for the offline file server
npm run build
node tests/e2e/electron.e2e.mjs       # opens every screen in Electron and checks it
```

The end-to-end test fails on any page error, broken image, video that won't play or
seek, a 360° tour that doesn't render, or **any request that tries to reach the
internet**. To test the packaged app instead of the source tree:

```bash
DOSTI_EXE="release/win-unpacked/Dosti Greater Thane.exe" node tests/e2e/electron.e2e.mjs
```

## How offline works

- `public/tour/` — the Pano2VR 360° project (previously loaded from futeservices.com).
- `public/media/videos/` — walkthrough, construction, infrastructure and testimonial videos.
- `public/media/brochure/` — brochure pages pre-rendered from the PDF.
- `electron/serve.cjs` serves `dist/` over a private `app://` protocol (with HTTP range
  support so videos can seek); the tour's XML loading would be blocked on `file://`.
- Routing uses `HashRouter`, so no web server is needed.
