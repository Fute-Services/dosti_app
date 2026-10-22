import { MdOutlineReplyAll } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export default function GoBackButtonForSpecification() {
    const navigate=useNavigate();
    return (<>
        <div className="absolute top-[-8px] left-[-9px] flex gap-4 z-[2000]">

            {/* Mute / Unmute */}
            <button
                onClick={()=>navigate(-1)}
                className="p-[17px] bg-black/20 
                animate-float1 backdrop-blur-xl text-white 
                rounded-full border-black/30 hover:bg-white/40 hover:text-black/80
                 transition shadow-lg"
            >
                <MdOutlineReplyAll />
            </button>
        </div>
    </>)
}