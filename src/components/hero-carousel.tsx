"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import type { HeroSlide } from "@/data/hero-slides";
import { getImageVariantSrc } from "@/lib/image-variants";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

const paletteClasses: Record<HeroSlide["palette"], string> = {
  black: "bg-[#050505] text-white",
  navy: "bg-[#07111f] text-white",
  military: "bg-[#142016] text-white",
  bone: "bg-white text-[#050505]",
  gold: "bg-[#1b1710] text-white",
};

const accentClasses: Record<HeroSlide["palette"], string> = {
  black: "text-[#c8a96a]",
  navy: "text-[#9bb8d3]",
  military: "text-[#9faa83]",
  bone: "text-[#5b5139]",
  gold: "text-[#d4b06a]",
};

const HERO_IMAGE_WIDTHS = {
  desktop: 1920,
  mobile: 900,
};

const HERO_IMAGE_HEIGHTS = {
  desktop: 1080,
  mobile: 1400,
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const scroller = scrollerRef.current;

      if (!scroller) {
        return;
      }

      const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
      const clampedIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
      setActiveIndex((currentIndex) =>
        currentIndex === clampedIndex ? currentIndex : clampedIndex,
      );
    });
  }

  function goToSlide(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <section aria-label="Campanha principal GM Clothing" className="relative overflow-hidden bg-[#050505]">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        ref={scrollerRef}
      >
        {slides.map((slide, index) => {
          const hasSeparateMobileImage =
            Boolean(slide.mobileImage) && slide.mobileImage !== slide.image;
          const isComposedImage = slide.composedImage === true;

          return (
            <article
              className={"relative min-h-[calc(100svh-104px)] w-full shrink-0 snap-start overflow-hidden " + paletteClasses[slide.palette]}
              key={slide.id}
            >
              <div className="absolute inset-0">
                {slide.image ? (
                  hasSeparateMobileImage && slide.mobileImage ? (
                    <HeroPicture priority={index === 0} slide={slide} />
                  ) : (
<Image
  alt={slide.eyebrow}
  className="object-cover bg-black"
  fill
  priority={index === 0}
  quality={82}
  sizes="100vw"
  src={getImageVariantSrc(slide.image, "hero")}
  style={{
    objectPosition: slide.imagePosition ?? "center",
  }}
/>
                  )
                ) : null}
                {!isComposedImage ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/20 to-[#050505]/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/65 via-transparent to-[#050505]/20" />
                  </>
                ) : null}
              </div>

              {isComposedImage ? (
                <>
                  <span className="sr-only">
                    {slide.title}. {slide.description}
                  </span>
                  <Link
                    aria-label={`${slide.cta} - ${slide.title}`}
                    className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
                    href={slide.href}
                    prefetch={false}
                  />
                </>
              ) : (
                <div className="relative z-10 mx-auto flex min-h-[calc(100svh-104px)] w-full max-w-[1440px] flex-col justify-between px-5 pb-28 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pb-32 lg:pt-20">
                <div className="flex items-start justify-between gap-6 text-[9px] font-bold uppercase tracking-[0.24em] text-white/65">
                  <span>GM Clothing / For Men</span>
                  <span className={accentClasses[slide.palette]}>{slide.eyebrow}</span>
                </div>

                <div className="max-w-3xl">
                  {slide.id !== "ultimas-pecas" ? (
                    <p
                      className={"mb-5 text-[10px] font-bold uppercase tracking-[0.3em] " + accentClasses[slide.palette]}
                    >
                      Coleção atual
                    </p>
                  ) : null}
                  <h1 className="font-display max-w-[11ch] text-[clamp(3.8rem,15vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.075em] text-white [text-wrap:balance]">
                    {slide.title}
                  </h1>
                  {slide.offer ? (
                    <p className="mt-6 max-w-xl text-base font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-xl">
                      {slide.offer}
                    </p>
                  ) : null}
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    {slide.description}
                  </p>
                  {slide.highlights?.length ? (
                    <div className="mt-6 grid max-w-lg grid-cols-2 divide-x divide-white/20 border-y border-white/20 py-4">
                      {slide.highlights.map((highlight) => (
                        <div className="px-4 first:pl-0" key={highlight.label}>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
                            {highlight.label}
                          </p>
                          <p className="mt-1 text-lg font-black tracking-[-0.03em] text-white sm:text-2xl">
                            {highlight.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    className="mt-8 inline-flex h-14 items-center gap-8 bg-white px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#050505] transition-colors hover:bg-[#d4b06a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    href={slide.href}
                    prefetch={false}
                  >
                    {slide.cta} <ArrowUpRight />
                  </Link>
                </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-5 right-5 z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              aria-label={"Ir para banner " + (index + 1) + ": " + slide.eyebrow}
              className={"h-1.5 rounded-full transition-all " + (activeIndex === index ? "w-8 bg-white" : "w-3 bg-white/40")}
              key={slide.id}
              onClick={() => goToSlide(index)}
              type="button"
            />
          ))}
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

function HeroPicture({
  priority,
  slide,
}: {
  priority: boolean;
  slide: HeroSlide;
}) {
  const mobileImage = slide.mobileImage ?? slide.image;
  const desktopImage = slide.image ?? mobileImage;

  if (!mobileImage || !desktopImage) {
    return null;
  }

  const imageAlt = slide.eyebrow;
  const desktopPosition = slide.imagePosition ?? "center";
  const mobilePosition =
    slide.mobileImagePosition ?? slide.imagePosition ?? "center";
  const imageStyle = {
    "--desktop-position": desktopPosition,
    "--mobile-position": mobilePosition,
  } as CSSProperties;
  const loadingProps = priority
    ? { fetchPriority: "high" as const, loading: "eager" as const }
    : { fetchPriority: "auto" as const, loading: "lazy" as const };
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    alt: imageAlt,
    height: HERO_IMAGE_HEIGHTS.desktop,
    quality: 82,
    sizes: "100vw",
    src: getImageVariantSrc(desktopImage, "hero"),
    width: HERO_IMAGE_WIDTHS.desktop,
    ...loadingProps,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    alt: imageAlt,
    height: HERO_IMAGE_HEIGHTS.mobile,
    quality: 82,
    sizes: "100vw",
    src: getImageVariantSrc(mobileImage, "hero"),
    width: HERO_IMAGE_WIDTHS.mobile,
    ...loadingProps,
  });

  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        sizes={desktopProps.sizes}
        srcSet={desktopSrcSet}
      />
      <source sizes={mobileProps.sizes} srcSet={mobileSrcSet} />
      <img
        {...mobileProps}
        alt={imageAlt}
        className="size-full object-cover [object-position:var(--mobile-position)] lg:[object-position:var(--desktop-position)]"
        decoding={priority ? "sync" : "async"}
        style={imageStyle}
      />
    </picture>
  );
}
