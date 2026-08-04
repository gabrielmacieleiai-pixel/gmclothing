const DEFAULT_SHOPIFY_STORE_DOMAIN = "checkout-gmclo.myshopify.com";

const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim() ??
  process.env.SHOPIFY_STORE_DOMAIN?.trim() ??
  DEFAULT_SHOPIFY_STORE_DOMAIN;

type ShopifyCheckoutOptions = {
  discountCode?: string;
  checkout?: {
    zip?: string;
  };
};

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
  options?: ShopifyCheckoutOptions,
) {
  const storeDomain = normalizeShopifyDomain(SHOPIFY_STORE_DOMAIN);
  const normalizedVariantId = variantId
    ? normalizeShopifyVariantId(variantId)
    : null;
  const safeQuantity = Math.max(1, Math.floor(quantity));

  if (!storeDomain || !normalizedVariantId) {
    return null;
  }

  return withCheckoutParams(`https://${storeDomain}/cart/${encodeURIComponent(
    normalizedVariantId,
  )}:${safeQuantity}`, options);
}

export function getShopifyCartPermalink(
  items: Array<{ variantId?: string | null; quantity?: number }>,
  options?: ShopifyCheckoutOptions,
) {
  const storeDomain = normalizeShopifyDomain(SHOPIFY_STORE_DOMAIN);
  const variants = new Map<string, number>();

  for (const item of items) {
    if (!item.variantId) {
      continue;
    }

    const normalizedVariantId = normalizeShopifyVariantId(item.variantId);
    const safeQuantity = Math.max(1, Math.floor(item.quantity ?? 1));

    if (!normalizedVariantId) {
      continue;
    }

    variants.set(
      normalizedVariantId,
      (variants.get(normalizedVariantId) ?? 0) + safeQuantity,
    );
  }

  if (!storeDomain || variants.size === 0) {
    return null;
  }

  const cartItems = Array.from(variants.entries())
    .map(
      ([variantId, quantity]) => `${encodeURIComponent(variantId)}:${quantity}`,
    )
    .join(",");

  return withCheckoutParams(`https://${storeDomain}/cart/${cartItems}`, options);
}

function withCheckoutParams(url: string, options?: ShopifyCheckoutOptions) {
  const zip = options?.checkout?.zip?.replace(/\D/g, "");
  const discountCode = options?.discountCode?.trim();
  const params = new URLSearchParams();

  if (discountCode) {
    params.set("discount", discountCode);
  }

  if (zip?.length === 8) {
    params.set("checkout[shipping_address][zip]", zip);
    params.set("checkout[shipping_address][country]", "Brazil");
  }

  const query = params.toString();

  return query ? `${url}?${query}` : url;
}
