// Config plugin: copies the offline 360° tour (native-assets/tour) into the
// Android app's assets so the WebView can load file:///android_asset/tour/.
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

module.exports = function withOfflineTour(config) {
  return withDangerousMod(config, [
    'android',
    async (cfg) => {
      const src = path.join(cfg.modRequest.projectRoot, 'native-assets', 'tour');
      const dest = path.join(cfg.modRequest.platformProjectRoot, 'app', 'src', 'main', 'assets', 'tour');
      fs.rmSync(dest, { recursive: true, force: true });
      copyDir(src, dest);
      return cfg;
    },
  ]);
};
