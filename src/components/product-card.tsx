import Link from "next/link";
import { ProductCardGallery } from "@/components/product-card-gallery";
import {
  getProductColors,
  getProductHref,
  getProductPricing,
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
  const colors = getProductColors(product);
  const pricing = getProductPricing(product, product.defaultColorId);

  return (
    <article className="group min-w-0">
      {product.badge ? (
        <div className="mb-2 min-h-5 sm:mb-3 sm:min-h-6">
          <span className="inline-flex max-w-full border border-black/15 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.13em] text-ink sm:px-3 sm:py-1.5 sm:text-[9px] sm:tracking-[0.16em]">
            {product.badge}
          </span>
        </div>
      ) : null}

      <ProductCardGallery
        href={getProductHref(product)}
        photos={product.photos}
        priority={priority}
        productName={product.name}
      />

      <Link href={getProductHref(product)} prefetch={false}>
        <div className="min-w-0 pt-3 sm:pt-4">
          <h3
            className={`min-h-[2.6rem] overflow-hidden text-[12px] font-bold uppercase leading-[1.18] tracking-[0.01em] sm:text-sm ${
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
            className={`mt-1 truncate text-[8px] uppercase tracking-[0.14em] sm:mt-2 sm:text-[10px] sm:tracking-[0.16em] ${
              inverse ? "text-white/45" : "text-black/45"
            }`}
          >
            {product.category}
            {colors.length > 1 ? ` · ${colors.length} cores` : ""}
          </p>

          <div
            className={`mt-3 grid gap-1 border-t pt-2.5 sm:mt-3 sm:pt-3 ${
              inverse ? "border-white/15" : "border-black/10"
            }`}
          >
            {pricing.promotionalPrice ? (
              <div
                className={`text-[8px] uppercase tracking-[0.12em] sm:text-[9px] sm:tracking-[0.16em] ${
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
              <span className="text-[17px] font-black leading-none tracking-tight sm:text-base">
                Por {formatPrice(pricing.currentPrice)}
              </span>

              {pricing.discountPercentage ? (
                <span
                  className={`w-fit shrink-0 whitespace-nowrap px-2 py-1 text-[6px] font-bold uppercase tracking-[0.1em] sm:px-2.5 sm:py-1.5 sm:text-[8px] sm:font-black sm:tracking-[0.12em] ${
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
      </Link>
    </article>
  );
}
