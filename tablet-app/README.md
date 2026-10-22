# Dosti Greater Thane — Android tablet app

Native React Native (Expo SDK 58) version of the Dosti Greater Thane experience,
designed for **landscape tablets** (laid out for 1280×800 dp and scaled to the screen)
and **fully offline**.

## Install the APK

1. Copy `DostiGreaterThane-<version>.apk` to the tablet (or download it from the GitHub release).
2. Open it and allow installing from this source when Android asks.
3. Launch **Dosti Greater Thane**. It runs in landscape with the system bars hidden and
   keeps the screen on. Swipe from the edge to reveal the Android bars.

## Screens

360° aerial tour · Project highlights · Location (zoomable map, category filter,
upcoming-infrastructure video) · Amenities (swipe gallery) · Masterplan (interactive
legend) · Walkthrough video · Project details → tower → floor → typical floor plan →
unit plan (pinch-to-zoom, tap units/rooms) · About · Tie-ups · Specifications ·
Construction progress · Testimonials · Disclaimer · Brochure.

## Develop

Requires Node 20+, JDK 17 and the Android SDK (with an emulator or a device).

```bash
npm install
npm run android        # debug build on a connected device/emulator
npm run typecheck
npm run lint
npm test               # Jest: geometry, data integrity, every screen + navigation flows
```

## Build the release APK

```bash
npm run prebuild                         # generates android/ (do not edit it by hand)
cd android && ./gradlew assembleRelease
# -> android/app/build/outputs/apk/release/app-release.apk
```

Release builds are signed with the key in `credentials/` (see below). Without it they
fall back to the debug key, which is fine for testing but **cannot update an install
that was signed with the release key**.

### Signing key (keep it safe)

`credentials/dosti-release.jks` and `credentials/keystore.properties` are **not in git**.
Back them up somewhere safe: every future update of the app must be signed with the same
key. You can also supply the key via the `DOSTI_STORE_FILE`, `DOSTI_STORE_PASSWORD`,
`DOSTI_KEY_ALIAS` and `DOSTI_KEY_PASSWORD` environment variables
(see `plugins/withReleaseSigning.js`).

## Project layout

```
src/app/            screens (Expo Router; file name = route)
src/components/     PlanCanvas (interactive plans/maps), Zoomable, VideoStage, rails, UI kit
src/data/           inventory, location, masterplan and text content (ported from the website)
src/lib/geometry.ts hit-testing and image-fit maths (unit tested)
assets/             optimized images, videos and brochure pages
native-assets/tour  Pano2VR 360° tour, copied into the APK by plugins/withOfflineTour.js
tools/              media scripts (image optimisation, asset index, tour mirror)
```

## Performance notes

- Plans and maps are drawn by the native image view; SVG only draws the highlighted
  shape and taps are hit-tested in JS, so large floor plans stay smooth.
- Pinch/pan/double-tap zoom runs on the UI thread (Reanimated + Gesture Handler).
- Frosted backgrounds use tiny pre-blurred images instead of live blur.
- Videos pause when you leave their screen. Galleries render only nearby slides.
