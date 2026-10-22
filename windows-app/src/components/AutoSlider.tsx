import { useEffect, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";

interface SlideData {
  id: number;
  image: string;
  title?: string;
}

interface AutoSliderProps {
  slides: SlideData[];
  autoPlay?: boolean;
  interval?: number;
  height?: string;
}

export default function AutoSlider({
  slides,
  autoPlay = true,
  interval = 5000,
  height = "350px",
}: AutoSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(!autoPlay);

  // Memoized navigation functions to prevent unnecessary re-renders
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Handle Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Timer logic
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [paused, next, interval, slides.length]);

  // Shared button styles to keep JSX clean
  const controlBtnClass = `
    w-10 h-10 flex justify-center items-center
    bg-white/10 backdrop-blur-xl border border-white/30
    text-white rounded-full
    shadow-[0_4px_20px_rgba(0,0,0,0.25)]
    hover:bg-white/20 hover:scale-110
    transition-all duration-300 active:scale-95
  `;

  if (!slides.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl bg-white/25 backdrop-blur-3xl 
                 border border-white/30 px-6 py-10 lg:px-10 lg:py-14 text-center 
                 flex flex-col justify-between items-center shadow-2xl transition-all"
      style={{ height }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(!autoPlay)}
    >
      {/* Header Section */}
      <div className="z-10 flex flex-col gap-1 items-center justify-center">
        <h1 className="text-sm lg:text-base font-bold text-white drop-shadow-md tracking-wider">
          ISSE GREATER TOWNSHIP NAHI
        </h1>
        <p className="text-[10px] text-gray-200 font-medium uppercase">
          11+ UNIQUE BRAND ALLIANCES
        </p>
      </div>

      {/* Slides Container */}
      <div className="relative w-full flex-1 flex items-center overflow-hidden my-4">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full 
            h-full flex items-center justify-center p-2">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${slide.id}`}
                className="w-full h-full object-contain select-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="z-10 flex flex-col items-center gap-4">
        {/* Pagination Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === index ? "w-6 bg-white" : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <button onClick={prev} className={controlBtnClass} aria-label="Previous slide">
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => setPaused(!paused)}
            className={controlBtnClass}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          >
            {paused ? <FiPlay size={20} /> : <FiPause size={20} />}
          </button>

          <button onClick={next} className={controlBtnClass} aria-label="Next slide">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}