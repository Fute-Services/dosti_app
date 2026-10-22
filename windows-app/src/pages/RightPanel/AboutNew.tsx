import bgImage from '../../assets/des/aboutus.jpg'
import tree from '../../assets/des/tree1.png'



const AboutNew = () => {
    return (
        <section className="w-full h-screen bg-[#ffff] flex flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden">

        
            <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen flex-shrink-0 justify-center flex items-center">
                <img
                    src={bgImage}
                    alt="about"
                    className="w-full h-full object-fill md:w-[80%] lg:w-full object-center"
                    loading="eager"
                />
            </div>

            {/* RIGHT SIDE — Content */}
            <div className="w-full 
            lg:w-1/2 flex flex-col items-center 
            justify-center px-6 sm:px-10 lg:px-10 xl:px-16">

                {/* Headings */}
                <div className="text-center mt-5 mb-5">
                    <p className="text-[#B51616] font-padauk font-[500]
            text-[14px] sm:text-[16px] lg:text-[14px] xl:text-[22px] 2xl:text-[18px] 
            tracking-[0.2em] uppercase mb-1">
                        A LEGACY BUILT ON
                    </p>
                    <h1 className="text-[#B51616] font-padauk font-[640]
            text-[28px] sm:text-[40px] lg:text-[30px] xl:text-[36px] 2xl:text-[42px] 
            leading-tight uppercase">
                        UNDERSTANDING AND TRUST
                    </h1>

                    <p className="text-[#B51616] mt-2 font-padauk text-center 
            text-[11px] sm:text-[12px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px]">
                        <strong>It's just the Dosti DNA.</strong> Where we've transformed unexplored locations into the new-age nests of luxury, such as Wadala.{' '}
                        <strong>It's just the Dosti Way of Building.</strong> Where we've uplifted lives and democratised the right to a life well lived, such as in Thane.{' '}
                        <strong>It's just the Dosti Purpose.</strong> Where we've elevated the art of living alongside skylines, such as Sion and Ghodbunder Road.
                        But at the heart of it all, it's something deeper. It's our instinct to understand before we build. To listen before we lead.
                        To tune in to what a city needs, what communities deserve, and what tomorrow demands. Above all{' '}
                        <strong>it's just the Dosti Legacy.</strong>{' '}
                        A journey of befriending the art of building with pioneering foresight, strategic boldness and an unshakable foundation of trust.
                        Wherever Dosti Realty has set foot, the lives, the location, and the skyline have risen above and beyond.
                        So have its privileged customers like you. At Dosti Realty, transforming lives alongside locals
                        is a responsibility we proudly uphold and will, as long as we stay.
                    </p>
                </div>

                {/* Tree Image Only */}
                <div className="w-full 
          
     
          overflow-hidden">
                    <img
                        src={tree}
                        alt="legacy tree"
                        className="w-full h-full object-contain"
                    />
                </div>

            </div>
        </section>
    )
}

export default AboutNew