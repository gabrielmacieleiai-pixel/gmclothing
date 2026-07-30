type ShopifyVariantIdMap = Record<
  string,
  Record<string, Record<string, string | null>>
>;

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

export const shopifyVariantIds: ShopifyVariantIdMap = {
  "oversized-essential-preta": {
    preto: {
      p: "45870364033094",
      m: "45870364065862",
      g: "45870364098630",
      gg: "45870364131398",
    },
    "off-white": {
      p: "45870364164166",
      m: "45870364196934",
      g: "45870364229702",
      gg: "45870364262470",
    },
  },
  "oversized-court-verde-militar": {
    verde: {
      p: "45870364328006",
      m: "45870364360774",
      g: "45870364393542",
      gg: "45870364426310",
    },
    marrom: {
      p: "45870364459078",
      m: "45870364491846",
      g: "45870364524614",
      gg: "45870364557382",
    },
  },
  "oversized-graphic-azul-preta": {
    preto: {
      p: "45870364655686",
      m: "45870364688454",
      g: "45870364721222",
      gg: "45870364753990",
    },
    "off-white": {
      p: "45870364786758",
      m: "45870364819526",
      g: "45870364852294",
      gg: "45870364885062",
    },
  },
  "oversized-brasil": {
    "off-white": {
      p: "45870366883910",
      m: "45870366916678",
      g: "45870366949446",
      gg: "45870366982214",
    },
    preto: {
      p: "45870367014982",
      m: "45870367047750",
      g: "45870367080518",
      gg: "45870367113286",
    },
  },
  "camisa-cr7": {
    "off-white": {
      p: "45870366556230",
      m: "45870366588998",
      g: "45870366621766",
      gg: "45870366654534",
    },
    preto: {
      p: "45870366687302",
      m: "45870366720070",
      g: "45870366752838",
      gg: "45870366785606",
    },
  },
  "brasil-retro-2006-ronaldinho": {
    amarelo: {
      p: "45870366392390",
      m: "45870366425158",
      g: "45870366457926",
      gg: "45870366490694",
    },
  },
  "oversized-pre-treino-preta": {
    preto: {
      m: "45870363607110",
      g: "45870363639878",
      gg: "45870363672646",
    },
  },
  "polo-tricot": {
    "off-white": {
      p: "45870367866950",
      m: "45870367899718",
      g: "45870367932486",
      gg: "45870367965254",
    },
    preto: {
      p: "45870367998022",
      m: "45870368030790",
      g: "45870368063558",
      gg: "45870368096326",
    },
  },
  "sueter-chenile-zara": {
    caramelo: {
      p: "45832154972230",
      m: "45832155004998",
      g: "45832155037766",
      gg: "45832155070534",
    },
    preto: {
      p: "45832155103302",
      m: "45832155136070",
      g: "45832155168838",
      gg: "45832155201606",
    },
    "azul-marinho": {
      p: "45832155234374",
      m: "45832155267142",
      g: "45832155299910",
      gg: "45832155332678",
    },
    "cinza-mesclado": {
      p: "45832155365446",
      m: "45832155398214",
      g: "45832155430982",
      gg: "45832155463750",
    },
  },
  "sueter-tricot-trancado-preto": {
    preto: {
      p: "45870367703110",
      m: "45870367735878",
      g: "45870367768646",
      gg: "45870367801414",
    },
  },
  "sueter-tricot-texturizado-azul-marinho": {
    "azul-marinho": {
      p: "45870367539270",
      m: "45870367572038",
      g: "45870367604806",
      gg: "45870367637574",
    },
  },
  "sueter-tricot-geometrico-off-white": {
    "off-white": {
      p: "45870367375430",
      m: "45870367408198",
      g: "45870367440966",
      gg: "45870367473734",
    },
  },
  "sueter-tricot-minimal-preto": {
    preto: {
      p: "45870367178822",
      m: "45870367211590",
      g: "45870367244358",
      gg: "45870367277126",
    },
  },
};

export function getShopifyVariantId(
  productSlug: string,
  colorId: string,
  size: string,
) {
  return (
    shopifyVariantIds[normalizeKey(productSlug)]?.[normalizeKey(colorId)]?.[
      normalizeKey(size)
    ] ?? null
  );
}
