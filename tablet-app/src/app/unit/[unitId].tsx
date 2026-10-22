import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { NotFound } from '@/components/NotFound';
import { PlanCanvas, type Shape } from '@/components/PlanCanvas';
import { PlanToolbar } from '@/components/PlanToolbar';
import { Zoomable, type ZoomableHandle } from '@/components/Zoomable';
import { FloatingTag } from '@/components/ui';
import { findUnit, naturalSize } from '@/data/inventory';
import { vertexCentroid } from '@/lib/geometry';
import { colors, useScale } from '@/theme';

/** 1 BHK unit plan with tappable rooms showing their dimensions. */
export default function UnitScreen() {
  const { s } = useScale();
  const { unitId, plan: planSlug } = useLocalSearchParams<{ unitId: string; plan?: string }>();
  const found = findUnit(Number(unitId), planSlug);
  const [room, setRoom] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const zoomRef = useRef<ZoomableHandle>(null);
  const rooms = useMemo(() => found?.unit.rooms ?? [], [found]);
  const shapes = useMemo<Shape[]>(() => rooms.map((r) => ({ id: r.id, points: r.polygon })), [rooms]);

  if (!found) return <NotFound message="This unit plan is not available." />;
  const { unit, plan } = found;
  const box = { width: unit.widthx || 800, height: unit.heighty || 600 };
  const natural = naturalSize(unit.unitImage) ?? box;
  const active = rooms.find((r) => r.id === room);

  return (
    <View style={styles.root} testID="screen-unit">
      <View style={[StyleSheet.absoluteFill, { right: s(250), left: s(10), top: s(10), bottom: s(10) }]}>
        <Zoomable ref={zoomRef} style={StyleSheet.absoluteFill} onScaleChange={setZoomed} doubleTapZoom={false}>
          <PlanCanvas
            box={box}
            image={unit.unitImage}
            imageSize={natural}
            shapes={shapes}
            highlighted={room != null ? [room] : []}
            onTapShape={(id) => setRoom(id === room ? null : id)}
            renderOverlay={(toScreen) => {
              if (!active) return null;
              const p = toScreen(vertexCentroid(active.polygon));
              return <FloatingTag x={p.x} y={p.y + s(20)} text={active.name} sub={active.size} />;
            }}
            testID="unit-canvas"
          />
        </Zoomable>
      </View>

      <View style={[styles.side, { width: s(230), right: s(14), top: s(150), bottom: s(16), gap: s(10) }]}>
        <View style={[styles.card, { padding: s(12), borderRadius: s(14) }]}>
          <Text style={[styles.title, { fontSize: s(17) }]}>{unit.unitName.replace('-', ' ')}</Text>
          <Text style={[styles.meta, { fontSize: s(12) }]}>
            {plan.name1}
            {unit.unitInfo?.unitType ? ` · ${unit.unitInfo.unitType}` : ''}
          </Text>
          {unit.unitInfo?.total_usable_area ? (
            <Text style={[styles.area, { fontSize: s(13), marginTop: s(4) }]}>Total usable {unit.unitInfo.total_usable_area}</Text>
          ) : null}
        </View>
        <View style={[styles.card, { flex: 1, padding: s(8), borderRadius: s(14) }]}>
          <Text style={[styles.section, { fontSize: s(12), margin: s(4) }]}>ROOMS</Text>
          <ScrollView>
            {rooms.map((r) => {
              const on = r.id === room;
              return (
                <Pressable
                  key={r.id}
                  onPress={() => setRoom(on ? null : r.id)}
                  testID={`room-${r.id}`}
                  style={[styles.room, { paddingVertical: s(8), paddingHorizontal: s(10), borderRadius: s(10), marginBottom: s(4) }, on && styles.roomActive]}
                >
                  <Text style={[styles.roomName, { fontSize: s(14) }]}>{r.name}</Text>
                  <Text style={[styles.roomSize, { fontSize: s(12) }]}>{r.size}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <PlanToolbar zoomed={zoomed} onZoomIn={() => zoomRef.current?.zoomIn()} onReset={() => zoomRef.current?.reset()} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  side: { position: 'absolute' },
  card: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e5e7eb' },
  title: { color: '#111', fontWeight: '800' },
  meta: { color: '#555' },
  area: { color: colors.red, fontWeight: '700' },
  section: { color: '#6b7280', fontWeight: '700', letterSpacing: 1 },
  room: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  roomActive: { backgroundColor: colors.pink, borderColor: '#000' },
  roomName: { color: '#111', fontWeight: '700' },
  roomSize: { color: '#555' },
});
