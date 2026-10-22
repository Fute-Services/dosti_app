import { StyleSheet, Text, View } from 'react-native';
import { videos } from '@/assets/media';
import { NavRail } from '@/components/NavRail';
import { VideoStage } from '@/components/VideoStage';
import { BackButton, FrostedBackground, Logos } from '@/components/ui';
import { colors, useScale } from '@/theme';

export default function Construction() {
  const { s, width, height } = useScale();
  const w = Math.min(width * 0.7, (height * 0.72 * 16) / 9);
  return (
    <View style={styles.root} testID="screen-construction">
      <FrostedBackground />
      <View style={styles.center}>
        <Text style={[styles.title, { fontSize: s(16), marginBottom: s(14) }]}>CONSTRUCTION PROGRESS</Text>
        <VideoStage source={videos.construction} style={{ width: w, height: (w * 9) / 16, borderRadius: s(16) }} testID="construction-video" />
      </View>
      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.white, fontWeight: '700', letterSpacing: 1.5 },
});
