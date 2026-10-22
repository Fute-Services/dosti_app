// Smoke tests: every route renders through the real router without crashing
// and shows its key content. Native-only views (video, webview) are mocked.
import { act, fireEvent, screen, within } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { findBuilding } from '@/data/inventory';

jest.mock('react-native-webview', () => {
  const { View } = jest.requireActual('react-native');
  return { WebView: (props: object) => <View testID="tour-webview" {...props} /> };
});

jest.mock('expo-video', () => {
  const { View } = jest.requireActual('react-native');
  const player = { play: jest.fn(), pause: jest.fn(), addListener: () => ({ remove: jest.fn() }), status: 'readyToPlay', loop: false, muted: false };
  return { useVideoPlayer: (_: unknown, setup?: (p: typeof player) => void) => (setup?.(player), player), VideoView: () => <View testID="video-view" /> };
});

jest.mock('@expo-google-fonts/padauk', () => ({ useFonts: () => [true, null], Padauk_400Regular: 1, Padauk_700Bold: 1 }));

jest.mock('expo', () => ({ ...jest.requireActual('expo'), useEvent: (_: unknown, __: string, initial: unknown) => initial }));

const routes = {
  _layout: require('../src/app/_layout').default,
  index: require('../src/app/index').default,
  highlights: require('../src/app/highlights').default,
  location: require('../src/app/location').default,
  amenities: require('../src/app/amenities').default,
  masterplan: require('../src/app/masterplan').default,
  walkthrough: require('../src/app/walkthrough').default,
  'project-details': require('../src/app/project-details').default,
  'building/[id]': require('../src/app/building/[id]').default,
  'floorplan/[tower]': require('../src/app/floorplan/[tower]').default,
  'unit/[unitId]': require('../src/app/unit/[unitId]').default,
  about: require('../src/app/about').default,
  'tie-up': require('../src/app/tie-up').default,
  specification: require('../src/app/specification').default,
  construction: require('../src/app/construction').default,
  testimonials: require('../src/app/testimonials').default,
  disclaimer: require('../src/app/disclaimer').default,
  brochure: require('../src/app/brochure').default,
  '+not-found': require('../src/app/+not-found').default,
};

const cases: [string, string, string | RegExp][] = [
  ['/', 'screen-home', '360°'],
  ['/highlights', 'screen-highlights', /GREATER TOMORROW/],
  ['/location', 'screen-location', 'All Infrastructure'],
  ['/amenities', 'screen-amenities', 'Outdoor Amenities'],
  ['/masterplan', 'screen-masterplan', 'Legend'],
  ['/walkthrough', 'screen-walkthrough', ''],
  ['/project-details', 'screen-project-details', 'Hide All Markers'],
  ['/building/1', 'screen-building', 'Pride A'],
  ['/floorplan/pridea', 'screen-floorplan', 'Pride wing-A'],
  ['/unit/101?plan=pridea', 'screen-unit', 'Bedroom'],
  ['/about', 'screen-about', 'UNDERSTANDING AND TRUST'],
  ['/tie-up', 'screen-tie-up', 'ISSE GREATER TOWNSHIP NAHI'],
  ['/specification', 'screen-specification', 'FLOORING'],
  ['/construction', 'screen-construction', 'CONSTRUCTION PROGRESS'],
  ['/testimonials', 'screen-testimonials', 'ACCOLADES OF DOSTI GREATER THANE'],
  ['/disclaimer', 'screen-disclaimer', 'DOSTI REALTY LTD.'],
  ['/brochure', 'screen-brochure', '1 / 31'],
];

describe.each(cases)('route %s', (url, testID, text) => {
  it('renders', async () => {
    await renderRouter(routes, { initialUrl: url });
    expect(await screen.findByTestId(testID)).toBeTruthy();
    if (text) expect(screen.getAllByText(text).length).toBeGreaterThan(0);
  });
});

it('shows the 404 screen for unknown routes', async () => {
  await renderRouter(routes, { initialUrl: '/does-not-exist' });
  expect(await screen.findByText('404')).toBeTruthy();
});

it('shows a friendly message for an unknown building', async () => {
  await renderRouter(routes, { initialUrl: '/building/9999' });
  expect(await screen.findByText('Building 9999 was not found.')).toBeTruthy();
});

// let navigation/state updates flush before querying
const settle = () => act(async () => {});

const layout = (width: number, height: number) => ({ nativeEvent: { layout: { x: 0, y: 0, width, height } } });

it('navigates project details -> building -> floor plan -> unit', async () => {
  await renderRouter(routes, { initialUrl: '/project-details' });
  await settle();
  expect(screen.getByTestId('screen-project-details')).toBeTruthy();
  await fireEvent.press(screen.getByLabelText('Charm A'));
  await settle();
  expect(screen.getByTestId('screen-building')).toBeTruthy();

  const top = Math.max(...findBuilding(5)!.buildingData.Floors.map((f) => f.id));
  await fireEvent.press(screen.getByTestId(`floor-${top}`));
  await fireEvent.press(screen.getByTestId('open-floorplan'));
  await settle();
  expect(screen.getByTestId('screen-floorplan')).toBeTruthy();
  expect(screen.getByText('Charm wing-A')).toBeTruthy();

  await fireEvent.press(screen.getByTestId('unit-chip-503'));
  await fireEvent.press(screen.getByTestId('open-unit'));
  await settle();
  expect(within(screen.getByTestId('screen-unit')).getByText('Unit 3')).toBeTruthy();
});

it('opens Serene C units from the Serene C plan (shared ids with Serene A)', async () => {
  await renderRouter(routes, { initialUrl: '/floorplan/serenec' });
  await settle();
  expect(screen.getByTestId('screen-floorplan')).toBeTruthy();
  await fireEvent.press(screen.getByTestId('unit-chip-1301'));
  await fireEvent.press(screen.getByTestId('open-unit'));
  await settle();
  expect(within(screen.getByTestId('screen-unit')).getByText(/Serene wing-C/)).toBeTruthy();
});

it('filters the location map by category', async () => {
  await renderRouter(routes, { initialUrl: '/location' });
  await settle();
  expect(screen.getByTestId('screen-location')).toBeTruthy();
  // markers are positioned from the measured map size
  await fireEvent(screen.getByTestId('location-canvas'), 'layout', layout(1000, 562));
  expect(screen.getAllByLabelText('Balkum Metro Station')).toHaveLength(1);
  expect(screen.getAllByLabelText('Eternity Mall')).toHaveLength(1);
  await fireEvent.press(screen.getByTestId('legend-Metro'));
  expect(screen.queryByLabelText('Eternity Mall')).toBeNull();
  expect(screen.getByLabelText('Balkum Metro Station')).toBeTruthy();
});

it('switches the masterplan cluster and highlights legend entries', async () => {
  await renderRouter(routes, { initialUrl: '/masterplan' });
  await settle();
  expect(screen.getByTestId('screen-masterplan')).toBeTruthy();
  await fireEvent(screen.getByTestId('masterplan-canvas'), 'layout', layout(800, 567));
  expect(screen.getByText('Parking')).toBeTruthy();
  await fireEvent.press(screen.getByText('Sector 3A – Cluster 1B'));
  expect(screen.queryByText('Parking')).toBeNull();
  await fireEvent.press(screen.getByText('Cabana'));
  expect(screen.getAllByText('Cabana')).toHaveLength(2); // legend entry + floating tag on the plan
});
