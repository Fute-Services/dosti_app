import FullPageLayout from "../../components/FullPageLayout";
import GlassWrapper from "../../components/GlassWrapper";
import bgImage from '../../assets/Gallery/Gym.jpg'
import { useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineReplyAll } from "react-icons/md";
import { videos } from "../../media";

export default function Testimonials() {
    const list = videos.testimonials;
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % list.length);
    }, [list.length]);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? list.length - 1 : prev - 1));
    }, [list.length]);

    return (
        <FullPageLayout background={bgImage}>
            <GlassWrapper className="bg-white/25 backdrop-blur-xl border border-white/30 w-full h-screen p-5 md:p-28  lg:p-10
             text-center flex flex-col justify-center items-center shadow-2xl overflow-hidden">

                <div className="relative w-full max-w-5xl aspect-video rounded-3xl bg-white/15
                 backdrop-blur-3xl border border-white/20 p-4 md:p-8 flex flex-col items-center justify-center shadow-2xl">

                    <div className="mt-5 mb-2">
                        <h1 className="text-[15px] font-bold text-white  drop-shadow-md uppercase">Accolades of Dosti Greater Thane</h1>
                        <p className="mb-4 text-[10px] text-gray-200">
                            Voices of Trust – Real stories from people who chose Dosti and found their perfect home.
                        </p>
                    </div>

                    <video
                        key={list[current]}
                        src={list[current]}
                        controls
                        autoPlay
                        playsInline
                        preload="auto"
                        onEnded={next}
                        className="w-full h-full md:w-[500px] md:h-[240px] lg:w-[800px] lg:h-[450px] bg-black rounded-xl"
                        title={`Testimonial ${current + 1}`}
                    />

                    {/* Navigation Controls */}
                    <div className="mt-6 flex gap-8 items-center">
                        <button onClick={prev} aria-label="Previous testimonial" className="p-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full transition-all hover:scale-110 active:scale-95">
                            <FiChevronLeft size={24} />
                        </button>

                        <span className="text-white text-xs font-mono">
                            {current + 1} / {list.length}
                        </span>

                        <button onClick={next} aria-label="Next testimonial" className="p-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full transition-all hover:scale-110 active:scale-95">
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="absolute top-[13%] left-[2.5%] flex gap-4 z-[2000]">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="p-[17px] bg-white/20
                animate-float1 backdrop-blur-xl text-white
                rounded-full border-black/30 hover:bg-white/40 hover:text-black/80
                 transition shadow-lg"
                    >
                        <MdOutlineReplyAll />
                    </button>
                </div>

            </GlassWrapper>
        </FullPageLayout >
    );
}
