import { NextResponse } from "next/server";

type ShopifyVariant = {
  id: number;
  price: string;
  compare_at_price: string | null;
};

type ShopifyProduct = {
  variants: ShopifyVariant[];
};

type ShopifyCatalogResponse = {
  products: ShopifyProduct[];
};

const SHOPIFY_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ??
  "checkout-gmclo.myshopify.com";

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/products.json?limit=250`,
      { next: { revalidate } },
    );

    if (!response.ok) {
      throw new Error(`Shopify respondeu com status ${response.status}.`);
    }

    const catalog = (await response.json()) as ShopifyCatalogResponse;
    const prices = Object.fromEntries(
      catalog.products.flatMap((product) =>
        product.variants.map((variant) => [
          String(variant.id),
          {
            currentPrice: Number(variant.price),
            compareAtPrice: variant.compare_at_price
              ? Number(variant.compare_at_price)
              : null,
          },
        ]),
      ),
    );

    return NextResponse.json(
      { prices, syncedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Falha ao sincronizar preços da Shopify:", error);
    return NextResponse.json(
      { prices: {}, syncedAt: null },
      { status: 503 },
    );
  }
}
