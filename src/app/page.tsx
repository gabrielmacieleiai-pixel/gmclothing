import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { brandAssets } from "@/data/brand-assets";
import { catalogProducts, copaProducts } from "@/data/products";
import { heroSlides } from "@/data/hero-slides";

export const metadata: Metadata = {
  title: "Drop Copa 2026 e streetwear masculino premium",
  description:
    "GM Clothing com Drop Copa 2026, oversized, coleção frio e streetwear masculino premium.",
  alternates: {
    canonical: "/",
  },
};

const quickCategories = [
  { label: "Copa 2026", href: "/copa-do-mundo" },
  { label: "Oversized", href: "/colecao/oversized" },
  { label: "Futebol", href: "/copa-do-mundo" },
  { label: "Coleção Frio", href: "/colecao/frio" },
];

export default function Home() {
  const oversizedDropProducts = catalogProducts
    .filter((product) => product.category === "Oversized")
    .slice(0, 3);
  const copaHomeProducts = copaProducts.slice(0, 3);
  const winterProducts = catalogProducts
    .filter(
      (product) =>
        product.collection === "Coleção Frio" ||
        product.category === "Suéter" ||
        product.category === "Polo Tricot",
    )
    .slice(0, 3);
  const launchProducts = winterProducts;

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
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#72c7ef]">
                Campanha principal
              </p>
              <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
                Drop Copa 2026
              </h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/55">
                Futebol, streetwear e identidade em uma linha feita para viver
                o momento dentro e fora de campo.
              </p>
              <Link
                className="mt-8 flex h-12 w-fit items-center gap-3 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505]"
                href="/copa-do-mundo"
              >
                Ver Drop Copa <ArrowUpRight />
              </Link>
            </div>
            <ProductGrid products={copaHomeProducts} inverse />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24" id="lancamentos">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Lançamentos"
            title="Frio e tricô"
            href="/colecao/frio"
            action="Ver coleção frio"
          />
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <Link
              className="group relative min-h-[390px] overflow-hidden bg-[#050505] text-white lg:min-h-full"
              href="/colecao/frio"
            >
              <Image
                alt="Campanha de lançamentos de frio GM Clothing"
                className="object-contain p-3 opacity-90 transition duration-700 group-hover:scale-[1.015]"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                src={brandAssets.brands2.frioStatement}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                  Coleção de inverno
                </p>
                <h3 className="max-w-sm text-4xl font-black uppercase leading-[0.88] tracking-display">
                  Novidades da estação.
                </h3>
                <span className="mt-5 flex w-fit items-center gap-3 border-b border-white pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
                  Explorar frio <ArrowUpRight />
                </span>
              </div>
            </Link>
            <ProductGrid products={launchProducts} />
          </div>
          <Link
            className="mt-10 flex h-12 items-center justify-center border border-ink text-[10px] font-bold uppercase tracking-[0.18em] sm:hidden"
            href="/colecao/frio"
          >
            Ver lançamentos
          </Link>
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
              Produtos da pasta oversized entram com fotos grandes, preço claro
              e compra rápida. O foco é valor percebido antes do clique.
            </p>
          </div>
          <ProductGrid products={oversizedDropProducts} />
        </div>
      </section>
    </>
  );
}
