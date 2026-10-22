import { useWindowDimensions } from 'react-native';

// Visual language carried over from the web experience: glass panels over
// photography, white type, Dosti red accents.
export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#B51616',
  redDeep: '#610000',
  redBright: '#DC2626',
  highlight: 'rgba(255,112,67,0.55)',
  highlightStroke: 'rgba(255,112,67,1)',
  pink: 'rgb(248,186,186)',
  gold: '#58420a',
  glass: 'rgba(255,255,255,0.18)',
  glassStrong: 'rgba(255,255,255,0.28)',
  glassBorder: 'rgba(255,255,255,0.32)',
  darkGlass: 'rgba(0,0,0,0.40)',
  darkGlassStrong: 'rgba(0,0,0,0.62)',
  textDim: 'rgba(255,255,255,0.72)',
  ink: '#1F2937',
};

export const fonts = {
  padauk: 'Padauk_400Regular',
  padaukBold: 'Padauk_700Bold',
};

/**
 * Layout is designed for a 1280×800 dp landscape tablet. `s()` scales a design
 * value to the current screen so the same layout works on 8"–13" tablets
 * (and degrades gracefully on large phones).
 */
export const DESIGN = { width: 1280, height: 800 };

export function useScale() {
  const { width, height } = useWindowDimensions();
  const k = Math.min(width / DESIGN.width, height / DESIGN.height);
  const s = (v: number) => Math.round(v * k * 100) / 100;
  return { s, k, width, height };
}
