// Text and gallery content carried over from the web experience.
import { images, type ImageKey } from '../assets/images';

export const highlights = [
  'Just 7 km (10 mins) from Lake Shore Thane (formerly Viviana Mall)',
  'Only 4 km (6 mins) from Balkum, Thane.',
  'Metro Line 5 Advantage – Proposed Kalher Metro Station right outside (Thane–Bhiwandi–Kalyan corridor)',
  'Seamless Rail & Road Connectivity to Thane, Kalyan, Navi Mumbai & Mumbai.',
  'Modern Lifestyle Amenities Crafted for Elevated Living',
  'Schools, Healthcare, Shopping & Daily Conveniences Just Around the Corner',
  'Trusted by 4,000+ Happy Families.',
];

export type Slide = { id: number; image: ImageKey; title: string };

export const outdoorAmenities: Slide[] = [
  { id: 2, image: 'gallery_dosti', title: 'Elevation View' },
  { id: 3, image: 'gallery_dosti_greaterthane', title: 'Walkway' },
  { id: 5, image: 'gallery_retail_cam', title: 'Shopping Promenade' },
  { id: 7, image: 'gallery_opengym_cam', title: 'Outdoor Gym' },
  { id: 8, image: 'gallery_lawn_cam', title: 'Open Lawn' },
  { id: 9, image: 'gallery_lawn_cam1', title: 'Multipurpose Lawn' },
  { id: 11, image: 'gallery_kids_front_cam', title: 'Kids Play Area' },
  { id: 13, image: 'gallery_enterence_gate_cam', title: 'Grand Entrance' },
  { id: 14, image: 'gallery_elevationcam_dostithane', title: 'Elevation View' },
  { id: 15, image: 'gallery_dosti_greater_thane_shot', title: 'Multipurpose Sports Court' },
  { id: 16, image: 'gallery_dosti_greater_thane_shot1', title: 'Amenity View' },
  { id: 17, image: 'gallery_day_road_cam', title: 'Elevation View' },
  { id: 18, image: 'gallery_basket_ball_court', title: 'Basketball court' },
  { id: 19, image: 'gallery_closeup_lawn_cam', title: 'Amenity View' },
];

export const clubhouseAmenities: Slide[] = [
  { id: 101, image: 'gallery_building_cam_update', title: 'Clubhouse' },
  { id: 102, image: 'gallery_club_seperator', title: 'Dosti Club Novo' },
  { id: 103, image: 'gallery_club_cam', title: 'Dosti Club Novo' },
  { id: 104, image: 'clubhouse_playroom', title: 'Billiards' },
  { id: 105, image: 'clubhouse_dinning', title: 'Restaurant' },
  { id: 106, image: 'clubhouse_playroom2', title: 'Carrom & Cards Room' },
  { id: 107, image: 'clubhouse_image4', title: 'Badminton Courts' },
  { id: 108, image: 'clubhouse_image5', title: 'Table Tennis' },
  { id: 109, image: 'clubhouse_image6', title: 'Gaming Room' },
  { id: 111, image: 'clubhouse_image8', title: 'Gymnasium' },
  { id: 112, image: 'clubhouse_image9', title: 'Mini Theater' },
  { id: 113, image: 'clubhouse_image10', title: 'Music Room' },
  { id: 114, image: 'clubhouse_image11', title: 'Spa' },
  { id: 115, image: 'gallery_poolcam_dostigreaterthane', title: 'Swimming Pool' },
];

export const tieUps: ImageKey[] = [
  'tieup_apollo_clinic_01',
  'tieup_badminton_01',
  'tieup_ballroom_studio_01',
  'tieup_cricket_01',
  'tieup_dosti_school_01',
  'tieup_football_01',
  'tieup_music_01',
  'tieup_swimming_01',
  'tieup_tennis_01',
  'tieup_yoska_01',
];

export const about = {
  kicker: 'A LEGACY BUILT ON',
  title: 'UNDERSTANDING AND TRUST',
  // [bold, rest] pairs, rendered as one paragraph
  body: [
    ["It's just the Dosti DNA.", " Where we've transformed unexplored locations into the new-age nests of luxury, such as Wadala. "],
    ["It's just the Dosti Way of Building.", " Where we've uplifted lives and democratised the right to a life well lived, such as in Thane. "],
    ["It's just the Dosti Purpose.", " Where we've elevated the art of living alongside skylines, such as Sion and Ghodbunder Road. But at the heart of it all, it's something deeper. It's our instinct to understand before we build. To listen before we lead. To tune in to what a city needs, what communities deserve, and what tomorrow demands. Above all "],
    ["it's just the Dosti Legacy.", ' A journey of befriending the art of building with pioneering foresight, strategic boldness and an unshakable foundation of trust. Wherever Dosti Realty has set foot, the lives, the location, and the skyline have risen above and beyond. So have its privileged customers like you. At Dosti Realty, transforming lives alongside locals is a responsibility we proudly uphold and will, as long as we stay.'],
  ] as [string, string][],
  image: images.brand_aboutus,
  tree: images.brand_tree1,
};

