import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type ListViewToken } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { images, type ImageKey } from '@/assets/images';
import { NavRail } from '@/components/NavRail';
import { BackButton, FrostedBackground, Glass, IconButton, Logos } from '@/components/ui';
import { tieUps } from '@/data/content';
import { colors, useScale } from '@/theme';

const INTERVAL = 6000;

/** Auto-advancing carousel of the township's brand alliances. */
export default function TieUp() {
  const { s, height } = useScale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(true);
  const listRef = useRef<FlatList<ImageKey>>(null);
  const slideH = height * 0.56;
  const slideW = slideH * (images.tieup_apollo_clinic_01.width / images.tieup_apollo_clinic_01.height);

  const goTo = useCallback(
    (i: number) => {
      const n = (i + tieUps.length) % tieUps.length;
      listRef.current?.scrollToIndex({ index: n, animated: true });
      setIndex(n);
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  useEffect(() => {
    if (paused || !focused) return;
    const t = setTimeout(() => goTo(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, focused, goTo]);

  const onViewable = useCallback(({ viewableItems }: { viewableItems: ListViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  }, []);

  return (
    <View style={styles.root} testID="screen-tie-up">
      <FrostedBackground />
      <View style={styles.center}>
        <Glass style={{ alignItems: 'center', paddingVertical: s(22), paddingHorizontal: s(30), borderRadius: s(28) }}>
          <Text style={[styles.title, { fontSize: s(16) }]}>ISSE GREATER TOWNSHIP NAHI</Text>
          <Text style={[styles.sub, { fontSize: s(11), marginBottom: s(12) }]}>11+ UNIQUE BRAND ALLIANCES</Text>
          <View style={{ width: slideW, height: slideH }}>
            <FlatList
              ref={listRef}
              data={tieUps}
              keyExtractor={(k) => k}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              getItemLayout={(_, i) => ({ length: slideW, offset: slideW * i, index: i })}
              onViewableItemsChanged={onViewable}
              viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
              onScrollBeginDrag={() => setPaused(true)}
              renderItem={({ item }) => (
                <Image source={images[item].source} style={{ width: slideW, height: slideH }} contentFit="contain" />
              )}
            />
          </View>
          <View style={[styles.dots, { gap: s(6), marginTop: s(12) }]}>
            {tieUps.map((k, i) => (
              <Pressable key={k} onPress={() => goTo(i)} hitSlop={6} accessibilityLabel={`Slide ${i + 1}`}>
                <View style={{ height: s(6), width: i === index ? s(24) : s(8), borderRadius: s(3), backgroundColor: i === index ? colors.white : 'rgba(255,255,255,0.35)' }} />
              </Pressable>
            ))}
          </View>
          <View style={[styles.dots, { gap: s(20), marginTop: s(12) }]}>
            <IconButton label="Previous slide" onPress={() => goTo(index - 1)} size={s(44)}>
              <Feather name="chevron-left" size={s(22)} color={colors.white} />
            </IconButton>
            <IconButton label={paused ? 'Play slideshow' : 'Pause slideshow'} onPress={() => setPaused((p) => !p)} size={s(44)}>
              <Feather name={paused ? 'play' : 'pause'} size={s(18)} color={colors.white} />
            </IconButton>
            <IconButton label="Next slide" onPress={() => goTo(index + 1)} size={s(44)}>
              <Feather name="chevron-right" size={s(22)} color={colors.white} />
            </IconButton>
          </View>
        </Glass>
      </View>
      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.white, fontWeight: '800', letterSpacing: 1 },
  sub: { color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  dots: { flexDirection: 'row', alignItems: 'center' },
});
