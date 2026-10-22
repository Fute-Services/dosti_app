import { useState } from "react";
// import pride from "../../assets/Inventory/building/PRIDE.webp";
// import charm from '../../assets/Inventory/building/CHARM_Building1.jpg';
// import seren from '../../assets/Inventory/building/SEREN_Building1.jpg'
import BuildingBack from "../../components/BuildingBack";
import BuildingHeader from "../../components/BuildingHeader";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from "react-router-dom";
import { buildingData } from '../../Data/BuildingData'
export default function BuildingPage() {
    const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
    const navigate = useNavigate();
    // 2. Get the ID from the URL

    const { id } = useParams<{ id: string }>();


    // Find the building by looking into the buildings array of each cluster
    const building = buildingData
        .flatMap(cluster => cluster?.buildings)
        .find(b => b.id === Number(id));

    if (!building) {
        return <div className="p-20 text-center">Building with ID {id} not found.</div>;
    }
    // Shortcut to the floor data for easier mapping
    // const floorList = building.buildingData.Floors;
    // console.log("FloorData", building)
    return (
        <div
            className="h-screen   w-full flex items-center
             justify-center bg-cover bg-center overflow-hidden  relative 
             bg-black/15"
        // style={{ backgroundImage: `url(${bgImage})` }}
        >
            <BuildingBack />
            <BuildingHeader />
            {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div> */}
            {/*  <img src={bgImage} alt="Serene Building" className="absolute m-5
        inset-0 w-full h-full object-contain " /> */}

            <div className='relative h-full w-full bg-black overflow-hidden bg-black/25'>
                <svg
                    viewBox={building?.buildingData.viewBox}
                    // viewBox="0 0 10417 5861"
                    className="md:w-full md:h-full h-[55%] w-full mt-[25%] md:mt-0"
                    preserveAspectRatio="none"
                >
                    <image
                        href={building?.buildingData.image} width={building?.buildingData.imageHeight}
                        height={building?.buildingData.imageWidth} />
                    {/* <image 
                    href={charm} width="10417" height="5861"  /> */}
                    {/* <image 
                    href={seren} width="10417" height="5861"  /> */}

                    {/* 1. CLUSTER POLYGONS (Only visible when "Show All" is OFF)   */}
                    {building?.buildingData?.Floors?.map((floor) => (
                        <Tooltip
                            key={floor.id}
                            title={floor.name}
                            placement="right"
                            arrow
                            // --- ADD THESE PROPS FOR TABLETS ---
                            enterTouchDelay={0}
                            leaveTouchDelay={2500} // Keeps it open long enough to read after a tap
                            open={hoveredFloor === floor.id} // Control it manually since you already have the state
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        background: "rgba(255, 255, 255, 0.15)",
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(5px)",
                                        color: "rgba(16,13,13,0.8);",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        padding: "8px 12px",
                                        borderRadius: "10px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: "rgba(255, 255, 255, 0.25)",
                                    },
                                },
                            }}
                        >
                            <g>
                                <polygon
                                    points={floor.polygon}
                                    fill={
                                        hoveredFloor === floor.id
                                            ? "rgba(255,112,67,0.6)"
                                            : "transparent"
                                    }
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                    onMouseEnter={() => setHoveredFloor(floor.id)}
                                    onMouseLeave={() => setHoveredFloor(null)}
                                    onTouchStart={() => setHoveredFloor(floor.id)}
                                    // onClick={()=>navigate(`/floorplan/${floor.id}`)}
                                    onClick={() => {
  if (!("isRefuge" in floor && floor.isRefuge)) {
    navigate(`/floorplan/${building.title1}`);
  }
}}
                                />
                            </g>
                        </Tooltip>
                    ))}
                </svg>

                {/* 2. BUILDING ICONS & STICKY TOOLTIPS 
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
                                                // componentsProps={{ tooltip: tooltipStyles }}
                                            >
                                                <div
                                                    // onMouseEnter={() => setHoveredFloor(b.id)}
                                                    // onMouseLeave={() => setHoveredFloor(null)}
                                                    // onClick={() => {
                                                    //     setActiveTooltip(isClicked ? null : b.id);
                                                    //     setShowAll(false);
                                                    // }}
                                                    // onTouchStart={() => setHoveredFloor(b.id)}
                                                    // onDoubleClick={() => navigate(`/floorplan/${b.id}`)}
                                                    className={`cursor-pointer flex items-center justify-center rounded-full
                                                       ${isHovered ? "w-12 h-12 " : "w-10 h-10"} bg-white/70 hover:bg-white
                                                          shadow-lg border border-white/50 transition-all`}
                                                >
                                                    {/* <FaBuilding
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

                {/* SIDEBAR 
                <div className="absolute right-1 lg:right-6 lg:top-[30%] md:top-[32%] top-[70%] 
                    -translate-y-[20%] flex flex-row md:flex-col gap-1 max-h-[20vh] md:max-h-[67vh] lg:max-h-[80vh] overflow-x-scroll lg:overflow-y-scroll custom-scroll-glass px-1">

                    {/* TOOLBAR 
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
                            border-white/20 p-1 lg:p-4 rounded-xl shadow-2xl w-full h-full lg:w-54">
                            <h2 className="text-white font-bold mb-3 text-[11px] md:text-[12px] lg:text-sm tracking-wide uppercase opacity-70">
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
                                            onDoubleClick={() => navigate(`/floorplan/${item.id}`)}
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
                </div>*/}

            </div>

        </div>
    );
}
