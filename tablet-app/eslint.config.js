// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    // require() is how React Native bundles assets and how Jest loads mocks
    files: ['src/assets/**', '__tests__/**', 'jest.setup.ts'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    ignores: ['dist/*', 'android/*', 'ios/*', 'native-assets/*', 'tools/*', '.expo/*'],
  },
]);
