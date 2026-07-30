import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { brandAssets } from "@/data/brand-assets";
import {
  catalogProducts,
  featuredProducts,
  getProductHref,
} from "@/data/products";
import { heroSlides } from "@/data/hero-slides";
import { getImageVariantSrc } from "@/lib/image-variants";

export const metadata: Metadata = {
  title: "GM Clothing | Streetwear com identidade",
  description:
    "Streetwear masculino premium com inverno, oversized e peças selecionadas pela GM Clothing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GM Clothing | Streetwear com identidade",
    description:
      "Streetwear masculino premium com inverno, oversized e peças selecionadas pela GM Clothing.",
    type: "website",
    images: [brandAssets.brands2.chenileHero],
  },
};

const benefits = [
  "Fotos reais",
  "Envio rápido",
  "Drops limitados",
  "Compra segura",
];

const categoryTiles = [
  {
    label: "Inverno",
    eyebrow: "Texturas para a estação",
    href: "/colecao/frio",
    image: brandAssets.brands2.frioHeroDesktop,
    mobileImage: brandAssets.brands2.frioHeroMobile,
  },
  {
    label: "Oversized",
    eyebrow: "Modelagens amplas",
    href: "/colecao/oversized",
    image: brandAssets.brands2.oversizedHeroDesktop,
    mobileImage: brandAssets.brands2.oversizedHeroMobile,
  },
  {
    label: "Ultimas peças",
    eyebrow: "Seleção de estoque curto",
    href: "/colecao?categoria=ultimas-peças",
    image: brandAssets.brands2.oversizedBrasil,
    mobileImage: brandAssets.brands2.oversizedBrasil,
  },
];

