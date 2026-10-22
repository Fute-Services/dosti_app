import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActionRail } from '@/components/ActionRail';
import { NavRail } from '@/components/NavRail';
import { Logos } from '@/components/ui';
import { TOUR_URL } from '@/assets/media';
import { colors } from '@/theme';

/** Home: the aerial 360° tour (bundled Pano2VR project) with navigation rails. */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <View style={styles.root} testID="screen-home">
      <WebView
        source={{ uri: TOUR_URL }}
        style={styles.web}
        originWhitelist={['file://*']}
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        setBuiltInZoomControls={false}
        overScrollMode="never"
        androidLayerType="hardware"
        cacheEnabled
        // the tour is fully local; block anything that tries to leave the app
        onShouldStartLoadWithRequest={(req) => req.url.startsWith('file://') || req.url.startsWith('about:')}
        onLoadEnd={() => setLoading(false)}
        onError={() => setFailed(true)}
      />
      {loading && !failed && (
        <View style={styles.overlay} pointerEvents="none">
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
      {failed && (
        <View style={styles.overlay}>
          <Text style={styles.error}>The 360° view could not be opened.</Text>
        </View>
      )}
      <Logos />
      <NavRail />
      <ActionRail />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  error: { color: colors.white, fontSize: 18 },
});
