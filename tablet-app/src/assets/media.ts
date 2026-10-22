// Locally bundled media. Everything ships inside the APK so the app works offline.

export const videos = {
  walkthrough: require('../../assets/videos/walkthrough.mp4'),
  construction: require('../../assets/videos/construction.mp4'),
  infrastructure: require('../../assets/videos/infrastructure.mp4'),
  testimonials: [
    require('../../assets/videos/testimonial1.mp4'),
    require('../../assets/videos/testimonial2.mp4'),
    require('../../assets/videos/testimonial3.mp4'),
    require('../../assets/videos/testimonial4.mp4'),
    require('../../assets/videos/testimonial5.mp4'),
  ],
};

// The Pano2VR 360° tour is copied into Android assets by plugins/withOfflineTour.js.
export const TOUR_URL = 'file:///android_asset/tour/index.html';
