import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/assets/images';
import { BackButton } from '@/components/ui';
import { specifications } from '@/data/content';
import { colors, fonts, useScale } from '@/theme';

export default function Specification() {
  const { s } = useScale();
  return (
    <View style={styles.root} testID="screen-specification">
      {/* decorative circular photos with a red wash, as on the web page */}
      <View style={[styles.circle, { width: s(420), height: s(420), borderRadius: s(210), top: s(-170), left: s(-110) }]}>
        <Image source={images.brand_img11.source} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(245,59,59,0.28)' }]} />
      </View>
      <View style={[styles.circle, { width: s(400), height: s(400), borderRadius: s(200), top: s(340), left: s(-130) }]}>
        <Image source={images.brand_img_12.source} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(245,59,59,0.38)' }]} />
      </View>

      <ScrollView contentContainerStyle={{ paddingLeft: s(330), paddingRight: s(40), paddingTop: s(48), paddingBottom: s(32) }}>
        <Text style={[styles.title, { fontSize: s(32), lineHeight: s(40), marginBottom: s(22) }]}>
          INTERNAL SPECIFICATIONS{'\n'}OVERVIEW
        </Text>
        <View style={[styles.grid, { gap: s(26) }]}>
          {specifications.map((col, i) => (
            <View key={i} style={[styles.col, { gap: s(18) }]}>
              {col.map((sec) => (
                <View key={sec.title}>
                  <Text style={[styles.section, { fontSize: s(15), marginBottom: s(6), letterSpacing: s(2) }]}>{sec.title.toUpperCase()}</Text>
                  {sec.items.map((it) => (
                    <View key={it} style={[styles.row, { gap: s(8), marginBottom: s(4) }]}>
                      <Text style={[styles.item, { fontSize: s(13.5), lineHeight: s(20) }]}>•</Text>
                      <Text style={[styles.item, { fontSize: s(13.5), lineHeight: s(20), flex: 1 }]}>{it}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <BackButton dark style={{ position: 'absolute', left: s(20), top: s(20) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  circle: { position: 'absolute', overflow: 'hidden' },
  title: { color: colors.red, fontFamily: fonts.padaukBold, letterSpacing: 2 },
  grid: { flexDirection: 'row' },
  col: { flex: 1 },
  section: { color: colors.redDeep, fontWeight: '800' },
  row: { flexDirection: 'row' },
  item: { color: '#1f2937', fontWeight: '500' },
});
