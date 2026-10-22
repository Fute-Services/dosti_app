import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Data } from '../../Data/FloorPlanData';
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { GrZoomIn } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';

interface Room {
    id: number;
    name: string;
    size: string;
    polygon: string;
}

// Define the props for the Room Dropdown
interface RoomDropdownProps {
    rooms: Room[];
    onRoomHover: (id: number | null) => void;
    unitName:string;
}

const RoomDropdown: React.FC<RoomDropdownProps> = ({ rooms, onRoomHover, unitName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left w-[60%] md:w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="bg-[rgb(248,186,186)] border-2 text-[10px] lg:text-[15px] uppercase 
                border-black/80 flex gap-2 text-medium rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] justify-center font-medium items-center text-center text-black/80 w-full"
            >
                {unitName}  <IoIosArrowDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-full md:min-w-[100px] lg:min-w-[200px] bg-white 
                rounded-xl shadow-xl border border-gray-200 z-50 max-h-24 md:max-h-60  overflow-y-auto">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="block w-full text-left px-4 py-2 text-[9px] lg:text-[13.5px] hover:bg-gray-100 transition-colors cursor-pointer text-gray-700 border-b last:border-b-0 border-gray-100"
                            onMouseEnter={() => onRoomHover(room.id)}
                            onMouseLeave={() => onRoomHover(null)}
                        >
                            <div className="font-bold text-black/80">{room.name}</div>
                            <div className="text-xs text-gray-500">{room.size}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function UnitPlanPage() {
    const navigate = useNavigate();
    const { unitId } = useParams<{ unitId: string }>();
    const [searchParams] = useSearchParams();
    const [zoom, setZoom] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastTouchDistance = useRef<number | null>(null);
    const [scale, setScale] = useState(1);
    const [origin, setOrigin] = useState("50% 50%");
    const [hoverId, setHoverId] = useState<number | null>(null);


    // Unit ids repeat across plans (Serene A and C both use 1301-1312),
    // so look in the plan we came from first.
    const planSlug = searchParams.get("plan");
    const unitData =
        Data.find(item => item.title === planSlug)?.units.find(unit => unit.unitId === Number(unitId)) ??
        Data.flatMap(item => item.units).find(unit => unit.unitId === Number(unitId));

    if (!unitData) return <div className="flex items-center justify-center h-screen">Unit not found</div>;
    const details = unitData as unknown as { rooms?: Room[]; widthx?: number; heighty?: number };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${x}% ${y}%`);

        setScale((prev) =>
            Math.min(4, Math.max(1, prev - e.deltaY * 0.001))
        );
    };
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastTouchDistance.current = Math.hypot(dx, dy);
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length !== 2 || !lastTouchDistance.current) return;

        e.preventDefault();

        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.hypot(dx, dy);

        const zoomFactor = distance / lastTouchDistance.current;
        lastTouchDistance.current = distance;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX =
            (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY =
            (e.touches[0].clientY + e.touches[1].clientY) / 2;

        const x = ((centerX - rect.left) / rect.width) * 100;
        const y = ((centerY - rect.top) / rect.height) * 100;

        setOrigin(`${x}% ${y}%`);

        setScale((prev) =>
            Math.min(4, Math.max(1, prev * zoomFactor))
        );
    };

    const handleTouchEnd = () => {
        lastTouchDistance.current = null;
    };

    return (
        <>
            <div className="w-screen h-screen relative overflow-hidden bg-white">

                {/* Dropdown */}
                {details.rooms && (
                    <div className='w-[40%] md:w-[8%]  lg:w-[9%] absolute
                     flex flex-col h-auto md:h-screen justify-start right-[5%] md:right-10
                     lg:right-[6%] top-[7%] md:top-[40%]
                      lg:top-[34%] z-50'>
                        <RoomDropdown
                            unitName={unitData.unitName}
                            rooms={details.rooms}
                            onRoomHover={setHoverId}
                        />
                    </div>
                )}

                {/* Main Image */}
                <div className="absolute inset-0 flex justify-center items-center" >
                    <svg
                        viewBox={`0 0 ${details.widthx || 800} ${details.heighty || 600}`}
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <image
                            href={unitData.unitImage}
                            width={details.widthx || 800}
                            height={details.heighty || 600}
                        />
                        {details.rooms?.map((room: Room) => (
                            <Tooltip
                                key={room.id}
                                title={`${room.name} - ${room.size}`}
                                arrow
                                placement="top"
                            >
                                <polygon
                                    points={room.polygon}
                                    fill={hoverId === room.id ? "rgba(255,112,67,0.5)" : "transparent"}
                                    style={{ cursor: "pointer" }}
                                    onMouseEnter={() => setHoverId(room.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                />
                            </Tooltip>
                        ))}
                    </svg>
                </div>

                {/* Side Buttons */}
                <div className='absolute left-4 top-4 md:left-auto md:right-5 md:top-10 flex flex-row md:flex-col gap-3 md:gap-5 z-50'>
                    <button
                        onClick={() => navigate(-1)}
                        className='bg-white/70 border border-gray-300 items-center rounded-md shadow-md flex p-2 justify-center hover:bg-white transition'
                    >
                        <IoArrowBack size={20} className="md:w-[17px] md:h-[17px] lg:w-[25px] lg:h-[25px]" />
                    </button>
                    <button
                        onClick={() => setZoom(true)}
                        className='bg-white/70 shadow-md border border-gray-300 items-center rounded-md flex p-2 justify-center hover:bg-white transition'
                    >
                        <GrZoomIn size={20} className="md:w-[17px] md:h-[17px] lg:w-[25px] lg:h-[25px]" />
                    </button>
                </div>
            </div>

            {zoom && (
                <div
                    className="fixed inset-0 z-[5000] bg-white/20 backdrop-blur-xl p-5 flex justify-center items-center"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => { setZoom(false); setScale(1); }}
                        className="absolute top-4 right-4 bg-black/20 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 transition shadow-lg"
                    >
                        <AiOutlineClose size={17} />
                    </button>

                    {/* Zoomed Image */}
                    <div
                        ref={containerRef}
                        className="w-full h-full overflow-hidden touch-none flex items-center justify-center"
                        onWheel={handleWheel}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {unitData?.unitImage ? (
                            <img
                                src={unitData.unitImage}
                                alt="Zoomable"
                                draggable={false}
                                style={{
                                    transform: `scale(${scale})`,
                                    transformOrigin: origin,
                                    transition: "transform 0.1s ease-out",
                                    cursor: scale > 1 ? 'grab' : 'default'
                                }}
                                className="max-w-full max-h-full object-contain select-none"
                            />
                        ) : (
                            <p className="text-center text-gray-500">No image available</p>
                        )}
                    </div>

                </div>
            )}
        </>
    );
}