import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { brandAssets } from "@/data/brand-assets";
import {
  catalogProducts,
  featuredProducts,
} from "@/data/products";
import { heroSlides } from "@/data/hero-slides";

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
  "Frete grátis acima de R$299,90",
  "Envio rápido",
  "Drops limitados",
  "Compra segura",
];

const categoryTiles = [
  {
    label: "Inverno",
    eyebrow: "Texturas para a estação",
    href: "/colecoes/chenille-zara",
  },
  {
    label: "Oversized",
    eyebrow: "Modelagens amplas",
    href: "/colecao/oversized",
  },
  {
    label: "Linha Cristã",
    eyebrow: "Faith / Vista propósito",
    href: "/colecao/crista",
  },
  {
    label: "Futebol",
    eyebrow: "Seleção e rua",
    href: "/colecao/futebol",
  },
  {
    label: "Lançamentos",
    eyebrow: "Chegou agora",
    href: "/colecao/lancamentos",
  },
  {
    label: "Sale",
    eyebrow: "Condições especiais",
    href: "/colecao/promocao",
  },
  {
    label: "Últimas peças",
    eyebrow: "Estoque limitado",
    href: "/colecao/ultimas-pecas",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GM Clothing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmclo.shop",
  description: "Streetwear masculino premium.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GM Clothing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmclo.shop",
  potentialAction: {
    "@type": "SearchAction",
    target:
      (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmclo.shop") +
      "/colecao?busca={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

type HomeProduct = (typeof catalogProducts)[number];

export default function Home() {
  const shownProductFamilies = new Set<string>();
  const winterProducts = catalogProducts
    .filter(isWinterProduct)
    .sort(
      (firstProduct, secondProduct) =>
        Number(isChenilleProduct(secondProduct)) -
        Number(isChenilleProduct(firstProduct)),
    )
    .slice(0, 8);
  markShownProducts(winterProducts, shownProductFamilies);

  const newProducts = catalogProducts
    .filter((product) => {
      const badge = product.badge?.toLowerCase() ?? "";
      return badge.includes("novo") || badge.includes("lan");
    })
    .filter((product) => !shownProductFamilies.has(getHomeProductFamily(product)))
    .slice(0, 4);
  markShownProducts(newProducts, shownProductFamilies);

  const lastPieces = catalogProducts
    .filter(isLastChanceProduct)
    .filter((product) => !shownProductFamilies.has(getHomeProductFamily(product)))
    .map((product) => ({ ...product, badge: "Últimas peças" }))
    .slice(0, 4);
  markShownProducts(lastPieces, shownProductFamilies);

  const bestSellerProducts = catalogProducts
    .filter((product) => !isChenilleProduct(product))
    .filter(
      (product) =>
        isOversizedProduct(product) ||
        product.category === "Polo Tricot" ||
        product.slug === "camiseta-brasil-versao-jogador",
    )
    .filter((product) => !shownProductFamilies.has(getHomeProductFamily(product)))
    .slice(0, 4);

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
            href="/colecoes/chenille-zara"
            title="Camadas com presença."
          />
          <ProductGrid products={winterProducts} />
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
          <ProductGrid
            products={
              bestSellerProducts.length > 0
                ? bestSellerProducts
                : featuredProducts.slice(0, 4)
            }
          />
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
            <ProductGrid products={newProducts} />
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTiles.map((category, index) => (
              <Link
                className={`group flex min-h-[220px] flex-col justify-between p-6 transition-colors sm:min-h-[260px] sm:p-8 ${
                  index % 2 === 0
                    ? "bg-[#050505] text-white hover:bg-[#171715]"
                    : "border border-black/15 bg-white text-[#050505] hover:bg-[#eee9df]"
                }`}
                href={category.href}
                key={category.label}
                prefetch={false}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] opacity-55">
                  {category.eyebrow}
                </p>
                <div className="flex items-end justify-between gap-5">
                  <h3 className="font-display max-w-[9ch] text-4xl font-bold uppercase leading-[0.88] tracking-[-0.06em]">
                    {category.label}
                  </h3>
                  <span className="grid size-11 shrink-0 place-items-center border border-current/25">
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
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
              Últimas peças
            </p>
            <h2 className="font-display mt-4 max-w-[8ch] text-5xl font-bold uppercase leading-[0.84] tracking-[-0.07em] sm:text-7xl">
              Presença sem repetição.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
              Uma seleção curta de peças prontas para sair. Estoque enxuto,
              escolha direta e compra segura.
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center gap-4 bg-[#050505] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c8a96a] hover:text-[#050505]"
              href="/colecao/ultimas-pecas"
              prefetch={false}
            >
              Ver últimas peças <ArrowUpRight />
            </Link>
          </div>
          <ProductGrid products={lastPieces} />
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
            As avaliações verificadas serão publicadas aqui conforme os pedidos
            forem entregues. A GM Clothing não usa depoimentos inventados.
          </p>
        </div>
      </section>

      <section
        className="home-section bg-[#050505] px-5 py-12 text-white sm:px-8 lg:px-12"
        id="instagram"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Instagram
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-5xl">
              Acompanhe a GM.
            </h2>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-[#c8a96a] hover:text-[#c8a96a]"
            href="https://www.instagram.com/gm.clo/"
            rel="noreferrer"
            target="_blank"
          >
            @gm.clo <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}

function isWinterProduct(product: (typeof catalogProducts)[number]) {
  return (
    product.collection === "Coleção Frio" ||
    product.category === "Suéter" ||
    product.category === "Polo Tricot"
  );
}

function isChenilleProduct(product: (typeof catalogProducts)[number]) {
  return hasAnyProductText(product, ["chenile", "chenille"]);
}

function isOversizedProduct(product: (typeof catalogProducts)[number]) {
  return (
    product.category === "Oversized" ||
    product.subcollection === "Oversized Futebol" ||
    product.styleTags?.includes("oversized") ||
    product.tags?.includes("oversized") ||
    hasAnyProductText(product, ["oversized"])
  );
}

function isFaithProduct(product: (typeof catalogProducts)[number]) {
  return hasAnyProductText(product, [
    "fate",
    "faith",
    "jesus",
    "salmo",
    "cristã",
    "crista",
    "propósito",
    "proposito",
  ]);
}

function isFootballProduct(product: (typeof catalogProducts)[number]) {
  return (
    product.campaign === "copa-2026" ||
    product.collection === "Copa do Mundo" ||
    product.category === "Jerseys" ||
    hasAnyProductText(product, [
      "futebol",
      "football",
      "copa",
      "brasil",
      "portugal",
      "espanha",
      "cr7",
      "cristiano",
      "ronaldinho",
      "kaká",
      "kaka",
      "seleção",
      "selecao",
      "jersey",
    ])
  );
}

function isLastChanceProduct(product: (typeof catalogProducts)[number]) {
  return (
    product.slug !== "camisa-brasil-retro-azul-ronaldo" &&
    !isFaithProduct(product) &&
    (isFootballProduct(product) || product.category === "Polo Tricot")
  );
}

function getHomeProductFamily(product: HomeProduct) {
  return product.canonicalSlug ?? product.slug;
}

function markShownProducts(
  products: HomeProduct[],
  shownProductFamilies: Set<string>,
) {
  products.forEach((product) => {
    shownProductFamilies.add(getHomeProductFamily(product));
  });
}

function hasAnyProductText(
  product: (typeof catalogProducts)[number],
  values: string[],
) {
  const haystack = [
    product.name,
    product.shortName,
    product.collection,
    product.category,
    product.subcollection,
    ...(product.tags ?? []),
    ...(product.styleTags ?? []),
    product.badge,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return values.some((value) => haystack.includes(value.toLowerCase()));
}
