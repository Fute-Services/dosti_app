import metro from '../assets/Location1/map_for animation_Metro.png';
import education from '../assets/Location1/map_for animation_SCHOOL ,CoLLeGE.png';
import mall from '../assets/Location1/map_for animation_Mall.png';
import jetty from '../assets/Location1/map_for animation_Jetty.png';
import railway from '../assets/Location1/map_for animation_RAILWAY STATION.png';
import temple from '../assets/Location1/map_for animation_Temple.png';
import hospital from '../assets/Location1/map_for animation_Hospital.png';

import park from '../assets/Location1/map_for animation_Water Park.png';
import { HiAcademicCap } from "react-icons/hi";

import { FaTree } from "react-icons/fa";


import {
    FaSubway,
    // FaSchool,
    FaShoppingBag,
    FaShip,
    FaTrain,
    FaPlaceOfWorship,
    // FaLayerGroup,
    FaHospital,
} from "react-icons/fa";
import type { ReactElement } from "react";
export interface Unit {
    id: number;
    coords: string;
    polygon: string;
    area: string;
    cx:number;
    cy:number;
}

export interface Category {
    name: string;
    id: number;
    icon?: ReactElement;
    bgcolor: string;
    iconColor: string;
    image?: string; // Optional if some don't have images yet
    units: Unit[];
}

