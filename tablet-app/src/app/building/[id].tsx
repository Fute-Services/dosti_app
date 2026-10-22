import { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PlanCanvas, type Shape } from '@/components/PlanCanvas';
import { BackButton, FloatingTag, Logos } from '@/components/ui';
import { findBuilding, findFloorPlan, naturalSize, type Floor } from '@/data/inventory';
import { parseViewBox, vertexCentroid } from '@/lib/geometry';
import { colors, useScale } from '@/theme';
import { NotFound } from '@/components/NotFound';

/** Tower elevation: pick a floor (on the tower or in the list) to open its floor plan. */
export default function BuildingScreen() {
  const { s } = useScale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const building = findBuilding(Number(id));
  const [selected, setSelected] = useState<number | null>(null);
  const listRef = useRef<FlatList<Floor>>(null);

  const floors = useMemo(() => [...(building?.buildingData.Floors ?? [])].sort((a, b) => b.id - a.id), [building]);
  const shapes = useMemo<Shape[]>(() => floors.map((f) => ({ id: f.id, points: f.polygon })), [floors]);

  if (!building) return <NotFound message={`Building ${id} was not found.`} />;
  const bd = building.buildingData;
  const box = parseViewBox(bd.viewBox);
  const natural = naturalSize(bd.image) ?? { width: box.width, height: box.height };
  const slot = { x: 0, y: 0, width: Number(bd.imageHeight), height: Number(bd.imageWidth) };
  const floor = floors.find((f) => f.id === selected);
  const hasPlan = !!findFloorPlan(building.title1);

  const openPlan = () => {
    if (floor && !floor.isRefuge && hasPlan) router.push({ pathname: '/floorplan/[tower]', params: { tower: building.title1, floor: floor.name } });
  };

  const select = (fid: number | null, fromList = false) => {
    if (fid != null && fid === selected) return openPlan();
    setSelected(fid);
    if (fid != null && !fromList) {
      const index = floors.findIndex((f) => f.id === fid);
      if (index >= 0) listRef.current?.scrollToIndex({ index, viewPosition: 0.5, animated: true });
    }
  };

  return (
    <View style={styles.root} testID="screen-building">
      <View style={[StyleSheet.absoluteFill, { right: s(230) }]}>
        <PlanCanvas
          box={box}
          image={bd.image}
          imageSize={natural}
          imageSlot={slot}
          fit="contain"
          shapes={shapes}
          highlighted={selected != null ? [selected] : []}
          hitSlop={4}
          onTapShape={(fid) => select(fid)}
          renderOverlay={(toScreen) => {
            if (!floor) return null;
            const c = vertexCentroid(floor.polygon);
            const p = toScreen(c);
            return <FloatingTag x={p.x} y={p.y} text={floor.name.replace('-', ' ')} sub={floor.isRefuge ? 'Refuge floor' : 'Tap again for floor plan'} />;
          }}
          testID="building-canvas"
        />
      </View>

      <View style={[styles.side, { width: s(210), right: s(16), top: s(96), bottom: s(20), borderRadius: s(16), padding: s(12), gap: s(10) }]}>
        <Text style={[styles.tower, { fontSize: s(20) }]}>{building.title}</Text>
        <Text style={[styles.hint, { fontSize: s(12) }]}>Select a floor</Text>
        <FlatList
          ref={listRef}
          data={floors}
          keyExtractor={(f) => String(f.id)}
          getItemLayout={(_, i) => ({ length: s(40), offset: s(40) * i, index: i })}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item }) => {
            const active = item.id === selected;
            return (
              <Pressable
                onPress={() => select(item.id, true)}
                testID={`floor-${item.id}`}
                style={[styles.floorRow, { height: s(36), marginBottom: s(4), borderRadius: s(10), paddingHorizontal: s(12) }, active && styles.floorActive]}
              >
                <Text style={[styles.floorText, { fontSize: s(14) }, active && { color: '#000', fontWeight: '700' }]}>{item.name.replace('-', ' ')}</Text>
                {item.isRefuge && <Text style={[styles.refuge, { fontSize: s(10) }]}>REFUGE</Text>}
              </Pressable>
            );
          }}
        />
        <Pressable
          onPress={openPlan}
          disabled={!floor || !!floor.isRefuge || !hasPlan}
          accessibilityRole="button"
          testID="open-floorplan"
          style={({ pressed }) => [
            styles.cta,
            { height: s(46), borderRadius: s(12), gap: s(8) },
            (!floor || floor.isRefuge || !hasPlan) && { opacity: 0.4 },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={[styles.ctaText, { fontSize: s(14) }]}>View Floor Plan</Text>
          <Ionicons name="arrow-forward" size={s(16)} color="#000" />
        </Pressable>
      </View>

      <Logos />
      <BackButton dark style={{ position: 'absolute', left: s(20), top: s(92) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0b0b0b' },
  side: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  tower: { color: colors.white, fontWeight: '700' },
  hint: { color: 'rgba(255,255,255,0.65)' },
  floorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.06)' },
  floorActive: { backgroundColor: colors.pink },
  floorText: { color: 'rgba(255,255,255,0.85)' },
  refuge: { color: '#fca5a5', fontWeight: '700' },
  cta: { backgroundColor: colors.pink, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#000', fontWeight: '700' },
});
