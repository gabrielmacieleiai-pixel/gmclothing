"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import type { HeroSlide } from "@/data/hero-slides";

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
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), slides.length - 1));
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
    <section className="relative overflow-hidden bg-[#050505]">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        ref={scrollerRef}
      >
        {slides.map((slide, index) => (
          <article
            className={`relative min-h-[calc(100svh-96px)] w-full shrink-0 snap-start overflow-hidden ${paletteClasses[slide.palette]}`}
            key={slide.id}
          >
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -right-28 top-[-18%] size-[85vw] rounded-full bg-white/10 blur-[140px]" />
              <div className="absolute bottom-[-24%] left-[-30%] size-[75vw] rounded-full bg-[#c8a96a]/15 blur-[150px]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[1440px] gap-6 px-4 pb-12 pt-10 sm:px-6 lg:min-h-[calc(100svh-96px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:px-10 lg:py-10">
              <div className="relative z-10 flex min-w-0 flex-col justify-end border border-current/10 bg-black/10 px-5 py-8 backdrop-blur-sm sm:px-7 lg:px-10 lg:py-12">
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="grid size-14 place-items-center border border-current/15 bg-white/5">
                      <span className="font-serif text-3xl font-black leading-none tracking-[-0.12em]">
                        GM
                      </span>
                    </div>
                    <div className="text-[9px] font-bold uppercase leading-4 tracking-[0.24em] opacity-55">
                      Clothing
                      <br />
                      For Men
                    </div>
                  </div>
                  <p
                    className={`max-w-[11rem] text-right text-[10px] font-bold uppercase leading-4 tracking-[0.22em] ${accentClasses[slide.palette]}`}
                  >
                    {slide.eyebrow}
                  </p>
                </div>

                <h1 className="max-w-3xl break-words text-[clamp(3.25rem,13vw,8rem)] font-black uppercase leading-[0.84] tracking-display">
                  {slide.title}
                </h1>

                <div className="mt-8 grid gap-5 border-t border-current/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-md text-sm leading-6 opacity-65">
                    {slide.description}
                  </p>
                  <Link
                    className="flex h-12 items-center justify-between gap-8 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505] transition duration-200 hover:bg-[#d4b06a] active:scale-[0.98]"
                    href={slide.href}
                  >
                    {slide.cta} <ArrowUpRight />
                  </Link>
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-bold uppercase tracking-[0.14em] opacity-60">
                  <li>Drops limitados</li>
                  <li>Fotos reais</li>
                  <li>Compra rápida</li>
                </ul>
              </div>

              <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-[#050505]/35 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:min-h-[500px] lg:min-h-0">
                {slide.image ? (
                  <>
                    {slide.mobileImage ? (
                      <Image
                        alt={slide.eyebrow}
                        className={`lg:hidden ${
                          slide.mobileImageFit === "contain"
                            ? "object-contain p-4 sm:p-8"
                            : "object-cover"
                        }`}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        src={slide.mobileImage}
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
                      className={`${slide.mobileImage ? "hidden lg:block" : ""} ${
                        slide.imageFit === "contain"
                          ? "object-contain p-4 sm:p-8"
                          : "object-cover"
                      }`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      src={slide.image}
                      style={{ objectPosition: slide.imagePosition ?? "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(200,169,106,0.22),transparent_28%),linear-gradient(135deg,#050505_0%,#102316_56%,#050505_100%)]">
                    <div className="absolute -right-12 top-10 h-[120%] w-32 rotate-12 bg-[#f4d21e]/10 blur-sm" />
                    <div className="absolute right-16 top-0 h-full w-px bg-[#f4d21e]/30" />
                    <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-[#050505] to-transparent" />
                    <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-6 sm:min-h-[500px] sm:p-9 lg:p-12">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a96a]">
                        Copa 2026 / Brasil
                      </p>
                      <p className="text-[20vw] font-black uppercase leading-[0.74] tracking-display text-white/95 sm:text-8xl lg:text-[9rem]">
                        Brasil
                      </p>
                      <p className="mt-3 max-w-sm text-xs font-bold uppercase leading-5 tracking-[0.18em] text-white/58">
                        Futebol, identidade e presença para viver a temporada
                        dentro e fora de campo.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute bottom-5 left-4 right-4 z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              aria-label={`Ir para banner ${index + 1}: ${slide.eyebrow}`}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? "w-8 bg-white" : "w-3 bg-white/35"
              }`}
              key={slide.id}
              onClick={() => goToSlide(index)}
              type="button"
            />
          ))}
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
