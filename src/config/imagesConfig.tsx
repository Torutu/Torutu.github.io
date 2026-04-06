import { OptimizedImage } from '../types/images';
import daggerforgeImg from '../media/daggerforge.PNG';
import dhtoolsImg from '../media/dhtools.PNG';

// Example of how to import optimized variants (uncomment when files are created):
// import daggerforgeWebp from '../media/daggerforge.webp';
// import daggerforgeMobile from '../media/daggerforge_mobile.png';
// import daggerforgeMobileWebp from '../media/daggerforge_mobile.webp';

export const IMAGES_CONFIG: Record<string, OptimizedImage> = {
  daggerforge: {
    id: 'daggerforge',
    src: daggerforgeImg,
    // srcWebp: daggerforgeWebp,           // Uncomment after running optimize-images.sh
    // srcMobile: daggerforgeMobile,       // Uncomment after running optimize-images.sh
    // srcMobileWebp: daggerforgeMobileWebp, // Uncomment after running optimize-images.sh
    alt: 'Daggerforge Plugin Interface showing adversary browser, card builder, and dice roller',
    width: 1920,
    height: 1080,
  },
  dhtools: {
    id: 'dhtools',
    src: dhtoolsImg,
    // srcWebp: dhtoolsWebp,           // Uncomment after running optimize-images.sh
    // srcMobile: dhtoolsMobile,       // Uncomment after running optimize-images.sh
    // srcMobileWebp: dhtoolsMobileWebp, // Uncomment after running optimize-images.sh
    alt: 'DHTools Interface showing adversary browser, card builder, and dice roller',
    width: 1280,
    height: 720,
  },

  // Template for adding new images:
  // imageName: {
  //   id: 'imageName',
  //   src: imageNamePng,
  //   srcWebp: imageNameWebp,
  //   srcMobile: imageNameMobilePng,
  //   srcMobileWebp: imageNameMobileWebp,
  //   alt: 'Descriptive alt text for accessibility',
  //   width: 1920,  // Original width
  //   height: 1080, // Original height
  //   blurDataURL: 'data:image/svg+xml;base64,...', // Optional: tiny base64 blur placeholder
  // },
};

// Helper function to get image by ID with type safety
export const getImage = (id: string): OptimizedImage | undefined => {
  return IMAGES_CONFIG[id];
};

// Helper function to check if image has WebP support
export const hasWebP = (image: OptimizedImage): boolean => {
  return !!image.srcWebp;
};

// Helper function to check if image has mobile variants
export const hasMobileVariants = (image: OptimizedImage): boolean => {
  return !!image.srcMobile || !!image.srcMobileWebp;
};
