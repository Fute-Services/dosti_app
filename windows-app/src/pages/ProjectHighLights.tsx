import bgImage from '../assets/Gallery/elevationcam_dostithane.jpg'
// import { FaMapMarkedAlt, FaBuilding } from "react-icons/fa";
// import { FaLeaf } from "react-icons/fa";

export default function ProjectHighlights_Gold() {

    // const plot = [
    //     "11.11 Acres",
    //     "85% Open space:",
    //     "5.2 Acres of green space(50%)",
    //     "2.7 Acres of garden on the podium",
    //     "2.5 Acres of garden on the ground",

    // ];

    // const highlights = [
    //     "Integrated Township (1st in Mumbai NXT)",
    //     "19 Towers | 2200+ Apartments Delivered",
    //     "Fully Functional School, Retail & Commercial",
    //     "Wide Roads with Pedestrian Pathways",
    //     "100 Acres of Open Green Spaces",
    //     "25 Acres of Adjacent Reserve Forest",
    //     "Hill, Forest & River Views",
    // ];


    const highlights = [
        "Just 7 km (10 mins) from Lake Shore Thane (formerly Viviana Mall)",
        "Only 4 km (6 mins) from Balkum, Thane.",
        "Metro Line 5 Advantage – Proposed Kalher Metro Station right outside (Thane–Bhiwandi–Kalyan corridor)",
        "Seamless Rail & Road Connectivity to Thane, Kalyan, Navi Mumbai & Mumbai.",

        "Modern Lifestyle Amenities Crafted for Elevated Living",
        "Schools, Healthcare, Shopping & Daily Conveniences Just Around the Corner",
        // "Own Your Dream Home at Highly Attractive Pricing.",

        "Trusted by 4,000+ Happy Families."
    ]
    // const amenities = [
    //     "Clubhouse",
    //     "Hospital",
    //     "School",
    //     "Fire Station",
    //     "Cycling Track + Wide Roads",
    //     "Retail Shopping",
    //     "Garden Areas",
    //     "Playground"
    // ];

    return (
        <section
            className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Right Panel */}
            <div className="absolute bg-black/45 backdrop-blur-md justify-center items-center 
             p-6 right-0 top-0 h-full w-full  flex  overflow-y-auto">

                {/* <h2 className="text-xl font-bold mb-8 tracking-wide"> A GRAND COMMUNITY WITH ALL THE FEATURES FOR
                    A GREATER TOMORROW</h2> */}

                {/* Plot Area 
                <h3 className="flex items-center gap-3 text-lg font-semibold mb-2">
                    <FaMapMarkedAlt className="text-yellow-400/80" size={30} /> PLOT AREA
                </h3>
                <ul className="list-disc ml-6 text-sm space-y-1 mb-5">
                    {plot.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>*/}
                <div className='w-[8%]'>

                </div>
                <div className='
flex md:flex-row flex-col 
w-[92%] md:w-[92%] w-full

mt-[220px] md:mt-0 

h-auto md:h-[72%] lg:h-[97%]

justify-start md:justify-center
bg-white/20 

px-4 md:px-5 
pt-6 md:pt-0   /* ✅ FIX TOP CLIPPING */

items-start md:items-center

overflow-y-auto thin-scrollbar 
lg:overflow-hidden 

rounded-sm
'>

    {/* IMAGE */}
    <div className='
    md:w-[60%] 
    w-full 
    
    h-[200px] sm:h-[250px] md:h-[95%]   /* ✅ FIX HEIGHT */
    '>
        <img 
          src={bgImage} 
          alt="image" 
          className='object-cover w-full h-full rounded-lg' 
        />
    </div>

    {/* TEXT */}
    <div className='
    md:w-[40%] 
    w-full 
    
    h-auto md:h-full   /* ✅ FIX HEIGHT */
    
    flex flex-col 
    justify-start md:justify-center
    
    space-y-4 md:space-y-5 
    
    p-3 md:p-4
    '>

        {/* HEADING */}
        <h3 className="
        flex items-center uppercase gap-2 
        
        text-[12px] sm:text-sm md:text-sm lg:text-lg
        
        mt-2 md:mt-[75%] lg:mt-0   /* keep your behavior */
        
        font-semibold ml-2
        leading-tight   /* ✅ FIX TEXT CUTTING */
        ">
            A Grand Community Designed for a Greater Tomorrow
        </h3>

        {/* LIST */}
        <ul className="
        list-none 
        
        ml-0 md:ml-6 
        
        text-[12px] sm:text-sm 
        
        space-y-3 md:space-y-4
        ">
            {highlights.map((item, index) => (
                <div key={index} className='flex gap-3 md:gap-5'>
                    <li className='list-disc'>{item}</li>
                </div>
            ))}
        </ul>

    </div>

</div>
                    
                    </div>
        </section>
    );
}