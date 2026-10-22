// On-device smoke test: installs the APK on the connected tablet/emulator,
// opens every screen through deep links, saves a screenshot of each and fails
// on crashes or JavaScript errors in logcat. Airplane-mode friendly (no network).
//
// Usage: node scripts/device-test.mjs <path-to-apk> [screenshotDir]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [apk, outDir = 'build-output/device-screens'] = process.argv.slice(2);
const PKG = 'com.futeservices.dostigreaterthane';
const SCHEME = 'dostigreaterthane';
const adb = (...args) => execFileSync('adb', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const screens = [
  ['/', 'home', 9000],
  ['/highlights', 'highlights'],
  ['/location', 'location'],
  ['/amenities', 'amenities'],
  ['/masterplan', 'masterplan'],
  ['/walkthrough', 'walkthrough', 5000],
  ['/project-details', 'project-details'],
  ['/building/1', 'building-pride-a'],
  ['/building/13', 'building-serene-a'],
  ['/floorplan/pridea?floor=Floor-12', 'floorplan-pride-a'],
  ['/floorplan/charmb', 'floorplan-charm-b'],
  ['/unit/101?plan=pridea', 'unit-101'],
  ['/unit/1301?plan=serenec', 'unit-serene-c-1301'],
  ['/about', 'about'],
  ['/tie-up', 'tie-up'],
  ['/specification', 'specification'],
  ['/construction', 'construction', 5000],
  ['/testimonials', 'testimonials', 5000],
  ['/disclaimer', 'disclaimer'],
  ['/brochure', 'brochure'],
];

fs.mkdirSync(outDir, { recursive: true });
if (apk) {
  console.log(`installing ${apk}`);
  adb('install', '-r', '-d', apk);
}
adb('logcat', '-c');
adb('shell', 'am', 'force-stop', PKG);
adb('shell', 'monkey', '-p', PKG, '-c', 'android.intent.category.LAUNCHER', '1');
await sleep(6000);

const failures = [];
for (const [route, name, wait = 2500] of screens) {
  adb('shell', 'am', 'start', '-W', '-a', 'android.intent.action.VIEW', '-d', `"${SCHEME}://${route}"`, PKG);
  await sleep(wait);
  const pid = adb('shell', 'pidof', PKG).trim();
  if (!pid) {
    failures.push(`${name}: app is not running (crashed?)`);
    adb('shell', 'monkey', '-p', PKG, '-c', 'android.intent.category.LAUNCHER', '1');
    await sleep(6000);
    continue;
  }
  const png = execFileSync('adb', ['exec-out', 'screencap', '-p'], { maxBuffer: 64 * 1024 * 1024 });
  fs.writeFileSync(path.join(outDir, `${name}.png`), png);
  console.log(`ok ${name}`);
}

const log = adb('logcat', '-d', '-v', 'brief');
const bad = log
  .split('\n')
  .filter((l) => /FATAL EXCEPTION|AndroidRuntime: E|E\/ReactNativeJS|ReactNativeJS: .*(Error|TypeError)|Unhandled|Invariant Violation/.test(l));
bad.forEach((l) => failures.push(`logcat: ${l.trim()}`));
fs.writeFileSync(path.join(outDir, 'logcat.txt'), log);

const meminfo = adb('shell', 'dumpsys', 'meminfo', PKG);
const total = /TOTAL PSS:\s+(\d+)/.exec(meminfo) || /TOTAL\s+(\d+)/.exec(meminfo);
if (total) console.log(`memory (PSS) after visiting every screen: ${(Number(total[1]) / 1024).toFixed(0)} MB`);

if (failures.length) {
  console.error(`\nFAILED (${failures.length}):\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`\nAll ${screens.length} screens opened without errors. Screenshots in ${outDir}`);
