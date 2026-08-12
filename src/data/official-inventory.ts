import type { Product } from "@/types/product";

type SizeInventory = Record<string, number>;
type ColorInventory = Record<string, SizeInventory>;

const sizes = (P: number, M: number, G: number, GG: number): SizeInventory => ({
  P,
  M,
  G,
  GG,
});

// Contagem fisica aprovada em 11/08/2026. A divisao Casa/Gringo ainda nao
// foi informada; por enquanto o estoque vendavel representa o total fisico.
export const officialInventory: Record<string, ColorInventory> = {
  "sueter-chenile-zara": {
    preto: sizes(2, 3, 4, 4),
    "azul-marinho": sizes(0, 1, 2, 1),
    caramelo: sizes(1, 0, 2, 1),
    "cinza-mesclado": sizes(0, 0, 1, 1),
    "cinza-claro": sizes(0, 1, 1, 0),
  },
  "camiseta-canelada-zara": {
    preto: sizes(0, 3, 6, 6),
    marrom: sizes(0, 1, 1, 2),
    areia: sizes(0, 1, 2, 1),
    "off-white": sizes(0, 0, 2, 2),
  },
  "sueter-tricot-trancado-preto": {
    preto: sizes(0, 0, 1, 0),
  },
  "sueter-tricot-trancado-off-white": {
    "off-white": sizes(0, 1, 1, 0),
  },
  "sueter-tricot-minimal-preto": {
    preto: sizes(0, 0, 0, 1),
  },
  "sueter-tricot-geometrico-off-white": {
    "off-white": sizes(0, 1, 0, 0),
  },
  "polo-tricot": {
    "off-white": sizes(0, 0, 0, 1),
    preto: sizes(0, 0, 0, 1),
  },
  "oversized-graphic-azul-preta": {
    preto: sizes(0, 0, 2, 0),
    "off-white": sizes(0, 0, 0, 0),
  },
  "oversized-court-verde-militar": {
    verde: sizes(0, 0, 1, 1),
    marrom: sizes(0, 0, 1, 1),
  },
  "oversized-box-preta": {
    preto: sizes(0, 0, 0, 0),
    "off-white": sizes(0, 1, 0, 0),
    "azul-marinho": sizes(0, 0, 1, 0),
  },
  "oversized-graphic-off-white-laranja": {
    "off-white": sizes(0, 1, 0, 1),
  },
  "oversized-graphic-marrom": {
    marrom: sizes(0, 1, 0, 0),
  },
  "oversized-essential-preta": {
    preto: sizes(0, 0, 0, 0),
    "off-white": sizes(0, 1, 1, 1),
  },
  "oversized-pre-treino-preta": {
    preto: sizes(0, 0, 2, 0),
  },
  "oversized-fate-eu-sou-jesus-branca": {
    branco: sizes(0, 0, 1, 0),
    preto: sizes(0, 0, 0, 0),
  },
  "oversized-fate-jesus-is-king-marrom": {
    marrom: sizes(0, 0, 1, 1),
    preto: sizes(0, 0, 0, 1),
  },
  "oversized-brasil": {
    "off-white": sizes(0, 1, 1, 0),
    preto: sizes(0, 0, 1, 1),
  },
  "camisa-cr7": {
    "off-white": sizes(0, 1, 0, 0),
    preto: sizes(0, 1, 1, 0),
  },
  "camisa-espanha-versao-jogador": {
    vermelho: sizes(1, 1, 2, 1),
  },
  "brasil-retro-2006-ronaldinho": {
    amarelo: sizes(0, 0, 0, 1),
  },
  "camisa-brasil-manga-longa-copa": {
    amarelo: sizes(0, 0, 1, 0),
  },
  "camisa-brasil-retro-azul-ronaldo": {
    azul: sizes(0, 0, 0, 2),
  },
};

export function applyOfficialInventory(catalog: Product[]): Product[] {
  return catalog.map((product) => {
    const productInventory = officialInventory[product.slug];

    if (!productInventory) {
      // The approved physical count is the source of truth. Products that
      // were not counted stay visible, but cannot be purchased accidentally.
      return {
        ...product,
        variants: product.variants.map((variant) => ({
          ...variant,
          stock: 0,
        })),
      };
    }

    return {
      ...product,
      variants: product.variants.map((variant) => {
        const stock = productInventory[variant.color.id]?.[variant.size];

        // A counted product must never fall back to its previous mock stock.
        // Any combination omitted from the approved count is unavailable.
        return { ...variant, stock: typeof stock === "number" ? stock : 0 };
      }),
    };
  });
}
