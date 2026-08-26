"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { getImageVariantSrc } from "@/lib/image-variants";
import type { ProductPhoto } from "@/types/product";

type ProductCardGalleryProps = {
  href: string;
  photos: ProductPhoto[];
  priority?: boolean;
  productName: string;
};

export function ProductCardGallery({
  href,
  photos,
  priority = false,
  productName,
}: ProductCardGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageList = photos.filter((photo, index, allPhotos) =>
    allPhotos.findIndex((item) => item.src === photo.src) === index,
  );
  const hasMultipleImages = imageList.length > 1;
  const activePhoto = imageList[activeIndex] ?? imageList[0];
  const isVectorPhoto = activePhoto?.src.toLowerCase().endsWith(".svg");

  function moveImage(direction: -1 | 1) {
    if (!hasMultipleImages) {
      return;
    }

    setActiveIndex(
      (currentIndex) =>
        (currentIndex + direction + imageList.length) % imageList.length,
    );
  }

  return (
    <div className="min-w-0">
      <div className="relative aspect-[4/5] touch-auto overflow-hidden bg-[#dedbd3] lg:transition lg:duration-300 lg:group-hover:shadow-[0_18px_45px_rgba(5,5,5,0.14)]">
        <Link
          aria-label={`Ver ${productName}`}
          className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c8a96a]"
          href={href}
          prefetch={false}
        >
          {activePhoto ? (
            <Image
              alt={activePhoto.alt}
              className={`transition duration-500 group-hover:scale-[1.02] ${
                isVectorPhoto
                  ? "object-contain p-6 sm:p-8"
                  : "object-cover object-[center_18%]"
              }`}
              fill
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              quality={84}
              sizes="(max-width: 767px) 84vw, (max-width: 1024px) 32vw, 24vw"
              src={getImageVariantSrc(activePhoto.src, "card")}
            />
          ) : null}
        </Link>

        {hasMultipleImages ? (
          <>
            <button
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/15 text-white/80 opacity-75 backdrop-blur-sm transition hover:bg-black/35 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-8"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                moveImage(-1);
              }}
              type="button"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/15 text-white/80 opacity-75 backdrop-blur-sm transition hover:bg-black/35 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-8"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                moveImage(1);
              }}
              type="button"
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

