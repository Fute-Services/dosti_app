import { useMemo, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle, Polygon } from 'react-native-svg';
import type { AssetSource } from '@/assets/images';
import { colors } from '@/theme';
import {
  fitTransform,
  hitTest,
  imageRectInSlot,
  parsePoints,
  type Fit,
  type Point,
  type Rect,
  type Size,
} from '@/lib/geometry';

export type Shape = { id: number; points: string } | { id: number; circle: { x: number; y: number; r: number } };

type Props = {
  /** coordinate space of the shapes (SVG viewBox width/height) */
  box: Size;
  image: AssetSource;
  /** natural pixel size of the bitmap */
  imageSize: Size;
  /** where the web version placed the <image> inside the viewBox (defaults to the whole box) */
  imageSlot?: Rect;
  fit?: Fit;
  shapes?: Shape[];
  highlighted?: number[];
  highlightFill?: string;
  /** called with the tapped shape id (or null when tapping empty space) */
  onTapShape?: (id: number | null, at: Point) => void;
  /** extra slop (in box units) so thin targets stay tappable */
  hitSlop?: number;
  /** overlay content positioned with the provided mapper (markers, labels) */
  renderOverlay?: (toScreen: (p: Point) => Point, scale: number) => ReactNode;
  backgroundColor?: string;
  testID?: string;
};

/**
 * Renders a plan/map image with interactive regions defined in the image's own
 * coordinate space. The bitmap is drawn by the native image view (fast,
 * downsampled); SVG only draws the highlighted shapes; taps are hit-tested in JS.
 */
export function PlanCanvas({
  box,
  image,
  imageSize,
  imageSlot,
  fit = 'contain',
  shapes = [],
  highlighted = [],
  highlightFill = colors.highlight,
  onTapShape,
  hitSlop = 0,
  renderOverlay,
  backgroundColor = 'transparent',
  testID,
}: Props) {
  const [size, setSize] = useState<Size | null>(null);

  type Parsed = { id: number; points: Point[]; raw: string } | { id: number; points: Point[]; circle: { x: number; y: number; r: number } };
  const parsed = useMemo<Parsed[]>(
    () =>
      shapes.map((s) =>
        'points' in s
          ? { id: s.id, points: parsePoints(s.points), raw: s.points }
          : { id: s.id, points: circleToPolygon(s.circle), circle: s.circle },
      ),
    [shapes],
  );

  const t = size ? fitTransform(box, size, fit) : null;
  const slot = imageSlot ?? { x: 0, y: 0, width: box.width, height: box.height };
  const imgRect = imageRectInSlot(slot, imageSize);

  const toScreen = (p: Point): Point => (t ? { x: t.ox + p.x * t.sx, y: t.oy + p.y * t.sy } : p);
  const toBox = (p: Point): Point => (t ? { x: (p.x - t.ox) / t.sx, y: (p.y - t.oy) / t.sy } : p);

  const onPress = (e: GestureResponderEvent) => {
    if (!onTapShape || !t) return;
    const at = toBox({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
    const hit = hitTest(at, parsed, hitSlop);
    onTapShape(hit ? hit.id : null, at);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (!size || size.width !== width || size.height !== height) setSize({ width, height });
  };

  const preserve = fit === 'contain' ? 'xMidYMid meet' : fit === 'cover' ? 'xMidYMid slice' : 'none';
  const lit = parsed.filter((p) => highlighted.includes(p.id));

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor }]} onLayout={onLayout} testID={testID}>
      {t && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={onPress} disabled={!onTapShape}>
            <Image
              source={image}
              pointerEvents="none"
              contentFit="fill"
              transition={150}
              style={{
                position: 'absolute',
                left: t.ox + imgRect.x * t.sx,
                top: t.oy + imgRect.y * t.sy,
                width: imgRect.width * t.sx,
                height: imgRect.height * t.sy,
              }}
            />
            {lit.length > 0 && (
              <Svg
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                viewBox={`0 0 ${box.width} ${box.height}`}
                preserveAspectRatio={preserve}
              >
                {lit.map((s, i) =>
                  'circle' in s ? (
                    <Circle key={`${s.id}-${i}`} cx={s.circle.x} cy={s.circle.y} r={s.circle.r} fill={highlightFill} />
                  ) : (
                    <Polygon
                      key={`${s.id}-${i}`}
                      points={s.raw}
                      fill={highlightFill}
                      stroke={colors.highlightStroke}
                      strokeWidth={Math.max(1, box.width / 900)}
                    />
                  ),
                )}
              </Svg>
            )}
          </Pressable>
          {renderOverlay && (
            <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
              {renderOverlay(toScreen, t.sx)}
            </View>
          )}
        </>
      )}
    </View>
  );
}

function circleToPolygon(c: { x: number; y: number; r: number }): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    pts.push({ x: c.x + Math.cos(a) * c.r, y: c.y + Math.sin(a) * c.r });
  }
  return pts;
}
