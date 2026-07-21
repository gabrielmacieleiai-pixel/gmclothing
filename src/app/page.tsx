import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { brandAssets } from "@/data/brand-assets";
import { catalogProducts, getProductHref } from "@/data/products";
import { heroSlides } from "@/data/hero-slides";

export const metadata: Metadata = {
  title: "Nova coleção inverno | GM Clothing",
  description:
    "GM Clothing com suéteres chenile, tricô premium, oversized e últimas peças selecionadas.",
  alternates: {
    canonical: "/",
  },
};

const quickCategories = [
  { label: "Inverno", href: "/colecao/frio" },
  { label: "Chenile Zara", href: "/produto/sueter-chenile-zara?cor=caramelo" },
  { label: "Oversized", href: "/colecao/oversized" },
  { label: "Últimas peças", href: "/colecao?categoria=ultimas-pecas" },
];

export default function Home() {
  const chenileProducts = catalogProducts
    .filter((product) => product.canonicalSlug === "sueter-chenile-zara")
    .slice(0, 4);
  const highlightChenile = chenileProducts[0];
  const winterProducts = catalogProducts
    .filter(
      (product) =>
        product.canonicalSlug !== "sueter-chenile-zara" &&
        (product.collection === "Coleção Frio" ||
          product.category === "Suéter" ||
          product.category === "Polo Tricot"),
    )
    .slice(0, 4);
  const oversizedDropProducts = catalogProducts
    .filter((product) => product.category === "Oversized")
    .slice(0, 4);
  const clearanceProducts = catalogProducts
    .filter((product) => product.campaign === "copa-2026")
    .slice(0, 3);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="border-y border-black/10 bg-[#f5f1e8] px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto">
          {quickCategories.map((category) => (
            <Link
              className="shrink-0 border border-black/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-black hover:bg-white"
              href={category.href}
              key={category.label}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8a96a]">
                Produto principal
              </p>
              <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
                Suéter Chenile Zara
              </h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/58">
                Textura real, toque macio e cores fortes para abrir a coleção
                de inverno com desejo e clareza de compra.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {highlightChenile ? (
                  <Link
                    className="flex h-12 items-center justify-center gap-3 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505]"
                    href={getProductHref(highlightChenile)}
                  >
                    Comprar destaque <ArrowUpRight />
                  </Link>
                ) : null}
                <Link
                  className="flex h-12 items-center justify-center gap-3 border border-white/20 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                  href="/colecao/frio"
                >
                  Ver inverno
                </Link>
              </div>
            </div>
            <ProductGrid products={chenileProducts} inverse />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24" id="lancamentos">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Coleção de inverno"
            title="Outros suéteres e tricôs"
            href="/colecao/frio"
            action="Ver coleção frio"
          />
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <Link
              className="group relative min-h-[390px] overflow-hidden bg-[#050505] text-white lg:min-h-full"
              href="/colecao/frio"
            >
              <Image
                alt="Detalhe de textura do Suéter Chenile Zara GM Clothing"
                className="object-contain p-4 opacity-90 transition duration-700 group-hover:scale-[1.015]"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                src={brandAssets.brands2.chenileDetail}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                  Textura premium
                </p>
                <h3 className="max-w-sm text-4xl font-black uppercase leading-[0.88] tracking-display">
                  Frio com presença.
                </h3>
                <span className="mt-5 flex w-fit items-center gap-3 border-b border-white pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
                  Explorar frio <ArrowUpRight />
                </span>
              </div>
            </Link>
            <ProductGrid products={winterProducts} />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-black/45">
                Drop Oversized
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-display sm:text-6xl">
                Presença real.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-black/55 lg:ml-auto">
              Modelagens amplas continuam como base streetwear da marca, com
              fotos grandes, preço claro e navegação direta para o produto.
            </p>
          </div>
          <ProductGrid products={oversizedDropProducts} />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
                Últimas peças
              </p>
              <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
                Peças finais.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
                Uma seleção curta para girar estoque com preço forte, sem tirar
                o foco da nova coleção.
              </p>
              <Link
                className="mt-8 flex h-12 w-fit items-center gap-3 bg-[#050505] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                href="/colecao?categoria=ultimas-pecas"
              >
                Ver últimas peças <ArrowUpRight />
              </Link>
            </div>
            <ProductGrid products={clearanceProducts} />
          </div>
        </div>
      </section>

      <section
        className="border-t border-black/10 bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10"
        id="manifesto"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="max-w-3xl text-3xl font-black uppercase leading-[0.92] tracking-display sm:text-5xl">
            Streetwear masculino premium, fotos reais e peças selecionadas para
            quem não veste qualquer coisa.
          </p>
        </div>
      </section>
    </>
  );
}
