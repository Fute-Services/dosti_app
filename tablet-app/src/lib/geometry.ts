// Geometry helpers for the interactive maps and plans. The source data stores
// shapes as "x1,y1,x2,y2,..." strings in the coordinate space of each image.

export type Point = { x: number; y: number };
export type Rect = { x: number; y: number; width: number; height: number };
export type Size = { width: number; height: number };

/** Parses "x1,y1,x2,y2,..." into points. Ignores a trailing odd value. */
export function parsePoints(points: string): Point[] {
  if (!points) return [];
  const n = points.split(',').map((v) => Number(v.trim()));
  const out: Point[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) {
    if (Number.isFinite(n[i]) && Number.isFinite(n[i + 1])) out.push({ x: n[i], y: n[i + 1] });
  }
  return out;
}

/** Average of the vertices (how the web app places building markers). */
export function vertexCentroid(points: string): Point {
  const pts = parsePoints(points);
  if (!pts.length) return { x: 0, y: 0 };
  const sum = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / pts.length, y: sum.y / pts.length };
}

/** Centre of the bounding box (how the web app places location markers). */
export function boundsCenter(points: string): Point {
  const pts = parsePoints(points);
  if (!pts.length) return { x: 0, y: 0 };
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 };
}

/** Ray-casting point-in-polygon test. */
export function pointInPolygon(p: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/**
 * Returns the id of the first shape containing the point, or the nearest
 * shape within `slop` (in shape units) so small targets stay easy to tap.
 */
export function hitTest<T extends { id: number; points: Point[] }>(p: Point, shapes: T[], slop = 0): T | null {
  for (const s of shapes) if (s.points.length > 2 && pointInPolygon(p, s.points)) return s;
  if (slop <= 0) return null;
  let best: T | null = null;
  let bestDist = slop;
  for (const s of shapes) {
    for (let i = 0, j = s.points.length - 1; i < s.points.length; j = i++) {
      const d = distanceToSegment(p, s.points[j], s.points[i]);
      if (d < bestDist) {
        bestDist = d;
        best = s;
      }
    }
  }
  return best;
}

function distanceToSegment(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

export type Fit = 'contain' | 'cover' | 'stretch';

/**
 * Maps a viewBox of size `box` into a container, like SVG preserveAspectRatio
 * (contain = "xMidYMid meet", cover = "xMidYMid slice", stretch = "none").
 */
export function fitTransform(box: Size, container: Size, fit: Fit) {
  const sx = container.width / box.width;
  const sy = container.height / box.height;
  if (fit === 'stretch') return { sx, sy, ox: 0, oy: 0 };
  const s = fit === 'contain' ? Math.min(sx, sy) : Math.max(sx, sy);
  return { sx: s, sy: s, ox: (container.width - box.width * s) / 2, oy: (container.height - box.height * s) / 2 };
}

/**
 * Where an <image> drawn at `slot` (x/y/width/height attributes) actually lands
 * when the bitmap's natural aspect differs (SVG default "xMidYMid meet").
 */
export function imageRectInSlot(slot: Rect, natural: Size): Rect {
  const s = Math.min(slot.width / natural.width, slot.height / natural.height);
  const width = natural.width * s;
  const height = natural.height * s;
  return { x: slot.x + (slot.width - width) / 2, y: slot.y + (slot.height - height) / 2, width, height };
}

/** Parses an SVG viewBox string "minX minY width height". */
export function parseViewBox(viewBox: string): Rect {
  const [x, y, width, height] = viewBox.trim().split(/[\s,]+/).map(Number);
  return { x, y, width, height };
}
