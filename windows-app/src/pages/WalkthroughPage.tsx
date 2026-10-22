import { MdOutlineReplyAll } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { videos } from "../media";

export default function WalkthroughPage() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">

            <div className="absolute top-5 left-2 flex gap-4 z-[2000]">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="p-5 bg-black/30 animate-float1 hover:text-black backdrop-blur-xl text-white rounded-full border border-black/30 hover:bg-white/40 transition shadow-lg"
                >
                    <MdOutlineReplyAll />
                </button>
            </div>
            <video
                src={videos.walkthrough}
                autoPlay
                muted
                loop
                controls
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                title="Walkthrough Video"
            />
        </div>
    );
}
