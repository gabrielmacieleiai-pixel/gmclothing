"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/types/product";

const subcollections = [
  "Todos",
  "Brasil",
  "Retrô",
  "Oversized Futebol",
  "Cristiano Ronaldo",
];

type CopaCollectionBrowserProps = {
  products: Product[];
};

export function CopaCollectionBrowser({ products }: CopaCollectionBrowserProps) {
  const [selectedSubcollection, setSelectedSubcollection] = useState("Todos");
  const visibleProducts =
    selectedSubcollection === "Todos"
      ? products
      : products.filter(
          (product) => product.subcollection === selectedSubcollection,
        );

  return (
    <>
      <div className="mb-8 border-b border-white/10 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#72c7ef]">
          Subcoleções
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {subcollections.map((subcollection) => {
            const hasProducts =
              subcollection === "Todos" ||
              products.some((product) => product.subcollection === subcollection);

            return (
              <button
                aria-pressed={selectedSubcollection === subcollection}
                className={`shrink-0 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  selectedSubcollection === subcollection
                    ? "bg-white text-[#050505]"
                    : hasProducts
                      ? "border border-white/15 text-white/65 hover:border-white hover:text-white"
                      : "border border-white/10 text-white/25"
                }`}
                disabled={!hasProducts}
                key={subcollection}
                onClick={() => setSelectedSubcollection(subcollection)}
                type="button"
              >
                {subcollection}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} inverse />
      ) : (
        <div className="border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
          <p className="text-sm font-bold uppercase text-white">
            Produtos em preparação.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-white/45">
            Essa subcoleção já está reservada para o Drop Copa 2026. Os produtos
            entram aqui quando as fotos e informações reais forem enviadas.
          </p>
        </div>
      )}
    </>
  );
}
