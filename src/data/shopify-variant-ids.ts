type ShopifyVariantIdMap = Record<
  string,
  Record<string, Record<string, string | null>>
>;

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

export const shopifyVariantIds: ShopifyVariantIdMap = {
  "oversized-fate-eu-sou-jesus-branca": {
    branco: {
      p: "46069624373318",
      m: "46069624406086",
      g: "46069624438854",
      gg: "46069624471622",
    },
    preto: {
      p: "46069624504390",
      m: "46069624537158",
      g: "46069624569926",
      gg: "46069624602694",
    },
  },
  "oversized-fate-jesus-is-king-marrom": {
    marrom: {
      p: "46069624635462",
      m: "46069624668230",
      g: "46069624700998",
      gg: "46069624733766",
    },
    preto: {
      p: "46069624766534",
      m: "46069624799302",
      g: "46069624832070",
      gg: "46069624864838",
    },
  },
  "camisa-brasil-manga-longa-copa": {
    amarelo: {
      p: "46015798739014",
      m: "46015798771782",
      g: "46015798804550",
      gg: "46015798837318",
    },
  },
  "camisa-espanha-versao-jogador": {
    vermelho: {
      p: "46015798870086",
      m: "46015798902854",
      g: "46015798935622",
      gg: "46015798968390",
    },
  },
  "camisa-brasil-retro-azul-ronaldo": {
    azul: {
      p: "46015799001158",
      m: "46015799033926",
      g: "46015799066694",
      gg: "46015799099462",
    },
  },
  "camiseta-brasil-versao-jogador-azul": {
    "azul-marinho": {
      p: "46015799132230",
      m: "46015799164998",
      g: "46015799197766",
      gg: "46015799230534",
    },
  },
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
    "cinza-claro": {
      p: "46069678899270",
      m: "46069678932038",
      g: "46069678964806",
      gg: "46069678997574",
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
