import { useCallback, useEffect, useState } from "react";

/* =======================
   IMAGE IMPORTS
======================= */

import Dininghall from "../assets/Gallery/Dosti.jpg";
import EntranceLobby from "../assets/Gallery/Dosti_greaterThane.jpg";
// import EntranceLobby2 from "../assets/Gallery/Road_cam.jpg";
import Kitchen from "../assets/Gallery/Retail_cam.jpg";
import MasterBathroom from "../assets/Gallery/Poolcam_DostiGreaterThane.jpg";
import Gym from "../assets/Gallery/OpenGym_Cam.jpg";
import Balcony from "../assets/Gallery/Lawn_cam.jpg";
import CrownShot from "../assets/Gallery/Lawn_cam1.jpg";
// import DroneSuperimpose from "../assets/Gallery/Lawn_cam2.jpg";
import BuildingImage from "../assets/Gallery/KIDS_front_cam.jpg";
// import Wormeye from "../assets/Gallery/KIds_side_cam.jpg";
import Enterancegate from "../assets/Gallery/Enterence_gate_cam.jpg";
import ElevationView from "../assets/Gallery/elevationcam_dostithane.jpg";
import DostiGreaterThaneShot from "../assets/Gallery/DOSTI_GREATER_THANE_shot.jpg";
import DostiGreaterThaneShot1 from "../assets/Gallery/DOSTI_GREATER_THANE_Shot1.jpg";
import DayRoad from "../assets/Gallery/Day_road_cam.jpg";
import BasketBall from "../assets/Gallery/basket_ball_court.jpg";
import CloseupLawn from "../assets/Gallery/CloseUp_Lawn_Cam.jpg";

// import image1 from "../assets/Gallery//BUILDING_CAM_UPDATE.jpg";
// import image2 from "../assets/Gallery/club_seperator.jpg";
// import image3 from "../assets/Gallery/Club_Cam.jpg";


//clubhouse amenities
import playroom from '../assets/Gallery/ClubhouseAmenities/playroom.jpg'
import dinning from '../assets/Gallery/ClubhouseAmenities/dinning.jpg'
import playroom2 from '../assets/Gallery/ClubhouseAmenities/playroom2.jpg'
import image1 from "../assets/Gallery//BUILDING_CAM_UPDATE.jpg";
import image2 from "../assets/Gallery/club_seperator.jpg";
import image3 from "../assets/Gallery/Club_Cam.jpg";
import image4 from '../assets/Gallery/ClubhouseAmenities/image4.jpg'
import image5 from '../assets/Gallery/ClubhouseAmenities/image5.jpg'
import image6 from '../assets/Gallery/ClubhouseAmenities/image6.jpg'
// import image7 from '../assets/Gallery/ClubhouseAmenities/image7.png'
import image8 from '../assets/Gallery/ClubhouseAmenities/image8.jpg'
import image9 from '../assets/Gallery/ClubhouseAmenities/image9.jpg'
import image10 from '../assets/Gallery/ClubhouseAmenities/image10.jpg'
import image11 from '../assets/Gallery/ClubhouseAmenities/image11.jpg'

/* =======================
   TYPES
======================= */

interface Slide {
    id: number;
    image: string;
    title: string;
}

type Category = "Aminities" | "Clubhouse";

/* =======================
   COMPONENT
======================= */

