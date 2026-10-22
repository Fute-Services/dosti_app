import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { videos } from '@/assets/media';
import { NavRail } from '@/components/NavRail';
import { VideoStage } from '@/components/VideoStage';
import { BackButton, FrostedBackground, Glass, IconButton, Logos } from '@/components/ui';
import { colors, useScale } from '@/theme';

export default function Testimonials() {
  const { s, width, height } = useScale();
  const list = videos.testimonials;
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % list.length), [list.length]);
  const prev = () => setCurrent((c) => (c === 0 ? list.length - 1 : c - 1));
  const w = Math.min(width * 0.6, (height * 0.56 * 16) / 9);

  return (
    <View style={styles.root} testID="screen-testimonials">
      <FrostedBackground />
      <View style={styles.center}>
        <Glass style={{ alignItems: 'center', paddingHorizontal: s(34), paddingVertical: s(22), borderRadius: s(28) }}>
          <Text style={[styles.title, { fontSize: s(17) }]}>ACCOLADES OF DOSTI GREATER THANE</Text>
          <Text style={[styles.sub, { fontSize: s(12), marginTop: s(4), marginBottom: s(14) }]}>
            Voices of Trust – Real stories from people who chose Dosti and found their perfect home.
          </Text>
          {/* key remounts the player so each testimonial starts fresh */}
          <VideoStage key={current} source={list[current]} onEnd={next} style={{ width: w, height: (w * 9) / 16, borderRadius: s(14) }} testID="testimonial-video" />
          <View style={[styles.controls, { marginTop: s(16), gap: s(28) }]}>
            <IconButton label="Previous testimonial" onPress={prev} size={s(48)}>
              <Feather name="chevron-left" size={s(24)} color={colors.white} />
            </IconButton>
            <Text style={[styles.count, { fontSize: s(14) }]}>
              {current + 1} / {list.length}
            </Text>
            <IconButton label="Next testimonial" onPress={next} size={s(48)}>
              <Feather name="chevron-right" size={s(24)} color={colors.white} />
            </IconButton>
          </View>
        </Glass>
      </View>
      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail variant="gold" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.white, fontWeight: '700', letterSpacing: 0.5 },
  sub: { color: 'rgba(255,255,255,0.85)' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  count: { color: colors.white, fontVariant: ['tabular-nums'] },
});
