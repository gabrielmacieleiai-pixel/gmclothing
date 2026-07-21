import type { Product } from "@/types/product";
import { getShopifyCartUrl } from "@/lib/shopify";
import { getYampiCheckoutUrl } from "@/lib/yampi";

export function withCheckoutUrls(product: Product): Product {
  return {
    ...product,
    variants: product.variants.map((variant) => ({
      ...variant,
      yampiCheckoutUrl:
        variant.checkoutUrl ??
        getShopifyCartUrl(variant.shopifyVariantId) ??
        variant.yampiCheckoutUrl ??
        getYampiCheckoutUrl(product.slug, variant.color.id, variant.size) ??
        getYampiCheckoutUrl(product.slug, variant.color.name, variant.size) ??
        product.checkoutUrl ??
        product.yampiCheckoutUrl ??
        null,
    })),
  };
}
