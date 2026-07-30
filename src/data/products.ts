import type {
  Product,
  ProductColor,
  ProductPhoto,
  ProductVariant,
} from "@/types/product";
import { getShopifyVariantId } from "@/data/shopify-variant-ids";

const colors = {
  black: { id: "preto", name: "Preto", hex: "#171715" },
  offWhite: { id: "off-white", name: "Off-white", hex: "#e8e4d9" },
  charcoal: { id: "chumbo", name: "Chumbo", hex: "#4f504c" },
  brown: { id: "marrom", name: "Marrom", hex: "#6b3f2a" },
  caramel: { id: "caramelo", name: "Caramelo", hex: "#8a542f" },
  mixedGray: { id: "cinza-mesclado", name: "Cinza mesclado", hex: "#5a5650" },
  green: { id: "verde", name: "Verde", hex: "#183d27" },
  brazilYellow: { id: "amarelo", name: "Amarelo", hex: "#ffd500" },
  argentinaBlue: { id: "branco-azul", name: "Branco e azul", hex: "#72c7ef" },
  navy: { id: "azul-marinho", name: "Azul marinho", hex: "#071f3f" },
} satisfies Record<string, ProductColor>;

const fallbackPhoto: ProductPhoto = {
  id: "produto-fallback",
  src: "/products/detail-fabric.svg",
  alt: "Detalhe de produto GM Clothing",
};

const oversizedPromoPricing = {
  price: 199.9,
  promotionalPrice: 99.9,
};

const oversizedWhitePricing = {
  price: 149.9,
  promotionalPrice: 99.9,
};

const winterPromoPricing = {
  price: 399.9,
  promotionalPrice: 249.9,
};

type StockBySize = Record<string, number>;

function createVariants(
  productCode: string,
  color: ProductColor,
  stockBySize: StockBySize,
  productSlug?: string,
): ProductVariant[] {
  return Object.entries(stockBySize).map(([size, stock]) => ({
    id: `${productCode}-${color.id}-${size.toLowerCase()}`,
    sku: `${productCode}-${color.id}-${size}`.toUpperCase(),
    color,
    size,
    stock,
    shopifyVariantId: productSlug
      ? getShopifyVariantId(productSlug, color.id, size)
      : null,
    // Preencher somente com o link real da variante no checkout externo.
    yampiCheckoutUrl: null,
  }));
}

function createShopifyReadyVariants(
  productSlug: string,
  skuBase: string,
  color: ProductColor,
  stockBySize: StockBySize,
): ProductVariant[] {
  return Object.entries(stockBySize).map(([size, stock]) => ({
    id: `${skuBase}-${color.id}-${size.toLowerCase()}`.toLowerCase(),
    sku: `${skuBase}-${size}`.toUpperCase(),
    color,
    size,
    stock,
    shopifyVariantId: getShopifyVariantId(productSlug, color.id, size),
    yampiCheckoutUrl: null,
  }));
}

function createDetailPhotos(productCode: string, productName: string): ProductPhoto[] {
  return [
    {
      id: `${productCode}-detalhe-malha`,
      src: "/products/detail-fabric.svg",
      alt: `Detalhe da malha da ${productName}`,
    },
    {
      id: `${productCode}-detalhe-etiqueta`,
      src: "/products/detail-label.svg",
      alt: `Detalhe da etiqueta da ${productName}`,
    },
  ];
}

const standardSizeStock: StockBySize = {
  P: 10,
  M: 10,
  G: 10,
  GG: 10,
};

function createProductPhotos(
  productCode: string,
  photos: Array<{
    id: string;
    src: string;
    alt: string;
    colorId?: string;
  }>,
): ProductPhoto[] {
  return photos.map((photo) => ({
    ...photo,
    id: `${productCode}-${photo.id}`,
  }));
}

const oversizedDetails = [
  "Modelagem oversized",
  "Malha de toque encorpado",
  "Gola careca reforçada",
  "Caimento amplo",
  "Produto da linha Oversized GM Clothing",
];

const oversizedTags = [
  "camiseta oversized",
  "oversized masculino",
  "streetwear",
  "moda masculina",
  "gm clothing",
  "drop oversized",
];

type OversizedProductInput = {
  slug: string;
  skuCode: string;
  name: string;
  shortName: string;
  active?: boolean;
  color: ProductColor;
  description: string;
  salesNote: string;
  badge?: string;
  stockBySize?: StockBySize;
  tags?: string[];
};

const oversizedCatalogPhotoSources: Record<string, string[]> = {
  "oversized-box-preta": [
    "/products/Oversized/a5916e0c-712d-4785-8868-69b4fa193145.webp",
    "/products/Oversized/d3da7709-c81e-4a0f-9e3a-a042d0e10f95.webp",
    "/products/Oversized/5c095ef5-2dc1-4db6-8b36-0976cdc6ecdd.webp",
    "/products/Oversized/478f0b24-16d7-42d5-9ea0-771cf7444dd9.webp",
    "/products/Oversized/56101010-0f61-4613-8ff0-75683d4f2d76.webp",
  ],
  "oversized-box-off-white": [
    "/products/Oversized/f6ad0234-e5e8-48d5-b935-1f79dfe31ff6.webp",
    "/products/Oversized/39692017-22f5-4bbe-82bf-d6f083187c02.webp",
    "/products/Oversized/5a8eef4c-69b9-4467-a217-8b63e0652da0.webp",
    "/products/Oversized/f8665d17-00f6-4599-8975-0cbbe0dcf8ca.webp",
    "/products/Oversized/7de91b42-46ca-483a-adaa-074a04c0ed02.webp",
  ],
  "oversized-box-azul-marinho": [
    "/products/Oversized/07be526e-9d41-4166-a759-e7ca38424678.webp",
    "/products/Oversized/1a9df566-6fea-4ed4-86b4-0bd3eb1e57bd.webp",
    "/products/Oversized/69125d74-8298-4178-a689-7dab3c7fa174.webp",
    "/products/Oversized/cc15f350-279f-466c-9797-ea10d83f910c.webp",
    "/products/Oversized/28aa9013-9a6d-4764-9177-aaf317934cd2.webp",
  ],
  "oversized-pre-treino-preta": [
    "/products/Oversized/220e13eb-7093-4a5d-bab7-0b4ddd0f083a.webp",
    "/products/Oversized/c8b958e2-30f7-46cf-908e-b2a13358febf.webp",
    "/products/Oversized/6cefacd8-7970-4eed-afef-337561150c31.webp",
    "/products/Oversized/8292a2e4-11c9-40b3-bb94-a969d1b4965f.webp",
    "/products/Oversized/b4b24265-e78f-4f21-9224-13c6e1992fb9.webp",
  ],
  "oversized-graphic-marrom": [
    "/products/Oversized/77e279a5-451d-4c26-b3e2-6207e0b70ea3.webp",
    "/products/Oversized/a7df4077-860e-4fb5-ae55-baa04438ddf0.webp",
    "/products/Oversized/946cbfdc-2e70-4a90-84d1-e2321be0e3d8.webp",
    "/products/Oversized/7dedb7b8-a896-40ab-b3e7-19819c73988b.webp",
    "/products/Oversized/d23564ad-8380-427c-be10-9898efcaf484.webp",
  ],
  "oversized-essential-preta": [
    "/products/Oversized/1c8a6912-8647-4a41-bd85-03b3228b0680.webp",
    "/products/Oversized/edaeffb7-da2b-4a12-9ccf-b090c6907dfe.webp",
    "/products/Oversized/baffa66d-46eb-4999-a4f2-dadeed1c8f13.webp",
    "/products/Oversized/3a7ce6ef-41f5-4746-a864-65cdc384bb5d.webp",
    "/products/Oversized/e1071e70-822e-4685-9c11-c8f0cc67c576.webp",
  ],
  "oversized-essential-off-white": [
    "/products/Oversized/9ede750c-7805-46e6-808f-1e16967104e3.webp",
    "/products/Oversized/31a7562d-04cf-49f6-a77a-3a6719d9c597.webp",
    "/products/Oversized/4858bcfb-5c03-4ee7-ae94-2b11ac1a8a7e.webp",
    "/products/Oversized/f6443761-e027-4a16-b3b9-90cd5f4cb7f7.webp",
    "/products/Oversized/e844ccf5-594c-435a-aa40-83714d330f6e.webp",
  ],
  "oversized-court-verde-militar": [
    "/products/Oversized/19a7faee-7612-4671-9aff-dc9120e2f25f.webp",
    "/products/Oversized/12390414-6594-48a0-90b1-6cf384aec7e8.webp",
    "/products/Oversized/60f149bc-e09d-4b59-9739-464cbd60e461.webp",
    "/products/Oversized/c56b24c0-29ef-451a-b6ef-bb2ad5d3d35d.webp",
    "/products/Oversized/f0c45bc4-cf56-49dd-8447-5165f8702165.webp",
  ],
  "oversized-court-marrom": [
    "/products/Oversized/6383e7ff-1f34-4ecf-a215-9d5959bfab5c.webp",
    "/products/Oversized/e4d5f4b1-8d54-4579-a7be-dd3de4791aef.webp",
    "/products/Oversized/e377cd97-ce26-49ff-9552-f83b3cd64026.webp",
    "/products/Oversized/ea61f66f-3ea5-4479-a177-f7fb42137b4d.webp",
    "/products/Oversized/a04d29cf-f7d6-49bf-be6a-a9251063c206.webp",
  ],
  "oversized-graphic-azul-preta": [
    "/products/Oversized/5e0ff254-1750-40f0-946e-708a3308e9e6.webp",
    "/products/Oversized/1230a2c7-8d31-4b34-b86e-a9873e590748.webp",
    "/products/Oversized/82181edb-1c82-4d4d-9640-8c747950d2e1.webp",
    "/products/Oversized/77601549-84d6-4b48-814d-2bbec48e8e19.webp",
    "/products/Oversized/9f746fdf-f96b-4cc6-8526-71e3985130e8.webp",
  ],
  "oversized-graphic-azul-off-white": [
    "/products/Oversized/bcfdbecf-4bb1-4120-a9b4-3c705b0eac8c.webp",
    "/products/Oversized/6b02eadc-1ac4-4cdb-870c-f5840e9bb225.webp",
    "/products/Oversized/88ee6e28-ed7d-45bb-a004-0f6112966094.webp",
    "/products/Oversized/99493324-0630-41e2-b1d8-2d726c2df61b.webp",
    "/products/Oversized/481aff48-1002-4802-9bd1-48b5cd71b17f.webp",
  ],
};

