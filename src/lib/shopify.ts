const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.trim() ?? "";

function normalizeShopifyDomain(domain: string) {
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .trim()
    .toLowerCase();
}

function normalizeShopifyVariantId(variantId: string) {
  const trimmedVariantId = variantId.trim();
  const gidMatch = trimmedVariantId.match(/ProductVariant\/(\d+)$/);

  return gidMatch?.[1] ?? trimmedVariantId;
}

export function getShopifyProductUrl(handle: string | null | undefined) {
  const storeDomain = normalizeShopifyDomain(SHOPIFY_STORE_DOMAIN);
  const productHandle = handle?.trim();

  if (!storeDomain || !productHandle) {
    return null;
  }

  return `https://${storeDomain}/products/${encodeURIComponent(productHandle)}`;
}

export function getShopifyCartUrl(
  variantId: string | null | undefined,
  quantity = 1,
) {
  const storeDomain = normalizeShopifyDomain(SHOPIFY_STORE_DOMAIN);
  const normalizedVariantId = variantId
    ? normalizeShopifyVariantId(variantId)
    : null;
  const safeQuantity = Math.max(1, Math.floor(quantity));

  if (!storeDomain || !normalizedVariantId) {
    return null;
  }

  return `https://${storeDomain}/cart/${encodeURIComponent(
    normalizedVariantId,
  )}:${safeQuantity}`;
}

