import FullPageLayout from "../../components/FullPageLayout";
import GlassWrapper from "../../components/GlassWrapper";
import bgImage from '../../assets/Gallery/Gym.jpg'
import { videos } from "../../media";

export default function ConstructionProgress() {
    return (<FullPageLayout background={bgImage} >
        <GlassWrapper className=" bg-white/25 backdrop-blur-xl
            border border-white/30 w-full h-full
             lg:h-screen p-5 text-center  flex flex-col justify-center items-center overflow-hidden
            shadow-2xl ">
            <div className="w-full h-screen flex items-center justify-center overflow-hidden">
                <video
                    src={videos.construction}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-[80%] h-[80%] object-contain rounded-2xl bg-black shadow-2xl"
                    title="Construction progress"
                />
            </div></GlassWrapper></FullPageLayout >);
}
