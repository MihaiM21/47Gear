"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProduct, useUpdateURL } from "./product-context";
import { 
  getOptimizedShopifyImage, 
  getShopifyImageBlurDataURL,
  getImageSizes 
} from "@/lib/shopify/image-optimizer";

export default function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));

  // Aggressively preload all images for instant navigation
  useEffect(() => {
    const preloadAllImages = () => {
      images.forEach((image, index) => {
        if (!preloadedImages.has(index)) {
          const img = new window.Image();
          img.src = getOptimizedShopifyImage(image.src, { width: 800, format: 'webp' });
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, index]));
          };
        }
      });
    };

    // Start preloading immediately
    if (typeof window !== 'undefined') {
      preloadAllImages();
    }
  }, [images, preloadedImages]);

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  const currentImage = images[imageIndex];
  const optimizedImageUrl = currentImage 
    ? getOptimizedShopifyImage(currentImage.src, { width: 800, format: 'webp' })
    : '';

  return(
    <>
      {/* DNS prefetch and preconnect for Shopify CDN */}
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
      
      <form>
        {/* Main Image - Adapts to image aspect ratio */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gaming-900/30">
          {currentImage && (
            <>
              <Image
                className={`transition-opacity duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                src={optimizedImageUrl}
                alt={currentImage.altText || 'Product image'}
                priority={imageIndex === 0}
                quality={85}
                placeholder="blur"
                blurDataURL={getShopifyImageBlurDataURL(currentImage.src)}
                onLoad={() => setImageLoaded(true)}
                style={{
                  objectFit: 'contain',
                  padding: '2rem',
                }}
              />
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-accent-secondary/30 border-t-accent-secondary rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}

        {/* Navigation Controls */}
        {images.length > 1 ? (
          <div className="absolute bottom-6 flex w-full justify-center z-10">
            <div className="flex h-12 items-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-2">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                  setImageLoaded(true); // Image is already preloaded
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5 text-white" />
              </button>
              <div className="mx-2 h-6 w-px bg-white/20"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                  setImageLoaded(true); // Image is already preloaded
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5 text-white" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10 text-sm text-white">
            {imageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 ? (
        <div className="mt-6 relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-accent-primary/50 scrollbar-track-gaming-900/30">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              const thumbnailUrl = getOptimizedShopifyImage(image.src, { 
                width: 120, 
                height: 120, 
                crop: 'center',
                format: 'webp' 
              });
              
              return (
                <button
                  key={image.src}
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                    setImageLoaded(true); // Image is already preloaded
                  }}
                  aria-label={`View image ${index + 1}`}
                  className={`relative flex-shrink-0 h-20 w-20 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-accent-secondary scale-105 ring-2 ring-accent-secondary/50' 
                      : 'border-white/10 hover:border-accent-primary/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={thumbnailUrl}
                    alt={image.altText}
                    fill
                    sizes="80px"
                    quality={70}
                    placeholder="blur"
                    blurDataURL={getShopifyImageBlurDataURL(image.src)}
                    className="object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-accent-secondary/10"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      </form>
    </>
  );
}
