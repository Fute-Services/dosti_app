# Dosti Greater Thane — offline sales apps

Two apps built from the Dosti Greater Thane web experience. Both run **fully offline**:
the 360° aerial tour, walkthrough, testimonials, construction video, brochure and every
image ship inside the app.

| Folder | Platform | Tech | Output |
| --- | --- | --- | --- |
| [`windows-app/`](windows-app/README.md) | Windows 10/11 (x64) | React + Vite + Electron | `DostiGreaterThane-Setup-x.y.z.exe` (installer) and `DostiGreaterThane-Portable-x.y.z.exe` |
| [`tablet-app/`](tablet-app/README.md) | Android tablets (landscape) | React Native (Expo SDK 58) | `DostiGreaterThane-x.y.z.apk` |

Ready-built installers and the APK are attached to the GitHub **Releases** of this repo.

## What changed compared with the website

- **Offline**: the Pano2VR 360° tour (was `futeservices.com`), Wistia/Vimeo/YouTube videos
  and the brochure PDF are bundled. Nothing loads from the internet.
- **Smoother**: images were resized to screen resolution and recompressed
  (353 MB → 47 MB; some originals were 10 000+ px wide), videos re-encoded to H.264,
  the fake 0.9 s "Loading Map…" delay on the location filters was removed, and the
  brochure opens as instant page images instead of a 29 MB PDF.
- **Tablet app** is a native React Native app (not a web view): native navigation and
  transitions, pinch-to-zoom plans, swipeable galleries, tap-friendly targets and a
  kiosk mode (landscape, system bars hidden, screen kept on).
- **Bugs fixed** (in both apps):
  - Serene C units opened Serene A's unit data (both plans use unit ids 1301–1312).
  - A React hooks-order bug on the building page.
  - The amenities swipe handler used stale state.
  - Lint and type errors in the original code.

## Media pipeline

Source media lives outside the repo (the original 1.1 GB assets). The scripts used to
produce the optimized copies are in [`tablet-app/tools/`](tablet-app/tools):

- `optimize.mjs` — resizes/recompresses the images the app actually imports (needs `sharp`).
- `rn_assets.mjs` — copies them into the tablet app with Android-safe names and generates
  `src/assets/images.ts`.
- `mirror_tour.py` — downloads the Pano2VR tour (all cube-face tiles) for offline use.

## Getting the APK from GitHub

The **Android APK** workflow (`.github/workflows/android-apk.yml`) runs typecheck, lint
and tests on every push. Pushing a version tag builds the signed release APK on GitHub
and attaches it to that tag's Release:

```bash
git tag v1.0.1 && git push origin v1.0.1
```

It can also be started by hand from the **Actions** tab (the APK is then a downloadable
build artifact). Signing uses the repository secrets `DOSTI_KEYSTORE_BASE64`,
`DOSTI_STORE_PASSWORD`, `DOSTI_KEY_ALIAS` and `DOSTI_KEY_PASSWORD`.