function createSequentialProductPhotos(
  productCode: string,
  productName: string,
  colorId?: string,
): ProductPhoto[] {
  const mappedSources = oversizedCatalogPhotoSources[productCode];

  return Array.from({ length: mappedSources?.length ?? 5 }, (_, index) => {
    const photoNumber = String(index + 1).padStart(2, "0");

    return {
      id: `${productCode}-foto-${photoNumber}`,
      src:
        mappedSources?.[index] ??
        `/products/oversized-catalog/${productCode}-${photoNumber}.webp`,
      alt: `${productName} foto ${index + 1}`,
      colorId,
    };
  });
}

function createOversizedProduct(input: OversizedProductInput): Product {
  return {
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    active: input.active ?? true,
    description: input.description,
    salesNote: input.salesNote,
    details: [...oversizedDetails],
    price: oversizedPromoPricing.price,
    promotionalPrice: oversizedPromoPricing.promotionalPrice,
    colorPricing: {
      [colors.offWhite.id]: oversizedWhitePricing,
    },
    yampiCheckoutUrl: null,
    collection: "Oversized",
    category: "Oversized",
    type: "apparel",
    features: [...oversizedDetails],
    styleTags: ["street", "oversized", "premium"],
    tags: Array.from(new Set([...oversizedTags, ...(input.tags ?? [])])),
    badge: input.badge ?? "Novo oversized",
    hideStockCount: true,
    showSizeGuide: false,
    photos: createSequentialProductPhotos(input.slug, input.name),
    variants: [
      ...createVariants(
        input.skuCode,
        input.color,
        input.stockBySize ?? standardSizeStock,
        input.slug,
      ),
    ],
  };
}

type OversizedColorOption = {
  productCode: string;
  skuCode: string;
  color: ProductColor;
  stockBySize?: StockBySize;
  tags?: string[];
};

type MultiColorOversizedProductInput = {
  slug: string;
  name: string;
  shortName: string;
  active?: boolean;
  description: string;
  salesNote: string;
  badge?: string;
  tags?: string[];
  colorOptions: OversizedColorOption[];
};

function createMultiColorOversizedProduct(
  input: MultiColorOversizedProductInput,
): Product {
  const optionTags = input.colorOptions.flatMap((option) => option.tags ?? []);

  return {
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    active: input.active ?? true,
    description: input.description,
    salesNote: input.salesNote,
    details: [...oversizedDetails],
    price: oversizedPromoPricing.price,
    promotionalPrice: oversizedPromoPricing.promotionalPrice,
    colorPricing: {
      [colors.offWhite.id]: oversizedWhitePricing,
    },
    yampiCheckoutUrl: null,
    collection: "Oversized",
    category: "Oversized",
    type: "apparel",
    features: [...oversizedDetails],
    styleTags: ["street", "oversized", "premium"],
    tags: Array.from(
      new Set([...oversizedTags, ...(input.tags ?? []), ...optionTags]),
    ),
    badge: input.badge ?? "Novo oversized",
    hideStockCount: true,
    showSizeGuide: false,
    catalogColorSlugs: input.colorOptions.map((option) => ({
      slug: option.productCode,
      colorId: option.color.id,
      colorName: option.color.name,
    })),
    photos: input.colorOptions.flatMap((option) =>
      createSequentialProductPhotos(
        option.productCode,
        input.name,
        option.color.id,
      ),
    ),
    variants: input.colorOptions.flatMap((option) =>
      createVariants(
        option.skuCode,
        option.color,
        option.stockBySize ?? standardSizeStock,
        input.slug,
      ),
    ),
  };
}

