// Typed access to the project inventory: clusters -> buildings -> floors ->
// typical floor plan -> units -> rooms. The raw arrays are ported verbatim
// from the web app; this module gives them one consistent shape.
import { buildingData } from './BuildingData';
import { Data as floorPlanData } from './FloorPlanData';
import { type AssetSource, images } from '../assets/images';

export interface Floor { id: number; name: string; polygon: string; isRefuge?: boolean }
export interface Building {
  id: number;
  title: string;
  /** slug of the typical floor plan, e.g. "pridea" */
  title1: string;
  polygon1: string;
  buildingData: { tower: string; image: AssetSource; imageHeight: string; imageWidth: string; viewBox: string; Floors: Floor[] };
}
export interface Cluster { id: number; name: string; polygon: string; buildings: Building[] }

export interface Room { id: number; name: string; size: string; polygon: string }
export interface Unit {
  unitId: number;
  id: number;
  unitName: string;
  status?: string;
  polygon: string;
  unitImage: AssetSource;
  widthx?: number;
  heighty?: number;
  unitInfo?: Record<string, string>;
  rooms?: Room[];
}
export interface FloorPlan {
  id: number;
  name1: string;
  name2?: string;
  name: string;
  title: string;
  floors?: string;
  mainImage: AssetSource;
  imageSettings: { width: number; height: number; svg: string };
  units: Unit[];
}

export const clusters = buildingData as unknown as Cluster[];
export const floorPlans = floorPlanData as unknown as FloorPlan[];

/** Aerial "project details" image and its coordinate space. */
export const PROJECT_VIEW = { image: images.inventory_projectdetails4, width: 2580, height: 1440 };

export const allBuildings = (): Building[] => clusters.flatMap((c) => c.buildings);

export function findBuilding(id: number): Building | undefined {
  return allBuildings().find((b) => b.id === id);
}

export function findFloorPlan(slug: string): FloorPlan | undefined {
  const key = slug.toLowerCase().replace(/\s+/g, '');
  return floorPlans.find((f) => f.title?.toLowerCase().trim() === key);
}

/**
 * Finds a unit. Unit ids are only unique within a floor plan (Serene A and
 * Serene C both use 1301–1312), so pass the plan slug whenever it is known.
 */
export function findUnit(unitId: number, planSlug?: string): { unit: Unit; plan: FloorPlan } | undefined {
  const preferred = planSlug ? findFloorPlan(planSlug) : undefined;
  const scoped = preferred?.units.find((u) => u.unitId === unitId);
  if (preferred && scoped) return { unit: scoped, plan: preferred };
  for (const plan of floorPlans) {
    const unit = plan.units.find((u) => u.unitId === unitId);
    if (unit) return { unit, plan };
  }
  return undefined;
}

/** Natural pixel size for a bundled image source, if known. */
export function naturalSize(source: AssetSource): { width: number; height: number } | undefined {
  for (const img of Object.values(images)) if (img.source === source) return { width: img.width, height: img.height };
  return undefined;
}
