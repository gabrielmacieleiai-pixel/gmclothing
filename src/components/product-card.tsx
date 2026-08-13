"use client";

import Link from "next/link";
import { ProductCardGallery } from "@/components/product-card-gallery";
import { useShopifyPricing } from "@/components/shopify-pricing-provider";
import {
  getProductColors,
  getProductDisplayStock,
  getProductHref,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  inverse?: boolean;
};

export function ProductCard({
  product,
  priority = false,
  inverse = false,
}: ProductCardProps) {
  const resolvePricing = useShopifyPricing();
  const colors = getProductColors(product);
  const pricing = resolvePricing(product, product.defaultColorId);
  const totalStock = getProductDisplayStock(product);
  const isSoldOut = totalStock === 0;
  const badge = isSoldOut
    ? "Sem estoque"
    : totalStock === 1
      ? "Últimas peças"
      : product.badge;
  const isLastChanceBadge = badge
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes("ultima");

  return (
    <article className="group w-[84vw] max-w-[410px] shrink-0 snap-center md:w-auto md:max-w-none">
      {badge ? (
        <div className="mb-2 min-h-5 md:mb-3 md:min-h-6">
          <span
            className={`inline-flex max-w-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] md:px-3 md:py-1.5 md:text-[9px] md:tracking-[0.16em] ${
              isSoldOut
                ? "border-[#050505] bg-[#050505] text-white"
                : isLastChanceBadge
                ? "border-red-800 bg-red-800 text-white"
                : "border-black/15 text-ink"
            }`}
          >
            {badge}
          </span>
        </div>
      ) : null}

      <div className={isSoldOut ? "opacity-55 grayscale-[0.2]" : undefined}>
        <ProductCardGallery
          href={getProductHref(product)}
          photos={product.photos}
          priority={priority}
          productName={product.name}
        />
      </div>

      <Link href={getProductHref(product)} prefetch={false}>
        <div className="min-w-0 pt-3 md:pt-4">
          <h3
            className={`min-h-0 overflow-hidden text-[17px] font-black uppercase leading-[1.05] tracking-[-0.02em] md:min-h-[2.6rem] md:text-sm md:leading-[1.18] md:tracking-[0.01em] ${
              inverse ? "text-white" : "text-[#050505]"
            }`}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.shortName}
          </h3>

          <p
            className={`mt-2 truncate text-[9px] uppercase tracking-[0.16em] md:text-[10px] ${
              inverse ? "text-white/45" : "text-black/45"
            }`}
          >
            {product.category}
            {colors.length > 1 ? ` · ${colors.length} cores` : ""}
          </p>

          <div
            className={`mt-2 grid gap-1 border-t pt-2 md:mt-3 md:pt-3 ${
              inverse ? "border-white/15" : "border-black/10"
            }`}
          >
            {pricing.promotionalPrice ? (
              <div
                className={`text-[9px] uppercase tracking-[0.14em] md:text-[9px] md:tracking-[0.16em] ${
                  inverse ? "text-white/35" : "text-black/35"
                }`}
              >
                <span>De </span>
                <span className="line-through">
                  {formatPrice(pricing.price)}
                </span>
              </div>
            ) : null}

            <div
              className={`flex flex-col items-start gap-1 ${
                inverse ? "text-white" : "text-[#050505]"
              }`}
            >
              <span className="text-[22px] font-black leading-none tracking-tight md:text-base">
                Por {formatPrice(pricing.currentPrice)}
              </span>

              {pricing.discountPercentage ? (
                <span
                  className={`w-fit shrink-0 whitespace-nowrap border px-2 py-1 text-[7px] font-bold uppercase tracking-[0.11em] md:text-[8px] ${
                    inverse
                      ? "border-white/20 text-white/65"
                      : "border-black/15 text-black/50"
                  }`}
                >
                  {pricing.discountPercentage}% off
                </span>
              ) : null}
            </div>
          </div>

          {isSoldOut ? (
            <p
              className={`mt-2 text-[9px] font-bold uppercase tracking-[0.14em] ${
                inverse ? "text-white/55" : "text-black/55"
              }`}
            >
              Indisponível no momento
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

