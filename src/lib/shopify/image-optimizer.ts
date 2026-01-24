/**
 * Shopify Image Optimization Utilities
 * Leverages Shopify's CDN image transformation API for optimal performance
 */

export type ShopifyImageSize = 
  | 'thumb'      // 100x100
  | 'small'      // 200x200
  | 'compact'    // 160x160
  | 'medium'     // 320x320
  | 'large'      // 480x480
  | 'grande'     // 600x600
  | '1024x1024'
  | '2048x2048'
  | 'master';    // Original

export interface ShopifyImageParams {
  width?: number;
  height?: number;
  crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  scale?: 2 | 3; // For retina displays
  format?: 'jpg' | 'pjpg' | 'webp'; // Progressive JPG or WebP
}

/**
 * Optimize Shopify CDN image URL with custom parameters
 * Shopify CDN supports specific size parameters only
 */
export function getOptimizedShopifyImage(
  url: string,
  params: ShopifyImageParams = {}
): string {
  if (!url || !url.includes('cdn.shopify.com')) {
    return url;
  }

  try {
    // Shopify supports specific named sizes, not arbitrary dimensions
    // Return original URL as Next.js Image component will handle optimization
    // via its built-in image optimization API
    return url;
  } catch (error) {
    console.warn('Error optimizing Shopify image URL:', error);
    return url;
  }
}

/**
 * Get optimized image URL using named size
 */
export function getShopifyImageBySize(
  url: string,
  size: ShopifyImageSize = 'large'
): string {
  if (!url || !url.includes('cdn.shopify.com')) {
    return url;
  }

  try {
    let baseUrl = url.split('?')[0];
    baseUrl = baseUrl.replace(/_\d+x\d*\.(jpg|jpeg|png|webp)/i, '.$1');
    baseUrl = baseUrl.replace(/_(small|medium|large|grande|compact|thumb|master|1024x1024|2048x2048)\.(jpg|jpeg|png|webp)/i, '.$1');

    const urlParts = baseUrl.split('.');
    const extension = urlParts.pop();
    const baseWithoutExt = urlParts.join('.');

    return `${baseWithoutExt}_${size}.${extension}`;
  } catch (error) {
    console.warn('Error getting Shopify image by size:', error);
    return url;
  }
}

/**
 * Generate srcset for responsive images
 * Next.js Image component handles srcset automatically
 */
export function getShopifyImageSrcSet(url: string): string {
  // Return empty - Next.js handles this automatically
  return '';
}

/**
 * Get blur data URL for image placeholder
 * Returns a simple grey placeholder since Shopify doesn't support arbitrary tiny sizes
 */
export function getShopifyImageBlurDataURL(url: string): string {
  // Return a simple grey blur placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMyMDIwMjAiLz48L3N2Zz4=';
}

/**
 * Preload critical images for LCP optimization
 */
export function preloadShopifyImage(url: string, params: ShopifyImageParams = {}) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedShopifyImage(url, params);
  
  // Add srcset for responsive preloading
  const srcset = getShopifyImageSrcSet(url);
  if (srcset) {
    link.setAttribute('imagesrcset', srcset);
  }

  document.head.appendChild(link);
}

/**
 * Image size configurations for different contexts
 */
export const IMAGE_SIZES = {
  // Product Grid
  productGrid: {
    mobile: { width: 320, height: 320 },
    tablet: { width: 400, height: 400 },
    desktop: { width: 480, height: 480 },
  },
  // Product Gallery
  productGallery: {
    mobile: { width: 600 },
    tablet: { width: 800 },
    desktop: { width: 1200 },
  },
  // Cart Thumbnail
  cartThumbnail: {
    width: 100,
    height: 100,
  },
  // Product Thumbnail
  productThumbnail: {
    width: 120,
    height: 120,
  },
  // Hero/Featured
  hero: {
    mobile: { width: 800 },
    tablet: { width: 1200 },
    desktop: { width: 1600 },
  },
} as const;

/**
 * Get responsive sizes attribute for Next.js Image
 */
export function getImageSizes(context: keyof typeof IMAGE_SIZES): string {
  const config = IMAGE_SIZES[context];

  switch (context) {
    case 'productGrid':
      return '(max-width: 640px) 320px, (max-width: 1024px) 400px, 480px';
    case 'productGallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 60vw';
    case 'cartThumbnail':
    case 'productThumbnail':
      return '100px';
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1600px';
    default:
      return '100vw';
  }
}
