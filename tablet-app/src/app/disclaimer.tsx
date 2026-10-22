import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/assets/images';
import { NavRail } from '@/components/NavRail';
import { BackButton, FrostedBackground, Logos } from '@/components/ui';
import { disclaimer } from '@/data/content';
import { colors, useScale } from '@/theme';

export default function Disclaimer() {
  const { s } = useScale();
  return (
    <View style={styles.root} testID="screen-disclaimer">
      <FrostedBackground dim={0.45} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: s(160), paddingTop: s(100), paddingBottom: s(30), alignItems: 'center' }}>
        <Text style={[styles.text, { fontSize: s(13.5), lineHeight: s(21) }]}>
          <Text style={styles.bold}>Site Address: </Text>
          {disclaimer.siteAddress}
        </Text>
        <Text style={[styles.text, { fontSize: s(13.5), lineHeight: s(21), marginTop: s(4) }]}>
          <Text style={styles.bold}>Corp. Address: </Text>
          {disclaimer.corpAddress}
        </Text>

        <View style={[styles.qrRow, { gap: s(14), marginVertical: s(24) }]}>
          {disclaimer.qrCodes.map((q, i) => (
            <View key={i} style={[styles.qr, { padding: s(6), borderRadius: s(6) }]}>
              <Image source={images[q].source} style={{ width: s(80), height: s(80) }} contentFit="contain" />
            </View>
          ))}
        </View>

        {disclaimer.rera.map((r) => (
          <Text key={r} style={[styles.text, { fontSize: s(12), lineHeight: s(18), marginTop: s(4) }]}>
            {r}
          </Text>
        ))}
        <Text style={[styles.text, { fontSize: s(12), lineHeight: s(18), marginTop: s(20), maxWidth: s(820) }]}>{disclaimer.club}</Text>
        <Text style={[styles.legal, { fontSize: s(11), lineHeight: s(16), marginTop: s(24), maxWidth: s(640) }]}>{disclaimer.legal}</Text>
        <View style={{ marginTop: s(20), alignItems: 'center' }}>
          {disclaimer.company.map((c) => (
            <Text key={c} style={[styles.text, { fontSize: s(12) }]}>
              {c}
            </Text>
          ))}
        </View>
      </ScrollView>
      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail variant="gold" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  text: { color: colors.white, textAlign: 'center' },
  bold: { fontWeight: '800' },
  legal: { color: 'rgba(255,255,255,0.9)', textAlign: 'left' },
  qrRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  qr: { backgroundColor: '#fff' },
});
