// Locally bundled media (public/media and public/tour). Everything ships with
// the app so it works with no internet connection.
const base = import.meta.env.BASE_URL;

export const TOUR_URL = `${base}tour/index.html`;

export const videos = {
    walkthrough: `${base}media/videos/walkthrough.mp4`,
    construction: `${base}media/videos/construction.mp4`,
    infrastructure: `${base}media/videos/infrastructure.mp4`,
    testimonials: [1, 2, 3, 4, 5].map((n) => `${base}media/videos/testimonial${n}.mp4`),
};

export const BROCHURE_PAGE_COUNT = 31;

const pageName = (i: number) => `page_${String(i + 1).padStart(2, "0")}`;

export const brochurePages = Array.from(
    { length: BROCHURE_PAGE_COUNT },
    (_, i) => `${base}media/brochure/${pageName(i)}.jpg`,
);

export const brochureThumbs = Array.from(
    { length: BROCHURE_PAGE_COUNT },
    (_, i) => `${base}media/brochure/${pageName(i)}_thumb.jpg`,
);
