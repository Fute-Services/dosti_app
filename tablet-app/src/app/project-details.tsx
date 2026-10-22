import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { NavRail } from '@/components/NavRail';
import { PlanCanvas, type Shape } from '@/components/PlanCanvas';
import { BackButton, FloatingTag, Logos } from '@/components/ui';
import { PROJECT_VIEW, clusters, type Building } from '@/data/inventory';
import { vertexCentroid } from '@/lib/geometry';
import { colors, useScale } from '@/theme';

/** Aerial view of the township: tap a tower marker (or list entry) to explore it. */
export default function ProjectDetails() {
  const { s } = useScale();
  const [showAll, setShowAll] = useState(true);
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);

  const clusterShapes = useMemo<Shape[]>(() => clusters.map((c) => ({ id: c.id, points: c.polygon })), []);
  const markerBuildings = clusters.flatMap((c) =>
    c.buildings.filter((b) => showAll || c.id === activeCluster || b.id === focused).map((b) => ({ b, cluster: c })),
  );
  const open = (b: Building) => router.push({ pathname: '/building/[id]', params: { id: String(b.id) } });

  return (
    <View style={styles.root} testID="screen-project-details">
      <PlanCanvas
        box={PROJECT_VIEW}
        image={PROJECT_VIEW.image.source}
        imageSize={PROJECT_VIEW.image}
        fit="cover"
        shapes={showAll ? [] : clusterShapes}
        highlighted={activeCluster != null ? [activeCluster] : []}
        highlightFill="rgba(255,112,67,0.3)"
        onTapShape={(id) => setActiveCluster(id)}
        renderOverlay={(toScreen) => (
          <>
            {!showAll && activeCluster != null && (() => {
              const c = clusters.find((x) => x.id === activeCluster);
              if (!c) return null;
              const p = toScreen(vertexCentroid(c.polygon));
              return <FloatingTag x={p.x} y={p.y + s(70)} text={c.name} sub="Tap a tower to explore" below />;
            })()}
            {markerBuildings.map(({ b }) => {
              const c = vertexCentroid(b.polygon1);
              const p = toScreen({ x: c.x, y: c.y - 30 });
              const big = focused === b.id;
              const size = big ? s(54) : s(44);
              return (
                <View key={b.id} pointerEvents="box-none" style={{ position: 'absolute', left: p.x - s(60), top: p.y - size / 2 - s(30), width: s(120), alignItems: 'center' }}>
                  <View style={[styles.markerTag, { paddingHorizontal: s(8), paddingVertical: s(3), borderRadius: s(6), marginBottom: s(4) }, !big && { opacity: 0 }]}>
                    <Text style={[styles.markerTagText, { fontSize: s(12) }]}>{b.title}</Text>
                  </View>
                  <Pressable
                    accessibilityLabel={`Open ${b.title}`}
                    testID={`marker-${b.id}`}
                    hitSlop={6}
                    onPressIn={() => setFocused(b.id)}
                    onPress={() => open(b)}
                    style={[styles.marker, { width: size, height: size, borderRadius: size / 2 }]}
                  >
                    <FontAwesome5 name="building" size={size * 0.48} color={big ? '#c2410c' : colors.gold} />
                  </Pressable>
                </View>
              );
            })}
          </>
        )}
      />

      <View style={[styles.side, { right: s(18), top: s(110), bottom: s(24), width: s(210), gap: s(10) }]}>
        <Pressable
          onPress={() => {
            setShowAll((v) => !v);
            setActiveCluster(null);
          }}
          style={({ pressed }) => [styles.toggle, { height: s(46), borderRadius: s(10), gap: s(10) }, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          testID="toggle-markers"
        >
          <FontAwesome name={showAll ? 'eye-slash' : 'eye'} size={s(16)} color={colors.white} />
          <Text style={[styles.toggleText, { fontSize: s(13) }]}>{showAll ? 'Hide All Markers' : 'Show All Markers'}</Text>
        </Pressable>
        <ScrollView contentContainerStyle={{ gap: s(10) }} showsVerticalScrollIndicator={false}>
          {clusters.map((c) => (
            <View key={c.id} style={[styles.cluster, { padding: s(10), borderRadius: s(12) }]}>
              <Text style={[styles.clusterTitle, { fontSize: s(12), marginBottom: s(6) }]}>{c.name.toUpperCase()}</Text>
              {c.buildings.map((b) => (
                <Pressable
                  key={b.id}
                  onPressIn={() => setFocused(b.id)}
                  onPress={() => open(b)}
                  accessibilityRole="button"
                  accessibilityLabel={b.title}
                  style={({ pressed }) => [
                    styles.item,
                    { paddingVertical: s(8), paddingHorizontal: s(12), borderRadius: s(10) },
                    (pressed || focused === b.id) && styles.itemActive,
                  ]}
                >
                  <Text style={[styles.itemText, { fontSize: s(14) }, focused === b.id && { color: colors.white }]}>{b.title}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <Logos />
      <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
      <NavRail />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    elevation: 6,
  },
  markerTag: { backgroundColor: 'rgba(0,0,0,0.7)' },
  markerTagText: { color: colors.white, fontWeight: '700' },
  side: { position: 'absolute' },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
  },
  toggleText: { color: colors.white, fontWeight: '600' },
  cluster: { backgroundColor: 'rgba(0,0,0,0.42)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 },
  clusterTitle: { color: 'rgba(255,255,255,0.75)', fontWeight: '700', letterSpacing: 0.8 },
  item: {},
  itemActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  itemText: { color: 'rgba(255,255,255,0.8)' },
});
