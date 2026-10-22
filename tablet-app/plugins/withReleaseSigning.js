// Config plugin: signs release builds with the Dosti release keystore when its
// details are provided (credentials/keystore.properties or DOSTI_* env vars),
// otherwise falls back to the debug key so local builds still work.
//
// credentials/keystore.properties (never committed):
//   storeFile=dosti-release.jks          (relative to credentials/)
//   storePassword=...
//   keyAlias=dosti
//   keyPassword=...
const { withAppBuildGradle } = require('expo/config-plugins');

const MARKER = '// dosti-release-signing';

const block = `
${MARKER}
def dostiSigning = new Properties()
def dostiSigningFile = rootProject.file('../credentials/keystore.properties')
if (dostiSigningFile.exists()) {
    dostiSigningFile.withInputStream { dostiSigning.load(it) }
}
def dostiProp = { String key, String env -> System.getenv(env) ?: dostiSigning.getProperty(key) }
def dostiStoreFile = dostiProp('storeFile', 'DOSTI_STORE_FILE')
def dostiHasRelease = dostiStoreFile != null
`;

module.exports = function withReleaseSigning(config) {
  return withAppBuildGradle(config, (cfg) => {
    let gradle = cfg.modResults.contents;
    if (gradle.includes(MARKER)) return cfg;

    gradle = gradle.replace(/android\s*\{/, (m) => `${block}\n${m}`);

    gradle = gradle.replace(
      /signingConfigs\s*\{/,
      (m) => `${m}
        release {
            if (dostiHasRelease) {
                storeFile rootProject.file("../credentials/" + dostiStoreFile)
                storePassword dostiProp('storePassword', 'DOSTI_STORE_PASSWORD')
                keyAlias dostiProp('keyAlias', 'DOSTI_KEY_ALIAS')
                keyPassword dostiProp('keyPassword', 'DOSTI_KEY_PASSWORD')
            }
        }`,
    );

    // In the release build type, prefer the release key when configured.
    gradle = gradle.replace(
      /(release\s*\{[^{}]*?)signingConfig\s+signingConfigs\.debug/,
      '$1signingConfig dostiHasRelease ? signingConfigs.release : signingConfigs.debug',
    );

    cfg.modResults.contents = gradle;
    return cfg;
  });
};
