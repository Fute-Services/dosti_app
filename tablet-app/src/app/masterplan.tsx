import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { images } from '@/assets/images';
import { NavRail } from '@/components/NavRail';
import { PlanCanvas, type Shape } from '@/components/PlanCanvas';
import { BackButton, FloatingTag } from '@/components/ui';
import { MASTERPLAN_SIZE, masterplanAmenities, masterplans, type MasterplanAmenity, type MasterplanMode } from '@/data/masterplan';
import { colors, useScale } from '@/theme';

/** Masterplan with an interactive legend: tap a legend entry (or a spot on the plan). */
export default function Masterplan() {
  const { s } = useScale();
  const [mode, setMode] = useState<MasterplanMode>('cluster2');
  const [selected, setSelected] = useState<number | null>(null);
  const plan = masterplans[mode];
  const amenities = masterplanAmenities[mode];

  const legend = useMemo(() => [...new Map(amenities.map((a) => [a.id, a])).values()], [amenities]);
  const shapes = useMemo<Shape[]>(
    () =>
      amenities.map((a) => {
        const [x, y, r] = a.coords.split(',').map(Number);
        return { id: a.id, circle: { x, y, r } };
      }),
    [amenities],
  );
  const selectedSpots = amenities.filter((a) => a.id === selected);
  const selectedName = selectedSpots[0]?.name;

  const switchMode = (m: MasterplanMode) => {
    setMode(m);
    setSelected(null);
  };

  return (
    <View style={styles.root} testID="screen-masterplan">
      <View style={[styles.header, { paddingHorizontal: s(28), top: s(12) }]}>
        <Pressable onPress={() => router.navigate('/')} accessibilityLabel="Home">
          <Image source={images.brand_dosti_new_logo_01.source} style={{ width: s(120), height: s(62) }} contentFit="contain" />
        </Pressable>
        <Pressable onPress={() => router.navigate('/')} accessibilityLabel="Home">
          <Image source={images.brand_logofinal.source} style={{ width: s(140), height: s(64) }} contentFit="contain" />
        </Pressable>
      </View>

      <View style={[styles.body, { paddingLeft: s(110), paddingRight: s(22), paddingTop: s(86), paddingBottom: s(22), gap: s(20) }]}>
        <View style={styles.planArea}>
          <PlanCanvas
            box={MASTERPLAN_SIZE}
            image={plan.image.source}
            imageSize={plan.image}
            shapes={shapes}
            highlighted={selected != null ? [selected] : []}
            highlightFill="rgba(239,68,68,0.85)"
            hitSlop={14}
            onTapShape={(id) => setSelected(id)}
            renderOverlay={(toScreen) =>
              selectedName && selectedSpots[0]
                ? (() => {
                    const [x, y] = selectedSpots[0].coords.split(',').map(Number);
                    const p = toScreen({ x, y });
                    return <FloatingTag x={p.x} y={p.y} text={selectedName} />;
                  })()
                : null
            }
            testID="masterplan-canvas"
          />
        </View>

        <View style={[styles.side, { width: s(270), padding: s(10), gap: s(12), borderRadius: s(12) }]}>
          <Pressable
            onPress={() => router.push('/walkthrough')}
            style={({ pressed }) => [styles.walk, { paddingVertical: s(11), borderRadius: s(12), gap: s(8) }, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
            testID="walkthrough-button"
          >
            <MaterialCommunityIcons name="play-circle-outline" size={s(18)} color={colors.white} />
            <Text style={[styles.walkText, { fontSize: s(14) }]}>Walkthrough</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', gap: s(8) }}>
            {(Object.keys(masterplans) as MasterplanMode[]).map((m) => (
              <Pressable
                key={m}
                onPress={() => switchMode(m)}
                style={[styles.toggle, { paddingVertical: s(9), borderRadius: s(12) }, mode === m && styles.toggleActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: mode === m }}
              >
                <Text style={[styles.toggleText, { fontSize: s(11.5) }]}>{masterplans[m].label}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[styles.legendTitle, { fontSize: s(15) }]}>Legend</Text>
          <FlatList
            data={legend}
            keyExtractor={(a) => String(a.id)}
            renderItem={({ item }: { item: MasterplanAmenity }) => {
              const active = item.id === selected;
              return (
                <Pressable
                  onPress={() => setSelected(active ? null : item.id)}
                  style={[styles.legendItem, { paddingVertical: s(8), paddingHorizontal: s(10), borderRadius: s(12), marginBottom: s(6), gap: s(8) }, active && styles.legendActive]}
                >
                  <Text style={[styles.badge, { fontSize: s(11), paddingHorizontal: s(8), paddingVertical: s(2), borderRadius: s(10) }]}>{item.id}</Text>
                  <Text style={[styles.legendText, { fontSize: s(13.5) }, active && { color: colors.white }]}>{item.name}</Text>
                </Pressable>
              );
            }}
            showsVerticalScrollIndicator
          />
        </View>
      </View>
      <BackButton dark style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E8E8E8' },
  header: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 },
  body: { flex: 1, flexDirection: 'row' },
  planArea: { flex: 1 },
  side: { backgroundColor: 'rgba(255,255,255,0.6)' },
  walk: { backgroundColor: 'rgba(55,65,81,0.85)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  walkText: { color: colors.white, fontWeight: '700' },
  toggle: { flex: 1, backgroundColor: 'rgba(55,65,81,0.85)', alignItems: 'center', justifyContent: 'center' },
  toggleActive: { backgroundColor: 'rgba(220,38,38,0.85)' },
  toggleText: { color: colors.white, fontWeight: '600', textAlign: 'center' },
  legendTitle: { color: '#000', fontWeight: '700' },
  legendItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)' },
  legendActive: { backgroundColor: 'rgba(239,68,68,0.85)' },
  badge: { color: colors.white, backgroundColor: 'rgba(0,0,0,0.55)', overflow: 'hidden' },
  legendText: { color: 'rgba(0,0,0,0.88)', flex: 1 },
});
