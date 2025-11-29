"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { GridTileImage } from "../grid/tile";
import { useProduct, useUpdateURL } from "./product-context";

export default function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gaming-900/30">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain p-8"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            src={images[imageIndex]?.src as string}
            alt={images[imageIndex]?.altText as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-6 flex w-full justify-center">
            <div className="flex h-12 items-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-2">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
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
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5 text-white" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <ul className="mt-6 flex items-center gap-3 overflow-auto">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src} className="flex-shrink-0">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className={`block h-20 w-20 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    isActive ? 'border-accent-secondary scale-105' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    active={isActive}
                    width={80}
                    height={80}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
