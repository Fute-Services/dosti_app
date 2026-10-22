// Integrity checks over the ported inventory/content data, so a bad edit to a
// polygon or a missing image is caught before it reaches a tablet.
import { brochurePages } from '@/assets/brochure';
import { images } from '@/assets/images';
import { MAP_SIZE, categories } from '@/data/LocationData';
import { clubhouseAmenities, outdoorAmenities, tieUps, disclaimer } from '@/data/content';
import { allBuildings, clusters, findBuilding, findFloorPlan, findUnit, floorPlans, naturalSize, PROJECT_VIEW } from '@/data/inventory';
import { MASTERPLAN_SIZE, masterplanAmenities } from '@/data/masterplan';
import { parsePoints, parseViewBox, vertexCentroid } from '@/lib/geometry';

const validPolygon = (pts: string) => {
  const p = parsePoints(pts);
  return p.length >= 3 && pts.split(',').length % 2 === 0;
};

describe('inventory', () => {
  it('has the expected clusters and towers', () => {
    expect(clusters.map((c) => c.name)).toEqual(['Sector 3A-Cluster 2', 'Sector 3A-Cluster 1B']);
    expect(allBuildings().map((b) => b.title)).toEqual([
      'Pride A', 'Pride B', 'Pride C', 'Pride D', 'Charm A', 'Charm B', 'Charm C', 'Serene A', 'Serene C',
    ]);
  });

  it('every tower links to an existing typical floor plan', () => {
    for (const b of allBuildings()) expect(findFloorPlan(b.title1)).toBeDefined();
  });

  it('tower markers sit inside the aerial view', () => {
    for (const b of allBuildings()) {
      const c = vertexCentroid(b.polygon1);
      expect(c.x).toBeGreaterThan(0);
      expect(c.x).toBeLessThan(PROJECT_VIEW.width);
      expect(c.y).toBeGreaterThan(0);
      expect(c.y).toBeLessThan(PROJECT_VIEW.height);
    }
  });

  it('every floor polygon is valid and inside its elevation image', () => {
    for (const b of allBuildings()) {
      const box = parseViewBox(b.buildingData.viewBox);
      expect(naturalSize(b.buildingData.image)).toBeDefined();
      expect(b.buildingData.Floors.length).toBeGreaterThan(10);
      for (const f of b.buildingData.Floors) {
        expect(validPolygon(f.polygon)).toBe(true);
        for (const p of parsePoints(f.polygon)) {
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.x).toBeLessThanOrEqual(box.width + 2);
          expect(p.y).toBeLessThanOrEqual(box.height + 2);
        }
      }
    }
  });

  it('floor plans have bundled images and valid unit polygons', () => {
    for (const plan of floorPlans) {
      expect(naturalSize(plan.mainImage)).toBeDefined();
      expect(plan.units.length).toBeGreaterThan(0);
      for (const u of plan.units) {
        expect(validPolygon(u.polygon)).toBe(true);
        expect(naturalSize(u.unitImage)).toBeDefined();
      }
    }
  });

  it('unit ids are unique within a plan and resolve to the right plan', () => {
    for (const plan of floorPlans) {
      const ids = plan.units.map((u) => u.unitId);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) {
        const found = findUnit(id, plan.title);
        expect(found?.plan.title).toBe(plan.title);
        for (const r of found!.unit.rooms ?? []) expect(validPolygon(r.polygon)).toBe(true);
      }
    }
  });

  it('Serene C units do not resolve to Serene A (ids are shared between them)', () => {
    expect(findUnit(1301, 'serenec')?.plan.title).toBe('serenec');
    expect(findUnit(1301, 'serenea')?.plan.title).toBe('serenea');
  });

  it('lookups handle unknown ids', () => {
    expect(findBuilding(9999)).toBeUndefined();
    expect(findFloorPlan('nope')).toBeUndefined();
    expect(findUnit(-1)).toBeUndefined();
  });
});

describe('location map', () => {
  it('category ids are unique (used as filter keys)', () => {
    const ids = categories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every place is inside the map', () => {
    for (const c of categories)
      for (const u of c.units) {
        expect(validPolygon(u.polygon)).toBe(true);
        for (const p of parsePoints(u.polygon)) {
          expect(p.x).toBeLessThanOrEqual(MAP_SIZE.width);
          expect(p.y).toBeLessThanOrEqual(MAP_SIZE.height);
        }
      }
  });
});

describe('masterplan', () => {
  it('amenity circles are inside the plan', () => {
    for (const list of Object.values(masterplanAmenities))
      for (const a of list) {
        const [x, y, r] = a.coords.split(',').map(Number);
        expect(r).toBeGreaterThan(0);
        expect(x).toBeLessThanOrEqual(MASTERPLAN_SIZE.width);
        expect(y).toBeLessThanOrEqual(MASTERPLAN_SIZE.height);
      }
  });
});

describe('content', () => {
  it('references only bundled images', () => {
    const keys = [...outdoorAmenities, ...clubhouseAmenities].map((s) => s.image).concat(tieUps, disclaimer.qrCodes);
    for (const k of keys) expect(images[k]).toBeDefined();
  });
  it('ships every brochure page', () => {
    expect(brochurePages).toHaveLength(31);
  });
});
