import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, usePathname, type Href } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, useScale } from '@/theme';

type Item = {
  name: string;
  path: Href;
  match: string;
  icon: { set: 'ion'; name: ComponentProps<typeof Ionicons>['name'] } | { set: 'mci'; name: ComponentProps<typeof MaterialCommunityIcons>['name'] };
};

export const NAV_ITEMS: Item[] = [
  { name: '360°', path: '/', match: '/', icon: { set: 'mci', name: 'pentagon-outline' } },
  { name: 'Project Highlights', path: '/highlights', match: '/highlights', icon: { set: 'ion', name: 'bar-chart-outline' } },
  { name: 'Location', path: '/location', match: '/location', icon: { set: 'ion', name: 'location-outline' } },
  { name: 'Amenities', path: '/amenities', match: '/amenities', icon: { set: 'ion', name: 'sparkles-outline' } },
  { name: 'Masterplan', path: '/masterplan', match: '/masterplan', icon: { set: 'mci', name: 'office-building-outline' } },
  { name: 'Project Details', path: '/project-details', match: '/project-details', icon: { set: 'mci', name: 'layers-outline' } },
];

/**
 * Floating vertical navigation (left edge), as on the tablet layout of the
 * web experience. `variant="gold"` is the warmer rail used on content pages.
 */
export function NavRail({ variant = 'dark' }: { variant?: 'dark' | 'gold' }) {
  const { s } = useScale();
  const pathname = usePathname();
  const isActive = (m: string) => (m === '/' ? pathname === '/' : pathname.startsWith(m));

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.wrap, { paddingLeft: s(18) }]}>
      <View
        style={[
          styles.rail,
          variant === 'gold' ? styles.gold : styles.dark,
          { borderRadius: s(36), paddingVertical: s(10), paddingHorizontal: s(5), gap: s(6) },
        ]}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.match);
          const color = active ? colors.white : variant === 'gold' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.78)';
          return (
            <Pressable
              key={item.name}
              accessibilityRole="button"
              accessibilityLabel={item.name}
              accessibilityState={{ selected: active }}
              testID={`nav-${item.match}`}
              onPress={() => {
                if (!active) router.navigate(item.path);
              }}
              style={({ pressed }) => [
                styles.item,
                { width: s(62), paddingVertical: s(8), borderRadius: s(16) },
                active && styles.itemActive,
                pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
              ]}
            >
              {item.icon.set === 'ion' ? (
                <Ionicons name={item.icon.name} size={s(22)} color={color} />
              ) : (
                <MaterialCommunityIcons name={item.icon.name} size={s(22)} color={color} />
              )}
              <Text numberOfLines={2} style={[styles.label, { fontSize: s(9.5), color, marginTop: s(3) }]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'center', alignItems: 'flex-start', zIndex: 20 },
  rail: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', elevation: 8 },
  dark: { backgroundColor: 'rgba(0,0,0,0.45)' },
  gold: { backgroundColor: 'rgba(120,104,72,0.55)' },
  item: { alignItems: 'center' },
  itemActive: { backgroundColor: 'rgba(255,255,255,0.22)' },
  label: { textAlign: 'center', fontWeight: '500', lineHeight: 12 },
});
