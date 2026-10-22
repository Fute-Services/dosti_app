import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBuilding, FaEye, FaEyeSlash } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';

// Import your assets
import bgImage from '../assets/Inventory/projectdetails4.jpg';
import { buildingData } from '../Data/BuildingData';
export default function InventoryPage() {
    const navigate = useNavigate();
    const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(true);

    // const buildingData = [
    //     {
    //         id: 10001,
    //         name: "Sector 3A-Cluster 2",
    //         polygon: "1915,258,1904,309,1888,336,1843,334,1774,311,1683,293,1601,275,1537,268,1521,243,1596,209,1637,195,1674,195",
    //         buildings: [
    //             {
    //                 id: 1, title: "Pride A",
    //                 polygon1: "1676,186,1660,245,1681,250,1701,195",
    //                 hoverColor: "rgba(255,112,67,0.6)",

    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             {
    //                 id: 2, title: "Pride B", polygon1: "1721,211,1712,254,1733,259,1747,216",
    //                 hoverColor: "rgba(255,112,67,0.6)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },

    //             },
    //             {
    //                 id: 3, title: "Pride C", polygon1: "1788,241,1810,247,1801,277,1781,279",
    //                 hoverColor: "rgba(255,112,67,0.6)",
    //                 buildingData: {
    //                     tower: "Pride-C", hoverColor: " rgba(16,147,235,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "443,684,805,686,805,671,444,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "443,668,805,670,805,655,444,653", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "443,645,805,647,805,632,444,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "444,623,806,625,806,610,445,608", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "445,603,807,605,807,590,446,588", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "444,587,806,589,806,574,445,572", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "445,564,807,566,807,551,446,549", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "445,547,807,549,807,534,446,532", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "441,527,803,529,803,514,442,512", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "441,508,803,510,803,495,442,493", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "441,488,803,490,803,475,442,473", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "442,469,804,471,804,456,443,454", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "438,449,800,451,800,436,439,434", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "438,429,800,431,800,416,439,414", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "438,408,800,410,800,395,439,393", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "441,389,803,391,803,376,442,374", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "440,367,802,369,802,354,441,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "440,350,802,352,802,337,441,335", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "440,330,802,332,802,317,441,315", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "441,313,803,315,803,300,442,298", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "440,291,802,293,802,278,441,276", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "439,270,801,272,801,257,440,255", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "439,251,801,253,801,238,440,236", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "443,230,805,232,805,217,444,215", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "440,211,802,213,802,198,441,196", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "440,191,802,193,802,178,441,176", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "440,173,802,175,802,160,441,158", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "440,157,802,159,802,144,441,142", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "441,132,803,134,803,119,442,117", toolitpName: "",

    //                         },
    //                     ]
    //                 }
    //             },
    //             {
    //                 id: 4, title: "Pride D",
    //                 polygon1: "1860,252,1848,312,1869,317,1883,261",
    //                 hoverColor: "rgba(255,112,67,0.6)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             {
    //                 id: 5, title: "Charm A", polygon1: "1753,273,1737,293,1776,309,1792,286",
    //                 hoverColor: "rgba(255,112,67,0.4)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             {
    //                 id: 6, title: "Charm B", polygon1: "1681,254,1665,274,1704,290,1720,267",
    //                 hoverColor: "rgba(255,112,67,0.5)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             {
    //                 id: 7, title: "Charm C", polygon1: "1621,243,1605,263,1644,279,1660,256",
    //                 hoverColor: "rgba(255,112,67,0.4)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             // { id: 8, title: "Grace A", polygon1: "1585,204,1569,224,1608,240,1624,217", hoverColor: "rgba(255,112,67,0.4)" },
    //             // { id: 9, title: "Grace B", polygon1: "1542,226,1526,246,1565,262,1581,239", hoverColor: "rgba(255,112,67,0.4)" },
    //         ]
    //     },
    //     {
    //         id: 10002,
    //         name: "Sector 3A-Cluster 1B",
    //         polygon: "1685,181,1810,168,1942,186,1924,243",
    //         buildings: [
    //             // { id: 10, title: "Dazzle A", polygon1: "1904,156,1888,190,1923,202,1945,168", hoverColor: "rgba(255,112,67,0.4)" },
    //             // { id: 11, title: "Dazzle B", polygon1: "1837,168,1830,188,1857,188,1871,174", hoverColor: "rgba(255,112,67,0.4)" },
    //             // { id: 12, title: "Zion", polygon1: "1916,200,1900,220,1939,236,1955,213", hoverColor: "rgba(255,112,67,0.4)" },
    //             {
    //                 id: 13, title: "Serene A",
    //                 polygon1: "1872,224,1856,244,1895,260,1911,237",
    //                 hoverColor: "rgba(255,112,67,0.4)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //             // { id: 14, title: "Serene B", polygon1: "1797,203,1781,223,1820,239,1836,216", hoverColor: "rgba(255,112,67,0.4)" },
    //             {
    //                 id: 15, title: "Serene C",
    //                 polygon1: "1744,189,1728,209,1767,225,1783,202",
    //                 hoverColor: "rgba(255,112,67,0.4)",
    //                 buildingData: {
    //                     tower: "Pride-D", hoverColor: " rgba(255,112,67,0.6)",
    //                     Floors: [
    //                         {
    //                             id: 1, name: "Floor-1", polygon: "85,669,84,690,445,686,443,669", toolitpName: "",

    //                         },
    //                         {
    //                             id: 2, name: "Floor-2", polygon: "80,649,79,670,440,666,441,650", toolitpName: "",

    //                         },

    //                         {
    //                             id: 3, name: "Floor-3", polygon: "83,630,83,650,445,649,443,630", toolitpName: "",

    //                         },
    //                         {
    //                             id: 4, name: "Floor-4", polygon: "82,611,82,631,443,630,442,611", toolitpName: "",

    //                         },
    //                         {
    //                             id: 5, name: "Floor-5", polygon: "84,589,84,609,445,608,444,589", toolitpName: "",

    //                         },
    //                         {
    //                             id: 6, name: "Floor-6", polygon: "86,569,86,589,447,588,446,569", toolitpName: "",

    //                         },
    //                         {
    //                             id: 7, name: "Floor-7", polygon: "84,550,84,570,445,569,444,550", toolitpName: "",

    //                         },
    //                         {
    //                             id: 8, name: "Floor-8", polygon: "83,531,83,551,444,550,443,531", toolitpName: "",

    //                         },
    //                         {
    //                             id: 9, name: "Floor-9", polygon: "86,510,86,530,447,529,446,510", toolitpName: "",

    //                         },
    //                         {
    //                             id: 10, name: "Floor-10", polygon: "83,491,83,511,444,510,443,491", toolitpName: "",

    //                         },
    //                         {
    //                             id: 11, name: "Floor-11", polygon: "85,470,85,490,446,489,445,470", toolitpName: "",

    //                         },
    //                         {
    //                             id: 12, name: "Floor-12", polygon: "84,452,84,472,445,471,444,452", toolitpName: "",

    //                         },
    //                         {
    //                             id: 13, name: "Floor-13", polygon: "84,429,84,449,445,448,444,429", toolitpName: "",

    //                         },
    //                         {
    //                             id: 14, name: "Floor-14", polygon: "83,410,83,430,444,429,443,410", toolitpName: "",

    //                         },
    //                         {
    //                             id: 15, name: "Floor-15", polygon: "83,390,83,410,444,409,443,390", toolitpName: "",

    //                         },
    //                         {
    //                             id: 16, name: "Floor-16", polygon: "83,372,83,392,444,391,443,372", toolitpName: "",

    //                         },
    //                         {
    //                             id: 17, name: "Floor-17", polygon: "82,352,82,372,443,371,442,352", toolitpName: "",

    //                         },
    //                         {
    //                             id: 18, name: "Floor-18", polygon: "82,332,82,352,443,351,442,332", toolitpName: "",

    //                         },
    //                         {
    //                             id: 19, name: "Floor-19", polygon: "82,311,82,331,443,330,442,311", toolitpName: "",

    //                         },
    //                         {
    //                             id: 20, name: "Floor-20", polygon: "82,293,82,313,443,312,442,293", toolitpName: "",

    //                         },
    //                         {
    //                             id: 21, name: "Floor-21", polygon: "82,271,82,291,443,290,442,271", toolitpName: "",

    //                         },
    //                         {
    //                             id: 22, name: "Floor-22", polygon: "83,253,83,273,444,272,443,253", toolitpName: "",

    //                         },
    //                         {
    //                             id: 23, name: "Floor-23", polygon: "83,233,83,253,444,252,443,233", toolitpName: "",

    //                         },
    //                         {
    //                             id: 24, name: "Floor-24", polygon: "83,213,83,233,444,232,443,213", toolitpName: "",

    //                         },

    //                         {
    //                             id: 25, name: "Floor-25", polygon: "83,193,83,213,444,212,443,193", toolitpName: "",

    //                         },

    //                         {
    //                             id: 26, name: "Floor-26", polygon: "83,173,83,193,444,192,443,173", toolitpName: "",

    //                         },

    //                         {
    //                             id: 27, name: "Floor-27", polygon: "83,153,83,173,444,172,443,153", toolitpName: "",

    //                         },

    //                         {
    //                             id: 28, name: "Floor-28", polygon: "83,134,83,154,444,153,443,134", toolitpName: "",

    //                         },
    //                         {
    //                             id: 29, name: "Floor-29", polygon: "84,112,84,132,445,131,444,112", toolitpName: "",

    //                         },
    //                     ]
    //                 },
    //             },
    //         ]
    //     }
    // ];

    const getPolygonCenter = (points: string) => {
        if (!points) return { x: 0, y: 0 };
        const coords = points.split(",").map(Number);
        let x = 0, y = 0;
        const total = coords.length / 2;
        for (let i = 0; i < coords.length; i += 2) {
            x += coords[i];
            y += coords[i + 1];
        }
        return { x: x / total, y: y / total };
    };

    const tooltipStyles = {
        sx: {
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }
    };



    return (
        <div className='relative h-screen w-screen bg-black overflow-hidden bg-black/25'>
            <svg
                viewBox='0 0 2580 1440'
                className="md:w-full md:h-full h-[55%] w-full mt-[25%] md:mt-0"
                preserveAspectRatio="none"
            >
                <image href={bgImage} width="2580" height="1440" />

                {/* 1. CLUSTER POLYGONS (Only visible when "Show All" is OFF) */}
                {!showAll && buildingData.map((cluster) => (
                    <Tooltip
                        key={cluster.id}
                        title={cluster.name}
                        placement="right"
                        open={hoveredFloor === cluster.id}
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    background: "rgba(255, 255, 255, 0.15)",   // glass white layer
                                    backdropFilter: "blur(10px)",               // glass blur
                                    WebkitBackdropFilter: "blur(5px)",         // Safari support
                                    color: "#fff",
                                    fontSize: "12px",
                                    padding: "8px 12px",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)", // soft glass border
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",   // depth
                                },
                            },
                            arrow: {
                                sx: {
                                    color: "rgba(255, 255, 255, 0.25)",          // arrow color matches glass
                                    backdropFilter: "blur(10px)",
                                },
                            },
                        }}
                    >
                        <polygon
                            key={cluster.id}
                            points={cluster.polygon}
                            fill={hoveredFloor === cluster.id ? "rgba(255,112,67,0.3)" : "transparent"}
                            style={{ cursor: "pointer", transition: "all 0.3s" }}
                            onMouseEnter={() => setHoveredFloor(cluster.id)}
                            onMouseLeave={() => setHoveredFloor(null)}
                            onTouchStart={() => setHoveredFloor(cluster.id)}
                            onTouchEnd={() => setHoveredFloor(cluster.id)}
                        /></Tooltip>
                ))}

                {/* 2. BUILDING ICONS & STICKY TOOLTIPS */}
                {buildingData.map((cluster) =>
                    cluster.buildings.map((b) => {
                        const iconPos = getPolygonCenter(b.polygon1);
                        const isHovered = hoveredFloor === b.id;
                        const isClicked = activeTooltip === b.id;
                        const shouldShowIcon = showAll || isHovered || isClicked;

                        return (
                            <g key={b.id}>
                                {shouldShowIcon && (
                                    <foreignObject
                                        x={iconPos.x - 20}
                                        y={iconPos.y - 50}
                                        width="40"
                                        height="40"
                                        style={{ overflow: 'visible' }}
                                    >
                                        <Tooltip
                                            title={b.title}
                                            placement="top"
                                            open={isHovered || isClicked} // Controls sticky behavior
                                            componentsProps={{ tooltip: tooltipStyles }}
                                        >
                                            <div
                                                onMouseEnter={() => setHoveredFloor(b.id)}
                                                onMouseLeave={() => setHoveredFloor(null)}
                                                // onClick={() => {
                                                //     setActiveTooltip(isClicked ? null : b.id);
                                                //     setShowAll(false);
                                                // }}
                                                onTouchStart={() => setHoveredFloor(b.id)}
                                                // onDoubleClick={() => navigate(`/building/${b.id}`)}

                                                onClick={() => {
                                                    // Only navigate if the ID is 1, 2, 3, or 4
                                                    // if (b.id >= 1 && b.id <= 4) {
                                                    navigate(`/building/${b.id}`);
                                                    // } else {
                                                    // console.log("Details not available for this building yet.");
                                                    // Optional: show a toast notification or alert here
                                                    // }
                                                }}
                                                className={`cursor-pointer flex items-center justify-center rounded-full
                                               ${isHovered ? "w-12 h-12 " : "w-10 h-10"} bg-white/70 hover:bg-white
                                                  shadow-lg border border-white/50 transition-all`}
                                            >
                                                <FaBuilding
                                                    // If hovered or clicked, grow to 30, otherwise stay at 20
                                                    size={(isHovered || isClicked) ? 30 : 20}
                                                    color={isClicked ? "#c2410c" : "#58420a"} // Optional: slight color shift on click
                                                    className="transition-all duration-300"
                                                />
                                            </div>
                                        </Tooltip>
                                    </foreignObject>
                                )}
                            </g>
                        );
                    })
                )}
            </svg>

            {/* SIDEBAR */}
            <div className="absolute right-1 lg:right-6 lg:top-[30%] md:top-[28%] top-[70%] 
            -translate-y-[20%] flex flex-row md:flex-col gap-1 max-h-[20vh] md:max-h-[69vh] lg:max-h-[80vh] 
            overflow-x-scroll lg:overflow-y-scroll custom-scroll-glass px-1 md:w-[20%] lg:w-auto">

                {/* TOOLBAR */}
                <div className="flex gap-4 w-full p-1 items-center justify-center sticky top-0 bg-black/20 backdrop-blur-md z-10 rounded-lg">
                    <button
                        onClick={() => {
                            setShowAll(!showAll);
                            setActiveTooltip(null);
                        }}
                        className="flex items-center justify-center gap-3 w-full h-12 px-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all shadow-2xl"
                    >
                        <span className="flex-shrink-0 text-lg">
                            {showAll ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        <span className="text-[12px] md:text-[13px] lg:text-sm font-medium whitespace-nowrap">
                            {showAll ? "Hide All Markers" : "Show All Markers"}
                        </span>
                    </button>
                </div>

                {buildingData.map((cluster) => (
                    <div key={cluster.id} className="bg-white/10 backdrop-blur-xl border 
                    border-white/20 p-1 lg:p-4 rounded-xl shadow-2xl w-full h-full  lg:w-54">
                        <h2 className="text-white font-bold mb-3 text-[11px] md:text-[11px] lg:text-sm tracking-wide uppercase opacity-70">
                            {cluster.name}
                        </h2>
                        <ul className="space-y-1">
                            {cluster.buildings.map((item) => (
                                <li key={item.id}>
                                    <button
                                        // onClick={() => {
                                        //     setActiveTooltip(item.id);
                                        //     setShowAll(false);
                                        // }}
                                        // onDoubleClick={() => navigate(`/building/${item.id}`)}
                                        onClick={() => {
                                            // Only navigate if the ID is 1, 2, 3, or 4
                                            // if (item.id >= 1 && item.id <= 4) {
                                            navigate(`/building/${item.id}`);
                                            // } else {
                                            // console.log("Details not available for this building yet.");
                                            // Optional: show a toast notification or alert here
                                            // }
                                        }}
                                        onMouseEnter={() => setHoveredFloor(item.id)}
                                        onMouseLeave={() => setHoveredFloor(null)}
                                        onTouchStart={() => setHoveredFloor(item.id)}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 
                                            ${(hoveredFloor === item.id || activeTooltip === item.id) ? "bg-white/30 text-white" : "text-white/60 hover:bg-white/10"}`}
                                    >
                                        {item.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}