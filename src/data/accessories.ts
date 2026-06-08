import type { CartItem } from "@/types/cart";

export type AccessoryCategory = {
  slug: string;
  label: string;
  href: string;
  description: string;
  styleTags: string[];
  status: "coming-soon" | "active";
};

export type AccessoryProduct = Omit<CartItem, "quantity" | "kind"> & {
  pitch: string;
  category: "acessorios";
  subcategory: string;
  styleTags: string[];
  status: "active" | "coming-soon";
};

export const accessoryCategories: AccessoryCategory[] = [
  {
    slug: "oculos-de-sol",
    label: "Oculos de sol",
    href: "/acessorios/oculos-de-sol",
    description: "Peças para fechar o look com leitura urbana e premium.",
    styleTags: ["street", "lifestyle", "basquete"],
    status: "coming-soon",
  },
  {
    slug: "brincos",
    label: "Brincos",
    href: "/acessorios/brincos",
    description: "Detalhes discretos para elevar o visual sem excesso.",
    styleTags: ["street", "minimal", "premium"],
    status: "coming-soon",
  },
  {
    slug: "cordoes",
    label: "Cordoes",
    href: "/acessorios/cordoes",
    description: "Acessórios masculinos para combinar com camisetas e jerseys.",
    styleTags: ["street", "faith", "premium"],
    status: "coming-soon",
  },
  {
    slug: "pulseiras",
    label: "Pulseiras",
    href: "/acessorios/pulseiras",
    description: "Complementos limpos para aumentar presença no detalhe.",
    styleTags: ["street", "faith", "minimal"],
    status: "coming-soon",
  },
];

export const accessoryProducts: AccessoryProduct[] = [];

export function getAccessoryCategoryBySlug(slug: string) {
  return accessoryCategories.find((category) => category.slug === slug);
}

export function getActiveAccessoryProducts() {
  return accessoryProducts.filter((accessory) => accessory.status === "active");
}
