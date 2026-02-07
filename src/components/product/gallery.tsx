"use client";

import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);

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

  // Handle keyboard navigation in zoom mode
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isZoomed) return;
      
      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setZoomImageIndex((prev) => (prev + 1 < images.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setZoomImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [isZoomed, images.length]);

  // Prevent body scroll when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const openZoom = (index: number) => {
    setZoomImageIndex(index);
    setIsZoomed(true);
  };

  const nextZoomImage = () => {
    setZoomImageIndex((prev) => (prev + 1 < images.length ? prev + 1 : 0));
  };

  const prevZoomImage = () => {
    setZoomImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

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
        <div 
          className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gaming-900/30 cursor-zoom-in group"
          onClick={() => openZoom(imageIndex)}
        >
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
              
              {/* Zoom indicator */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl px-3 py-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Click to zoom</span>
              </div>
              
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
          <div 
            className="absolute bottom-6 flex w-full justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 items-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  startTransition(() => {
                    const newState = updateImage(previousImageIndex.toString());
                    updateURL(newState);
                    setImageLoaded(true);
                  });
                }}
                aria-label="Previous product image"
                className={buttonClassName}
                type="button"
              >
                <ArrowLeftIcon className="h-5 text-white" />
              </button>
              <div className="mx-2 h-6 w-px bg-white/20"></div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  startTransition(() => {
                    const newState = updateImage(nextImageIndex.toString());
                    updateURL(newState);
                    setImageLoaded(true);
                  });
                }}
                aria-label="Next product image"
                className={buttonClassName}
                type="button"
              >
                <ArrowRightIcon className="h-5 text-white" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10 text-sm text-white pointer-events-none">
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
                  onClick={(e) => {
                    // Allow right-click to open zoom directly
                    if (e.ctrlKey || e.metaKey) {
                      e.preventDefault();
                      openZoom(index);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    openZoom(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                  title="Click to select, Double-click to zoom"
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

      {/* Zoom Modal/Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsZoomed(false);
            }
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsZoomed(false);
            }}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            aria-label="Close zoom"
            type="button"
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white z-50 pointer-events-none">
              {zoomImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevZoomImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-110"
                aria-label="Previous image"
                type="button"
              >
                <ArrowLeftIcon className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextZoomImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-110"
                aria-label="Next image"
                type="button"
              >
                <ArrowRightIcon className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Zoomed image */}
          <div 
            className="relative w-[90vw] h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getOptimizedShopifyImage(images[zoomImageIndex].src, { width: 1920, format: 'webp' })}
              alt={images[zoomImageIndex].altText || 'Product image'}
              fill
              sizes="90vw"
              quality={95}
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      </form>
    </>
  );
}
