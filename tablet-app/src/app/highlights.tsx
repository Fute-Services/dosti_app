import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/assets/images';
import { NavRail } from '@/components/NavRail';
import { BackButton, Logos, PhotoBackground } from '@/components/ui';
import { highlights } from '@/data/content';
import { colors, useScale } from '@/theme';

export default function Highlights() {
  const { s } = useScale();
  const photo = images.gallery_elevationcam_dostithane.source;
  return (
    <View style={styles.root} testID="screen-highlights">
      <PhotoBackground source={photo} dim={0.55} />
      <View style={[styles.panel, { left: s(118), right: s(40), top: s(96), bottom: s(36), borderRadius: s(6), padding: s(18), gap: s(22) }]}>
        <Image source={photo} style={[styles.photo, { borderRadius: s(10) }]} contentFit="cover" transition={200} />
        <ScrollView style={styles.text} contentContainerStyle={{ justifyContent: 'center', flexGrow: 1, paddingVertical: s(8) }} showsVerticalScrollIndicator={false}>
          <Text style={[styles.heading, { fontSize: s(20), marginBottom: s(20) }]}>A GRAND COMMUNITY DESIGNED FOR A GREATER TOMORROW</Text>
          {highlights.map((h) => (
            <View key={h} style={[styles.row, { gap: s(12), marginBottom: s(14) }]}>
              <View style={[styles.bullet, { width: s(7), height: s(7), borderRadius: s(4), marginTop: s(8) }]} />
              <Text style={[styles.item, { fontSize: s(15.5), lineHeight: s(23) }]}>{h}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail variant="gold" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  panel: { position: 'absolute', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.18)' },
  photo: { flex: 6 },
  text: { flex: 4 },
  heading: { color: colors.white, fontWeight: '700', letterSpacing: 0.5 },
  row: { flexDirection: 'row' },
  bullet: { backgroundColor: colors.white },
  item: { color: colors.white, flex: 1 },
});
