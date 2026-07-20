"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getProductColors,
  getProductHref,
  getProductPrimaryPhoto,
  getProductPricing,
  getProductTotalStock,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  inverse?: boolean;
};

const LOW_STOCK_THRESHOLD = 3;

export function ProductCard({
  product,
  priority = false,
  inverse = false,
}: ProductCardProps) {
  const photo = getProductPrimaryPhoto(product);
  const colors = getProductColors(product);
  const selectedCatalogColor = colors.find(
    (color) => color.id === product.defaultColorId,
  );
  const pricing = getProductPricing(product, product.defaultColorId);
  const totalStock = getProductTotalStock(product, product.defaultColorId);
  const stockLabel =
    totalStock <= 0
      ? "Sem estoque"
      : product.hideStockCount
        ? "Disponível"
        : totalStock <= LOW_STOCK_THRESHOLD
          ? "Últimas unidades"
          : `${totalStock} em estoque`;

  return (
    <article className="group min-w-0">
      <Link
        href={getProductHref(product)}
        className="block transition duration-200 active:scale-[0.985]"
        scroll
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd3] transition-shadow duration-300 group-hover:shadow-[0_18px_45px_rgba(5,5,5,0.14)]">
          <div className="absolute left-3 right-3 top-3 z-10 flex items-start justify-between gap-2">
            {product.badge ? (
              <span className="bg-ink px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                {product.badge}
              </span>
            ) : (
              <span />
            )}
            <span className="bg-bone/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
              {totalStock <= 0
                ? "Esgotado"
                : !product.hideStockCount && totalStock <= LOW_STOCK_THRESHOLD
                  ? "Últimas"
                  : "Disponível"}
            </span>
          </div>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2 transition duration-500 group-hover:scale-[1.035] sm:p-3"
          />
          <span className="absolute bottom-3 left-3 right-3 translate-y-0 bg-bone px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] transition duration-300 group-hover:bg-ink group-hover:text-white sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            Entrar na peça
          </span>
        </div>
        <div className="min-w-0 pt-4">
          <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={`truncate text-sm font-bold uppercase tracking-tight ${
                  inverse ? "text-white" : "text-[#050505]"
                }`}
              >
                {product.shortName}
              </h3>
              <p
                className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${
                  inverse ? "text-white/45" : "text-black/45"
                }`}
              >
                {selectedCatalogColor
                  ? `Cor ${selectedCatalogColor.name}`
                  : `${product.category} / ${colors.length} ${
                      colors.length === 1 ? "cor" : "cores"
                    }`}
              </p>
            </div>
            <div
              className={`shrink-0 text-right text-xs sm:text-sm ${
                inverse ? "text-white" : "text-[#050505]"
              }`}
            >
              {pricing.promotionalPrice ? (
                <div
                  className={`mb-1 text-[9px] uppercase tracking-[0.16em] ${
                    inverse ? "text-white/35" : "text-black/35"
                  }`}
                >
                  <span>De </span>
                  <span className="line-through">
                    {formatPrice(pricing.price)}
                  </span>
                </div>
              ) : null}
              <div className="flex max-w-[8.75rem] flex-col items-end gap-1 sm:max-w-none">
                <span className="font-bold">
                  Por {formatPrice(pricing.currentPrice)}
                </span>
                {pricing.discountPercentage ? (
                  <span
                    className={`whitespace-nowrap px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] ${
                      inverse
                        ? "bg-white text-[#050505]"
                        : "bg-[#050505] text-white"
                    }`}
                  >
                    {pricing.discountPercentage}% off
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {colors.map((color) => (
                <span
                  aria-label={color.name}
                  className="size-4 rounded-full border border-black/15"
                  key={color.id}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p
              className={`text-[10px] uppercase tracking-[0.16em] ${
                inverse ? "text-white/35" : "text-black/35"
              }`}
            >
              {stockLabel}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
