import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { catalogProducts, getProductDisplayStock } from "@/data/products";
import {
  WINTER_SALE_CHENILLE_SLUG,
  WINTER_SALE_OTHER_SLUGS,
} from "@/lib/winter-sale";

export const metadata: Metadata = {
  title: { absolute: "Winter Sale | GM Clothing" },
  description:
    "Winter Sale GM Clothing. Suéter Chenille Zara por R$199,90 e suéteres selecionados por R$149,90. Enquanto houver estoque.",
  alternates: {
    canonical: "/sale-inverno",
  },
  openGraph: {
    title: "Winter Sale | GM Clothing",
    description:
      "Chenille Zara por R$199,90 e suéteres selecionados por R$149,90.",
    type: "website",
  },
};

export default function WinterSalePage() {
  const chenilleProducts = catalogProducts
    .filter(
      (product) =>
        (product.canonicalSlug ?? product.slug) ===
        WINTER_SALE_CHENILLE_SLUG,
    )
    .sort(sortByAvailability);
  const otherSweaters = WINTER_SALE_OTHER_SLUGS.flatMap((slug) =>
    catalogProducts.filter(
      (product) => (product.canonicalSlug ?? product.slug) === slug,
    ),
  ).sort(sortByAvailability);
  const productCount = chenilleProducts.length + otherSweaters.length;

  return (
    <main className="bg-[#f5f1e8] text-[#050505]">
      <section className="bg-[#050505] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <nav
            aria-label="Navegação estrutural"
            className="mb-12 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/45"
          >
            <Link className="transition-colors hover:text-white" href="/">
              Início
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Winter Sale</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8a96a]">
            Enquanto houver estoque
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-9xl">
            Winter Sale
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            Peças selecionadas para os dias frios.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 border-y border-white/20">
            <div className="border-r border-white/20 py-5 pr-4">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                Chenille Zara
              </span>
              <span className="mt-2 block text-2xl font-black">R$199,90</span>
            </div>
            <div className="py-5 pl-4">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                Outros suéteres
              </span>
              <span className="mt-2 block text-2xl font-black">R$149,90</span>
            </div>
          </div>
          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
            {productCount} opções na campanha
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Produto-herói"
            title="Chenille Zara"
          />
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-y border-black/15 py-5">
            <p className="max-w-xl text-sm leading-6 text-black/55">
              Textura premium, toque macio e presença para os dias frios.
            </p>
            <p className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.14em] text-black/35 line-through">
                R$299,90
              </span>
              <span className="mt-1 block text-2xl font-black">R$199,90</span>
            </p>
          </div>
          {chenilleProducts.length ? (
            <ProductGrid products={chenilleProducts} />
          ) : (
            <EmptyCampaignState />
          )}
        </div>
      </section>

      <section
        aria-label="Benefícios da Winter Sale"
        className="border-y border-white/15 bg-[#050505] px-5 text-white sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Pronta entrega",
            "Entrega grátis em Balneário Camboriú e região",
            "Envio para todo o Brasil",
            "Enquanto houver estoque",
          ].map((benefit) => (
            <p
              className="flex min-h-20 items-center border-b border-white/15 py-4 text-[9px] font-bold uppercase tracking-[0.15em] text-white/70 last:border-b-0 sm:min-h-24 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
              key={benefit}
            >
              {benefit}
            </p>
          ))}
        </div>
      </section>

      <section
        className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
        id="outros-sueteres"
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Seleção da campanha"
            title="Outros suéteres"
          />
          <p className="mb-8 border-y border-black/15 py-5 text-2xl font-black">
            R$149,90
          </p>
          {otherSweaters.length ? (
            <ProductGrid products={otherSweaters} />
          ) : (
            <EmptyCampaignState />
          )}
        </div>
      </section>
    </main>
  );
}

function sortByAvailability(
  firstProduct: (typeof catalogProducts)[number],
  secondProduct: (typeof catalogProducts)[number],
) {
  return (
    Number(getProductDisplayStock(firstProduct) === 0) -
    Number(getProductDisplayStock(secondProduct) === 0)
  );
}

function EmptyCampaignState() {
  return (
    <div className="border border-black/15 px-5 py-10 text-sm text-black/55">
      Nenhum produto disponível nesta seção no momento.
    </div>
  );
}
