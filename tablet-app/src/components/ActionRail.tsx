import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, type Href } from 'expo-router';
import { Image } from 'expo-image';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { images } from '@/assets/images';
import { useScale } from '@/theme';

/** Right-edge quick actions on the home screen (brochure, about, tie-ups...). */
export function ActionRail() {
  const { s } = useScale();
  const icon = s(20);
  const color = '#1f1f1f';
  const actions: { label: string; to: Href; icon: ReactNode }[] = [
    { label: 'Brochure', to: '/brochure', icon: <Ionicons name="book-outline" size={icon} color={color} /> },
    { label: 'About us', to: '/about', icon: <Ionicons name="information-circle" size={icon} color={color} /> },
    { label: 'Tie-up', to: '/tie-up', icon: <FontAwesome5 name="handshake" size={icon - 2} color={color} /> },
    { label: 'Specification', to: '/specification', icon: <Feather name="file-text" size={icon - 2} color={color} /> },
    {
      label: 'Construction Progress',
      to: '/construction',
      icon: <Image source={images.brand_construction.source} style={{ width: icon, height: icon }} contentFit="contain" />,
    },
    { label: 'Testimonial', to: '/testimonials', icon: <Ionicons name="shield-checkmark-outline" size={icon} color={color} /> },
    { label: 'Disclaimer', to: '/disclaimer', icon: <MaterialIcons name="rate-review" size={icon} color={color} /> },
  ];

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.wrap, { paddingRight: s(14) }]}>
      <View style={{ gap: s(8) }}>
        {actions.map((a) => (
          <Pressable
            key={a.label}
            onPress={() => router.push(a.to)}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            testID={`action-${a.label}`}
            style={({ pressed }) => [
              styles.button,
              { width: s(74), minHeight: s(58), borderRadius: s(14), paddingVertical: s(7), paddingHorizontal: s(4) },
              pressed && { transform: [{ scale: 0.94 }], backgroundColor: 'rgba(0,0,0,0.45)' },
            ]}
          >
            {a.icon}
            <Text style={[styles.label, { fontSize: s(9.5), marginTop: s(3) }]} numberOfLines={2}>
              {a.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'center', alignItems: 'flex-end', zIndex: 20 },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    elevation: 6,
  },
  label: { color: '#1f1f1f', fontWeight: '600', textAlign: 'center', lineHeight: 12 },
});
