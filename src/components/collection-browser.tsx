"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { brandAssets } from "@/data/brand-assets";
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
    id: "copa-2026",
    label: "Copa 2026",
    matches: (product) =>
      product.campaign === "copa-2026" ||
      product.collection === "Copa do Mundo",
  },
  {
    id: "brasil",
    label: "Brasil",
    matches: (product) => hasText(product, "brasil"),
  },
  {
    id: "jerseys",
    label: "Jerseys",
    matches: (product) =>
      product.category === "Jerseys" ||
      hasAnyText(product, ["jersey", "camisa de futebol", "camiseta brasil"]),
  },
  {
    id: "oversized",
    label: "Oversized",
    matches: (product) => product.category === "Oversized",
  },
  {
    id: "frio",
    label: "Frio",
    matches: (product) =>
      product.collection === "Coleção Frio" ||
      product.category === "Suéter" ||
      product.category === "Polo Tricot",
  },
  {
    id: "lancamentos",
    label: "Lançamentos",
    matches: (product) =>
      hasAnyText(product, ["lançamento", "novo", "destaque", "drop atual"]),
  },
];

const collectionVisuals: Record<string, CollectionVisual> = {
  "copa-2026": {
    eyebrow: "Campanha Copa",
    title: "Brasil guia o drop.",
    description:
      "Futebol, Copa e streetwear com visual de campanha. Brasil no centro da narrativa.",
    image: brandAssets.brands2.copaProductHero,
    mobileImage: brandAssets.brands2.copaProductClean,
    accent: "text-[#72c7ef]",
  },
  brasil: {
    eyebrow: "Brasil em destaque",
    title: "Seleção, rua e presença.",
    description:
      "Peças com energia de jogo e leitura urbana para viver a temporada fora de campo.",
    image: brandAssets.brands2.copaProductClean,
    mobileImage: brandAssets.brands2.copaProductHero,
    accent: "text-[#72c7ef]",
  },
  jerseys: {
    eyebrow: "Jerseys",
    title: "Futebol com linguagem GM.",
    description:
      "Camisas de futebol dentro de uma vitrine limpa, esportiva e premium.",
    image: brandAssets.brands2.copaProductHero,
    mobileImage: brandAssets.brands2.copaProductClean,
    accent: "text-[#72c7ef]",
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
  frio: {
    eyebrow: "Coleção de frio",
    title: "Tricô, textura e presença.",
    description:
      "Suéteres e polos de tricô com acabamento limpo, leitura premium e sensação de lançamento.",
    image: brandAssets.brands2.frioHeroDesktop,
    mobileImage: brandAssets.brands2.frioHeroMobile,
    accent: "text-[#c8a96a]",
  },
  lancamentos: {
    eyebrow: "Lançamentos",
    title: "Novidades da estação.",
    description:
      "Uma curadoria visual para destacar peças novas sem transformar a página em marketplace.",
    image: brandAssets.brands2.frioEditorial,
    mobileImage: brandAssets.brands2.frioLifestyle,
    accent: "text-[#c8a96a]",
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
                  src={selectedVisual.mobileImage}
                />
              ) : null}
              <Image
                alt=""
                className={`${selectedVisual.mobileImage ? "hidden lg:block" : ""} object-contain p-4`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                src={selectedVisual.image}
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
