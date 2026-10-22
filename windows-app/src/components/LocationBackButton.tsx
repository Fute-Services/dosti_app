import {
    Link,
    //  useNavigate 
} from "react-router-dom";
import { MdOutlineReplyAll } from "react-icons/md";
export default function LocationBackButton() {

    return (<>
        <div className="absolute top-[14%] lg:top-[13%] left-[2.5%] flex gap-4 z-[2000]">

            {/* Mute / Unmute */}
            <button

                className="p-[10px] lg:p-[17px] bg-white/20 
                animate-float1 backdrop-blur-xl text-white 
                rounded-full border-black/30 hover:bg-white/40 hover:text-black/80
                 transition shadow-lg  text-[11px] lg:text-sm"
            >
                <Link to="/" ><MdOutlineReplyAll /></Link>
            </button>
        </div>
    </>
    )
}