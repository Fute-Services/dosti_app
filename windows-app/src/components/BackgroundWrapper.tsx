// import { useEffect, useState } from 'react';
import building from '../assets/Gallery/Gym.jpg'
import { useImagePreloader } from '../hooks/useImagePreloader'

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
const isMainImageReady = useImagePreloader(building);
    // const [isLoading, setIsLoading] = useState(false);            ${isLoading ? 'opacity-100' : 'opacity-0'} `}

    // useEffect(() => {
    //     const img = new Image();
    //     img.src = building;
    //     if(img.complete){
    //         setIsLoading(true);
    //     }else{
    //         img.onload=()=>{
    //             setIsLoading(true);
    //         }
    //     }
    // }, [building])
    return (
        <div className={`w-screen h-screen relative flex items-center justify-center bg-cover bg-center
            ${isMainImageReady ? 'opacity-100' : 'opacity-0'} 
           `}
            style={{ backgroundImage: `url(${building})` }}


        >
            {/* Dark blur overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
            {children}  </div>
    )
}