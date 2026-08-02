"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
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
      product.slug !== "camisa-brasil-retro-azul-ronaldo" &&
      !isFaithProduct(product) &&
      (isFootballProduct(product) || product.category === "Polo Tricot"),
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
export function CollectionBrowser({
  products,
  initialFilterId,
}: CollectionBrowserProps) {
  const [selectedFilterId, setSelectedFilterId] = useState(
    getValidFilterId(initialFilterId),
  );
  const selectedFilter =
    filters.find((filter) => filter.id === selectedFilterId) ?? filters[0];
  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      selectedFilter.matches(product),
    );

    if (selectedFilter.id === "frio") {
      return [...filteredProducts].sort(
        (firstProduct, secondProduct) =>
          Number(isChenilleProduct(firstProduct)) -
          Number(isChenilleProduct(secondProduct)),
      );
    }

    if (selectedFilter.id === "oversized") {
      return [...filteredProducts].sort(
        (firstProduct, secondProduct) =>
          Number(isFaithProduct(firstProduct)) -
          Number(isFaithProduct(secondProduct)),
      );
    }

    if (selectedFilter.id === "ultimas-pecas") {
      return filteredProducts.map((product) => ({
        ...product,
        badge: "Últimas peças",
      }));
    }

    return filteredProducts;
  }, [products, selectedFilter]);

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
