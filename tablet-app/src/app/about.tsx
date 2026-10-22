import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { NavRail } from '@/components/NavRail';
import { BackButton } from '@/components/ui';
import { about } from '@/data/content';
import { colors, fonts, useScale } from '@/theme';

export default function About() {
  const { s } = useScale();
  return (
    <View style={styles.root} testID="screen-about">
      <View style={styles.half}>
        <Image source={about.image.source} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
      </View>
      <ScrollView style={styles.half} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: s(44), paddingVertical: s(24) }}>
        <Text style={[styles.kicker, { fontSize: s(16), letterSpacing: s(3.5) }]}>{about.kicker}</Text>
        <Text style={[styles.title, { fontSize: s(32) }]}>{about.title}</Text>
        <Text style={[styles.body, { fontSize: s(12.5), lineHeight: s(19), marginTop: s(10) }]}>
          {about.body.map(([bold, rest]) => (
            <Text key={bold}>
              <Text style={styles.bold}>{bold}</Text>
              {rest}
            </Text>
          ))}
        </Text>
        <Image source={about.tree.source} style={{ width: '100%', aspectRatio: about.tree.width / about.tree.height, marginTop: s(10) }} contentFit="contain" />
      </ScrollView>
      <BackButton dark style={{ position: 'absolute', left: s(30), top: s(30) }} />
      <NavRail variant="gold" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },
  half: { flex: 1 },
  kicker: { color: colors.red, fontFamily: fonts.padauk, textAlign: 'center' },
  title: { color: colors.red, fontFamily: fonts.padaukBold, textAlign: 'center' },
  body: { color: colors.red, fontFamily: fonts.padauk, textAlign: 'center' },
  bold: { fontFamily: fonts.padaukBold },
});
