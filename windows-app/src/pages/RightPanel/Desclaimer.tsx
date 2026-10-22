import FullPageLayout from "../../components/FullPageLayout";
import GlassWrapper from "../../components/GlassWrapper";
import image1 from '../../assets/des/qr1.png'
import image2 from '../../assets/des/qr2.png'
import image3 from '../../assets/des/qr3.png'
import image4 from '../../assets/des/qr1.png'
import image5 from '../../assets/des/qr1.png'
import bgImage from '../../assets/Gallery/Gym.jpg'


export default function Desclaimer() {


    const qrcodes = [
        { id: 1, images: image1 },
        { id: 2, images: image2 },
        { id: 3, images: image3 },
        { id: 4, images: image4 },
        { id: 5, images: image5 },
        { id: 5, images: image5 },
        { id: 5, images: image5 },
        { id: 5, images: image5 },
    ]

    return (<>
        <FullPageLayout background={bgImage}>
            <GlassWrapper
            // className="w-full h-screen p-10 text-center  bg-white/25 backdrop-blur-3xl flex flex-col justify-center items-center"
            >

                <div className="absolute top-[20%] p-10">
                    {/* Address */}
                    <div className="text-center text-sm leading-relaxed max-w-5xl md:max-w-[70%] lg:max-w-5xl mx-auto">
                        <p>
                            <strong className=''>Site Address:</strong> Dosti Greater Thane, Dosti Greater Thane Road,
                            Near upcoming Kalher Metro Station, Near SS Hospital,
                            Kalher, Thane - 421302
                            T: +91 86577 03367
                        </p>
                        <p className="mt-1">
                            <strong>Corp. Address:</strong> Adrika Developers Pvt. Ltd., Lawrence &
                            Mayo House, 1st Floor, 276, Dr. D. N. Road, Fort, Mumbai - 400 001 ·
                            www.dostirealty.com
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-1 max-w-5xl text-center mx-auto" />

                    {/* QR Codes */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10  md:px-10 lg:px-0">
                        {qrcodes.map((e, index) => (
                            <div
                                key={index}
                                className="bg-white p-2 rounded-md"
                            >
                                <img
                                    // src={`/images/qr-${index + 1}.png`}
                                    src={e.images}
                                    alt={`QR Code ${index + 1}`}
                                    className="h-20 w-20 object-contain"
                                />
                            </div>
                        ))}
                    </div>

                    {/* MahaRERA Info */}
                    <div className="text-xs text-center max-w-6xl md:max-w-[75%] lg:max-w-6xl mx-auto leading-relaxed
                     justify-center  flex flex-col items-center">
                        <p>
                            DGT - Sector 3A - Cluster 2 - Phase 1, 2, 3 & 4 are registered with
                            MahaRERA Nos. P51700048334, P51700048335, P51700048333 &
                            P51700053095.
                        </p>
                        <p className="mt-1">
                            Dosti Greater Thane - Sector 3A - Cluster 1B Phase 1, 2 & 3 are
                            registered with MahaRERA Nos. P51700053057, P51700053096 &
                            P51700053217.
                        </p>
                        <p className="mt-1">
                            Phase 1 is registered with MahaRERA Nos. P51700024923 and are available
                            on website https://maharera.mahaonline.gov.in under registered
                            projects. T&amp;C Apply.
                        </p>

                         <p className="max-w-4xl mt-8 ">Dosti Club Novo is a Private Club House in the vicinity of Dosti Greater Thane project. The right 
                            to admission, use and enjoyment of all or any of the facilities/amenities in the Dosti Club Novo is
                             reserved by the Promoters and shall be subject to payment of such admission fees, annual 
                             charges and compliance of terms and conditions as may be specified from time to time by the Promoters.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="md:my-5 my-0 mb-10 h-1  max-w-5xl text-center mx-auto" />

                    {/* Disclaimer */}
                    <div className="text-[10px] leading-snug max-w-4xl md:max-w-[70%] lg:max-w-[47%] text-start mx-auto text-white/90">
                       
                        <p>
                            Disclaimer: (1) The artist’s impressions and images are used for
                            representation purpose only. (2) Furniture, fittings and fixtures as
                            shown/displayed in the show flat are for showcasing only and do not
                            form part of the actual standard amenities to be provided in the flat.
                            (3) The Promoter reserves the rights to amend the plans for
                            betterment of project or otherwise.
                        </p>
                    </div>

                    {/* Certification */}
                    <div className="flex flex-col items-center mt-6 text-xs">
                        {/* <img
                    src={image1}
                    alt="Kotak"
                    className="h-10 mb-2"
                /> */}
                        <p>DOSTI REALTY LTD.</p>
                        <p>ISO 9001:2015 & ISO 45001:2018 CERTIFIED</p>
                    </div>


                </div>
            </GlassWrapper>
        </FullPageLayout>

    </>)
}