const YAMPI_CHECKOUT_BASE_URL =
  "https://gm-clothing.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=";

type YampiVariantMap = Record<string, Record<string, Record<string, string>>>;

export const yampiVariantMap: YampiVariantMap = {
  "camiseta-oversized-faith-jesus-e-o-caminho": {
    preto: {
      p: "SJ7TEXDBB0",
      m: "TOKEN_PRETO_M",
      g: "TOKEN_PRETO_G",
      gg: "TOKEN_PRETO_GG",
    },
    "off-white": {
      p: "TOKEN_OFFWHITE_P",
      m: "TOKEN_OFFWHITE_M",
      g: "TOKEN_OFFWHITE_G",
      gg: "TOKEN_OFFWHITE_GG",
    },
  },
};

function normalizeYampiKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function isConfiguredToken(token: string | undefined) {
  return Boolean(token && !token.startsWith("TOKEN_"));
}

export function getYampiCheckoutUrl(
  productSlug: string,
  color: string,
  size: string,
) {
  const normalizedSlug = normalizeYampiKey(productSlug);
  const normalizedColor = normalizeYampiKey(color);
  const normalizedSize = normalizeYampiKey(size);
  const token =
    yampiVariantMap[normalizedSlug]?.[normalizedColor]?.[normalizedSize];

  if (!isConfiguredToken(token)) {
    return null;
  }

  return `${YAMPI_CHECKOUT_BASE_URL}${encodeURIComponent(token)}`;
}
