import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { videos } from '@/assets/media';
import { NavRail } from '@/components/NavRail';
import { PlanCanvas } from '@/components/PlanCanvas';
import { VideoStage } from '@/components/VideoStage';
import { Zoomable, type ZoomableHandle } from '@/components/Zoomable';
import { BackButton, FloatingTag, FrostedBackground, IconButton, Logos, Pill } from '@/components/ui';
import { MAP_SIZE, categories, mapAll, type LocationPlace } from '@/data/LocationData';
import { boundsCenter } from '@/lib/geometry';
import { colors, useScale } from '@/theme';

type Tab = 'neighbourhood' | 'infrastructure';

export default function Location() {
  const { s, width, height } = useScale();
  const [tab, setTab] = useState<Tab>('neighbourhood');
  const [filter, setFilter] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const zoomRef = useRef<ZoomableHandle>(null);

  const visible = useMemo(() => (filter == null ? categories : categories.filter((c) => c.id === filter)), [filter]);
  const mapImage = filter == null ? mapAll : categories.find((c) => c.id === filter)?.image ?? mapAll;
  let selectedPlace: { place: LocationPlace; category: (typeof categories)[number] } | null = null;
  for (const c of categories) {
    const u = c.units.find((p) => p.id === selected);
    if (u) selectedPlace = { place: u, category: c };
  }

  // Card keeps the map's aspect ratio; "expand" makes it fill the screen.
  const maxW = expanded ? width - s(40) : width - s(260);
  const maxH = expanded ? height - s(40) : height - s(230);
  const cardW = Math.min(maxW, (maxH * MAP_SIZE.width) / MAP_SIZE.height);
  const cardH = (cardW * MAP_SIZE.height) / MAP_SIZE.width;

  const markerCenter = (p: LocationPlace) => {
    const c = boundsCenter(p.polygon);
    // web placed a 25-unit marker at (centre - cx, centre - cy)
    return { x: c.x - p.cx + 12.5, y: c.y - p.cy + 12.5 };
  };

  const chooseFilter = (id: number | null) => {
    setFilter(id);
    setSelected(null);
    zoomRef.current?.reset();
  };

  return (
    <View style={styles.root} testID="screen-location">
      <FrostedBackground />

      {tab === 'neighbourhood' ? (
        <View style={[styles.center, expanded && { zIndex: 30 }]}>
          <View style={[styles.card, { width: cardW, height: cardH, borderRadius: s(10) }]}>
            <Zoomable ref={zoomRef} style={StyleSheet.absoluteFill} maxScale={4}>
              <PlanCanvas
                box={MAP_SIZE}
                image={mapImage}
                imageSize={MAP_SIZE}
                backgroundColor="#fff"
                onTapShape={() => setSelected(null)}
                testID="location-canvas"
                renderOverlay={(toScreen, k) => {
                  const size = Math.max(25 * k, s(26));
                  return visible.flatMap((cat) =>
                    cat.units.map((u) => {
                      const p = toScreen(markerCenter(u));
                      const active = u.id === selected;
                      return (
                        <Pressable
                          key={`${cat.id}-${u.id}`}
                          accessibilityLabel={u.area}
                          hitSlop={6}
                          onPress={() => setSelected(active ? null : u.id)}
                          style={[
                            styles.marker,
                            {
                              left: p.x - size / 2,
                              top: p.y - size / 2,
                              width: size,
                              height: size,
                              borderRadius: size / 2,
                              backgroundColor: cat.bgcolor,
                              transform: [{ scale: active ? 1.3 : 1 }],
                            },
                          ]}
                        >
                          <FontAwesome5 name={cat.icon} size={size * 0.5} color={colors.white} />
                        </Pressable>
                      );
                    }),
                  );
                }}
              />
              {selectedPlace && <SelectedLabel place={selectedPlace.place} category={selectedPlace.category.name} cardW={cardW} markerCenter={markerCenter} />}
            </Zoomable>

            {/* Legend / filter */}
            <View style={[styles.legend, { top: s(10), left: s(10), width: s(180), padding: s(6), borderRadius: s(12) }]}>
              <Text style={[styles.legendTitle, { fontSize: s(10), marginBottom: s(4), marginLeft: s(6) }]}>LEGENDS</Text>
              <ScrollView style={{ maxHeight: cardH - s(60) }}>
                <Pressable onPress={() => chooseFilter(null)} style={[styles.legendRow, { paddingVertical: s(6), paddingHorizontal: s(8), borderRadius: s(8) }, filter == null && styles.legendActive]}>
                  <Text style={[styles.legendText, { fontSize: s(12) }]}>All Infrastructure</Text>
                </Pressable>
                {categories.map((c) => (
                  <Pressable
                    key={c.id}
                    onPress={() => chooseFilter(c.id)}
                    testID={`legend-${c.name}`}
                    style={[styles.legendRow, { paddingVertical: s(6), paddingHorizontal: s(8), gap: s(8), borderRadius: s(8) }, filter === c.id && styles.legendActive]}
                  >
                    <FontAwesome5 name={c.icon} size={s(12)} color={c.bgcolor} style={{ width: s(16), textAlign: 'center' }} />
                    <Text style={[styles.legendText, { fontSize: s(12) }, filter === c.id && { fontWeight: '700' }]}>{c.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.center}>
          <VideoStage source={videos.infrastructure} loop muted style={{ width: width * 0.8, height: height * 0.72, borderRadius: s(18) }} testID="infrastructure-video" />
        </View>
      )}

      {!expanded && (
        <>
          <Logos />
          <BackButton style={{ position: 'absolute', left: s(30), top: s(92) }} />
          <NavRail variant="gold" />
          <View style={[styles.tabs, { bottom: s(18), padding: s(4), gap: s(10), borderRadius: s(30) }]}>
            <Pill
              label="Neighborhood"
              icon={<FontAwesome name="home" size={s(15)} color={colors.white} />}
              active={tab === 'neighbourhood'}
              activeColor="#000"
              onPress={() => setTab('neighbourhood')}
              testID="tab-neighbourhood"
            />
            <Pill
              label="Upcoming Infrastructure"
              icon={<FontAwesome5 name="road" size={s(14)} color={colors.white} />}
              active={tab === 'infrastructure'}
              activeColor="#000"
              onPress={() => setTab('infrastructure')}
              testID="tab-infrastructure"
            />
          </View>
        </>
      )}

      <View style={[styles.actions, { top: expanded ? s(28) : s(96), right: s(30), gap: s(12) }]}>
        <IconButton label="Favourite" onPress={() => setIsFav((f) => !f)} active={isFav} activeColor="#ef4444" dark size={s(44)}>
          <FontAwesome name={isFav ? 'heart' : 'heart-o'} size={s(18)} color={colors.white} />
        </IconButton>
        {tab === 'neighbourhood' && (
          <IconButton label={expanded ? 'Exit full screen map' : 'Full screen map'} onPress={() => setExpanded((e) => !e)} active={expanded} activeColor="#fff" dark size={s(44)} testID="expand-map">
            <FontAwesome5 name={expanded ? 'compress-arrows-alt' : 'expand-arrows-alt'} size={s(17)} color={expanded ? '#000' : colors.white} />
          </IconButton>
        )}
      </View>
    </View>
  );
}

function SelectedLabel({
  place,
  category,
  cardW,
  markerCenter,
}: {
  place: LocationPlace;
  category: string;
  cardW: number;
  markerCenter: (p: LocationPlace) => { x: number; y: number };
}) {
  const k = cardW / MAP_SIZE.width;
  const c = markerCenter(place);
  return <FloatingTag x={c.x * k} y={c.y * k} text={place.area.trim()} sub={category} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  center: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#fff', overflow: 'hidden', elevation: 12 },
  marker: { position: 'absolute', alignItems: 'center', justifyContent: 'center', elevation: 3, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.9)' },
  legend: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.93)', borderWidth: 1, borderColor: '#e5e7eb', elevation: 6 },
  legendTitle: { color: '#9ca3af', fontWeight: '700', letterSpacing: 1.5 },
  legendRow: { flexDirection: 'row', alignItems: 'center' },
  legendActive: { backgroundColor: '#e5e7eb' },
  legendText: { color: 'rgba(0,0,0,0.75)', flexShrink: 1 },
  tabs: { position: 'absolute', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  actions: { position: 'absolute', flexDirection: 'row', zIndex: 40 },
});
