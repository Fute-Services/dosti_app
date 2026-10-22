import { useState } from "react";
import master_plan_1 from "../assets/master/masterplan1.png";
import master_plan_2 from "../assets/master/masterplan2.png";
// import gym from "../assets/Gallery/Gym.jpg";
import newLogo from '../assets/LogoNew/Dosti NEW Logo-01.png'
import { Link } from "react-router-dom";


export default function ImageToggleWithBlur() {
  const [mode, setMode] = useState<"master_plan_1" | "master_plan_2">(
    "master_plan_1"
  );

  const backgroundImage = mode === "master_plan_1" ? master_plan_1 : master_plan_2;

  // const bgimage = gym;

  const [hoveredAmenityId, setHoveredAmenityId] = useState<number | null>(null);

  // All amenities
  const amenitiesData = {
    amenities: [
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
    amenities1: [
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

  const currentAmenities =
    mode === "master_plan_1" ? amenitiesData.amenities : amenitiesData.amenities1;

  const uniqueAmenities = [...new Map(currentAmenities.map((a) => [a.id, a])).values()];

  const hoveredCoords =
    hoveredAmenityId !== null
      ? currentAmenities.filter((i) => i.id === hoveredAmenityId)
      : [];

  return (
    <div className=" w-screen h-screen overflow-y-auto md:overflow-hidden flex items-center select-none justify-center bg-[#E8E8E8]">
      {/* Background Blur */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center blur-3xl scale-110"
        style={{ backgroundImage: `url(${gym})` }}
      /> */}

      <div className="absolute top-4 left-0 w-full px-4 md:px-8 flex justify-between items-center z-10">
        <Link to="/"><img
          src={newLogo}
          // src="./logo.svg"
          className="w-[120px] h-[70px] object-contain"
        /></Link>

        <Link to="/"><img
          src="./Logofinal.png"
          className="w-[150px] h-[84px] object-contain rounded-2xl"
        /></Link>
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full h-screen gap-0 md:gap-6 justify-center items-center mt-[70%] md:mt-[2%] 
      lg:mt-[4%]">

        <div className="w-[9%] md:w-[17%] lg:w-[9%]"></div>
        {/* Image Section */}
        <div className=" w-full md:w-[90%] lg:w-[75%] h-full lg:h-[83%] flex items-center justify-center p-5 md:p-0 lg:p-20 ">
          {/* Fixed coordinate space */}
          <div className="relative w-full max-w-[1080px] max-h-[766px] aspect-[1080/766] ">

            <img
              src={backgroundImage}
              alt="Master Plan"
              useMap="#amenityMap"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />

            {/* SVG overlay must match EXACT size */}
            <svg
              viewBox="0 0 1080 766"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {hoveredCoords.map((item, i) => {
                const [x, y, r] = item.coords.split(",").map(Number);

                const isActive = hoveredAmenityId === item.id;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={r}
                    fill={isActive ? "rgba(239, 68, 68, 0.8)" : "rgba(255, 0, 0, 0.2)"}

                  //  on mobile and Tablet, make bigger radius for easier touch

                  // onTouchStart={
                  //   (e) => {
                  //     e.preventDefault();
                  //     setHoveredAmenityId(item.id === hoveredAmenityId ? null : item.id);
                  //   }}
                  // onClick={() => setHoveredAmenityId(item.id)}

                  />
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredCoords[0] && (
              <div
                className="absolute px-2 py-1 mb-7 text-[11px] lg:text-[14px] text-white bg-black/70 rounded-md backdrop-blur"
                style={{
                  // left: hoveredCoords[0].coords.split(",")[0] + "px",
                  // top: hoveredCoords[0].coords.split(",")[1] + "px",
                  left: `${Number(hoveredCoords[0].coords.split(",")[0]) / 1080 * 100}%`,
                  top: `${Number(hoveredCoords[0].coords.split(",")[1]) / 766 * 100}%`,
                  transform: "translate(-50%, -150%)",
                }}
              >
                {hoveredCoords[0].name}
                {/* Arrow for Tooltip */}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-black/70 rotate-45" />
              </div>

            )}

            {/* Image Map */}
            <map name="amenityMap">
              {currentAmenities.map((a, idx) => (
                <area
                  key={idx}
                  shape="circle"
                  coords={a.coords}
                  alt={a.name}
                // onMouseEnter={() => setHoveredAmenityId(a.id)}
                // onMouseLeave={() => setHoveredAmenityId(null)}
                />
              ))}
            </map>
          </div>
        </div>


        {/* Right Panel */}
        <div className=" w-[70%] md:w-[40%] lg:w-[30%] xl:w-[19%] h-[50%] md:h-[60%] lg:h-[70%] xl:h-[83%] flex flex-col gap-4 bg-white/50
           p-2 justify-start items-center">

          {/* Walkthrough */}
          <Link
            to="/walkthrough"
            className="w-full py-2 rounded-xl text-center font-semibold text-white 
            bg-gray-700/80 backdrop-blur-lg border border-white/30 text-[9px] lg:text-xs
            hover:bg-gray-900/90  transition-all duration-500 ease-in-out"
          >
            Walkthrough
          </Link>

          {/* Toggle Buttons */}
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setMode("master_plan_1")}
              className={`flex-1 py-1 lg:py-2 rounded-xl text-[8px] 
                lg:text-[10px] font-medium backdrop-blur-md border border-white/20 transition
                ${mode === "master_plan_1"
                  ? "bg-red-600/80 text-white"
                  : " hover:bg-gray-900/90  bg-gray-700/80 text-white "
                }`}
            >
              Sector 3A – Cluster 2
            </button>

            <button
              onClick={() => setMode("master_plan_2")}
              className={`flex-1  py-1 lg:py-2 rounded-xl text-[8px] lg:text-[10px] font-medium backdrop-blur-md border border-white/20 transition
                ${mode === "master_plan_2"
                  ? "bg-red-600/80 text-white"
                  : " hover:bg-gray-900/90  bg-gray-700/80 text-white "
                }`}
            >
              Sector 3A – Cluster 1B
            </button>
          </div>

          {/* Legend Box */}
          <div
            className="mb-20 md:mb-0
              flex-1 overflow-y-scroll
              bg-white/10 backdrop-blur-2xl
              border border-white/20
              rounded-2xl
              p-3 w-full h-auto
              shadow-xl
              thin-scrollbar 
            "
          >
            <h3 className="text-black font-semibold mb-2 text-sm">Legend</h3>

            <ul className="space-y-2">
              {uniqueAmenities.map((a) => (
                <li
                  key={a.id}
                  onMouseEnter={() => setHoveredAmenityId(a.id)}
                  onMouseLeave={() => setHoveredAmenityId(null)}
                  onTouchStart={() => setHoveredAmenityId(a.id)}
                  className={`
                    px-2 lg:px-3 py-2 rounded-xl text-[11px] lg:text-[13px]  cursor-pointer
                    backdrop-blur-md border border-white/10
                    transition-all text-black/90
                    ${hoveredAmenityId === a.id
                      ? "bg-red-500/80 shadow-md scale-105"
                      : "bg-white/10 hover:bg-white/20"
                    }
                  `}
                >
                  <span className="text-[10px] lg:text-[11px] opacity-70 mr-2 text-white py-1 px-2 bg-black/50 rounded-full">{a.id}</span>
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}