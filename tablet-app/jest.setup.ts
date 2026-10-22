// Jest environment for the tablet app: replace native-only modules with mocks.
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Fonts (Padauk, vector icons) resolve to fake asset ids under Jest; treat them as loaded.
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
  useFonts: jest.fn(() => [true, null]),
}));

// Native-stack screens are marked aria-hidden while they transition in under
// Jest; query them anyway (tests only ever assert on the top screen).
// eslint-disable-next-line import/first
import { configure } from '@testing-library/react-native';
configure({ defaultIncludeHiddenElements: true });
