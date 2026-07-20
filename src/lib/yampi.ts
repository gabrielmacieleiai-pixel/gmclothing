const YAMPI_CHECKOUT_BASE_URL =
  process.env.YAMPI_CHECKOUT_BASE_URL ||
  "https://gm-clothing.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=";

type YampiVariantMap = Record<string, Record<string, Record<string, string>>>;

export const yampiVariantMap: YampiVariantMap = {
  // Preencha somente com tokenReference real da Yampi.
  // Valores iniciados com TOKEN_ são placeholders e não geram redirecionamento.
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
  "camiseta-brasil-versao-jogador": {
    amarelo: {
      p: "TOKEN_BRASIL_JOGADOR_AMARELO_P",
      m: "TOKEN_BRASIL_JOGADOR_AMARELO_M",
      g: "TOKEN_BRASIL_JOGADOR_AMARELO_G",
      gg: "TOKEN_BRASIL_JOGADOR_AMARELO_GG",
    },
  },
  "camiseta-argentina-versao-jogador": {
    "branco-azul": {
      p: "TOKEN_ARGENTINA_JOGADOR_P",
      m: "TOKEN_ARGENTINA_JOGADOR_M",
      g: "TOKEN_ARGENTINA_JOGADOR_G",
      gg: "TOKEN_ARGENTINA_JOGADOR_GG",
    },
  },
  "brasil-retro-2006-kaka": {
    amarelo: {
      p: "TOKEN_RETRO_KAKA_P",
      m: "TOKEN_RETRO_KAKA_M",
      g: "TOKEN_RETRO_KAKA_G",
      gg: "TOKEN_RETRO_KAKA_GG",
    },
  },
  "brasil-retro-2006-ronaldinho": {
    amarelo: {
      p: "TOKEN_RETRO_RONALDINHO_P",
      m: "TOKEN_RETRO_RONALDINHO_M",
      g: "TOKEN_RETRO_RONALDINHO_G",
      gg: "TOKEN_RETRO_RONALDINHO_GG",
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
