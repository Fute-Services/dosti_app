import { useState, useMemo, useEffect, type ReactNode } from "react";
import { FaHome, FaRoad, FaRegHeart, FaExpandArrowsAlt } from "react-icons/fa";
// import proposed from '../assets_vedio/map_for+animation_04_proposed.mp4';
// import proposed from '../assets/locationvedio/map_for animation_Upcoming Infrastructure.mp4';
// import under from '../assets_vedio/map_for+animation_04_under+construction.mp4';
import showAll from '../assets/Location1/map_for animation_All.png';

import LocationBackButton from "../components/LocationBackButton";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { categories } from "../Data/LocationData";
import { videos } from "../media";

// --- Helper: Calculate Polygon Center ---
const getPolygonCenter = (polygonStr: string | undefined, coordsStr: string | undefined) => {
    if (coordsStr) {
        const [x, y] = coordsStr.split(",").map(Number);
        return { cx: x, cy: y };
    }
    if (polygonStr) {
        const points = polygonStr.split(",").map(Number);
        const xs = points.filter((_, i) => i % 2 === 0);
        const ys = points.filter((_, i) => i % 2 === 1);
        return {
            cx: (Math.min(...xs) + Math.max(...xs)) / 2,
            cy: (Math.min(...ys) + Math.max(...ys)) / 2
        };
    }
    return { cx: 0, cy: 0 };
};

