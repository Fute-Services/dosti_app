// import img1 from '../../assets/des/img1.png'
// import img2 from '../../assets/des/img2.png'
import img1 from '../../assets/des/img11.jpg'
import img2 from '../../assets/des/img 12.jpg'
import GoBackButtonForSpecification from "../../components/GoBackButtonForSpecification";

const Specification = () => {
  return (
    <section className="w-full relative bg-white h-screen overflow-y-scroll  py-6 px-6 md:px-3 lg:px-10">
      {/* Circular images */}
      {/* img1 with red gradient overlay */}

      <div className='absolute top-[20px]  sm:top-6 sm:right-6"' ><GoBackButtonForSpecification /></div>
       <div className="hidden lg:block rounded-full w-[450px] h-[450px] absolute top-[-180px] left-[-100px] z-0 overflow-hidden">
        <img
          src={img1}
          className="w-full h-full object-cover"
          alt="Interior 1"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(1deg, #f53b3b79 -53.95%, rgba(244, 59, 58, 0) 99.36%)',
          }}
        />
      </div>

      {/* 🔴 Image 2 (Hidden in Mobile) */}
      <div className="hidden lg:block rounded-full w-[420px] h-[420px] absolute top-[350px] left-[-120px] z-0 overflow-hidden">
        <img
          src={img2}
          className="w-full h-full object-cover"
          alt="Interior 2"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(1deg, #F53B3B -53.95%, rgba(244, 59, 58, 0) 99.36%)',
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 ml-0 md:ml-5 mt-10 md:mt-10 lg:ml-[400px]"  style={{ fontFamily: 'Padauk, sans-serif' }}>
        {/* Title */}
        <h1
          className="text-[#B51616] font-bold text-3xl  tracking-wider  max-w-xl flex flex-col
          mb-8 md:mb-5"
          style={{ fontFamily: 'Padauk, sans-serif' }}
        >
          INTERNAL SPECIFICATIONS <span className='mt-3'> OVERVIEW</span>
        </h1>

        {/* Grid of spec sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">

          {/* Column 1 */}
          <div className="space-y-2 xl:space-y-6">
            {/* Flooring */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Flooring</h2>
              <ul className="list-disc list-outside font-medium  gap-0 xl:gap-3 flex flex-col  pl-4  text-gray-800 text-sm leading-relaxed">
                <li >Vitrified flooring in living.</li>
                <li>Dining, Bedrooms, Kitchen &amp; Passage.</li>
              </ul>
            </div>

            {/* Kitchen */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest  mb-1 xl:mb-2 uppercase">Kitchen</h2>
              <ul className="list-disc list-outside font-medium pl-4 gap-0 xl:gap-3 flex flex-col text-gray-800 text-sm leading-relaxed">
                <li>Granite kitchen platform with marble support.</li>
                <li>Stainless steel sink.</li>
                <li>Tile dado above platform.</li>
              </ul>
            </div>

            {/* Sanitary */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Sanitary</h2>
              <ul className="list-disc list-outside font-medium pl-4  gap-0 xl:gap-3 flex flex-col  text-gray-800 text-sm leading-relaxed">
                <li>Anti-skid tiles for all toilets flooring.</li>
                <li>All toilets with tile dado up to beam bottom level.</li>
                <li>State-of-the-art CP fittings and sanitary fixtures.</li>
                <li>Instant geyser and hot-cold water mixer in shower area.</li>
                <li>Dry area – aluminium glass door.</li>
                <li>Well-ventilated bathrooms.</li>
                <li>Mirror above wash basin.</li>
                <li>Elegant false ceilings in toilets.</li>
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2 xl:space-y-6">
            {/* Windows */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Windows</h2>
              <ul className="list-disc list-outside font-medium pl-4   gap-0 xl:gap-3 flex flex-col text-gray-800 text-sm leading-relaxed">
                <li>Sliding windows with clear glass.</li>
                <li>Decorative M. S. railing for living room balcony.</li>
                <li>Amp: kitchen utility.</li>
                <li>M. S. grills for bedroom windows.</li>
                <li>Mosquito net for bedroom and living room.</li>
              </ul>
            </div>

            {/* Electrical */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Electrical</h2>
              <ul className="list-disc list-outside font-medium pl-4  gap-0 xl:gap-3 flex flex-col text-gray-800 text-sm leading-relaxed">
                <li>Electrical wiring &amp; fitting of concealed type PVC conduct – good quality wires.</li>
                <li>One ELCB per flat and MCB for each Room.</li>
                <li>TV, Internet, AC point, ceiling fan point and regulator point in living.</li>
                <li>TV, AC point, ceiling fan point and regulator point in bedroom.</li>
                <li>Ceiling fan point and regulator in kitchen.</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Security</h2>
              <ul className="list-disc list-outside font-medium pl-4  gap-0 xl:gap-3 flex flex-col text-gray-800 text-sm leading-relaxed">
                <li>Intercom system in each flat.</li>
                <li>Fire fighting and fire alarm system for entire building.</li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-2 xl:space-y-6">
            {/* Doors */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Doors</h2>
              <ul className="list-disc list-outside font-medium pl-4 text-gray-800 text-sm leading-relaxed">
                <li>Flushed Doors in living and bedrooms with the laminate finish on both sides.</li>
              </ul>
            </div>

            {/* Painting */}
            <div>
              <h2 className="text-[#610000] font-bold text-[15px] tracking-widest mb-1 xl:mb-2 uppercase">Painting</h2>
              <ul className="list-disc list-outside font-medium pl-4  text-gray-800 text-sm leading-relaxed">
                <li>All walls painted in premium quality paint.</li>
              </ul>
            </div>
          </div>

        </div>
      </div> 
      

       
    </section>
  )
}

export default Specification