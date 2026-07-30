"use client";

import Image from "next/image";
import Link from "next/link";
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
  bone: "bg-[#f5f1e8] text-[#050505]",
  gold: "bg-[#1b1710] text-white",
};

const accentClasses: Record<HeroSlide["palette"], string> = {
  black: "text-[#c8a96a]",
  navy: "text-[#9bb8d3]",
  military: "text-[#9faa83]",
  bone: "text-[#5b5139]",
  gold: "text-[#d4b06a]",
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
                  <>
                    {hasSeparateMobileImage && slide.mobileImage ? (
                      <Image
                        alt={slide.eyebrow}
                        className="object-cover lg:hidden"
                        fill
                        priority={index === 0}
                        quality={80}
                        sizes="100vw"
                        src={getImageVariantSrc(slide.mobileImage, "hero")}
                        style={{
                          objectPosition:
                            slide.mobileImagePosition ??
                            slide.imagePosition ??
                            "center",
                        }}
                      />
                    ) : null}
                    <Image
                      alt={slide.eyebrow}
                      className={(hasSeparateMobileImage ? "hidden lg:block " : "") + "object-cover"}
                      fill
                      priority={index === 0}
                      quality={80}
                      sizes="100vw"
                      src={getImageVariantSrc(slide.image, "hero")}
                      style={{
                        objectPosition: slide.imagePosition ?? "center",
                      }}
                    />
                  </>
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
                    aria-label="Ver coleção Chenille Zara"
                    className="absolute left-[7%] top-[74%] z-10 h-[7%] w-[38%] cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:left-[6%] sm:top-[78%] sm:h-[7%] sm:w-[32%] lg:left-[5%] lg:top-[84%] lg:h-[8%] lg:w-[23%] xl:top-[86%]"
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
                  <p
                    className={"mb-5 text-[10px] font-bold uppercase tracking-[0.3em] " + accentClasses[slide.palette]}
                  >
                    Coleção atual
                  </p>
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
