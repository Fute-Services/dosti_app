import {
  boundsCenter,
  fitTransform,
  hitTest,
  imageRectInSlot,
  parsePoints,
  parseViewBox,
  pointInPolygon,
  vertexCentroid,
} from '@/lib/geometry';

describe('parsePoints', () => {
  it('parses coordinate strings', () => {
    expect(parsePoints('1,2,3,4')).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });
  it('tolerates spaces, trailing values and empty input', () => {
    expect(parsePoints(' 1, 2 ,3,4,5')).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(parsePoints('')).toEqual([]);
  });
});

describe('centres', () => {
  const square = '0,0,10,0,10,10,0,10';
  it('vertex centroid', () => expect(vertexCentroid(square)).toEqual({ x: 5, y: 5 }));
  it('bounds centre', () => expect(boundsCenter('0,0,20,0,20,4,0,4')).toEqual({ x: 10, y: 2 }));
  it('empty shapes fall back to origin', () => expect(vertexCentroid('')).toEqual({ x: 0, y: 0 }));
});

describe('pointInPolygon / hitTest', () => {
  const tri = parsePoints('0,0,10,0,0,10');
  it('detects inside and outside points', () => {
    expect(pointInPolygon({ x: 2, y: 2 }, tri)).toBe(true);
    expect(pointInPolygon({ x: 8, y: 8 }, tri)).toBe(false);
  });
  it('returns the containing shape', () => {
    const shapes = [
      { id: 1, points: parsePoints('0,0,10,0,10,10,0,10') },
      { id: 2, points: parsePoints('20,0,30,0,30,10,20,10') },
    ];
    expect(hitTest({ x: 25, y: 5 }, shapes)?.id).toBe(2);
    expect(hitTest({ x: 15, y: 5 }, shapes)).toBeNull();
    // within slop of shape 1's right edge
    expect(hitTest({ x: 12, y: 5 }, shapes, 3)?.id).toBe(1);
  });
});

describe('fitTransform', () => {
  const box = { width: 200, height: 100 };
  it('contain letterboxes', () => {
    expect(fitTransform(box, { width: 400, height: 400 }, 'contain')).toEqual({ sx: 2, sy: 2, ox: 0, oy: 100 });
  });
  it('cover crops', () => {
    expect(fitTransform(box, { width: 400, height: 400 }, 'cover')).toEqual({ sx: 4, sy: 4, ox: -200, oy: 0 });
  });
  it('stretch scales axes independently', () => {
    expect(fitTransform(box, { width: 400, height: 400 }, 'stretch')).toEqual({ sx: 2, sy: 4, ox: 0, oy: 0 });
  });
});

describe('imageRectInSlot', () => {
  it('matches SVG xMidYMid meet for a mismatched slot (floor plan data)', () => {
    // FloorPlanData draws a 5491x3991 bitmap into a 5491x3891 slot
    const r = imageRectInSlot({ x: 0, y: 0, width: 5491, height: 3891 }, { width: 3200, height: 2326 });
    expect(r.height).toBeCloseTo(3891);
    expect(r.width).toBeCloseTo(3200 * (3891 / 2326));
    expect(r.x).toBeCloseTo((5491 - r.width) / 2);
  });
});

it('parses viewBox strings', () => {
  expect(parseViewBox('0 0 1499 838')).toEqual({ x: 0, y: 0, width: 1499, height: 838 });
});
