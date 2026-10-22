import { StyleSheet, View } from 'react-native';
import { videos } from '@/assets/media';
import { VideoStage } from '@/components/VideoStage';
import { BackButton } from '@/components/ui';
import { useScale } from '@/theme';

export default function Walkthrough() {
  const { s } = useScale();
  return (
    <View style={styles.root} testID="screen-walkthrough">
      <VideoStage source={videos.walkthrough} loop muted style={StyleSheet.absoluteFill} testID="walkthrough-video" />
      <BackButton dark style={{ position: 'absolute', left: s(20), top: s(20) }} />
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#000' } });
