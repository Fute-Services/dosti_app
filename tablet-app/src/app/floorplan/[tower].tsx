import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NotFound } from '@/components/NotFound';
import { PlanCanvas, type Shape } from '@/components/PlanCanvas';
import { PlanToolbar } from '@/components/PlanToolbar';
import { Zoomable, type ZoomableHandle } from '@/components/Zoomable';
import { FloatingTag } from '@/components/ui';
import { findFloorPlan, naturalSize, type Unit } from '@/data/inventory';
import { parseViewBox, vertexCentroid } from '@/lib/geometry';
import { colors, useScale } from '@/theme';

/** Typical floor plan: tap a flat to see its areas, tap again (or the button) for the unit plan. */
export default function FloorPlanScreen() {
  const { s } = useScale();
  const { tower, floor } = useLocalSearchParams<{ tower: string; floor?: string }>();
  const plan = findFloorPlan(tower ?? '');
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const zoomRef = useRef<ZoomableHandle>(null);
  const shapes = useMemo<Shape[]>(() => (plan?.units ?? []).map((u) => ({ id: u.unitId, points: u.polygon })), [plan]);

  if (!plan) return <NotFound message="This floor plan is not available." />;
  const box = parseViewBox(plan.imageSettings.svg);
  const natural = naturalSize(plan.mainImage) ?? { width: plan.imageSettings.width, height: plan.imageSettings.height };
  const slot = { x: 0, y: 0, width: plan.imageSettings.width, height: plan.imageSettings.height };
  const unit = plan.units.find((u) => u.unitId === selected);

  const openUnit = (u: Unit) => router.push({ pathname: '/unit/[unitId]', params: { unitId: String(u.unitId), plan: plan.title } });
  const select = (id: number | null) => {
    if (id != null && id === selected && unit) return openUnit(unit);
    setSelected(id);
  };

  return (
    <View style={styles.root} testID="screen-floorplan">
      <View style={[StyleSheet.absoluteFill, { right: s(250), left: s(10), top: s(10), bottom: s(10) }]}>
        <Zoomable ref={zoomRef} style={StyleSheet.absoluteFill} onScaleChange={setZoomed} doubleTapZoom={false}>
          <PlanCanvas
            box={box}
            image={plan.mainImage}
            imageSize={natural}
            imageSlot={slot}
            shapes={shapes}
            highlighted={selected != null ? [selected] : []}
            onTapShape={select}
            renderOverlay={(toScreen) => {
              if (!unit) return null;
              const p = toScreen(vertexCentroid(unit.polygon));
              return <FloatingTag x={p.x} y={p.y} text={unit.unitName} sub="Tap again for unit plan" />;
            }}
            testID="floorplan-canvas"
          />
        </Zoomable>
      </View>

      <View style={[styles.side, { width: s(230), right: s(14), top: s(150), bottom: s(16), gap: s(10) }]}>
        <View style={[styles.card, { padding: s(12), borderRadius: s(14) }]}>
          <Text style={[styles.title, { fontSize: s(17) }]}>{plan.name1}</Text>
          {plan.name2 ? <Text style={[styles.meta, { fontSize: s(12) }]}>{plan.name2}</Text> : null}
          {floor ? <Text style={[styles.floor, { fontSize: s(13), marginTop: s(4) }]}>{floor.replace('-', ' ')}</Text> : null}
        </View>

        <View style={[styles.card, { flex: 1, padding: s(10), borderRadius: s(14) }]}>
          <Text style={[styles.section, { fontSize: s(12), marginBottom: s(6) }]}>FLOOR PLAN · UNITS</Text>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: s(6) }}>
            {plan.units.map((u) => {
              const active = u.unitId === selected;
              return (
                <Pressable
                  key={u.unitId}
                  onPress={() => select(u.unitId)}
                  testID={`unit-chip-${u.unitId}`}
                  style={[styles.chip, { paddingHorizontal: s(10), paddingVertical: s(7), borderRadius: s(10) }, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, { fontSize: s(12.5) }, active && { color: '#000', fontWeight: '700' }]}>{u.unitName.replace('Unit-', 'Unit ')}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {unit?.unitInfo && (
          <View style={[styles.card, { padding: s(12), borderRadius: s(14), gap: s(3) }]}>
            <Info label="Type" value={unit.unitInfo.unitType} />
            <Info label="RERA carpet" value={unit.unitInfo.Rera_carpet_area} />
            <Info label="Encl. balcony" value={unit.unitInfo.enclosed_balcony_area} />
            <Info label="Open balcony" value={unit.unitInfo.open_balcony_area} />
            <Info label="Total usable" value={unit.unitInfo.total_usable_area} strong />
          </View>
        )}

        <Pressable
          onPress={() => unit && openUnit(unit)}
          disabled={!unit}
          accessibilityRole="button"
          testID="open-unit"
          style={({ pressed }) => [styles.cta, { height: s(46), borderRadius: s(12), gap: s(8) }, !unit && { opacity: 0.4 }, pressed && { opacity: 0.8 }]}
        >
          <Text style={[styles.ctaText, { fontSize: s(14) }]}>{unit ? `View ${unit.unitName.replace('-', ' ')}` : 'Select a unit'}</Text>
          <Ionicons name="arrow-forward" size={s(16)} color="#000" />
        </Pressable>
      </View>

      <PlanToolbar zoomed={zoomed} onZoomIn={() => zoomRef.current?.zoomIn()} onReset={() => zoomRef.current?.reset()} />
    </View>
  );
}

function Info({ label, value, strong }: { label: string; value?: string; strong?: boolean }) {
  const { s } = useScale();
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { fontSize: s(12) }]}>{label}</Text>
      <Text style={[styles.infoValue, { fontSize: s(13) }, strong && { fontWeight: '800', color: colors.red }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  side: { position: 'absolute' },
  card: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e5e7eb' },
  title: { color: '#111', fontWeight: '800' },
  meta: { color: '#555' },
  floor: { color: colors.red, fontWeight: '700' },
  section: { color: '#6b7280', fontWeight: '700', letterSpacing: 1 },
  chip: { backgroundColor: '#7d7a74' },
  chipActive: { backgroundColor: colors.pink, borderColor: '#000', borderWidth: 1 },
  chipText: { color: colors.white },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { color: '#6b7280' },
  infoValue: { color: '#111', fontWeight: '600' },
  cta: { backgroundColor: colors.pink, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.8)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#000', fontWeight: '700' },
});