export const categories: Category[] = [
    {
        name: "Metro", id: 1, icon: <FaSubway />, bgcolor: "rgba(104, 78, 69, 1)", iconColor: "white", image: metro, units: [
            { id: 101, coords: "", polygon: "907,477,925,475,925,494,907,493", area: "Balkum Metro Station",cx:15,cy:18},
            { id: 102, coords: "", polygon: "1303,315,1323,315,1322,325,1304,327", area: "Kalher Metro Station",cx:11,cy:18 },
            { id: 103, coords: "", polygon: "892,14,912,14,911,24,893,26", area: "Kasarvadavali Metro Station",cx:15,cy:18 },
            { id: 104, coords: "", polygon: "746,466,766,466,765,476,747,478", area: "Kupurbowdi Metro Station",cx:14,cy:18 },
            // { id: 105, coords: "", polygon: "", area: "" },
            // { id: 106, coords: "", polygon: "", area: "" }
        ]
    },
    {
        name: "School/College", id: 2, icon: < HiAcademicCap />, bgcolor: "rgb(164, 127, 59)", iconColor: "white", image: education, units: [
            { id: 201, coords: "", polygon: "859,270,876,270,876,286,859,286", area: "ST. Xaviers High School&JR. College",cx:13,cy:13 },
            { id: 202, coords: "", polygon: "921,272,939,272,939,289,921,288", area: "Orchids International School",cx:12,cy:18 },
            { id: 203, coords: "", polygon: "694,383,711,383,711,399,694,399", area: "Vasant Vihar School",cx:12,cy:15 },
            { id: 204, coords: "", polygon: "421,473,439,473,439,490,421,489", area: "Billabong High International School",cx:15,cy:17 },
            { id: 205, coords: "", polygon: "425,695,443,695,443,712,425,711", area: "Dyanasadhana College" ,cx:10,cy:18},
            { id: 206, coords: "", polygon: "753,566,773,566,773,586,753,586", area: "Rustomjee Cambridge School",cx:12,cy:18 },
            { id: 207, coords: "", polygon: "570,782,590,782,590,802,570,802", area: "KC College of Engineering",cx:12,cy:18 },
            { id: 208, coords: "", polygon: "858,413,878,413,878,433,858,433", area: "University of Mumbai Thane Sub-campus" ,cx:12,cy:18},
            { id: 209, coords: "", polygon: "1123,420,1143,420,1143,440,1123,440", area: "Divine English School & Junio College",cx:12,cy:18 },
            { id: 210, coords: "", polygon: "1283,376,1303,376,1303,396,1283,396", area: "Evershine School",cx:15,cy:18 },
            { id: 211, coords: "", polygon: "1298,359,1318,359,1318,379,1298,379", area: "Lio International School",cx:14,cy:18 },
            // { id: 212, coords: "", polygon: "969,451,989,451,989,471,969,471", area: "Proposed School" },
            { id: 213, coords: "", polygon: "948,244,965,244,965,260,948,260", area: "Universal School" ,cx:12,cy:15},
            { id: 214, coords: "", polygon: "756,474,776,474,776,494,756,494", area: "Goenka International School",cx:12,cy:18 },
            { id: 215, coords: "", polygon: "592,470,609,470,609,486,592,486", area: "SMT.S.Singhania School" ,cx:12,cy:15},
            { id: 216, coords: "", polygon: "829,559,846,559,846,575,829,575", area: "Lodha World School" ,cx:14,cy:18},

        ]
    },
    {
        name: "Mall", id: 3, icon: <FaShoppingBag />, image: mall, bgcolor: "rgb(183, 105, 57)", iconColor: "white", units: [
            { id: 301, coords: "", polygon: "449,654,466,654,466,670,449,670", area: "Eternity Mall",cx:12,cy:14 },
            { id: 302, coords: "", polygon: "818,364,838,364,838,384,818,384", area: "R Mall",cx:14,cy:18 },
            { id: 303, coords: "", polygon: "564,528,581,528,581,544,564,544", area: "Korum Mall",cx:12,cy:16 },
            { id: 304, coords: "", polygon: "627,512,647,512,646,522,628,524", area: "Lack Shore",cx:12,cy:15 },
            { id: 305, coords: "", polygon: "1245,414,1265,414,1264,424,1246,426", area: "My D Mall",cx:15,cy:15 },
            { id: 306, coords: "", polygon: "779,490,799,490,798,500,780,502", area: "High Street Mall",cx:12,cy:15 },
            { id: 307, coords: "", polygon: "753,421,773,421,772,431,754,433", area: "Cine Wonder Mall" ,cx:12,cy:18},
            { id: 308, coords: "", polygon: "796,421,816,421,815,431,797,433", area: "D.mart",cx:12,cy:17 },
            { id: 309, coords: "", polygon: "795,493,815,493,814,503,796,505", area: "D.I.Y" ,cx:15,cy:18},
            { id: 310, coords: "", polygon: "1073,468,1093,468,1092,478,1074,480", area: "Woodpecker",cx:12,cy:18 },
            { id: 311, coords: "", polygon: "1227,448,1247,448,1246,458,1228,460", area: "Bankar Plaza",cx:14,cy:18 },
            { id: 312, coords: "", polygon: "985,110,1005,110,1004,120,986,122", area: "The Walk",cx:12,cy:14 },


        ]
    },
    {
        name: "Jetty", id: 4, icon: <FaShip />, image: jetty, bgcolor: "rgb(119, 111, 65)", iconColor: "white/90", units: [
            { id: 401, coords: "", polygon: "1080,215,1100,215,1100,235,1080,235", area: "Proposed Kolshet Jetty",cx:9,cy:15 },
            { id: 402, coords: "", polygon: "1036,430,1053,430,1053,446,1036,446", area: "Under Construction Water Ways Project" ,cx:13,cy:12},
            // { id: 403, coords: "", polygon: "", area: "" },
            // { id: 404, coords: "", polygon: "", area: "" },
            // { id: 405, coords: "", polygon: "", area: "" },
            // { id: 406, coords: "", polygon: "", area: "" }

        ]
    },
    {
        name: "Railway Station", id: 5, icon: <FaTrain />, bgcolor: "rgb(109, 78, 60)", iconColor: "white", image: railway, units: [
            { id: 501, coords: "", polygon: "801,730,819,730,819,747,801,746", area: "Halwa Station",cx:12,cy:18 },
            { id: 502, coords: "", polygon: "535,704,553,704,553,721,535,720", area: "Thane Station" ,cx:12,cy:18},
            { id: 503, coords: "", polygon: "330,730,348,730,348,747,330,746", area: "Mulund Station" ,cx:12,cy:18},
            // { id: 504, coords: "", polygon: "", area: "" },
            // { id: 505, coords: "", polygon: "", area: "" },
            // { id: 506, coords: "", polygon: "", area: "" }

        ]
    },
    {
        name: "Temple", id: 6, icon: <FaPlaceOfWorship />, bgcolor: "rgb(143, 86, 21)", iconColor: "white/90", image: temple, units: [
            { id: 601, coords: "", polygon: "1240,377,1260,377,1259,387,1241,389", area: "Shankar Temple",cx:11,cy:15 },
            { id: 602, coords: "", polygon: "1220,401,1240,401,1239,411,1221,413", area: "Ganapati Mandir",cx:10,cy:15 },
            { id: 603, coords: "", polygon: "1263,393,1283,393,1283,413,1263,413", area: "Ayyappa Temple",cx:15,cy:17 },
            { id: 604, coords: "", polygon: "1238,429,1252,429,1251,441,1237,439", area: "Sai Papa Temple" ,cx:15,cy:18},
            { id: 605, coords: "", polygon: "1142,374,1162,374,1162,394,1142,394", area: "Hanuman Temple",cx:12,cy:18 },
            { id: 606, coords: "", polygon: "936,453,956,453,956,473,936,473", area: "Proposed Iskon Temple",cx:11,cy:17 },
            { id: 607, coords: "", polygon: "1310,333,1330,333,1329,343,1311,345", area: "Jain Derasar",cx:14,cy:17 }
        ]
    }
    , {
        name: "Hospital", id: 7, icon: <FaHospital />, image: hospital, bgcolor: "rgb(210, 103, 9)", iconColor: "white/90", units: [
            { id: 701, coords: "", polygon: "1277,336,1297,336,1296,346,1278,348", area: "J.D. Memorial Hospital",cx:11,cy:18 },
            { id: 702, coords: "", polygon: "1261,359,1281,359,1280,369,1262,371", area: "S.S Hospital",cx:11,cy:15 },
            { id: 703, coords: "", polygon: "1199,480,1219,480,1218,490,1200,492", area: "Aasha Multi Speciality Hospital ",cx:14,cy:18 },
            { id: 704, coords: "", polygon: "630,377,647,377,647,393,630,393", area: "Batheny Hospital",cx:14,cy:15 },
            { id: 705, coords: "", polygon: "975,280,995,280,994,290,976,292", area: "Hiranandani Hospital" ,cx:14,cy:18},
            { id: 706, coords: "", polygon: "1211,462,1231,462,1230,472,1212,474", area: "Sai Krishna Hospital",cx:12,cy:18 },
            { id: 707, coords: "", polygon: "668,500,688,500,688,520,668,520", area: "Jupitar Hospital",cx:16,cy:14 }

        ]
    }

    , {
        name: "Recreation", id: 7, icon: < FaTree />, image: park, bgcolor: "rgb(117, 135, 54)", iconColor: "white/90", units: [
            { id: 801, coords: "", polygon: "925,436,945,436,944,446,926,448", area: "NAMO Grand Central Park",cx:12,cy:16 },
            { id: 802, coords: "", polygon: "875,119,888,116,891,130,875,132", area: "Suraj water Park",cx:12,cy:18 },
            { id: 803, coords: "", polygon: "739,220,752,217,755,231,739,233", area: "Tikuji-ni-wadi",cx:12,cy:15 },


        ]
    }

]
