// Ported from the web masterplan page. Coordinates are "x,y,r" circles in the
// 1080x766 space of the masterplan images.
import { images } from '../assets/images';

export type MasterplanMode = 'cluster2' | 'cluster1b';
export interface MasterplanAmenity { id: number; name: string; coords: string }

export const MASTERPLAN_SIZE = { width: 1080, height: 766 };

export const masterplans = {
  cluster2: { label: 'Sector 3A – Cluster 2', image: images.master_masterplan1 },
  cluster1b: { label: 'Sector 3A – Cluster 1B', image: images.master_masterplan2 },
} as const;

export const masterplanAmenities: Record<MasterplanMode, MasterplanAmenity[]> = {
  cluster2: [
      { id: 1, name: "Entry", coords: "311,125,10" },
      { id: 1, name: "Entry", coords: "471,138,10" },
      { id: 1, name: "Entry", coords: "631,154,9" },
      { id: 1, name: "Entry", coords: "784,171,8" },
      { id: 1, name: "Entry", coords: "224,291,9" },
      { id: 1, name: "Entry", coords: "306,595,8" },
      { id: 1, name: "Entry", coords: "503,525,8" },

      { id: 2, name: "Security Cabin", coords: "307,149,9" },
      { id: 2, name: "Security Cabin", coords: "323,576,8" },

      { id: 3, name: "Foot Path", coords: "176,470,8" },

      { id: 4, name: "12 M Wide Road", coords: "580,125,8" },
      { id: 4, name: "12 M Wide Road", coords: "513,548,8" },

      { id: 5, name: "1.5 M Flushed Pathway", coords: "551,116,8" },
      { id: 5, name: "1.5 M Flushed Pathway", coords: "539,141,8" },
      { id: 5, name: "1.5 M Flushed Pathway", coords: "479,562,8" },
      { id: 5, name: "1.5 M Flushed Pathway", coords: "536,528,8" },

      { id: 6, name: "Driveway", coords: "826,272,8" },
      { id: 6, name: "Driveway", coords: "950,408,8" },
      { id: 6, name: "Driveway", coords: "879,499,9" },
      { id: 6, name: "Driveway", coords: "690,323,8" },

      { id: 7, name: "Parking", coords: "352,136,8" },
      { id: 7, name: "Parking", coords: "452,145,8" },
      { id: 7, name: "Parking", coords: "598,161,8" },
      { id: 7, name: "Parking", coords: "742,175,8" },
      { id: 7, name: "Parking", coords: "935,364,8" },
      { id: 7, name: "Parking", coords: "977,362,8" },
      { id: 7, name: "Parking", coords: "800,457,9" },
      { id: 7, name: "Parking", coords: "764,507,9" },
      { id: 7, name: "Parking", coords: "590,514,8" },
      { id: 7, name: "Parking", coords: "238,621,9" },
      { id: 7, name: "Parking", coords: "267,284,8" },

      { id: 8, name: "Shopping Promenade", coords: "190,440,8" },

      { id: 9, name: "Drop Off", coords: "400,151,8" },
      { id: 9, name: "Drop Off", coords: "522,163,8" },
      { id: 9, name: "Drop Off", coords: "686,179,8" },
      { id: 9, name: "Drop Off", coords: "848,190,8" },
      { id: 9, name: "Drop Off", coords: "694,520,8" },
      { id: 9, name: "Drop Off", coords: "538,502,8" },
      { id: 9, name: "Drop Off", coords: "391,535,8" },

      { id: 10, name: "Entry To MLCP", coords: "834,488,9" },

      { id: 11, name: "Round About", coords: "810,149,8" },
      { id: 11, name: "Round About", coords: "858,540,8" },
      { id: 11, name: "Round About", coords: "157,677,8" },

      { id: 12, name: "Jogging Track", coords: "557,312,8" },
      { id: 12, name: "Jogging Track", coords: "503,366,8" },

      { id: 13, name: "Multipurpose Lawn", coords: "488,336,8" },
      { id: 13, name: "Multipurpose Lawn", coords: "606,357,8" },

      { id: 14, name: "Seating Area", coords: "655,320,9" },
      { id: 14, name: "Seating Area", coords: "474,417,8" },
      { id: 14, name: "Seating Area", coords: "357,405,8" },
      { id: 14, name: "Seating Area", coords: "814,411,8" },

      { id: 15, name: "Kid's Play Area", coords: "598,272,9" },

      { id: 16, name: "Gazebo", coords: "492,304,8" },
      { id: 16, name: "Gazebo", coords: "553,368,8" },

      { id: 17, name: "Amphitheatre", coords: "625,389,9" },

      { id: 18, name: "Basketball Court on Ground", coords: "413,336,9" },

      { id: 19, name: "Floor Games", coords: "394,390,9" },

      { id: 20, name: "Outdoor Gym", coords: "452,268,8" },

      { id: 21, name: "Skating Rink", coords: "282,476,9" },

      { id: 22, name: "Sculpture", coords: "510,309,9" },
      { id: 22, name: "Sculpture", coords: "539,359,8" },
      { id: 22, name: "Sculpture", coords: "653,353,8" },

      { id: 23, name: "Outdoor Screen", coords: "625,335,9" },

      { id: 24, name: "Board Games", coords: "649,394,9" },
      { id: 24, name: "Board Games", coords: "598,402,9" },

      { id: 25, name: "Iconic Sculpture", coords: "183,688,9" },
      { id: 25, name: "Iconic Sculpture", coords: "842,531,9" },

      { id: 26, name: "Plantation", coords: "283,221,9" },
      { id: 26, name: "Plantation", coords: "321,249,8" },
      { id: 26, name: "Plantation", coords: "314,305,8" },
      { id: 26, name: "Plantation", coords: "368,291,8" },
      { id: 26, name: "Plantation", coords: "442,398,8" },
      { id: 26, name: "Plantation", coords: "517,377,8" },
      { id: 26, name: "Plantation", coords: "1007,434,8" },

      { id: 27, name: "Futsal Court", coords: "766,325,9" },

      { id: 28, name: "Tennis Court", coords: "840,328,9" },

      { id: 29, name: "Basketball Court on MLCP", coords: "888,332,9" },

      { id: 30, name: "Mini Golf", coords: "832,449,9" },
    ],
    cluster1b: [
      { id: 1, name: "Infant Play Area", coords: "485,257,9" },
      { id: 2, name: "Basketball Court", coords: "489,347,9" },
      { id: 3, name: "Outdoor Gym", coords: "546,388,9" },
      { id: 4, name: "Multipurpose Lawn", coords: "634,306,9" },
      { id: 5, name: "Stage", coords: "668,314,9" },
      { id: 6, name: "Amphitheatre", coords: "693,319,9" },
      { id: 7, name: "Kid's Play Area", coords: "650,225,9" },
      { id: 8, name: "Senior Seating Area", coords: "726,234,9" },

      { id: 9, name: "Board Games", coords: "871,374,9" },
      { id: 9, name: "Board Games", coords: "851,386,9" },

      { id: 10, name: "Cabana", coords: "790,177,9" },
      { id: 10, name: "Cabana", coords: "721,426,9" },

      { id: 11, name: "Barbeque", coords: "819,179,9" },

      { id: 12, name: "Seating Area", coords: "444,357,9" },
      { id: 12, name: "Seating Area", coords: "557,412,9" },
      { id: 12, name: "Seating Area", coords: "492,297,9" },
      { id: 12, name: "Seating Area", coords: "500,243,9" },
      { id: 12, name: "Seating Area", coords: "513,268,9" },
      { id: 12, name: "Seating Area", coords: "606,285,9" },
      { id: 12, name: "Seating Area", coords: "621,214,9" },
      { id: 12, name: "Seating Area", coords: "676,200,9" },
      { id: 12, name: "Seating Area", coords: "703,297,9" },
      { id: 12, name: "Seating Area", coords: "713,322,9" },

      { id: 13, name: "Gazebo", coords: "583,313,9" },

      { id: 14, name: "Walkway", coords: "469,264,9" },
      { id: 14, name: "Walkway", coords: "517,300,9" },
      { id: 14, name: "Walkway", coords: "463,376,9" },
      { id: 14, name: "Walkway", coords: "563,370,9" },
      { id: 14, name: "Walkway", coords: "572,283,9" },
      { id: 14, name: "Walkway", coords: "649,192,9" },
      { id: 14, name: "Walkway", coords: "751,218,9" },
      { id: 14, name: "Walkway", coords: "695,274,9" },
      { id: 14, name: "Walkway", coords: "638,349,9" },

      { id: 15, name: "Plantation", coords: "526,324,9" },
      { id: 15, name: "Plantation", coords: "623,253,9" },
      { id: 15, name: "Plantation", coords: "625,192,9" },
      { id: 15, name: "Plantation", coords: "718,204,9" },
      { id: 15, name: "Plantation", coords: "812,162,9" },
      { id: 15, name: "Plantation", coords: "735,261,9" },
      { id: 15, name: "Plantation", coords: "877,399,9" },
      { id: 15, name: "Plantation", coords: "787,357,9" },
      { id: 15, name: "Plantation", coords: "736,373,9" },
      { id: 15, name: "Plantation", coords: "691,362,9" },
      { id: 15, name: "Plantation", coords: "582,354,9" },
      { id: 15, name: "Plantation", coords: "541,421,9" },
      { id: 15, name: "Plantation", coords: "513,400,9" },
      { id: 15, name: "Plantation", coords: "427,373,9" },
      { id: 15, name: "Plantation", coords: "378,385,9" },
    ]
};