export const specifications: { title: string; items: string[] }[][] = [
  [
    { title: 'Flooring', items: ['Vitrified flooring in living.', 'Dining, Bedrooms, Kitchen & Passage.'] },
    { title: 'Kitchen', items: ['Granite kitchen platform with marble support.', 'Stainless steel sink.', 'Tile dado above platform.'] },
    {
      title: 'Sanitary',
      items: [
        'Anti-skid tiles for all toilets flooring.',
        'All toilets with tile dado up to beam bottom level.',
        'State-of-the-art CP fittings and sanitary fixtures.',
        'Instant geyser and hot-cold water mixer in shower area.',
        'Dry area – aluminium glass door.',
        'Well-ventilated bathrooms.',
        'Mirror above wash basin.',
        'Elegant false ceilings in toilets.',
      ],
    },
  ],
  [
    {
      title: 'Windows',
      items: [
        'Sliding windows with clear glass.',
        'Decorative M. S. railing for living room balcony.',
        'Amp: kitchen utility.',
        'M. S. grills for bedroom windows.',
        'Mosquito net for bedroom and living room.',
      ],
    },
    {
      title: 'Electrical',
      items: [
        'Electrical wiring & fitting of concealed type PVC conduct – good quality wires.',
        'One ELCB per flat and MCB for each Room.',
        'TV, Internet, AC point, ceiling fan point and regulator point in living.',
        'TV, AC point, ceiling fan point and regulator point in bedroom.',
        'Ceiling fan point and regulator in kitchen.',
      ],
    },
    { title: 'Security', items: ['Intercom system in each flat.', 'Fire fighting and fire alarm system for entire building.'] },
  ],
  [
    { title: 'Doors', items: ['Flushed Doors in living and bedrooms with the laminate finish on both sides.'] },
    { title: 'Painting', items: ['All walls painted in premium quality paint.'] },
  ],
];

export const disclaimer = {
  siteAddress:
    'Dosti Greater Thane, Dosti Greater Thane Road, Near upcoming Kalher Metro Station, Near SS Hospital, Kalher, Thane - 421302 T: +91 86577 03367',
  corpAddress:
    'Adrika Developers Pvt. Ltd., Lawrence & Mayo House, 1st Floor, 276, Dr. D. N. Road, Fort, Mumbai - 400 001 · www.dostirealty.com',
  // same QR set and order as the web page
  qrCodes: ['brand_qr1', 'brand_qr2', 'brand_qr3', 'brand_qr1', 'brand_qr1', 'brand_qr1', 'brand_qr1', 'brand_qr1'] as ImageKey[],
  rera: [
    'DGT - Sector 3A - Cluster 2 - Phase 1, 2, 3 & 4 are registered with MahaRERA Nos. P51700048334, P51700048335, P51700048333 & P51700053095.',
    'Dosti Greater Thane - Sector 3A - Cluster 1B Phase 1, 2 & 3 are registered with MahaRERA Nos. P51700053057, P51700053096 & P51700053217.',
    'Phase 1 is registered with MahaRERA Nos. P51700024923 and are available on website https://maharera.mahaonline.gov.in under registered projects. T&C Apply.',
  ],
  club:
    'Dosti Club Novo is a Private Club House in the vicinity of Dosti Greater Thane project. The right to admission, use and enjoyment of all or any of the facilities/amenities in the Dosti Club Novo is reserved by the Promoters and shall be subject to payment of such admission fees, annual charges and compliance of terms and conditions as may be specified from time to time by the Promoters.',
  legal:
    'Disclaimer: (1) The artist’s impressions and images are used for representation purpose only. (2) Furniture, fittings and fixtures as shown/displayed in the show flat are for showcasing only and do not form part of the actual standard amenities to be provided in the flat. (3) The Promoter reserves the rights to amend the plans for betterment of project or otherwise.',
  company: ['DOSTI REALTY LTD.', 'ISO 9001:2015 & ISO 45001:2018 CERTIFIED'],
};
