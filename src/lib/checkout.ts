import type { Product } from "@/types/product";
import { activeProducts } from "@/data/products";
import { getShopifyCartUrl, getShopifyProductUrl } from "@/lib/shopify";
import { getYampiCheckoutUrl } from "@/lib/yampi";

const legacyShopifySkuAliases: Record<string, string> = {
  "GMC-FRIO-CHCA-CARAMELO-P": "GMC-CHENILE-CA-P",
  "GMC-FRIO-CHCA-CARAMELO-M": "GMC-CHENILE-CA-M",
  "GMC-FRIO-CHCA-CARAMELO-G": "GMC-CHENILE-CA-G",
  "GMC-FRIO-CHCA-CARAMELO-GG": "GMC-CHENILE-CA-GG",
  "GMC-FRIO-CHPR-PRETO-P": "GMC-CHENILE-PR-P",
  "GMC-FRIO-CHPR-PRETO-M": "GMC-CHENILE-PR-M",
  "GMC-FRIO-CHPR-PRETO-G": "GMC-CHENILE-PR-G",
  "GMC-FRIO-CHPR-PRETO-GG": "GMC-CHENILE-PR-GG",
  "GMC-FRIO-CHAZ-AZUL-MARINHO-P": "GMC-CHENILE-AZ-P",
  "GMC-FRIO-CHAZ-AZUL-MARINHO-M": "GMC-CHENILE-AZ-M",
  "GMC-FRIO-CHAZ-AZUL-MARINHO-G": "GMC-CHENILE-AZ-G",
  "GMC-FRIO-CHAZ-AZUL-MARINHO-GG": "GMC-CHENILE-AZ-GG",
  "GMC-FRIO-CHCM-CINZA-MESCLADO-P": "GMC-CHENILE-CM-P",
  "GMC-FRIO-CHCM-CINZA-MESCLADO-M": "GMC-CHENILE-CM-M",
  "GMC-FRIO-CHCM-CINZA-MESCLADO-G": "GMC-CHENILE-CM-G",
  "GMC-FRIO-CHCM-CINZA-MESCLADO-GG": "GMC-CHENILE-CM-GG",
};

function getCheckoutLookupSku(sku: string) {
  const normalizedSku = sku.trim().toUpperCase();

  return legacyShopifySkuAliases[normalizedSku] ?? normalizedSku;
}

export function withCheckoutUrls(product: Product): Product {
  const shopifyProductUrl = getShopifyProductUrl(product.shopifyHandle);

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
        shopifyProductUrl ??
        null,
    })),
  };
}

export function getCheckoutUrlBySku(sku: string | null | undefined) {
  if (!sku) {
    return null;
  }

  const lookupSku = getCheckoutLookupSku(sku);
  const product = activeProducts.find((item) =>
    item.variants.some((variant) => variant.sku === lookupSku),
  );

  if (!product) {
    return null;
  }

  const productForSale = withCheckoutUrls(product);

  return (
    productForSale.variants.find((variant) => variant.sku === lookupSku)
      ?.yampiCheckoutUrl ?? null
  );
}
