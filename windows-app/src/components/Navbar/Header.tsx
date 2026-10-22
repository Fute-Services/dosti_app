import {Link} from 'react-router-dom'
export default function Header() {
    return (<>
        <div className="absolute top-4 left-0 w-full px-4 md:px-8 flex justify-between items-center z-10">
            <Link to="/"><img
                src="./logo.svg"
                className="w-[100px] h-[50px] object-contain"
            /></Link>

            <Link to="/"><img
                src="./Logofinal.png"
                className="w-[150px] h-[84px] object-contain rounded-2xl"
            /></Link> 
        </div>

    </>)
}