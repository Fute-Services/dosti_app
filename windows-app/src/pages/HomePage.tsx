import { useEffect } from "react";
import RightSideNavbar from '../components/Navbar/RightSideNavbar';
import { TOUR_URL } from "../media";

export default function HomePage() {

    useEffect(() => {
        import("../pages/LocationPage1");
    }, []);

    useEffect(() => {
        const images = import.meta.glob(
            "/src/assets/Location1/*.{png,jpg,jpeg,webp}",
            { eager: true, import: "default" }
        );

        Object.values(images).forEach((src) => {
            const img = new Image();
            img.decoding = "async";
            img.src = src as string;
        });
    }, []);

    return (
        <>
            <div className='h-auto md:h-screen overflow-y-scroll md:overflow-hidden w-full bg-black'>
                {/* 360° tour bundled offline in public/tour */}
                <iframe
                    src={TOUR_URL}
                    style={{ width: "100%", height: "100vh", border: "none" }}
                    title="Dosti Greater Thane 360° view"
                    className='select-none'
                    allow="fullscreen; accelerometer; gyroscope"
                />
                <RightSideNavbar />
            </div>
        </>
    )
}
