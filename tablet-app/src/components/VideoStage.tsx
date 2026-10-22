import { useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView, type VideoSource } from 'expo-video';
import { colors } from '@/theme';

type Props = {
  source: VideoSource;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  style?: StyleProp<ViewStyle>;
  onEnd?: () => void;
  testID?: string;
};

/**
 * Bundled (offline) video with native controls. Pauses when the screen loses
 * focus and resumes when it comes back, so nothing plays in the background.
 */
export function VideoStage({ source, loop = false, muted = false, autoPlay = true, style, onEnd, testID }: Props) {
  const player = useVideoPlayer(source, (p) => {
    p.loop = loop;
    p.muted = muted;
    if (autoPlay) p.play();
  });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useFocusEffect(
    useCallback(() => {
      if (autoPlay) player.play();
      return () => player.pause();
    }, [player, autoPlay]),
  );

  useEffect(() => {
    if (!onEnd) return;
    const sub = player.addListener('playToEnd', onEnd);
    return () => sub.remove();
  }, [player, onEnd]);

  return (
    <View style={[styles.frame, style]} testID={testID}>
      <VideoView player={player} style={StyleSheet.absoluteFill} nativeControls contentFit="contain" fullscreenOptions={{ enable: true }} />
      {status === 'loading' && (
        <View pointerEvents="none" style={styles.center}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>
      )}
      {status === 'error' && (
        <View pointerEvents="none" style={styles.center}>
          <Text style={styles.error}>This video could not be played.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#000', overflow: 'hidden' },
  center: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  error: { color: colors.white, fontSize: 16 },
});
