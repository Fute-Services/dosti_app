import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { blurredImages, images, type AssetSource, type ImageKey } from '@/assets/images';
import { colors, useScale } from '@/theme';

export function Glass({ children, style, dark }: { children?: ReactNode; style?: StyleProp<ViewStyle>; dark?: boolean }) {
  return <View style={[styles.glass, dark && styles.glassDark, style]}>{children}</View>;
}

type IconButtonProps = {
  onPress: () => void;
  children: ReactNode;
  size?: number;
  active?: boolean;
  activeColor?: string;
  dark?: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
};

/** Round frosted button with a press-in scale for tactile feedback. */
export function IconButton({ onPress, children, size = 48, active, activeColor = colors.white, dark, label, style, disabled, testID }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      testID={testID}
      style={({ pressed }) => [
        styles.iconButton,
        { width: size, height: size, borderRadius: size / 2 },
        dark && styles.iconButtonDark,
        active && { backgroundColor: activeColor },
        disabled && { opacity: 0.35 },
        pressed && styles.pressed,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

/** The floating "reply" back button used throughout the web experience. */
export function BackButton({ style, dark }: { style?: StyleProp<ViewStyle>; dark?: boolean }) {
  const { s } = useScale();
  return (
    <IconButton label="Go back" onPress={goBack} size={s(52)} dark={dark} style={style} testID="back-button">
      <MaterialIcons name="reply-all" size={s(24)} color={colors.white} />
    </IconButton>
  );
}

/** Dosti logo (left) and Dosti Greater Thane logo (right), both return home. */
export function Logos({ dark = false }: { dark?: boolean }) {
  const { s } = useScale();
  const home = () => router.navigate('/');
  return (
    <View pointerEvents="box-none" style={[styles.logos, { paddingHorizontal: s(28), top: s(14) }]}>
      <Pressable onPress={home} accessibilityLabel="Home" hitSlop={8}>
        <Image
          source={images.brand_dosti_logo.source}
          style={{ width: s(104), height: s(44), tintColor: dark ? '#1f1f1f' : undefined }}
          contentFit="contain"
        />
      </Pressable>
      <Pressable onPress={home} accessibilityLabel="Home" hitSlop={8}>
        <Image source={images.brand_logofinal.source} style={{ width: s(140), height: s(64) }} contentFit="contain" />
      </Pressable>
    </View>
  );
}

/**
 * Full-screen photo with a heavy "frosted" look. Uses a tiny pre-blurred copy
 * stretched to fill the screen, which is far cheaper than a live blur.
 */
export function FrostedBackground({ image = 'gallery_gym', dim = 0.35 }: { image?: ImageKey; dim?: number }) {
  const blurred = blurredImages[image] ?? images[image].source;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image source={blurred} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={3} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${dim})` }]} />
    </View>
  );
}

export function PhotoBackground({ source, dim = 0 }: { source: AssetSource; dim?: number }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" />
      {dim > 0 && <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${dim})` }]} />}
    </View>
  );
}

type PillProps = {
  label: string;
  onPress: () => void;
  active?: boolean;
  activeColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  testID?: string;
};

export function Pill({ label, onPress, active, activeColor = 'rgba(255,255,255,0.4)', style, textStyle, icon, testID }: PillProps) {
  const { s } = useScale();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      testID={testID}
      style={({ pressed }) => [
        styles.pill,
        { paddingHorizontal: s(20), paddingVertical: s(9), borderRadius: s(30), gap: s(8) },
        active ? { backgroundColor: activeColor, borderColor: 'rgba(255,255,255,0.45)' } : null,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.pillText, { fontSize: s(14) }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

/** Floating name label used for selected units, floors, rooms and places. */
export function Tag({ text, sub, style }: { text: string; sub?: string; style?: StyleProp<ViewStyle> }) {
  const { s } = useScale();
  return (
    <View pointerEvents="none" style={[styles.tag, { paddingHorizontal: s(12), paddingVertical: s(6), borderRadius: s(8) }, style]}>
      <Text style={[styles.tagText, { fontSize: s(14) }]}>{text}</Text>
      {sub ? <Text style={[styles.tagSub, { fontSize: s(12) }]}>{sub}</Text> : null}
    </View>
  );
}

/** A Tag centred horizontally above (or below) a screen point. */
export function FloatingTag({ x, y, text, sub, below }: { x: number; y: number; text: string; sub?: string; below?: boolean }) {
  const { s } = useScale();
  const w = s(320);
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', left: x - w / 2, width: w, alignItems: 'center', top: below ? y + s(14) : y - s(sub ? 66 : 48) }}
    >
      <Tag text={text} sub={sub} />
    </View>
  );
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 24,
    overflow: 'hidden',
  },
  glassDark: { backgroundColor: colors.darkGlass },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    elevation: 4,
  },
  iconButtonDark: { backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)' },
  pressed: { transform: [{ scale: 0.94 }], opacity: 0.85 },
  logos: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.42)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillText: { color: colors.white, fontWeight: '600' },
  tag: { backgroundColor: 'rgba(0,0,0,0.82)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, alignItems: 'center' },
  tagText: { color: colors.white, fontWeight: '700' },
  tagSub: { color: 'rgba(255,255,255,0.75)', marginTop: 2 },
});
