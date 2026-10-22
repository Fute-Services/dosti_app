import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useKeepAwake } from 'expo-keep-awake';
import { useFonts, Padauk_400Regular, Padauk_700Bold } from '@expo-google-fonts/padauk';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync().catch(() => {});

/** Sales-gallery mode: landscape, edge-to-edge, system bars hidden, screen kept on. */
function useKioskMode() {
  useKeepAwake();
  useEffect(() => {
    const apply = () => {
      if (Platform.OS === 'android') NavigationBar.setVisibilityAsync('hidden').catch(() => {});
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => {});
    };
    apply();
    // Android shows the bars again after the app returns from the background.
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') apply();
    });
    return () => sub.remove();
  }, []);
}

export default function RootLayout() {
  useKioskMode();
  const [fontsLoaded, fontError] = useFonts({ Padauk_400Regular, Padauk_700Bold });
  const ready = fontsLoaded || !!fontError;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 220,
          contentStyle: { backgroundColor: '#000' },
        }}
      />
    </GestureHandlerRootView>
  );
}
