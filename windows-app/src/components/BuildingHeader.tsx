import {Link} from 'react-router-dom'
import logo1 from '../assets/des/logo.svg';
import logo2 from '../assets/des/Logofinal.png'
export default function BuildingHeader() {
    return (<>
        <div className="absolute top-0 left-0 w-full px-4 md:px-4
         flex justify-between items-center z-10">
            <Link to="/"><img
                src={logo1}
                className="w-[90px] h-[46px] object-contain"
            /></Link>

            <Link to="/"><img
                src={logo2}
                className="w-[135px] h-[85px] object-contain rounded-2xl"
            /></Link> 
        </div>

    </>)
}