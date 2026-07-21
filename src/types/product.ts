export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductPhoto = {
  id: string;
  src: string;
  alt: string;
  colorId?: string;
};

export type ProductMedia =
  | {
      id: string;
      type: "image";
      src: string;
      alt: string;
      colorId?: string;
    }
  | {
      id: string;
      type: "video";
      src: string;
      alt?: string;
      poster?: string;
      colorId?: string;
      disabled?: boolean;
    };

export type ProductVariant = {
  id: string;
  sku: string;
  color: ProductColor;
  size: string;
  stock: number;
  checkoutUrl?: string | null;
  shopifyVariantId?: string | null;
  yampiCheckoutUrl: string | null;
};

export type ProductSizeGuide = {
  title: string;
  note?: string;
  rows: Array<{
    size: string;
    chest?: string;
    length?: string;
    sleeve?: string;
    shoulder?: string;
  }>;
};

export type ProductType = "apparel" | "accessory";

export type ProductCatalogColor = {
  slug: string;
  colorId: string;
  colorName: string;
};

export type ProductColorPricing = {
  price: number;
  promotionalPrice?: number;
};

export type Product = {
  name: string;
  shortName: string;
  slug: string;
  canonicalSlug?: string;
  defaultColorId?: string;
  catalogColorSlugs?: ProductCatalogColor[];
  active: boolean;
  description: string;
  salesNote: string;
  details: string[];
  price: number;
  promotionalPrice?: number;
  colorPricing?: Record<string, ProductColorPricing>;
  checkoutUrl?: string | null;
  shopifyHandle?: string | null;
  yampiCheckoutUrl?: string | null;
  collection: string;
  category: string;
  type?: ProductType;
  campaign?: string;
  subcollection?: string;
  subcategory?: string;
  styleTags?: string[];
  tags?: string[];
  features?: string[];
  media?: ProductMedia[];
  photos: ProductPhoto[];
  variants: ProductVariant[];
  badge?: string;
  hideStockCount?: boolean;
  showSizeGuide?: boolean;
  sizeGuide?: ProductSizeGuide;
};
