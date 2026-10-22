import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineReplyAll } from "react-icons/md";
import { brochurePages, brochureThumbs } from "../../media";

// Offline brochure viewer: the PDF is pre-rendered to page images so it opens
// instantly with no PDF plugin or internet connection.
export default function Brochure() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);
    const last = brochurePages.length - 1;

    const go = useCallback((i: number) => setPage(Math.min(last, Math.max(0, i))), [last]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") go(page + 1);
            if (e.key === "ArrowLeft") go(page - 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go, page]);

    // Keep the active thumbnail in view and warm up the neighbouring pages.
    useEffect(() => {
        thumbsRef.current
            ?.querySelector<HTMLElement>(`[data-page="${page}"]`)
            ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        [page - 1, page + 1].forEach((i) => {
            if (i >= 0 && i <= last) new Image().src = brochurePages[i];
        });
    }, [page, last]);

    return (
        <div
            className="w-screen h-screen bg-neutral-900 flex flex-col select-none"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (dx < -50) go(page + 1);
                if (dx > 50) go(page - 1);
                touchStartX.current = null;
            }}
        >
            <div className="relative flex-1 min-h-0 flex items-center justify-center px-20 pt-6">
                <img
                    key={brochurePages[page]}
                    src={brochurePages[page]}
                    alt={`Brochure page ${page + 1}`}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-md animate-fadeIn"
                    draggable={false}
                />

                <button
                    onClick={() => go(page - 1)}
                    disabled={page === 0}
                    aria-label="Previous page"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/15 text-white border border-white/30 hover:bg-white/30 disabled:opacity-30 transition"
                >
                    <FiChevronLeft size={28} />
                </button>
                <button
                    onClick={() => go(page + 1)}
                    disabled={page === last}
                    aria-label="Next page"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/15 text-white border border-white/30 hover:bg-white/30 disabled:opacity-30 transition"
                >
                    <FiChevronRight size={28} />
                </button>

                <button
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="absolute top-5 left-4 p-[17px] bg-white/20 animate-float1 text-white rounded-full hover:bg-white/40 transition shadow-lg"
                >
                    <MdOutlineReplyAll />
                </button>
                <span className="absolute top-6 right-6 text-white/80 text-sm font-mono bg-black/40 px-3 py-1 rounded-full">
                    {page + 1} / {brochurePages.length}
                </span>
            </div>

            <div ref={thumbsRef} className="flex gap-2 overflow-x-auto px-4 py-3 thin-scrollbar">
                {brochurePages.map((src, i) => (
                    <button
                        key={src}
                        data-page={i}
                        onClick={() => go(i)}
                        aria-label={`Go to page ${i + 1}`}
                        className={`flex-shrink-0 h-16 rounded overflow-hidden border-2 transition ${i === page ? "border-red-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                        <img src={brochureThumbs[i]} alt="" loading="lazy" decoding="async" className="h-full w-auto" />
                    </button>
                ))}
            </div>
        </div>
    );
}
