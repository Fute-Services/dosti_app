import AutoSlider from "../../components/AutoSlider";
import image1 from '../../assets/Tie-Up/Apollo_Clinic-01.jpg';
import image2 from '../../assets/Tie-Up/BADMINTON-01.jpg';
import image3 from '../../assets/Tie-Up/Ballroom_Studio-01.jpg';
import image4 from '../../assets/Tie-Up/Cricket-01.jpg';
// import image5 from '../../assets/Tie-Up/Dosti_Club_Novo-01.jpg';
import image6 from '../../assets/Tie-Up/Dosti_School-01.jpg';
import image7 from '../../assets/Tie-Up/Football-01.jpg';
// import image8 from '../../assets/Tie-Up/Ganesh_Temple-01.jpg';
import image9 from '../../assets/Tie-Up/Music-01.jpg';
import image10 from '../../assets/Tie-Up/Swimming-01.jpg';
import image11 from '../../assets/Tie-Up/Tennis-01.jpg';
import image12 from '../../assets/Tie-Up/YOSKA-01.jpg';
import FullPageLayout from "../../components/FullPageLayout";
import bgImage from '../../assets/Gallery/Gym.jpg'
import GlassWrapper from "../../components/GlassWrapper";


const slides = [
    { id: 1, image: image1, title: "" },
    { id: 2, image: image2, title: "" },
    { id: 3, image: image3, title: "" },
    { id: 4, image: image4, title: "" },
    // { id: 5, image: image5, title: "" },
    { id: 6, image: image6, title: "" },
    { id: 7, image: image7, title: "" },
    // { id: 8, image: image8, title: "" },
    { id: 9, image: image9, title: "" },
    { id: 10, image: image10, title: "" },
    { id: 11, image: image11, title: "" },
    { id: 12, image: image12, title: "" },
];



export default function Tie_up() {
    return (
        <FullPageLayout background={bgImage}>
            <GlassWrapper className=" bg-white/25 backdrop-blur-xl
        border border-white/30 w-full h-full overflow-y-scroll
         lg:h-screen p-5 text-center  flex flex-col justify-center items-center
        shadow-2xl ">


                <div className="max-w-4xl justify-center items-center flex mt-5 md:mt-2">
                    
                    <AutoSlider
                        slides={slides}
                        autoPlay={true}
                        interval={6000}
                        height="500px"
                    />
                    
                    </div>
            </GlassWrapper>
        </FullPageLayout>
    );
}
