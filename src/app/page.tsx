import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { HeroCarousel } from "@/components/hero-carousel";
import { LeadCapture } from "@/components/lead-capture";
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
  { label: "Oversized", href: "/colecao?categoria=oversized#catalogo" },
  { label: "Futebol", href: "/copa-do-mundo" },
  { label: "Coleção Frio", href: "/colecao?categoria=frio#catalogo" },
  { label: "Acessórios", href: "/acessorios" },
  { label: "Lista VIP", href: "#lead-capture" },
];

const collectionStories = [
  {
    eyebrow: "Campanha",
    title: "Drop Copa 2026",
    description: "Futebol e streetwear em uma linha com Brasil em destaque.",
    href: "/copa-do-mundo",
    cta: "Ver Copa",
    image: brandAssets.brands2.copaBrasilDesktop,
    imagePosition: "center",
  },
  {
    eyebrow: "Street",
    title: "Oversized com presença",
    description: "Caimento amplo, peso visual e leitura urbana sem excesso.",
    href: "/colecao?categoria=oversized#catalogo",
    cta: "Ver oversized",
    image: brandAssets.brands2.oversizedLifestyle,
    imagePosition: "center",
  },
  {
    eyebrow: "Textura",
    title: "Frio sem cara de básico",
    description: "Tricot e polos com acabamento limpo para elevar o look.",
    href: "/colecao?categoria=frio#catalogo",
    cta: "Ver frio",
    image: brandAssets.brands2.frioEditorial,
    imagePosition: "center",
  },
];

export default function Home() {
  const oversizedDropProducts = catalogProducts
    .filter((product) => product.category === "Oversized")
    .slice(0, 4);
  const winterProducts = catalogProducts
    .filter(
      (product) =>
        product.collection === "Coleção Frio" ||
        product.category === "Suéter" ||
        product.category === "Polo Tricot",
    )
    .slice(0, 4);
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

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 grid gap-5 border-b border-black/10 pb-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
                Curadoria GM
              </p>
              <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.88] tracking-display sm:text-6xl">
                Materiais reais. Campanhas com função.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-black/55 lg:ml-auto">
              As imagens fortes viram vitrine, prova de qualidade e atalhos de
              compra. Menos ruído. Mais desejo.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {collectionStories.map((story) => (
              <Link
                className="group relative min-h-[430px] overflow-hidden bg-[#050505] text-white"
                href={story.href}
                key={story.title}
              >
                <Image
                  alt=""
                  className="object-cover opacity-85 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={story.image}
                  style={{ objectPosition: story.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                    {story.eyebrow}
                  </p>
                  <h3 className="max-w-xs text-3xl font-black uppercase leading-[0.9] tracking-display">
                    {story.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-xs leading-5 text-white/60">
                    {story.description}
                  </p>
                  <span className="mt-5 flex w-fit items-center gap-3 border-b border-white pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
                    {story.cta} <ArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
            <ProductGrid products={copaProducts} inverse />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24" id="lancamentos">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Lançamentos"
            title="Frio e tricô"
            href="/colecao?categoria=frio#catalogo"
            action="Ver coleção frio"
          />
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <Link
              className="group relative min-h-[390px] overflow-hidden bg-[#050505] text-white lg:min-h-full"
              href="/colecao?categoria=frio#catalogo"
            >
              <Image
                alt="Campanha de lançamentos de frio GM Clothing"
                className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.035]"
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
            href="/colecao?categoria=frio#catalogo"
          >
            Ver lançamentos
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <AccessoryCrossSell
            eyebrow="Acessórios"
            title="Detalhes que elevam"
          />
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

      <section className="grid bg-[#050505] text-white lg:grid-cols-2">
        <div className="relative min-h-[440px] overflow-hidden bg-[#151515] lg:min-h-[650px]">
          <Image
            src={brandAssets.brands2.premiumDetails}
            alt="Material de apoio mostrando tecido premium de alta gramatura"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-20">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-[#c8a96a]">
            Prova de qualidade
          </p>
          <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-display sm:text-7xl">
            O valor aparece no detalhe.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-white/58">
            Material de apoio usado como reforço visual: tecido encorpado,
            caimento oversized e conforto como argumento de compra sem poluir a
            tela.
          </p>
          <div className="mt-8 grid gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 sm:grid-cols-3">
            <span className="border border-white/15 px-4 py-4">Gramatura</span>
            <span className="border border-white/15 px-4 py-4">Caimento</span>
            <span className="border border-white/15 px-4 py-4">Conforto</span>
          </div>
        </div>
      </section>

      <section
        className="bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24"
        id="manifesto"
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Manifesto GM"
            title="Não veste qualquer coisa."
            inverse
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <p className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-display sm:text-6xl lg:text-7xl">
              Streetwear masculino com identidade, propósito e presença.
            </p>
            <div className="border-l border-[#c8a96a] pl-5 lg:ml-auto lg:max-w-sm">
              <p className="text-sm leading-6 text-white/55">
                Peças pensadas para quem veste estilo como posicionamento. Fé
                discreta, cultura urbana e visual limpo para o dia real.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
                <span className="border border-white/15 px-3 py-3">
                  Drops limitados
                </span>
                <span className="border border-white/15 px-3 py-3">
                  Fotos reais
                </span>
                <span className="border border-white/15 px-3 py-3">
                  Compra rápida
                </span>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8a96a]">
                GM Clothing / Streetwear com identidade
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid bg-[#f5f1e8] lg:grid-cols-2">
        <div className="relative min-h-[450px] overflow-hidden bg-[#d8d3c8] lg:min-h-[620px]">
          <Image
            src={brandAssets.brands2.oversizedManifesto}
            alt="Campanha streetwear GM Clothing com modelo usando oversized"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-20">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-[#5b5139]">
            Court Culture
          </p>
          <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-display sm:text-7xl">
            Das quadras para a rua.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-black/60">
            Imagens lifestyle da pasta de materiais viram narrativa de basquete,
            rua e presença sem parecer vitrine comum.
          </p>
          <Link
            href="/produto/oversized-court-verde-militar"
            className="mt-8 flex w-fit items-center gap-3 border-b border-ink pb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            Conhecer a peça <ArrowUpRight />
          </Link>
        </div>
      </section>

      <LeadCapture />
    </>
  );
}
