import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FrostedBackground } from '@/components/ui';
import { colors, useScale } from '@/theme';

export function NotFound({ message = "Oops! The page you're looking for doesn't exist." }: { message?: string }) {
  const { s } = useScale();
  return (
    <View style={styles.root}>
      <FrostedBackground dim={0.2} />
      <Text style={[styles.code, { fontSize: s(64) }]}>404</Text>
      <Text style={[styles.msg, { fontSize: s(20), marginVertical: s(18) }]}>{message}</Text>
      <Pressable onPress={() => router.replace('/')} style={[styles.btn, { paddingHorizontal: s(26), paddingVertical: s(12), borderRadius: s(18) }]}>
        <Text style={[styles.btnText, { fontSize: s(16) }]}>GO HOME</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  code: { color: colors.white, fontWeight: '800' },
  msg: { color: colors.white },
  btn: { backgroundColor: 'rgba(255,255,255,0.3)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  btnText: { color: colors.white, fontWeight: '700' },
});
