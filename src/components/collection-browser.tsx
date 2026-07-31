"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { brandAssets } from "@/data/brand-assets";
import { getImageVariantSrc } from "@/lib/image-variants";
import type { Product } from "@/types/product";

type CollectionBrowserProps = {
  products: Product[];
  initialFilterId?: string;
};

type CollectionFilter = {
  id: string;
  label: string;
  matches: (product: Product) => boolean;
};

type CollectionVisual = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  accent: string;
};

const filters: CollectionFilter[] = [
  {
    id: "todos",
    label: "Todos",
    matches: () => true,
  },
  {
    id: "frio",
    label: "Frio",
    matches: (product) => isWinterProduct(product),
  },
  {
    id: "caneladas",
    label: "Caneladas",
    matches: (product) => hasAnyText(product, ["canelada", "caneladas"]),
  },
  {
    id: "oversized",
    label: "Oversized",
    matches: (product) => isOversizedProduct(product),
  },
  {
    id: "faith",
    label: "Linha Faith",
    matches: (product) => isFaithProduct(product),
  },
  {
    id: "futebol",
    label: "Futebol",
    matches: (product) => isFootballProduct(product),
  },
  {
    id: "mais-vendidos",
    label: "Mais vendidos",
    matches: (product) =>
      isChenilleProduct(product) ||
      isOversizedProduct(product) ||
      hasAnyText(product, ["canelada", "caneladas"]),
  },
  {
    id: "ultimas-pecas",
    label: "Últimas peças",
    matches: (product) =>
      isFootballProduct(product) || isFaithProduct(product) || product.category === "Polo Tricot",
  },
  {
    id: "promocao",
    label: "Promoções",
    matches: (product) =>
      Boolean(product.promotionalPrice) ||
      Boolean(product.colorPricing) ||
      hasAnyText(product, ["promoção", "queima", "final", "oferta"]),
  },
];
const collectionVisuals: Record<string, CollectionVisual> = {
  frio: {
    eyebrow: "Coleção de frio",
    title: "Tricô, textura e presença.",
    description:
      "Suéteres e polos de tricô com acabamento limpo, leitura premium e sensação de lançamento.",
    image: brandAssets.brands2.chenileHero,
    mobileImage: brandAssets.brands2.chenileHeroAlt,
    accent: "text-[#c8a96a]",
  },
  caneladas: {
    eyebrow: "Caneladas",
    title: "Base premium para o próximo drop.",
    description:
      "A estrutura já está preparada para receber as camisetas caneladas assim que as fotos reais entrarem no catálogo.",
    image: brandAssets.brands2.premiumDetails,
    mobileImage: brandAssets.brands2.productDetails,
    accent: "text-[#c8a96a]",
  },
  oversized: {
    eyebrow: "Coleção Oversized",
    title: "Essenciais com peso visual.",
    description:
      "Caimento amplo, fotos fortes e estética streetwear para valorizar cada cor do drop.",
    image: brandAssets.brands2.oversizedHeroDesktop,
    mobileImage: brandAssets.brands2.oversizedHeroMobile,
    accent: "text-[#9faa83]",
  },
  faith: {
    eyebrow: "Linha Faith",
    title: "Identidade discreta. Presença real.",
    description:
      "Peças com linguagem cristã limpa, urbana e alinhada à identidade GM Clothing.",
    image: brandAssets.brands2.oversizedManifesto,
    mobileImage: brandAssets.brands2.oversizedManifesto,
    accent: "text-[#d4b06a]",
  },
  futebol: {
    eyebrow: "Football Culture",
    title: "Futebol para vestir fora de campo.",
    description:
      "Brasil, retrô, seleções e oversized futebol em uma curadoria com leitura streetwear.",
    image: brandAssets.brands2.copaProductHero,
    mobileImage: brandAssets.brands2.copaProductClean,
    accent: "text-[#72c7ef]",
  },
  "mais-vendidos": {
    eyebrow: "Mais vendidos",
    title: "O que precisa girar agora.",
    description:
      "Chenille Zara, oversized e estrutura pronta para caneladas em uma seleção direta para conversão.",
    image: brandAssets.brands2.chenileHero,
    mobileImage: brandAssets.brands2.chenileHeroAlt,
    accent: "text-[#c8a96a]",
  },
  "ultimas-pecas": {
    eyebrow: "Últimas peças",
    title: "Poucas unidades. Giro rápido.",
    description:
      "Futebol, linha faith e polos em uma seleção temporária para destacar peças com maior urgência comercial.",
    image: "/products/imagens para o site/a41dfd0b-7b0f-40c6-9252-85d515446a38.png",
    mobileImage: "/products/imagens para o site/665e3737-402f-48b5-94f2-2f5ba1295bca.png",
    accent: "text-[#d4b06a]",
  },
  promocao: {
    eyebrow: "Promoções",
    title: "Preço claro. Compra rápida.",
    description:
      "Peças selecionadas com condição especial, sem perder a leitura premium da GM Clothing.",
    image: brandAssets.brands2.oversizedHeroDesktop,
    mobileImage: brandAssets.brands2.oversizedHeroMobile,
    accent: "text-[#d4b06a]",
  },
};
export function CollectionBrowser({
  products,
  initialFilterId,
}: CollectionBrowserProps) {
  const [selectedFilterId, setSelectedFilterId] = useState(
    getValidFilterId(initialFilterId),
  );
  const selectedFilter =
    filters.find((filter) => filter.id === selectedFilterId) ?? filters[0];
  const visibleProducts = useMemo(
    () => products.filter((product) => selectedFilter.matches(product)),
    [products, selectedFilter],
  );
  const selectedVisual = collectionVisuals[selectedFilterId];

  function selectFilter(filterId: string) {
    setSelectedFilterId(filterId);

    const url = new URL(window.location.href);

    if (filterId === "todos") {
      url.searchParams.delete("categoria");
    } else {
      url.searchParams.set("categoria", filterId);
    }

    window.history.replaceState({}, "", url);
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 border-b border-black/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Navegue por coleção
          </p>
          <p className="mt-2 text-sm text-black/55">
            {visibleProducts.length} peça{visibleProducts.length === 1 ? "" : "s"} em
            destaque no filtro selecionado.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:justify-end">
          {filters.map((filter) => (
            <button
              aria-pressed={selectedFilterId === filter.id}
              className={`shrink-0 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                selectedFilterId === filter.id
                  ? "bg-ink text-white"
                  : "border border-black/15 text-black/55 hover:border-black hover:text-black"
              }`}
              key={filter.id}
              onClick={() => selectFilter(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {selectedVisual ? (
        <section className="mb-8 overflow-hidden bg-[#050505] text-white">
          <div className="grid min-h-[420px] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-end px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
              <p
                className={`mb-4 text-[10px] font-bold uppercase tracking-[0.26em] ${selectedVisual.accent}`}
              >
                {selectedVisual.eyebrow}
              </p>
              <h3 className="max-w-2xl text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
                {selectedVisual.title}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/58">
                {selectedVisual.description}
              </p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden border-t border-white/10 bg-[#050505] lg:border-l lg:border-t-0">
              {selectedVisual.mobileImage ? (
                <Image
                  alt=""
                  className="object-contain p-3 lg:hidden"
                  fill
                  sizes="100vw"
                  src={getImageVariantSrc(selectedVisual.mobileImage, "hero")}
                />
              ) : null}
              <Image
                alt=""
                className={`${selectedVisual.mobileImage ? "hidden lg:block" : ""} object-contain p-4`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                src={getImageVariantSrc(selectedVisual.image, "hero")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      ) : null}

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <div className="border border-black/10 px-5 py-12 text-center">
          <p className="text-sm text-black/55">
            Nenhuma peça encontrada nesta coleção.
          </p>
        </div>
      )}
    </>
  );
}

function isWinterProduct(product: Product) {
  return (
    product.collection === "Coleção Frio" ||
    product.category === "Suéter" ||
    product.category === "Polo Tricot"
  );
}

function isChenilleProduct(product: Product) {
  return hasAnyText(product, ["chenile", "chenille"]);
}

function isOversizedProduct(product: Product) {
  return (
    product.category === "Oversized" ||
    product.subcollection === "Oversized Futebol" ||
    product.styleTags?.includes("oversized") ||
    product.tags?.includes("oversized") ||
    hasAnyText(product, ["oversized"])
  );
}

function isFaithProduct(product: Product) {
  return hasAnyText(product, ["faith", "jesus", "salmo", "cristã", "crista", "propósito", "proposito"]);
}

function isFootballProduct(product: Product) {
  return (
    product.campaign === "copa-2026" ||
    product.collection === "Copa do Mundo" ||
    product.category === "Jerseys" ||
    hasAnyText(product, [
      "futebol",
      "football",
      "copa",
      "brasil",
      "argentina",
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
function getValidFilterId(filterId?: string) {
  return filters.some((filter) => filter.id === filterId) ? filterId! : "todos";
}

function hasAnyText(product: Product, values: string[]) {
  return values.some((value) => hasText(product, value));
}

function hasText(product: Product, value: string) {
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

  return haystack.includes(value.toLowerCase());
}