export default function Aminities() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [category, setCategory] = useState<Category>("Aminities");

    /* =======================
       SLIDES DATA
    ======================= */

    const aminitiesSlides: Slide[] = [
        // { id: 1, image: Dininghall, title: "Dining Hall" },
        { id: 2, image: Dininghall, title: 'Elevation View' },
        { id: 3, image: EntranceLobby, title: 'Walkway' },
        // { id: 4, image: EntranceLobby2, title: 'Elevation View' },
        { id: 5, image: Kitchen, title: 'Shopping Promenade' },
        // { id: 6, image: MasterBathroom, title: 'Swimming Pool' },
        { id: 7, image: Gym, title: 'Outdoor Gym' },
        { id: 8, image: Balcony, title: 'Open Lawn' },
        { id: 9, image: CrownShot, title: 'Multipurpose Lawn' },
        // { id: 10, image: DroneSuperimpose, title: 'Amenity View' },
        { id: 11, image: BuildingImage, title: 'Kids Play Area' },
        // { id: 12, image: Wormeye, title: 'Amenity View' },
        { id: 13, image: Enterancegate, title: 'Grand Entrance' },
        { id: 14, image: ElevationView, title: 'Elevation View' },
        { id: 15, image: DostiGreaterThaneShot, title: 'Multipurpose Sports Court' },
        { id: 16, image: DostiGreaterThaneShot1, title: 'Amenity View' },
        { id: 17, image: DayRoad, title: 'Elevation View' },
        { id: 18, image: BasketBall, title: 'Basketball court' },
        { id: 19, image: CloseupLawn, title: 'Amenity View' },

    ];

    const clubhouseSlides: Slide[] = [
        { id: 101, image: image1, title: "Clubhouse" },
        { id: 102, image: image2, title: "Dosti Club Novo" },
        { id: 103, image: image3, title: "Dosti Club Novo" },
        { id: 104, image: playroom, title: "Billiards" },
        { id: 105, image: dinning, title: "Restaurant" },
        { id: 106, image: playroom2, title: "Carrom & Cards Room" },
        { id: 107, image: image4, title: "Badminton Courts" },
        { id: 108, image: image5, title: "Table Tennis" },
        { id: 109, image: image6, title: "Gaming Room" },
        // { id: 110, image: image7, title: "Clubhouse" },
        { id: 111, image: image8, title: "Gymnasium" },
        { id: 112, image: image9, title: "Mini Theater" },
        { id: 113, image: image10, title: "Music Room " },
        { id: 114, image: image11, title: "Spa" },
         { id: 115, image: MasterBathroom, title: 'Swimming Pool' },
    ];

    const activeSlides =
        category === "Clubhouse" ? clubhouseSlides : aminitiesSlides;

    /* =======================
       NAVIGATION
    ======================= */

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, [activeSlides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide(
            (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
        );
    }, [activeSlides.length]);

    const selectCategory = (next: Category) => {
        setCategory(next);
        setCurrentSlide(0);
    };

    /* =======================
       KEYBOARD
    ======================= */
    const isPrevDisabled = currentSlide === 0;
    const isNextDisabled = currentSlide === activeSlides.length - 1;
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && !isNextDisabled) nextSlide();
            if (e.key === "ArrowLeft" && !isPrevDisabled) prevSlide();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [nextSlide, prevSlide, isNextDisabled, isPrevDisabled]);

    /* =======================
       TOUCH
    ======================= */

    useEffect(() => {
        let startX = 0;
        const start = (e: TouchEvent) => (startX = e.touches[0].screenX);
        const end = (e: TouchEvent) => {
            const diff = startX - e.changedTouches[0].screenX;
            if (diff > 50 && !isNextDisabled) nextSlide();
            if (diff < -50 && !isPrevDisabled) prevSlide();
        };
        document.addEventListener("touchstart", start);
        document.addEventListener("touchend", end);
        return () => {
            document.removeEventListener("touchstart", start);
            document.removeEventListener("touchend", end);
        };
    }, [nextSlide, prevSlide, isNextDisabled, isPrevDisabled]);

    /* =======================
       JSX
    ======================= */



    return (
        <div className="h-screen w-screen bg-black overflow-hidden 
        relative pointer-events-auto">


            {/* Background blur */}
            <div
                className="absolute inset-0 blur-2xl scale-110"
                style={{
                    backgroundImage: `url(${activeSlides[currentSlide]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Slide */}
            <div className="relative z-10 h-full flex items-center justify-center">

                <div
                    className="lg:w-[90%] w-[90%] h-[70%] md:w-[70%] md:h-[70%]
                     md:max-w-4xl lg:max-w-6xl xl:max-w-6xl lg:h-[75%]
                      rounded-lg bg-center bg-no-repeat bg-contain lg:bg-cover transition-all duration-700"
                    style={{
                        backgroundImage: `url(${activeSlides[currentSlide]?.image})`,
                    }}
                />
                <h2 className="absolute bottom-[82%] right-[59%] md:right-[13%] md:bottom-[16%] 
                lg:right-[12%] lg:bottom-[12.5%] text-[11px] -translate-x-1/4 z-20 text-white">Artist's Impression</h2>
            </div>

            {/* Title */}
            <div className="absolute bottom-24 left-1/2 text-[10px] md:text-[11px] lg:text-sm  -translate-x-1/2 z-20 bg-black/60 text-white px-6 py-2 rounded-full">
                {activeSlides[currentSlide]?.title}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-[22%] -translate-x-[18%] left-[25%] md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center gap-10">
                <button
                    disabled={isPrevDisabled}
                    onClick={prevSlide} className={`text-3xl transition text-white
    ${isPrevDisabled ? "opacity-40 cursor-not-allowed" : ""}
  `}>
                    ❮
                </button>

                <button
                    onClick={() => selectCategory("Aminities")}
                    className={`px-5 py-2 rounded-full text-[10px] lg:text-sm text-white  ${category === "Aminities" ? "bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-lg shadow-xl border border-white/20" : "bg-black/40"
                        }`}
                >
                    Outdoor Amenities
                </button>

                <button
                    onClick={() => selectCategory("Clubhouse")}
                    className={`px-5 py-2 rounded-full  text-[10px] lg:text-sm text-white ${category === "Clubhouse" ? "bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-lg shadow-xl border border-white/20" : "bg-black/40"
                        }`}
                >
                    Clubhouse Amenities
                </button>

                <button onClick={nextSlide}
                    disabled={isNextDisabled}
                    className={`text-3xl transition text-white
    ${isNextDisabled ? "opacity-40 cursor-not-allowed" : ""}
  `}>
                    ❯
                </button>
            </div>
        </div>
    );
}