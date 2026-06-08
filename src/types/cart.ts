export type CartItem = {
  id: string;
  productSlug: string;
  productName: string;
  shortName: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  colorName?: string;
  colorHex?: string;
  size?: string;
  sku: string;
  quantity: number;
  availableStock?: number;
  checkoutUrl: string | null;
  kind: "product" | "bump";
};