export const products: Product[] = [
  createMultiColorOversizedProduct({
    slug: "oversized-box-preta",
    name: "Camiseta Oversized Box",
    shortName: "Box Oversized",
    active: false,
    description:
      "Camiseta oversized Box com patch frontal contrastante, visual limpo e presença urbana em cores selecionadas.",
    salesNote:
      "Um mesmo modelo, mais de uma cor. Escolha a variante que combina com seu look sem sair da página.",
    tags: ["box", "graphic tee"],
    colorOptions: [
      {
        productCode: "oversized-box-preta",
        skuCode: "GMC-OVS-BXPR",
        color: colors.black,
        tags: ["preto", "camiseta preta"],
      },
      {
        productCode: "oversized-box-off-white",
        skuCode: "GMC-OVS-BXOF",
        color: colors.offWhite,
        tags: ["off-white", "camiseta off-white"],
      },
      {
        productCode: "oversized-box-azul-marinho",
        skuCode: "GMC-OVS-BXAZ",
        color: colors.navy,
        tags: ["azul marinho", "camiseta azul"],
      },
    ],
  }),
  createOversizedProduct({
    slug: "oversized-pre-treino-preta",
    skuCode: "GMC-OVS-PTPR",
    name: "Camiseta Oversized Pré-Treino",
    shortName: "Pré-Treino",
    color: colors.black,
    description:
      "Camiseta oversized preta com arte frontal pequena, pegada de treino e linguagem streetwear para presença no dia a dia.",
    salesNote:
      "Uma preta com atitude. Estampa compacta, caimento amplo e visual pronto para quem gosta de academia, rua e identidade.",
    stockBySize: { M: 10, G: 10, GG: 10 },
    tags: ["preto", "camiseta preta", "academia", "pré-treino"],
  }),
  createOversizedProduct({
    slug: "oversized-graphic-marrom",
    skuCode: "GMC-OVS-GRMR",
    name: "Camiseta Oversized Graphic Marrom",
    shortName: "Graphic Marrom",
    active: false,
    color: colors.brown,
    description:
      "Camiseta oversized marrom com arte gráfica laranja no peito, contraste quente e caimento amplo.",
    salesNote:
      "Marrom premium para sair do básico. A arte pequena segura o visual limpo, mas deixa a peça com personalidade.",
    tags: ["marrom", "camiseta marrom", "graphic tee"],
  }),
  createMultiColorOversizedProduct({
    slug: "oversized-essential-preta",
    name: "Camiseta Oversized Essential Zara",
    shortName: "Essential Zara",
    description:
      "Camiseta oversized minimalista, com visual clean e caimento amplo para looks premium de uso diário.",
    salesNote:
      "A base que vira uniforme. Escolha entre preta e off-white sem sair da página do produto.",
    tags: ["essential", "minimalista"],
    colorOptions: [
      {
        productCode: "oversized-essential-preta",
        skuCode: "GMC-OVS-ESPR",
        color: colors.black,
        tags: ["preto", "camiseta preta"],
      },
      {
        productCode: "oversized-essential-off-white",
        skuCode: "GMC-OVS-ESOF",
        color: colors.offWhite,
        tags: ["off-white", "camiseta off-white"],
      },
    ],
  }),
  createMultiColorOversizedProduct({
    slug: "oversized-court-verde-militar",
    name: "Camiseta Oversized Jordan",
    shortName: "Jordan",
    description:
      "Camiseta oversized Court com referência de quadra, caimento amplo e estética streetwear esportiva.",
    salesNote:
      "Da quadra para a rua. Escolha verde militar ou marrom dentro da mesma página e veja as fotos da cor selecionada.",
    tags: ["basquete", "court", "streetwear esportivo"],
    colorOptions: [
      {
        productCode: "oversized-court-verde-militar",
        skuCode: "GMC-OVS-CTVD",
        color: colors.green,
        tags: ["verde militar"],
      },
      {
        productCode: "oversized-court-marrom",
        skuCode: "GMC-OVS-CTMR",
        color: colors.brown,
        tags: ["marrom"],
      },
    ],
  }),
  createMultiColorOversizedProduct({
    slug: "oversized-graphic-azul-preta",
    name: "Camiseta Oversized Air Jordan",
    shortName: "Air Jordan",
    description:
      "Camiseta oversized com arte azul no peito, contraste frio e estética limpa de streetwear esportivo.",
    salesNote:
      "Detalhe azul para quebrar o óbvio. Escolha preta ou off-white e mantenha a compra no mesmo fluxo.",
    tags: ["azul", "graphic tee", "streetwear esportivo"],
    colorOptions: [
      {
        productCode: "oversized-graphic-azul-preta",
        skuCode: "GMC-OVS-GAPR",
        color: colors.black,
        tags: ["preto"],
      },
      {
        productCode: "oversized-graphic-azul-off-white",
        skuCode: "GMC-OVS-GAOF",
        color: colors.offWhite,
        tags: ["off-white"],
      },
    ],
  }),
  {
    slug: "oversized-faith-division",
    name: "Camiseta Oversized Faith Division",
    shortName: "Faith Division",
    active: false,
    description:
      "Peso, presença e propósito. Uma oversized essencial com assinatura GM discreta.",
    salesNote:
      "Peça de presença para usar no drop, na rua e no pós-jogo. Modelagem ampla, visual forte e acabamento premium.",
    details: [
      "Malha premium de algodão",
      "Modelagem oversized",
      "Estampa frontal e assinatura posterior",
    ],
    price: oversizedPromoPricing.price,
    promotionalPrice: oversizedPromoPricing.promotionalPrice,
    colorPricing: {
      [colors.offWhite.id]: oversizedWhitePricing,
    },
    yampiCheckoutUrl: null,
    collection: "New Chapter",
    category: "Oversized",
    badge: "Lançamento",
    photos: [
      {
        id: "faith-division-preto-frente",
        src: "/products/faith-division.svg",
        alt: "Camiseta preta oversized Faith Division",
      },
      ...createDetailPhotos("faith-division", "Camiseta Faith Division"),
    ],
    variants: [
      ...createVariants("GMC-FD", colors.black, { P: 4, M: 8, G: 6, GG: 2 }),
      ...createVariants("GMC-FD", colors.offWhite, { P: 2, M: 5, G: 3, GG: 0 }),
    ],
  },
  {
    slug: "oversized-court-01",
    name: "Camiseta Oversized Court 01",
    shortName: "Court 01",
    active: false,
    description:
      "Referência das quadras, construída para a rua. Volume amplo e visual preciso.",
    salesNote:
      "A escolha certa para quem quer streetwear com referência de basquete sem perder o visual limpo.",
    details: [
      "Algodão encorpado",
      "Gola reforçada",
      "Estampa inspirada no basquete",
    ],
    price: oversizedPromoPricing.price,
    promotionalPrice: oversizedPromoPricing.promotionalPrice,
    yampiCheckoutUrl: null,
    collection: "Court Culture",
    category: "Oversized",
    badge: "Mais vendido",
    photos: [
      {
        id: "court-01-chumbo-frente",
        src: "/products/court-01.svg",
        alt: "Camiseta cinza oversized Court 01",
      },
      ...createDetailPhotos("court-01", "Camiseta Court 01"),
    ],
    variants: [
      ...createVariants("GMC-C01", colors.charcoal, { P: 3, M: 7, G: 5, GG: 2 }),
      ...createVariants("GMC-C01", colors.black, { P: 1, M: 4, G: 4, GG: 0 }),
    ],
  },
  {
    slug: "oversized-salmo-23",
    name: "Camiseta Oversized Salmo 23",
    shortName: "Salmo 23",
    active: false,
    description:
      "Identidade que não precisa gritar. Mensagem sutil, construção premium.",
    salesNote:
      "Mensagem discreta, caimento oversized e preço promocional para garantir antes de esgotar.",
    details: [
      "100% algodão",
      "Silhueta oversized",
      "Detalhe tipográfico nas costas",
    ],
    price: oversizedPromoPricing.price,
    promotionalPrice: oversizedPromoPricing.promotionalPrice,
    colorPricing: {
      [colors.offWhite.id]: oversizedWhitePricing,
    },
    yampiCheckoutUrl: null,
    collection: "Essentials",
    category: "Oversized",
    badge: "Últimas peças",
    photos: [
      {
        id: "salmo-23-off-white-frente",
        src: "/products/salmo-23.svg",
        alt: "Camiseta off-white oversized Salmo 23",
      },
      ...createDetailPhotos("salmo-23", "Camiseta Salmo 23"),
    ],
    variants: [
      ...createVariants("GMC-S23", colors.offWhite, { P: 1, M: 2, G: 1 }),
      ...createVariants("GMC-S23", colors.black, { P: 0, M: 1, G: 0 }),
    ],
  },
  {
    slug: "camiseta-brasil-versao-jogador",
    name: "Camiseta Brasil Versão Jogador — Copa 2026",
    shortName: "Brasil Versão Jogador",
    active: false,
    description:
      "Camiseta Brasil versão jogador em tecido premium Dry Fit, com visual moderno, toque leve e acabamento superior.",
    salesNote:
      "Uma peça feita para viver a temporada da Copa com estilo, performance e presença dentro e fora dos jogos.",
    details: [
      "Versão jogador",
      "Tecido premium Dry Fit",
      "Leve e respirável",
      "Caimento esportivo",
      "Acabamento superior",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 399.9,
    promotionalPrice: 279.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Brasil",
    type: "apparel",
    campaign: "copa-2026",
    subcollection: "Brasil",
    styleTags: ["futebol", "performance", "street"],
    tags: [
      "camiseta brasil",
      "camisa brasil 2026",
      "camiseta seleção brasileira",
      "versão jogador",
      "copa do mundo",
      "copa 2026",
      "dry fit",
      "futebol",
      "brasil",
      "gm clothing",
      "moda masculina",
      "streetwear esportivo",
    ],
    badge: "Brasil em destaque",
    hideStockCount: true,
    showSizeGuide: false,
    photos: createProductPhotos("brasil-player-2026", [
      {
        id: "frente",
        src: "/products/copa/camiseta-brasil-versao-jogador-frente.webp",
        alt: "Camiseta Brasil versão jogador Copa 2026 frente",
      },
      {
        id: "frente-2",
        src: "/products/copa/camiseta-brasil-versao-jogador-frente-2.webp",
        alt: "Camiseta Brasil versão jogador Copa 2026 em look frontal",
      },
      {
        id: "costas",
        src: "/products/copa/camiseta-brasil-versao-jogador-costas.webp",
        alt: "Camiseta Brasil versão jogador Copa 2026 costas",
      },
      {
        id: "detalhe-gola",
        src: "/products/copa/camiseta-brasil-versao-jogador-detalhe-gola.webp",
        alt: "Detalhe da gola da Camiseta Brasil versão jogador Copa 2026",
      },
      {
        id: "detalhe-lateral",
        src: "/products/copa/camiseta-brasil-versao-jogador-detalhe-lateral.webp",
        alt: "Detalhe lateral da Camiseta Brasil versão jogador Copa 2026",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-COPA-BRJ26",
        colors.brazilYellow,
        standardSizeStock,
      ),
    ],
  },
  {
    slug: "camiseta-argentina-versao-jogador",
    name: "Camiseta Argentina Versão Jogador — Copa 2026",
    shortName: "Argentina Versão Jogador",
    active: false,
    description:
      "Camiseta Argentina versão jogador com tecido leve, visual de campo e acabamento premium para viver a temporada da Copa.",
    salesNote:
      "Uma peça esportiva com presença limpa: listras clássicas, toque respirável e estética pronta para jogo, rua e coleção.",
    details: [
      "Versão jogador",
      "Tecido leve e respirável",
      "Caimento esportivo",
      "Acabamento premium",
      "Visual Argentina clássico",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 399.9,
    promotionalPrice: 279.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Argentina",
    campaign: "copa-2026",
    subcollection: "Argentina",
    tags: [
      "camiseta argentina",
      "camisa argentina 2026",
      "versão jogador",
      "copa do mundo",
      "copa 2026",
      "futebol",
      "argentina",
      "gm clothing",
      "moda masculina",
      "streetwear esportivo",
    ],
    badge: "Versão jogador",
    hideStockCount: true,
    photos: createProductPhotos("argentina-player-2026", [
      {
        id: "frente",
        src: "/products/copa/camiseta-argentina-versao-jogador-frente.webp",
        alt: "Camiseta Argentina versão jogador Copa 2026 frente",
      },
      {
        id: "frente-2",
        src: "/products/copa/camiseta-argentina-versao-jogador-frente-2.webp",
        alt: "Camiseta Argentina versão jogador Copa 2026 em look frontal",
      },
      {
        id: "costas",
        src: "/products/copa/camiseta-argentina-versao-jogador-costas.webp",
        alt: "Camiseta Argentina versão jogador Copa 2026 costas",
      },
      {
        id: "detalhe-peito",
        src: "/products/copa/camiseta-argentina-versao-jogador-detalhe-peito.webp",
        alt: "Detalhe frontal da Camiseta Argentina versão jogador Copa 2026",
      },
      {
        id: "detalhe-barra",
        src: "/products/copa/camiseta-argentina-versao-jogador-detalhe-barra.webp",
        alt: "Detalhe de barra da Camiseta Argentina versão jogador Copa 2026",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-COPA-ARGJ26",
        colors.argentinaBlue,
        standardSizeStock,
      ),
    ],
  },
  {
    slug: "brasil-retro-2006-kaka",
    name: "Camisa Brasil Retrô Kaká 2006",
    shortName: "Retrô Kaká 2006",
    active: false,
    description:
      "Camisa Brasil retrô Kaká 2006 com visual clássico, presença de Copa e leitura vintage para coleção e uso urbano.",
    salesNote:
      "Uma peça para quem vive futebol com memória, estilo e identidade. Nostalgia de Copa com acabamento premium GM.",
    details: [
      "Linha Brasil Retrô",
      "Inspiração Copa 2006",
      "Visual vintage",
      "Caimento esportivo",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 449.9,
    promotionalPrice: 299.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Brasil",
    type: "apparel",
    campaign: "copa-2026",
    subcollection: "Retrô",
    styleTags: ["futebol", "retro", "street"],
    tags: [
      "camisa brasil retro",
      "camisa kaka 2006",
      "copa 2006",
      "copa do mundo",
      "copa 2026",
      "futebol",
      "brasil",
      "gm clothing",
      "streetwear esportivo",
    ],
    badge: "Retrô 2006",
    hideStockCount: true,
    showSizeGuide: false,
    photos: createProductPhotos("brasil-retro-kaka-2006", [
      {
        id: "frente",
        src: "/products/copa/brasil-retro-2006-kaka-frente.webp",
        alt: "Camisa Brasil Retrô Kaká 2006 frente",
      },
      {
        id: "costas",
        src: "/products/copa/brasil-retro-2006-kaka-costas.webp",
        alt: "Camisa Brasil Retrô Kaká 2006 costas",
      },
      {
        id: "detalhe-frente",
        src: "/products/copa/brasil-retro-2006-kaka-detalhe-frente.webp",
        alt: "Detalhe frontal da Camisa Brasil Retrô Kaká 2006",
      },
      {
        id: "detalhe-costas",
        src: "/products/copa/brasil-retro-2006-kaka-detalhe-costas.webp",
        alt: "Detalhe das costas da Camisa Brasil Retrô Kaká 2006",
      },
      {
        id: "look",
        src: "/products/copa/brasil-retro-2006-kaka-look.webp",
        alt: "Camisa Brasil Retrô Kaká 2006 em look masculino",
      },
    ]),
    variants: [
      ...createVariants("GMC-COPA-BRK06", colors.brazilYellow, standardSizeStock),
    ],
  },
  {
    slug: "brasil-retro-2006-ronaldinho",
    name: "Camisa Brasil Retrô Ronaldinho 2006",
    shortName: "Retrô Ronaldinho 2006",
    active: true,
    description:
      "Camisa Brasil retrô Ronaldinho 2006 com estética clássica, número 10 e energia de Copa em uma peça de presença.",
    salesNote:
      "Clássica, forte e colecionável. Uma camisa para vestir história sem perder a linguagem streetwear da GM.",
    details: [
      "Linha Brasil Retrô",
      "Inspiração Copa 2006",
      "Visual vintage",
      "Caimento esportivo",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 449.9,
    promotionalPrice: 299.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Brasil",
    type: "apparel",
    campaign: "copa-2026",
    subcollection: "Retrô",
    styleTags: ["futebol", "retro", "street"],
    tags: [
      "camisa brasil retro",
      "camisa ronaldinho 2006",
      "copa 2006",
      "copa do mundo",
      "copa 2026",
      "futebol",
      "brasil",
      "gm clothing",
      "streetwear esportivo",
    ],
    badge: "Retrô 2006",
    hideStockCount: true,
    showSizeGuide: false,
    photos: createProductPhotos("brasil-retro-ronaldinho-2006", [
      {
        id: "frente",
        src: "/products/copa/brasil-retro-2006-ronaldinho-frente.webp",
        alt: "Camisa Brasil Retrô Ronaldinho 2006 frente",
      },
      {
        id: "costas",
        src: "/products/copa/brasil-retro-2006-ronaldinho-costas.webp",
        alt: "Camisa Brasil Retrô Ronaldinho 2006 costas",
      },
      {
        id: "detalhe-frente",
        src: "/products/copa/brasil-retro-2006-ronaldinho-detalhe-frente.webp",
        alt: "Detalhe frontal da Camisa Brasil Retrô Ronaldinho 2006",
      },
      {
        id: "detalhe-costas",
        src: "/products/copa/brasil-retro-2006-ronaldinho-detalhe-costas.webp",
        alt: "Detalhe das costas da Camisa Brasil Retrô Ronaldinho 2006",
      },
      {
        id: "look",
        src: "/products/copa/brasil-retro-2006-ronaldinho-look.webp",
        alt: "Camisa Brasil Retrô Ronaldinho 2006 em look masculino",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-COPA-BRR06",
        colors.brazilYellow,
        standardSizeStock,
        "brasil-retro-2006-ronaldinho",
      ),
    ],
  },
  {
    slug: "camisa-cr7",
    name: "Camisa CR7 — Football Icons",
    shortName: "Camisa CR7",
    active: true,
    description:
      "Camisa CR7 com estampa de impacto nas costas, visual futebol streetwear e presença forte para a temporada da Copa.",
    salesNote:
      "Ídolo, futebol e rua na mesma peça. Uma camisa feita para compor looks de Copa com atitude e leitura premium.",
    details: [
      "Linha Football Icons",
      "Estampa Cristiano Ronaldo nas costas",
      "Modelagem streetwear",
      "Caimento confortável",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 199.9,
    promotionalPrice: 119.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Cristiano Ronaldo",
    type: "apparel",
    campaign: "copa-2026",
    subcollection: "Cristiano Ronaldo",
    styleTags: ["futebol", "street", "football icons"],
    tags: [
      "camisa cr7",
      "cristiano ronaldo",
      "football icons",
      "copa do mundo",
      "copa 2026",
      "futebol",
      "streetwear",
      "gm clothing",
      "moda masculina",
    ],
    badge: "Football Icons",
    hideStockCount: true,
    showSizeGuide: false,
    catalogColorSlugs: [
      {
        slug: "camisa-cr7-off-white",
        colorId: colors.offWhite.id,
        colorName: colors.offWhite.name,
      },
      {
        slug: "camisa-cr7-preta",
        colorId: colors.black.id,
        colorName: colors.black.name,
      },
    ],
    photos: createProductPhotos("camisa-cr7", [
      {
        id: "off-white-costas",
        src: "/products/copa/1c54dc07-e0b3-4479-8e7d-3179d3449e38.webp",
        alt: "Camisa CR7 off-white costas",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-detalhe-costas",
        src: "/products/copa/74ac34f1-8abc-4729-9a6c-fb80c797ff8f.webp",
        alt: "Detalhe da estampa da Camisa CR7 off-white",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-look",
        src: "/products/copa/9345c1bd-c425-47f1-a53d-d7cccca46556.webp",
        alt: "Camisa CR7 off-white em look masculino",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-costas-2",
        src: "/products/copa/919a2f86-a683-4f94-a59d-209025b1db17.webp",
        alt: "Camisa CR7 off-white vista lateral",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-costas-3",
        src: "/products/copa/c8094318-5eaf-40e1-9708-3f5cbc211776.webp",
        alt: "Camisa CR7 off-white costas em estúdio",
        colorId: colors.offWhite.id,
      },
      {
        id: "preta-costas",
        src: "/products/copa/3a31e56e-5dd3-46dc-a187-d708d94bfe71.webp",
        alt: "Camisa CR7 preta costas",
        colorId: colors.black.id,
      },
      {
        id: "preta-costas-2",
        src: "/products/copa/fa71bf4d-2e69-4f9e-aedb-ec7d3b4b87fc.webp",
        alt: "Camisa CR7 preta vista lateral",
        colorId: colors.black.id,
      },
      {
        id: "preta-frente",
        src: "/products/copa/2b607326-5a11-4071-bc3c-cf9d97e2a39c.webp",
        alt: "Camisa CR7 preta frente",
        colorId: colors.black.id,
      },
      {
        id: "preta-look",
        src: "/products/copa/cb61ac66-b19e-42fc-ae58-7c00e2346beb.webp",
        alt: "Camisa CR7 preta em look masculino",
        colorId: colors.black.id,
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-COPA-CR7OF",
        colors.offWhite,
        standardSizeStock,
        "camisa-cr7",
      ),
      ...createVariants(
        "GMC-COPA-CR7PR",
        colors.black,
        standardSizeStock,
        "camisa-cr7",
      ),
    ],
  },
  {
    slug: "oversized-brasil",
    name: "Camiseta Oversized Brasil",
    shortName: "Oversized Brasil",
    active: true,
    description:
      "Camiseta oversized Brasil com estampa frontal de seleção, caimento amplo e estética futebol streetwear.",
    salesNote:
      "Brasil no peito, rua no visual. Uma peça direta para viver a Copa com conforto, presença e identidade GM.",
    details: [
      "Modelagem oversized",
      "Estampa Brasil frontal",
      "Caimento amplo",
      "Visual futebol streetwear",
      "Produto da linha Copa do Mundo GM Clothing",
    ],
    price: 199.9,
    promotionalPrice: 119.9,
    yampiCheckoutUrl: null,
    collection: "Copa do Mundo",
    category: "Brasil",
    type: "apparel",
    campaign: "copa-2026",
    subcollection: "Oversized Futebol",
    styleTags: ["futebol", "street", "oversized"],
    tags: [
      "oversized brasil",
      "camiseta brasil",
      "copa do mundo",
      "copa 2026",
      "futebol",
      "brasil",
      "streetwear",
      "gm clothing",
      "moda masculina",
    ],
    badge: "Oversized Brasil",
    hideStockCount: true,
    showSizeGuide: false,
    catalogColorSlugs: [
      {
        slug: "oversized-brasil-off-white",
        colorId: colors.offWhite.id,
        colorName: colors.offWhite.name,
      },
      {
        slug: "oversized-brasil-preta",
        colorId: colors.black.id,
        colorName: colors.black.name,
      },
    ],
    photos: createProductPhotos("oversized-brasil", [
      {
        id: "off-white-frente",
        src: "/products/copa/b132eb66-943c-422c-9933-be800e757fa9.webp",
        alt: "Camiseta Oversized Brasil off-white frente",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-detalhe",
        src: "/products/copa/87e556c9-0f5e-4d47-ae13-0dc63826f91e.webp",
        alt: "Detalhe frontal da Camiseta Oversized Brasil off-white",
        colorId: colors.offWhite.id,
      },
      {
        id: "off-white-look",
        src: "/products/copa/e00c0b3a-28d3-454e-9cc9-caa289505266.webp",
        alt: "Camiseta Oversized Brasil off-white em look masculino",
        colorId: colors.offWhite.id,
      },
      {
        id: "preta-frente",
        src: "/products/copa/5776f535-932e-4f1e-ba5a-3db17f8370cc.webp",
        alt: "Camiseta Oversized Brasil preta frente",
        colorId: colors.black.id,
      },
      {
        id: "preta-look",
        src: "/products/copa/7cadaa09-e18c-4482-b3bd-672b4331a8e5.webp",
        alt: "Camiseta Oversized Brasil preta em look masculino",
        colorId: colors.black.id,
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-COPA-OVBROF",
        colors.offWhite,
        standardSizeStock,
        "oversized-brasil",
      ),
      ...createVariants(
        "GMC-COPA-OVBRPR",
        colors.black,
        standardSizeStock,
        "oversized-brasil",
      ),
    ],
  },
  {
    slug: "sueter-chenile-zara",
    name: "Suéter Chenile Zara",
    shortName: "Chenile Zara",
    active: true,
    description:
      "Suéter chenile com textura premium, toque macio e presença limpa para a coleção de inverno da GM Clothing.",
    salesNote:
      "O produto principal da coleção de inverno. Textura que aparece na foto, caimento fácil de vestir e leitura premium no primeiro olhar.",
    details: [
      "Suéter masculino em chenile",
      "Toque macio e textura aparente",
      "Gola, punhos e barra canelados",
      "Caimento regular",
      "Produto da coleção frio GM Clothing",
    ],
    price: winterPromoPricing.price,
    promotionalPrice: winterPromoPricing.promotionalPrice,
    shopifyHandle: "sueter-chenile-zara",
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Suéter",
    type: "apparel",
    styleTags: ["inverno", "street", "premium", "tricot"],
    tags: [
      "suéter masculino",
      "suéter chenile",
      "zara",
      "coleção frio",
      "inverno masculino",
      "lançamento",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    features: [
      "Textura chenile",
      "Toque macio",
      "Gola canelada",
      "Punhos e barra canelados",
      "Caimento regular",
    ],
    badge: "Peças limitadas",
    hideStockCount: true,
    showSizeGuide: false,
    catalogColorSlugs: [
      {
        slug: "sueter-chenile-zara-caramelo",
        colorId: colors.caramel.id,
        colorName: colors.caramel.name,
      },
      {
        slug: "sueter-chenile-zara-preto",
        colorId: colors.black.id,
        colorName: colors.black.name,
      },
      {
        slug: "sueter-chenile-zara-azul-marinho",
        colorId: colors.navy.id,
        colorName: colors.navy.name,
      },
      {
        slug: "sueter-chenile-zara-cinza-mesclado",
        colorId: colors.mixedGray.id,
        colorName: colors.mixedGray.name,
      },
    ],
    photos: [
      ...createProductPhotos("sueter-chenile-zara-caramelo", [
        {
          id: "frente",
          src: "/products/winter/sueter-chenile-zara/caramelo/01-frente.webp",
          alt: "Suéter Chenile Zara caramelo frente",
          colorId: colors.caramel.id,
        },
        {
          id: "look",
          src: "/products/winter/sueter-chenile-zara/caramelo/02-look.webp",
          alt: "Suéter Chenile Zara caramelo em look masculino",
          colorId: colors.caramel.id,
        },
        {
          id: "costas",
          src: "/products/winter/sueter-chenile-zara/caramelo/03-costas.webp",
          alt: "Suéter Chenile Zara caramelo costas",
          colorId: colors.caramel.id,
        },
        {
          id: "editorial",
          src: "/products/winter/sueter-chenile-zara/caramelo/04-frente-editorial.webp",
          alt: "Suéter Chenile Zara caramelo em pose editorial",
          colorId: colors.caramel.id,
        },
        {
          id: "detalhe-superior",
          src: "/products/winter/sueter-chenile-zara/caramelo/05-detalhe-superior.webp",
          alt: "Detalhe superior do Suéter Chenile Zara caramelo",
          colorId: colors.caramel.id,
        },
        {
          id: "detalhe-manga",
          src: "/products/winter/sueter-chenile-zara/caramelo/06-detalhe-manga.webp",
          alt: "Detalhe de manga do Suéter Chenile Zara caramelo",
          colorId: colors.caramel.id,
        },
        {
          id: "detalhe-textura",
          src: "/products/winter/sueter-chenile-zara/caramelo/07-detalhe-textura.webp",
          alt: "Detalhe da textura chenile na cor caramelo",
          colorId: colors.caramel.id,
        },
      ]),
      ...createProductPhotos("sueter-chenile-zara-preto", [
        {
          id: "frente",
          src: "/products/winter/sueter-chenile-zara/preto/01-frente.webp",
          alt: "Suéter Chenile Zara preto frente",
          colorId: colors.black.id,
        },
        {
          id: "look",
          src: "/products/winter/sueter-chenile-zara/preto/02-look.webp",
          alt: "Suéter Chenile Zara preto em look masculino",
          colorId: colors.black.id,
        },
        {
          id: "editorial",
          src: "/products/winter/sueter-chenile-zara/preto/03-frente-editorial.webp",
          alt: "Suéter Chenile Zara preto em pose editorial",
          colorId: colors.black.id,
        },
        {
          id: "detalhe",
          src: "/products/winter/sueter-chenile-zara/preto/04-detalhe.webp",
          alt: "Detalhe do Suéter Chenile Zara preto",
          colorId: colors.black.id,
        },
      ]),
      ...createProductPhotos("sueter-chenile-zara-azul-marinho", [
        {
          id: "frente",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/01-frente.webp",
          alt: "Suéter Chenile Zara azul marinho frente",
          colorId: colors.navy.id,
        },
        {
          id: "look",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/02-look.webp",
          alt: "Suéter Chenile Zara azul marinho em look masculino",
          colorId: colors.navy.id,
        },
        {
          id: "costas",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/03-costas.webp",
          alt: "Suéter Chenile Zara azul marinho costas",
          colorId: colors.navy.id,
        },
        {
          id: "editorial",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/04-frente-editorial.webp",
          alt: "Suéter Chenile Zara azul marinho em pose editorial",
          colorId: colors.navy.id,
        },
        {
          id: "detalhe-punho",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/05-detalhe-punho.webp",
          alt: "Detalhe de punho do Suéter Chenile Zara azul marinho",
          colorId: colors.navy.id,
        },
        {
          id: "look-sentado",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/06-look-sentado.webp",
          alt: "Suéter Chenile Zara azul marinho em look sentado",
          colorId: colors.navy.id,
        },
        {
          id: "detalhe-manga",
          src: "/products/winter/sueter-chenile-zara/azul-marinho/07-detalhe-manga.webp",
          alt: "Detalhe de manga do Suéter Chenile Zara azul marinho",
          colorId: colors.navy.id,
        },
      ]),
      ...createProductPhotos("sueter-chenile-zara-cinza-mesclado", [
        {
          id: "look",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/01-look.webp",
          alt: "Suéter Chenile Zara cinza mesclado em look masculino",
          colorId: colors.mixedGray.id,
        },
        {
          id: "frente",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/02-frente.webp",
          alt: "Suéter Chenile Zara cinza mesclado frente",
          colorId: colors.mixedGray.id,
        },
        {
          id: "costas",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/03-costas.webp",
          alt: "Suéter Chenile Zara cinza mesclado costas",
          colorId: colors.mixedGray.id,
        },
        {
          id: "editorial",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/04-frente-editorial.webp",
          alt: "Suéter Chenile Zara cinza mesclado em pose editorial",
          colorId: colors.mixedGray.id,
        },
        {
          id: "detalhe-superior",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/05-detalhe-superior.webp",
          alt: "Detalhe superior do Suéter Chenile Zara cinza mesclado",
          colorId: colors.mixedGray.id,
        },
        {
          id: "detalhe-textura",
          src: "/products/winter/sueter-chenile-zara/cinza-mesclado/06-detalhe-textura.webp",
          alt: "Detalhe da textura chenile na cor cinza mesclado",
          colorId: colors.mixedGray.id,
        },
      ]),
    ],
    variants: [
      ...createShopifyReadyVariants(
        "sueter-chenile-zara",
        "GMC-CHENILE-CA",
        colors.caramel,
        standardSizeStock,
      ),
      ...createShopifyReadyVariants(
        "sueter-chenile-zara",
        "GMC-CHENILE-PR",
        colors.black,
        standardSizeStock,
      ),
      ...createShopifyReadyVariants(
        "sueter-chenile-zara",
        "GMC-CHENILE-AZ",
        colors.navy,
        standardSizeStock,
      ),
      ...createShopifyReadyVariants(
        "sueter-chenile-zara",
        "GMC-CHENILE-CM",
        colors.mixedGray,
        standardSizeStock,
      ),
    ],
  },
  {
    slug: "sueter-tricot-minimal-preto",
    name: "Suéter Tricot Minimal Preto",
    shortName: "Tricot Minimal Preto",
    active: true,
    description:
      "Suéter preto em tricot com textura discreta, caimento limpo e presença premium para looks urbanos de frio.",
    salesNote:
      "Base forte, fácil de combinar e com acabamento sofisticado. Uma peça essencial para elevar o visual sem esforço.",
    details: [
      "Tricot masculino",
      "Textura discreta",
      "Punhos e barra canelados",
      "Caimento regular",
      "Produto da coleção frio GM Clothing",
    ],
    price: 249.9,
    promotionalPrice: 149.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Suéter",
    tags: [
      "suéter masculino",
      "tricot masculino",
      "coleção frio",
      "preto",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("sueter-minimal-preto", [
      {
        id: "frente",
        src: "/products/colecao-frio/sueter-minimal-preto-frente.webp",
        alt: "Suéter Tricot Minimal Preto frente",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/sueter-minimal-preto-frente-2.webp",
        alt: "Suéter Tricot Minimal Preto em look frontal",
      },
      {
        id: "costas-angulo",
        src: "/products/colecao-frio/sueter-minimal-preto-costas-angulo.webp",
        alt: "Suéter Tricot Minimal Preto costas em ângulo",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/sueter-minimal-preto-costas.webp",
        alt: "Suéter Tricot Minimal Preto costas",
      },
      {
        id: "costas-2",
        src: "/products/colecao-frio/sueter-minimal-preto-costas-2.webp",
        alt: "Suéter Tricot Minimal Preto detalhe das costas",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-FRIO-STMPR",
        colors.black,
        standardSizeStock,
        "sueter-tricot-minimal-preto",
      ),
    ],
  },
  {
    slug: "sueter-tricot-geometrico-off-white",
    name: "Suéter Tricot Geométrico Off-White",
    shortName: "Tricot Geométrico",
    active: true,
    description:
      "Suéter off-white em tricot texturizado com desenho geométrico, toque premium e visual claro de alto valor.",
    salesNote:
      "O tipo de peça que muda a percepção do look. Limpa, elegante e com textura suficiente para chamar atenção no detalhe.",
    details: [
      "Tricot masculino",
      "Desenho geométrico em relevo",
      "Gola, punhos e barra canelados",
      "Caimento regular",
      "Produto da coleção frio GM Clothing",
    ],
    price: 249.9,
    promotionalPrice: 149.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Suéter",
    tags: [
      "suéter masculino",
      "tricot masculino",
      "coleção frio",
      "off-white",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("sueter-geometrico-off-white", [
      {
        id: "frente",
        src: "/products/colecao-frio/sueter-geometrico-off-white-frente.webp",
        alt: "Suéter Tricot Geométrico Off-White frente",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/sueter-geometrico-off-white-frente-2.webp",
        alt: "Suéter Tricot Geométrico Off-White em look frontal",
      },
      {
        id: "detalhe-frente",
        src: "/products/colecao-frio/sueter-geometrico-off-white-detalhe-frente.webp",
        alt: "Detalhe frontal do Suéter Tricot Geométrico Off-White",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/sueter-geometrico-off-white-costas.webp",
        alt: "Suéter Tricot Geométrico Off-White costas",
      },
      {
        id: "costas-2",
        src: "/products/colecao-frio/sueter-geometrico-off-white-costas-2.webp",
        alt: "Detalhe das costas do Suéter Tricot Geométrico Off-White",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-FRIO-STGOF",
        colors.offWhite,
        standardSizeStock,
        "sueter-tricot-geometrico-off-white",
      ),
    ],
  },
  {
    slug: "sueter-tricot-texturizado-azul-marinho",
    name: "Suéter Tricot Texturizado Azul Marinho",
    shortName: "Tricot Azul Marinho",
    active: true,
    description:
      "Suéter azul marinho em tricot com textura premium, visual sóbrio e acabamento pensado para presença no frio.",
    salesNote:
      "Azul profundo, textura aparente e caimento limpo. Uma alternativa sofisticada para sair do óbvio sem perder força.",
    details: [
      "Tricot masculino",
      "Textura em faixas e relevo",
      "Punhos e barra canelados",
      "Caimento regular",
      "Produto da coleção frio GM Clothing",
    ],
    price: 249.9,
    promotionalPrice: 149.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Suéter",
    tags: [
      "suéter masculino",
      "tricot masculino",
      "coleção frio",
      "azul marinho",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("sueter-texturizado-azul-marinho", [
      {
        id: "frente",
        src: "/products/colecao-frio/sueter-texturizado-azul-marinho-frente.webp",
        alt: "Suéter Tricot Texturizado Azul Marinho frente",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/sueter-texturizado-azul-marinho-frente-2.webp",
        alt: "Suéter Tricot Texturizado Azul Marinho em look frontal",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/sueter-texturizado-azul-marinho-costas.webp",
        alt: "Suéter Tricot Texturizado Azul Marinho costas",
      },
      {
        id: "look",
        src: "/products/colecao-frio/sueter-texturizado-azul-marinho-look.webp",
        alt: "Suéter Tricot Texturizado Azul Marinho em look masculino",
      },
      {
        id: "detalhe-frente",
        src: "/products/colecao-frio/sueter-texturizado-azul-marinho-detalhe-frente.webp",
        alt: "Detalhe frontal do Suéter Tricot Texturizado Azul Marinho",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-FRIO-STTAZ",
        colors.navy,
        standardSizeStock,
        "sueter-tricot-texturizado-azul-marinho",
      ),
    ],
  },
  {
    slug: "sueter-tricot-trancado-preto",
    name: "Suéter Tricot Trançado Preto",
    shortName: "Tricot Trançado Preto",
    active: true,
    description:
      "Suéter preto em tricot trançado, com textura marcada e linguagem urbana para looks de frio com presença.",
    salesNote:
      "Preto profundo, textura forte e acabamento premium. Uma peça de inverno com cara de campanha, não de básico comum.",
    details: [
      "Tricot masculino",
      "Textura trançada",
      "Punhos e barra canelados",
      "Caimento regular",
      "Produto da coleção frio GM Clothing",
    ],
    price: 249.9,
    promotionalPrice: 149.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Suéter",
    tags: [
      "suéter masculino",
      "tricot masculino",
      "coleção frio",
      "preto",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("sueter-trancado-preto", [
      {
        id: "frente",
        src: "/products/colecao-frio/sueter-trancado-preto-editorial-frente.webp",
        alt: "Suéter Tricot Trançado Preto frente",
      },
      {
        id: "detalhe",
        src: "/products/colecao-frio/sueter-trancado-preto-editorial-detalhe.webp",
        alt: "Detalhe do Suéter Tricot Trançado Preto",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/sueter-trancado-preto-editorial-frente-2.webp",
        alt: "Suéter Tricot Trançado Preto em look frontal",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/sueter-trancado-preto-editorial-costas.webp",
        alt: "Suéter Tricot Trançado Preto costas",
      },
      {
        id: "look",
        src: "/products/colecao-frio/sueter-trancado-preto-editorial-look.webp",
        alt: "Suéter Tricot Trançado Preto em composição de inverno",
      },
    ]),
    variants: [
      ...createVariants(
        "GMC-FRIO-STTPR",
        colors.black,
        standardSizeStock,
        "sueter-tricot-trancado-preto",
      ),
    ],
  },
  {
    slug: "polo-tricot",
    name: "Polo Tricot",
    shortName: "Polo Tricot",
    active: true,
    description:
      "Polo em tricot leve com textura vertical, gola aberta e acabamento premium para um visual masculino limpo.",
    salesNote:
      "Uma mesma base em duas cores essenciais. Escolha preta ou off-white sem sair da página do produto.",
    details: [
      "Tricot leve masculino",
      "Gola polo aberta",
      "Manga curta",
      "Textura vertical",
      "Produto da coleção frio GM Clothing",
    ],
    price: 199.9,
    promotionalPrice: 129.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Polo Tricot",
    tags: [
      "polo masculina",
      "polo tricot",
      "coleção frio",
      "off-white",
      "preto",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    showSizeGuide: false,
    catalogColorSlugs: [
      {
        slug: "polo-tricot-off-white",
        colorId: colors.offWhite.id,
        colorName: colors.offWhite.name,
      },
      {
        slug: "polo-tricot-preta",
        colorId: colors.black.id,
        colorName: colors.black.name,
      },
    ],
    photos: [
      ...createProductPhotos("polo-tricot-off-white", [
        {
          id: "lateral",
          src: "/products/colecao-frio/polo-tricot-off-white-lateral.webp",
          alt: "Polo Tricot Off-White em ângulo lateral",
          colorId: colors.offWhite.id,
        },
        {
          id: "frente",
          src: "/products/colecao-frio/polo-tricot-off-white-frente.webp",
          alt: "Polo Tricot Off-White frente",
          colorId: colors.offWhite.id,
        },
        {
          id: "frente-2",
          src: "/products/colecao-frio/polo-tricot-off-white-frente-2.webp",
          alt: "Polo Tricot Off-White em look frontal",
          colorId: colors.offWhite.id,
        },
        {
          id: "costas",
          src: "/products/colecao-frio/polo-tricot-off-white-costas.webp",
          alt: "Polo Tricot Off-White costas",
          colorId: colors.offWhite.id,
        },
        {
          id: "detalhe",
          src: "/products/colecao-frio/polo-tricot-off-white-detalhe.webp",
          alt: "Detalhe da Polo Tricot Off-White",
          colorId: colors.offWhite.id,
        },
      ]),
      ...createProductPhotos("polo-tricot-preta", [
        {
          id: "frente",
          src: "/products/colecao-frio/polo-tricot-preta-frente.webp",
          alt: "Polo Tricot Preta frente",
          colorId: colors.black.id,
        },
        {
          id: "frente-2",
          src: "/products/colecao-frio/polo-tricot-preta-frente-2.webp",
          alt: "Polo Tricot Preta em look frontal",
          colorId: colors.black.id,
        },
        {
          id: "detalhe",
          src: "/products/colecao-frio/polo-tricot-preta-detalhe.webp",
          alt: "Detalhe da Polo Tricot Preta",
          colorId: colors.black.id,
        },
        {
          id: "costas",
          src: "/products/colecao-frio/polo-tricot-preta-costas.webp",
          alt: "Polo Tricot Preta costas",
          colorId: colors.black.id,
        },
        {
          id: "detalhe-2",
          src: "/products/colecao-frio/polo-tricot-preta-detalhe-2.webp",
          alt: "Detalhe frontal da Polo Tricot Preta",
          colorId: colors.black.id,
        },
      ]),
    ],
    variants: [
      ...createVariants(
        "GMC-FRIO-PTOF",
        colors.offWhite,
        standardSizeStock,
        "polo-tricot",
      ),
      ...createVariants(
        "GMC-FRIO-PTPR",
        colors.black,
        standardSizeStock,
        "polo-tricot",
      ),
    ],
  },
  {
    slug: "polo-tricot-off-white",
    name: "Polo Tricot Off-White",
    shortName: "Polo Tricot Off-White",
    active: false,
    description:
      "Polo off-white em tricot leve com textura vertical, gola aberta e visual limpo para composições premium.",
    salesNote:
      "Uma peça clara, elegante e fácil de usar. Tem presença de camisa premium com conforto de malha leve.",
    details: [
      "Tricot leve masculino",
      "Gola polo aberta",
      "Manga curta",
      "Textura vertical",
      "Produto da coleção frio GM Clothing",
    ],
    price: 199.9,
    promotionalPrice: 129.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Polo Tricot",
    tags: [
      "polo masculina",
      "polo tricot",
      "coleção frio",
      "off-white",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("polo-tricot-off-white", [
      {
        id: "lateral",
        src: "/products/colecao-frio/polo-tricot-off-white-lateral.webp",
        alt: "Polo Tricot Off-White em ângulo lateral",
      },
      {
        id: "frente",
        src: "/products/colecao-frio/polo-tricot-off-white-frente.webp",
        alt: "Polo Tricot Off-White frente",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/polo-tricot-off-white-frente-2.webp",
        alt: "Polo Tricot Off-White em look frontal",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/polo-tricot-off-white-costas.webp",
        alt: "Polo Tricot Off-White costas",
      },
      {
        id: "detalhe",
        src: "/products/colecao-frio/polo-tricot-off-white-detalhe.webp",
        alt: "Detalhe da Polo Tricot Off-White",
      },
    ]),
    variants: [
      ...createVariants("GMC-FRIO-PTOF", colors.offWhite, standardSizeStock),
    ],
  },
  {
    slug: "polo-tricot-preta",
    name: "Polo Tricot Preta",
    shortName: "Polo Tricot Preta",
    active: false,
    description:
      "Polo preta em tricot leve com textura vertical, gola aberta e acabamento premium para um visual masculino limpo.",
    salesNote:
      "Preta, direta e sofisticada. Uma polo com textura real para elevar o básico e funcionar no dia a dia.",
    details: [
      "Tricot leve masculino",
      "Gola polo aberta",
      "Manga curta",
      "Textura vertical",
      "Produto da coleção frio GM Clothing",
    ],
    price: 199.9,
    promotionalPrice: 129.9,
    yampiCheckoutUrl: null,
    collection: "Coleção Frio",
    category: "Polo Tricot",
    tags: [
      "polo masculina",
      "polo tricot",
      "coleção frio",
      "preto",
      "moda masculina",
      "streetwear premium",
      "gm clothing",
    ],
    badge: "Coleção frio",
    hideStockCount: true,
    photos: createProductPhotos("polo-tricot-preta", [
      {
        id: "frente",
        src: "/products/colecao-frio/polo-tricot-preta-frente.webp",
        alt: "Polo Tricot Preta frente",
      },
      {
        id: "frente-2",
        src: "/products/colecao-frio/polo-tricot-preta-frente-2.webp",
        alt: "Polo Tricot Preta em look frontal",
      },
      {
        id: "detalhe",
        src: "/products/colecao-frio/polo-tricot-preta-detalhe.webp",
        alt: "Detalhe da Polo Tricot Preta",
      },
      {
        id: "costas",
        src: "/products/colecao-frio/polo-tricot-preta-costas.webp",
        alt: "Polo Tricot Preta costas",
      },
      {
        id: "detalhe-2",
        src: "/products/colecao-frio/polo-tricot-preta-detalhe-2.webp",
        alt: "Detalhe frontal da Polo Tricot Preta",
      },
    ]),
    variants: [
      ...createVariants("GMC-FRIO-PTPR", colors.black, standardSizeStock),
    ],
  },
  {
    slug: "jersey-brazil-identity",
    name: "Jersey Brazil Identity",
    shortName: "Brazil Identity",
    active: false,
    description:
      "Brasil em outra frequência. Uma jersey urbana para representar com presença.",
    salesNote:
      "Jersey premium para representar fora do óbvio. Leve, urbana e feita para chamar presença.",
    details: [
      "Tecido esportivo respirável",
      "Modelagem ampla",
      "Aplicações premium",
    ],
    price: 159,
    yampiCheckoutUrl: null,
    collection: "National Series",
    category: "Jerseys",
    campaign: "copa-2026",
    subcollection: "Brasil",
    styleTags: ["futebol", "street"],
    tags: [
      "brasil",
      "jersey",
      "copa 2026",
      "futebol",
      "seleção brasileira",
      "streetwear esportivo",
    ],
    photos: [
      {
        id: "brazil-identity-verde-frente",
        src: "/products/brazil-identity.svg",
        alt: "Jersey verde Brazil Identity",
      },
      ...createDetailPhotos("brazil-identity", "Jersey Brazil Identity"),
    ],
    variants: [
      ...createVariants("GMC-BI", colors.green, { P: 3, M: 5, G: 4, GG: 1 }),
      ...createVariants("GMC-BI", colors.black, { P: 2, M: 3, G: 2, GG: 0 }),
    ],
  },
];

export const activeProducts = products.filter((product) => product.active);

type ProductSlugRedirect = {
  slug: string;
  colorId?: string;
};

const productSlugRedirects: Record<string, ProductSlugRedirect> = {
  "oversized-box-off-white": {
    slug: "oversized-box-preta",
    colorId: colors.offWhite.id,
  },
  "oversized-box-azul-marinho": {
    slug: "oversized-box-preta",
    colorId: colors.navy.id,
  },
  "oversized-essential-off-white": {
    slug: "oversized-essential-preta",
    colorId: colors.offWhite.id,
  },
  "oversized-court-marrom": {
    slug: "oversized-court-verde-militar",
    colorId: colors.brown.id,
  },
  "oversized-graphic-azul-off-white": {
    slug: "oversized-graphic-azul-preta",
    colorId: colors.offWhite.id,
  },
  "polo-tricot-off-white": {
    slug: "polo-tricot",
    colorId: colors.offWhite.id,
  },
  "polo-tricot-preta": {
    slug: "polo-tricot",
    colorId: colors.black.id,
  },
  "sueter-chenile-zara-caramelo": {
    slug: "sueter-chenile-zara",
    colorId: colors.caramel.id,
  },
  "sueter-chenile-zara-preto": {
    slug: "sueter-chenile-zara",
    colorId: colors.black.id,
  },
  "sueter-chenile-zara-azul-marinho": {
    slug: "sueter-chenile-zara",
    colorId: colors.navy.id,
  },
  "sueter-chenile-zara-cinza-mesclado": {
    slug: "sueter-chenile-zara",
    colorId: colors.mixedGray.id,
  },
};

export const catalogProducts = getCatalogProducts(activeProducts);

export const copaProducts = activeProducts
  .filter((product) => product.campaign === "copa-2026")
  .sort((firstProduct, secondProduct) => {
    return getBrasilPriority(secondProduct) - getBrasilPriority(firstProduct);
  });

const featuredProductSlugs = [
  "sueter-chenile-zara",
  "camiseta-brasil-versao-jogador",
  "oversized-court-verde-militar",
  "oversized-essential-preta",
];

export const featuredProducts = featuredProductSlugs
  .map((slug) => activeProducts.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product));

export function getProductBySlug(slug: string) {
  return activeProducts.find((product) => product.slug === slug);
}

export function getProductRedirectBySlug(slug: string) {
  return productSlugRedirects[slug];
}

export function getProductRedirectHref(slug: string) {
  const redirectTarget = getProductRedirectBySlug(slug);

  if (!redirectTarget) {
    return undefined;
  }

  return buildProductPath(redirectTarget.slug, redirectTarget.colorId);
}

export function getCopaProductBySlug(slug: string) {
  return copaProducts.find((product) => product.slug === slug);
}

export function getProductHref(product: Product) {
  const slug = product.canonicalSlug ?? product.slug;

  return buildProductPath(slug, product.defaultColorId);
}

export function getProductColors(product: Product) {
  return Array.from(
    new Map(
      product.variants.map((variant) => [variant.color.id, variant.color]),
    ).values(),
  );
}

export function getProductPrimaryPhoto(product: Product) {
  if (product.defaultColorId) {
    const colorPhoto = product.photos.find(
      (photo) => photo.colorId === product.defaultColorId,
    );

    if (colorPhoto) {
      return colorPhoto;
    }
  }

  return product.photos[0] ?? fallbackPhoto;
}

export function getProductPricing(product: Product, colorId?: string) {
  const colorPricing = colorId ? product.colorPricing?.[colorId] : undefined;
  const price = colorPricing?.price ?? product.price;
  const promotionalPrice =
    colorPricing && "promotionalPrice" in colorPricing
      ? colorPricing.promotionalPrice
      : product.promotionalPrice;
  const currentPrice = promotionalPrice ?? price;
  const discountPercentage =
    promotionalPrice && price > promotionalPrice
      ? Math.round(((price - promotionalPrice) / price) * 100)
      : undefined;

  return {
    price,
    promotionalPrice,
    currentPrice,
    discountPercentage,
  };
}

export function getProductCurrentPrice(product: Product, colorId?: string) {
  return getProductPricing(product, colorId).currentPrice;
}

export function getProductTotalStock(product: Product, colorId?: string) {
  return product.variants
    .filter((variant) => !colorId || variant.color.id === colorId)
    .reduce((total, variant) => total + variant.stock, 0);
}

export function getRelatedProducts(
  currentProduct: Product,
  allProducts: Product[] = activeProducts,
  limit = 3,
) {
  const currentTags = new Set([
    ...(currentProduct.tags ?? []),
    ...(currentProduct.styleTags ?? []),
  ]);

  return allProducts
    .filter((product) => product.slug !== currentProduct.slug)
    .filter((product) => product.active)
    .map((product) => {
      const tags = [...(product.tags ?? []), ...(product.styleTags ?? [])];
      const sharedTags = tags.filter((tag) => currentTags.has(tag)).length;
      const sameSubcollection =
        product.subcollection &&
        product.subcollection === currentProduct.subcollection
          ? 4
          : 0;
      const sameCollection =
        product.collection === currentProduct.collection ? 3 : 0;
      const sameCategory = product.category === currentProduct.category ? 2 : 0;
      const available = getProductTotalStock(product) > 0 ? 1 : -20;

      return {
        product,
        score:
          sharedTags +
          sameSubcollection +
          sameCollection +
          sameCategory +
          available,
      };
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

function getCatalogProducts(sourceProducts: Product[]) {
  return sourceProducts.flatMap((product) => {
    if (!product.catalogColorSlugs?.length) {
      return [product];
    }

    return product.catalogColorSlugs.map((catalogColor) => {
      const colorPhotos = product.photos.filter(
        (photo) => photo.colorId === catalogColor.colorId,
      );
      const pricing = getProductPricing(product, catalogColor.colorId);

      return {
        ...product,
        slug: catalogColor.slug,
        canonicalSlug: product.slug,
        defaultColorId: catalogColor.colorId,
        name: `${product.name} ${catalogColor.colorName}`,
        shortName: `${product.shortName} ${catalogColor.colorName}`,
        price: pricing.price,
        promotionalPrice: pricing.promotionalPrice,
        photos: colorPhotos.length > 0 ? colorPhotos : product.photos,
      };
    });
  });
}

function buildProductPath(slug: string, colorId?: string, isCopa = false) {
  const basePath = isCopa ? `/copa-do-mundo/${slug}` : `/produto/${slug}`;

  return colorId ? `${basePath}?cor=${encodeURIComponent(colorId)}` : basePath;
}

function getBrasilPriority(product: Product) {
  const values = [
    product.name,
    product.shortName,
    product.category,
    product.subcollection,
    ...(product.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return values.includes("brasil") ? 1 : 0;
}