const instagramTiles = [
  {
    src: brandAssets.brands2.frioLifestyle,
    alt: "Editorial de inverno GM Clothing",
  },
  {
    src: brandAssets.brands2.oversizedLifestyle,
    alt: "Editorial oversized GM Clothing",
  },
  {
    src: brandAssets.brands2.brandAtmosphere,
    alt: "Atmosfera da GM Clothing",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GM Clothing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "Streetwear masculino premium.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GM Clothing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  potentialAction: {
    "@type": "SearchAction",
    target:
      (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
      "/colecao?busca={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  const winterProducts = catalogProducts
    .filter((product) => (product.collection?.toLowerCase().includes("frio") ?? false))
    .slice(0, 4);

  const newProducts = catalogProducts
    .filter((product) => {
      const badge = product.badge?.toLowerCase() ?? "";
      return badge.includes("novo") || badge.includes("lan");
    })
    .slice(0, 4);

  const lastPieces = catalogProducts
    .filter((product) => product.campaign === "copa-2026")
    .slice(0, 4);

  const highlightChenile = catalogProducts.find(
    (product) => product.canonicalSlug === "sueter-chenile-zara",
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
        type="application/ld+json"
      />

      <HeroCarousel slides={heroSlides} />

      <section
        aria-label="Beneficios GM Clothing"
        className="border-b border-black/10 bg-[#050505] text-white"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-white/15 sm:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              className="flex min-h-20 items-center justify-center px-3 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-white/75 sm:min-h-24 sm:px-5 sm:text-[10px]"
              key={benefit}
            >
              <span aria-hidden="true" className="mr-2 text-[#c8a96a]">
                +
              </span>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <section className="home-section bg-[#f5f1e8] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            action="Ver inverno"
            eyebrow="Coleção Inverno"
            href="/colecao/frio"
            title="Camadas com presenca."
          />
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
            <Link
              className="group relative min-h-[440px] overflow-hidden bg-[#17130f] text-white sm:min-h-[560px]"
              href={
                highlightChenile
                  ? getProductHref(highlightChenile)
                  : "/colecao/frio"
              }
              prefetch={false}
            >
              <Image
                alt="Sueter Chenile Zara em editorial de inverno"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                fill
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 38vw"
                src={getImageVariantSrc(
                  brandAssets.brands2.chenileHero,
                  "hero",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b06a]">
                  Produto principal
                </p>
                <h3 className="font-display mt-3 max-w-[10ch] text-4xl font-bold uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
                  Sueter Chenile Zara
                </h3>
                <span className="mt-6 inline-flex items-center gap-3 border-b border-white pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
                  Conhecer peca <ArrowUpRight />
                </span>
              </div>
            </Link>

            <ProductGrid products={winterProducts} priorityCount={2} />
          </div>
        </div>
      </section>

      <section className="home-section bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            action="Ver colecao"
            eyebrow="Mais vendidos"
            href="/colecao"
            title="Os favoritos da GM."
          />
          <ProductGrid products={featuredProducts.slice(0, 4)} priorityCount={2} />
        </div>
      </section>

      <section className="home-section bg-[#f5f1e8] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            action="Ver novidades"
            eyebrow="Novidades"
            href="/colecao"
            title="Chegou agora."
          />
          {newProducts.length > 0 ? (
            <ProductGrid products={newProducts} priorityCount={2} />
          ) : (
            <div className="border border-black/10 bg-white/50 p-8 text-sm text-black/55">
              Novas peças entram em breve no catalogo.
            </div>
          )}
        </div>
      </section>

      <section className="home-section bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            action="Explorar categorias"
            eyebrow="Escolha seu ritmo"
            href="/colecao"
            title="Encontre sua próxima peça."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {categoryTiles.map((category) => {
              const hasMobileImage =
                category.mobileImage !== category.image;

              return (
                <Link
                  className="group relative min-h-[300px] overflow-hidden bg-[#050505] text-white sm:min-h-[390px]"
                  href={category.href}
                  key={category.label}
                  prefetch={false}
                >
                  {hasMobileImage ? (
                    <Image
                      alt={category.label}
                      className="object-cover lg:hidden"
                      fill
                      quality={76}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      src={getImageVariantSrc(category.mobileImage, "card")}
                    />
                  ) : null}
                  <Image
                    alt={category.label}
                    className={(hasMobileImage ? "hidden lg:block " : "") + "object-cover transition duration-700 group-hover:scale-[1.03]"}
                    fill
                    quality={76}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={getImageVariantSrc(category.image, "card")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
                      {category.eyebrow}
                    </p>
                    <h3 className="font-display mt-2 text-3xl font-bold uppercase leading-none tracking-[-0.06em]">
                      {category.label}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em]">
                      Explorar <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              );
            })}
            <Link
              className="group flex min-h-[300px] flex-col justify-between bg-[#050505] p-6 text-white sm:min-h-[390px] sm:p-8"
              href="/acessorios"
              prefetch={false}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#c8a96a]">
                Detalhes que elevam
              </span>
              <div>
                <h3 className="font-display max-w-[8ch] text-4xl font-bold uppercase leading-[0.88] tracking-[-0.06em]">
                  Acessórios
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-white/40 pb-2 text-[9px] font-bold uppercase tracking-[0.18em]">
                  Ver em breve <ArrowUpRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section bg-[#f5f1e8] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
              Ultimas peças
            </p>
            <h2 className="font-display mt-4 max-w-[8ch] text-5xl font-bold uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl">
              Presença sem repetição.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
              Uma selecao curta de peças prontas para sair. Estoque enxuto,
              escolha direta e compra segura.
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center gap-4 bg-[#050505] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c8a96a] hover:text-[#050505]"
              href="/colecao?categoria=ultimas-peças"
              prefetch={false}
            >
              Ver ultimas peças <ArrowUpRight />
            </Link>
          </div>
          <ProductGrid products={lastPieces} priorityCount={1} />
        </div>
      </section>

      <section
        className="home-section border-t border-black/10 bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24"
        id="avaliacoes"
      >
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
              Avaliações
            </p>
            <h2 className="font-display mt-4 max-w-[11ch] text-4xl font-bold uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Experiência que continua depois da compra.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/55 lg:ml-auto">
            As avaliacoes verificadas serao publicadas aqui conforme os pedidos
            forem entregues. A GM Clothing nao usa depoimentos inventados.
          </p>
        </div>
      </section>

      <section
        className="home-section bg-[#050505] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-24"
        id="instagram"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/15 pb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                Instagram
              </p>
              <h2 className="font-display mt-3 text-4xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                GM em movimento.
              </h2>
            </div>
            <a
              className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-[#c8a96a] sm:flex"
              href="https://www.instagram.com/gm.clo/"
              rel="noreferrer"
              target="_blank"
            >
              @gm.clo <ArrowUpRight />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {instagramTiles.map((tile) => (
              <a
                className="group relative aspect-[4/5] overflow-hidden bg-white/5"
                href="https://www.instagram.com/gm.clo/"
                key={tile.src}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt={tile.alt}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  fill
                  quality={76}
                  sizes="(max-width: 640px) 33vw, 30vw"
                  src={getImageVariantSrc(tile.src, "card")}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
