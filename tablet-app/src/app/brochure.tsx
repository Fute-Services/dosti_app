import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type ListViewToken } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { brochurePages } from '@/assets/brochure';
import { Zoomable } from '@/components/Zoomable';
import { BackButton, IconButton } from '@/components/ui';
import { colors, useScale } from '@/theme';

type Page = (typeof brochurePages)[number];

/** Offline brochure: swipe between pre-rendered pages, pinch to zoom, thumbnails below. */
export default function Brochure() {
  const { s, width, height } = useScale();
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const listRef = useRef<FlatList<Page>>(null);
  const thumbsRef = useRef<FlatList<Page>>(null);
  const thumbH = s(64);
  const thumbW = thumbH * 1.37;
  const pageH = height - thumbH - s(40);

  const goTo = useCallback((i: number) => {
    const n = Math.max(0, Math.min(brochurePages.length - 1, i));
    listRef.current?.scrollToIndex({ index: n, animated: true });
    setIndex(n);
  }, []);

  const onViewable = useCallback(({ viewableItems }: { viewableItems: ListViewToken[] }) => {
    const i = viewableItems[0]?.index;
    if (i != null) {
      setIndex(i);
      thumbsRef.current?.scrollToIndex({ index: i, viewPosition: 0.5, animated: true });
    }
  }, []);

  return (
    <View style={styles.root} testID="screen-brochure">
      <FlatList
        ref={listRef}
        data={brochurePages}
        keyExtractor={(_, i) => `p${i}`}
        horizontal
        pagingEnabled
        scrollEnabled={!zoomed}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        renderItem={({ item, index: i }) => (
          <View style={{ width, height: pageH, paddingHorizontal: s(70), paddingTop: s(16) }}>
            {Math.abs(i - index) <= 1 ? (
              <Zoomable style={{ flex: 1 }} onScaleChange={setZoomed}>
                <Image source={item.page} style={StyleSheet.absoluteFill} contentFit="contain" transition={120} />
              </Zoomable>
            ) : null}
          </View>
        )}
        testID="brochure-pages"
      />

      <IconButton label="Previous page" onPress={() => goTo(index - 1)} disabled={index === 0} size={s(52)} style={[styles.arrow, { left: s(10), top: pageH / 2 - s(26) }]}>
        <Feather name="chevron-left" size={s(28)} color={colors.white} />
      </IconButton>
      <IconButton
        label="Next page"
        onPress={() => goTo(index + 1)}
        disabled={index === brochurePages.length - 1}
        size={s(52)}
        style={[styles.arrow, { right: s(10), top: pageH / 2 - s(26) }]}
      >
        <Feather name="chevron-right" size={s(28)} color={colors.white} />
      </IconButton>

      <FlatList
        ref={thumbsRef}
        data={brochurePages}
        keyExtractor={(_, i) => `t${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: s(12) }}
        contentContainerStyle={{ paddingHorizontal: s(12), gap: s(8) }}
        getItemLayout={(_, i) => ({ length: thumbW + s(8), offset: (thumbW + s(8)) * i + s(12), index: i })}
        onScrollToIndexFailed={() => {}}
        renderItem={({ item, index: i }) => (
          <Pressable onPress={() => goTo(i)} accessibilityLabel={`Page ${i + 1}`}>
            <Image
              source={item.thumb}
              style={{ width: thumbW, height: thumbH, borderRadius: s(4), borderWidth: 2, borderColor: i === index ? '#ef4444' : 'transparent', opacity: i === index ? 1 : 0.6 }}
              contentFit="cover"
            />
          </Pressable>
        )}
      />

      <Text style={[styles.counter, { top: s(18), right: s(22), fontSize: s(13), paddingHorizontal: s(12), paddingVertical: s(4), borderRadius: s(12) }]}>
        {index + 1} / {brochurePages.length}
      </Text>
      <BackButton style={{ position: 'absolute', left: s(14), top: s(14) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#171717', justifyContent: 'space-between' },
  arrow: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.15)' },
  counter: { position: 'absolute', color: 'rgba(255,255,255,0.85)', backgroundColor: 'rgba(0,0,0,0.4)', overflow: 'hidden', fontVariant: ['tabular-nums'] },
});
