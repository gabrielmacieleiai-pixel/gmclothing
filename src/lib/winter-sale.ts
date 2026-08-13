import type { Product } from "@/types/product";

export const WINTER_SALE_PATH = "/sale-inverno";
export const WINTER_SALE_CHENILLE_SLUG = "sueter-chenile-zara";

export const WINTER_SALE_OTHER_SLUGS = [
  "sueter-tricot-minimal-preto",
  "sueter-tricot-geometrico-off-white",
  "sueter-tricot-texturizado-azul-marinho",
  "sueter-tricot-trancado-preto",
  "sueter-tricot-trancado-off-white",
] as const;

export const WINTER_SALE_PRODUCT_SLUGS = [
  WINTER_SALE_CHENILLE_SLUG,
  ...WINTER_SALE_OTHER_SLUGS,
] as const;

function getProductSlug(product: Product | string) {
  return typeof product === "string"
    ? product
    : product.canonicalSlug ?? product.slug;
}

export function isWinterSaleChenille(product: Product | string) {
  return getProductSlug(product) === WINTER_SALE_CHENILLE_SLUG;
}

export function isWinterSaleProduct(product: Product | string) {
  const slug = getProductSlug(product);
  return WINTER_SALE_PRODUCT_SLUGS.some(
    (campaignSlug) => campaignSlug === slug,
  );
}

export function getWinterSalePricing(product: Product | string) {
  if (isWinterSaleChenille(product)) {
    return {
      price: 299.9,
      promotionalPrice: 199.9,
      currentPrice: 199.9,
      discountPercentage: 33,
    };
  }

  if (isWinterSaleProduct(product)) {
    return {
      price: 249.9,
      promotionalPrice: 149.9,
      currentPrice: 149.9,
      discountPercentage: 40,
    };
  }

  return null;
}