export default function LocationPage1() {
    // const videoRef = useRef<HTMLVideoElement>(null);
    const [isFav, setIsFav] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState("Neighbourhood");
    const [filterCategory, setFilterCategory] = useState<string | null>(null);
    // const [videoState, setVideoState] = useState({ muted: false, paused: false });

    // --- Memoized Filtered List ---
    // const filteredCategories = useMemo(() => {
    //     if (!filterCategory) return categories;
    //     return categories.filter(cat => cat.name === filterCategory);
    // }, [filterCategory]);


    // Maps are preloaded on the home screen, so filters switch instantly.
    const isLoading = false;

    // Keep the expand button in sync when full screen is left with Esc.
    useEffect(() => {
        const sync = () => setIsExpanded(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", sync);
        return () => document.removeEventListener("fullscreenchange", sync);
    }, []);

    // Your existing memoized list
    const filteredCategories = useMemo(() => {
        if (!filterCategory) return categories;
        return categories.filter(cat => cat.name === filterCategory);
    }, [filterCategory]);
    // --- Video Handlers ---
    // const toggleMute = () => {
    //     if (videoRef.current) {
    //         videoRef.current.muted = !videoRef.current.muted;
    //         setVideoState(prev => ({ ...prev, muted: videoRef.current!.muted }));
    //     }
    // };

    // const togglePlay = () => {
    //     if (videoRef.current) {
    //         videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    //         setVideoState(prev => ({ ...prev, paused: videoRef.current!.paused }));
    //     }
    // };

    const handleExpand = () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
    };
    return (
        <div className="w-full h-screen bg-[#FDFBF9] relative overflow-hidden font-sans">
            <LocationBackButton />

            {/* Main Content Area */}
            <BackgroundWrapper>
                <div className="relative w-full h-full flex justify-center items-center p-2 md:p-4">

                    {activeCategory === "Neighbourhood" && (
                        <div className={`relative w-full max-w-5xl 

        aspect-video max-md:h-[260px]

        bg-white rounded-lg shadow-2xl
        overflow-hidden border border-gray-100 
        ${isLoading ? "blink-effect" : ""}`}>

                            {isLoading && (
                                <div className="absolute inset-0 z-10 bg-gray-200 flex items-center justify-center">
                                    <div className="text-gray-400 animate-pulse">Loading Map...</div>
                                </div>
                            )}

                            <svg
                                viewBox="0 0 1500 843"
                                className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                                    }`}
                                preserveAspectRatio="xMidYMid meet"
                            >

                                <image
                                    width="1500"
                                    height="843"
                                    className="opacity-90 transition-opacity duration-700"
                                    href={
                                        filterCategory
                                            ? categories.find(cat => cat.name === filterCategory)?.image || showAll
                                            : showAll
                                    }
                                />

                                {filteredCategories.map((cat) => (
                                    cat.units?.map((unit) => {
                                        const { cx, cy } = getPolygonCenter(unit.polygon, unit.coords);
                                        const isActive = selectedId === unit.id || hoveredId === unit.id;

                                        return (
                                            <g key={`${cat.id}-${unit.id}`} className="cursor-pointer">
                                                {unit.polygon && (
                                                    <polygon
                                                        points={unit.polygon}
                                                        fill={isActive ? `${cat.bgcolor}33` : "transparent"}
                                                        className="transition-all duration-300"
                                                        onMouseEnter={() => setHoveredId(unit.id)}
                                                        onMouseLeave={() => setHoveredId(null)}
                                                        onClick={() => setSelectedId(unit.id)}
                                                    />
                                                )}
                                                <foreignObject x={cx - unit.cx} y={cy - unit.cy} width={25} height={25}>
                                                    <div
                                                        className={`w-full h-full flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100'
                                                            }`}
                                                        style={{ backgroundColor: cat.bgcolor, color: 'white' }}
                                                    >
                                                        <span className="text-sm">{cat.icon}</span>
                                                    </div>
                                                </foreignObject>
                                            </g>
                                        );
                                    })
                                ))}
                            </svg>

                            {/* LEGENDS */}
                            <div className="
                absolute z-50

                top-4 left-0 lg:left-4
                max-md:top-0 max-md:left-0

                w-auto lg:w-48 md:w-[120px]

                bg-white/90 backdrop-blur-md
                rounded-xl shadow-xl border border-gray-200

                p-1 max-md:p-2
            ">

                                <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">
                                    Legends
                                </h3>

                                <div className="space-y-1 max-md:space-y-[2px]">
                                    <button
                                        onClick={() => setFilterCategory(null)}
                                        className={`w-full text-left px-1 md:px-2 py-1.5 
                            max-md:py-0 rounded-lg 
                        text-[9px] md:text-[10px] transition-colors ${!filterCategory
                                                ? 'bg-gray-100 text-black/70'
                                                : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        All Infrastructure
                                    </button>

                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setFilterCategory(cat.name)}
                                            className={`w-full flex items-center gap-2 
                                max-md:gap-1.5 px-1 md:px-2 py-0 rounded-lg 
                            text-[6px] md:text-[10px] transition-colors ${filterCategory === cat.name
                                                    ? 'bg-gray-200 font-semibold'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <span style={{ color: cat.bgcolor }}>
                                                {cat.icon}
                                            </span>
                                            <span className="truncate">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 
    {(activeCategory === "Proposed Infrastructure" || activeCategory === "Under Construction Infrastructure") && (
        <video
            ref={videoRef}
            src={activeCategory === "Proposed Infrastructure" ? proposed : under}
            className="w-[90%] h-[90%] object-contain rounded-2xl"
            autoPlay
            muted={videoState.muted}
        />
       
    )} */}

                    {(activeCategory === "Proposed Infrastructure" ||
                        activeCategory === "Under Construction Infrastructure") && (
                            <video
                                src={videos.infrastructure}
                                autoPlay
                                muted
                                loop
                                controls
                                playsInline
                                className="w-[90%] h-[90%] rounded-2xl object-contain bg-black"
                                title="Infrastructure Animation"
                            />
                        )}

                </div>
            </BackgroundWrapper>

            {/* Top Right Actions */}
            <div className="absolute top-[13%] right-8 z-[2000] flex gap-3">
                <ActionButton onClick={() => setIsFav(!isFav)} active={isFav} activeClass="bg-red-500 text-white"><FaRegHeart /></ActionButton>
                <ActionButton onClick={handleExpand} active={isExpanded} activeClass="bg-white text-black"><FaExpandArrowsAlt /></ActionButton>
            </div>


            {/* Bottom Navigation (Main Tabs) */}
            <div className="absolute bottom-[11%] lg:bottom-1 left-1/2 -translate-x-1/2 z-[1000] flex gap-4 
            bg-white/10 backdrop-blur-lg  px-1 py-0 lg:px-2 lg:py-1 rounded-full border border-white/30 shadow-2xl">
                <NavTab active={activeCategory === "Neighbourhood"}
                    onClick={() => setActiveCategory("Neighbourhood")} icon={<FaHome />} label="Neighborhood" />
                <NavTab active={activeCategory === "Proposed Infrastructure"}
                    onClick={() => setActiveCategory("Proposed Infrastructure")} icon={<FaRoad />} label="Upcoming Infrastructure" />
                {/* <NavTab active={activeCategory === "Under Construction Infrastructure"} onClick={() => setActiveCategory("Under Construction Infrastructure")} icon={<FaTools />} label="Under Construction" /> */}
            </div>

            {/* Video Controls Overlay */}
            {/* {activeCategory !== "Neighbourhood" && (
                <div className="absolute bottom-10 right-10 z-[3000] flex gap-3">
                    <ControlButton onClick={toggleMute}>{videoState.muted ? <HiVolumeOff /> : <HiVolumeUp />}</ControlButton>
                    <ControlButton onClick={togglePlay}>{videoState.paused ? <FaPlay /> : <FaPause />}</ControlButton>
                    <ControlButton onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0 }}><FaRedo /></ControlButton>
                </div>
            )} */}
        </div>
    );
}

// --- Sub-Components for Cleanliness ---
interface ActionButtonProps { children: ReactNode; onClick: () => void; active?: boolean; activeClass?: string }
const ActionButton = ({ children, onClick, active = false, activeClass = "" }: ActionButtonProps) => (
    <button onClick={onClick} className={`p-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-110 ${active ? activeClass : 'bg-black/60 text-white hover:bg-black'}`}>
        {children}
    </button>
);

interface NavTabProps { active: boolean; onClick: () => void; icon: ReactNode; label: string }
const NavTab = ({ active, onClick, icon, label }: NavTabProps) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${active ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-100/80 hover:bg-white/40'}`}
    >
        {icon} <span className="text-[8px] lg:text-sm font-semibold">{label}</span>
    </button>
);

// const ControlButton = ({ children, onClick }: any) => (
//     <button onClick={onClick} className="p-2 bg-white/20 text-gray-300 rounded-full backdrop-blur-sm shadow-xl 
//     hover:bg-black hover:text-white transition-all border-[1px] border-solid border-gray-200/50 text-sm">
//         {children}
//     </button>
// );


