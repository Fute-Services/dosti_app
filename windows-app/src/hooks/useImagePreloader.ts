import { useEffect, useState } from "react";

// Returns true once `src` has finished loading (or failed), so callers can fade it in.
export function useImagePreloader(src: string) {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        const done = () => { if (!cancelled) setLoadedSrc(src); };
        img.onload = done;
        img.onerror = done;
        img.src = src;
        if (img.complete) queueMicrotask(done);
        return () => { cancelled = true; };
    }, [src]);

    return loadedSrc === src;
}
