import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type ListViewToken } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { blurredImages, images } from '@/assets/images';
import { NavRail } from '@/components/NavRail';
import { BackButton, Logos, Pill } from '@/components/ui';
import { clubhouseAmenities, outdoorAmenities, type Slide } from '@/data/content';
import { colors, useScale } from '@/theme';

type Category = 'outdoor' | 'clubhouse';

/** Swipeable full-screen gallery of outdoor and clubhouse amenities. */
export default function Amenities() {
  const { s, width, height } = useScale();
  const [category, setCategory] = useState<Category>('outdoor');
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);
  const slides = category === 'outdoor' ? outdoorAmenities : clubhouseAmenities;
  const current = slides[Math.min(index, slides.length - 1)];

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, i));
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
  };

  const selectCategory = (c: Category) => {
    if (c === category) return;
    setCategory(c);
    setIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const onViewable = useCallback(({ viewableItems }: { viewableItems: ListViewToken[] }) => {
    const first = viewableItems[0];
    if (first?.index != null) setIndex(first.index);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Slide }) => (
      <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: width * 0.78, height: height * 0.72, borderRadius: s(10), overflow: 'hidden' }}>
          <Image source={images[item.image].source} style={StyleSheet.absoluteFill} contentFit="cover" transition={180} recyclingKey={item.image} />
          <Text style={[styles.impression, { right: s(14), bottom: s(10), fontSize: s(11) }]}>Artist&apos;s Impression</Text>
        </View>
      </View>
    ),
    [width, height, s],
  );

  return (
    <View style={styles.root} testID="screen-amenities">
      {/* blurred copy of the current slide fills the screen behind it */}
      <Image
        source={blurredImages[current.image] ?? images[current.image].source}
        style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.1 }] }]}
        contentFit="cover"
        blurRadius={3}
        transition={300}
      />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.25)' }]} />

      <FlatList
        key={category}
        ref={listRef}
        data={slides}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        testID="amenities-list"
      />

      <View pointerEvents="none" style={[styles.titleWrap, { bottom: s(86) }]}>
        <Text style={[styles.title, { fontSize: s(14), paddingHorizontal: s(22), paddingVertical: s(7), borderRadius: s(20) }]}>{current.title}</Text>
      </View>

      <View style={[styles.controls, { bottom: s(26), gap: s(24) }]}>
        <Pressable accessibilityLabel="Previous" onPress={() => goTo(index - 1)} disabled={index === 0} hitSlop={12} style={{ opacity: index === 0 ? 0.35 : 1 }}>
          <Ionicons name="chevron-back" size={s(32)} color={colors.white} />
        </Pressable>
        <Pill label="Outdoor Amenities" active={category === 'outdoor'} onPress={() => selectCategory('outdoor')} testID="tab-outdoor" />
        <Pill label="Clubhouse Amenities" active={category === 'clubhouse'} onPress={() => selectCategory('clubhouse')} testID="tab-clubhouse" />
        <Pressable
          accessibilityLabel="Next"
          onPress={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          hitSlop={12}
          style={{ opacity: index === slides.length - 1 ? 0.35 : 1 }}
        >
          <Ionicons name="chevron-forward" size={s(32)} color={colors.white} />
        </Pressable>
      </View>
      <Text style={[styles.counter, { top: s(96), right: s(34), fontSize: s(13) }]}>
        {index + 1} / {slides.length}
      </Text>

      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail variant="gold" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  impression: { position: 'absolute', color: colors.white, textShadowColor: 'rgba(0,0,0,0.6)', textShadowRadius: 4 },
  titleWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  title: { color: colors.white, backgroundColor: 'rgba(0,0,0,0.6)', overflow: 'hidden', fontWeight: '600' },
  controls: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  counter: { position: 'absolute', color: 'rgba(255,255,255,0.85)', fontVariant: ['tabular-nums'] },
});
