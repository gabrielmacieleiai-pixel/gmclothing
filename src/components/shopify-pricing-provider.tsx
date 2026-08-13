"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductPricing } from "@/data/products";
import { getWinterSalePricing } from "@/lib/winter-sale";
import type { Product } from "@/types/product";

type ShopifyPrice = {
  currentPrice: number;
  compareAtPrice: number | null;
};

type Pricing = ReturnType<typeof getProductPricing>;

type PricingContextValue = {
  resolveVariantPricing: (
    shopifyVariantId: string | null | undefined,
    fallbackPrice: number,
    fallbackCompareAtPrice?: number,
    productSlug?: string,
  ) => { price: number; compareAtPrice?: number };
  resolvePricing: (
    product: Product,
    colorId?: string,
    variantId?: string,
  ) => Pricing;
};

const PricingContext = createContext<PricingContextValue | null>(null);

export function ShopifyPricingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [shopifyPrices, setShopifyPrices] = useState<
    Record<string, ShopifyPrice>
  >({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/shopify/prices", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Preços da Shopify indisponíveis.");
        }
        return response.json() as Promise<{
          prices?: Record<string, ShopifyPrice>;
        }>;
      })
      .then((payload) => setShopifyPrices(payload.prices ?? {}))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.warn("Usando preços locais como contingência.", error);
      });

    return () => controller.abort();
  }, []);

  const resolvePricing = useCallback(
    (product: Product, colorId?: string, variantId?: string): Pricing => {
      const campaignPricing = getWinterSalePricing(product);

      if (campaignPricing) {
        return campaignPricing;
      }

      const fallback = getProductPricing(product, colorId);
      const variants = product.variants.filter(
        (variant) =>
          (!colorId || variant.color.id === colorId) &&
          (!variantId || variant.id === variantId),
      );
      const livePrices = variants
        .map((variant) =>
          variant.shopifyVariantId
            ? shopifyPrices[variant.shopifyVariantId]
            : undefined,
        )
        .filter((price): price is ShopifyPrice => Boolean(price))
        .sort((first, second) => first.currentPrice - second.currentPrice);
      const livePrice = livePrices[0];

      if (!livePrice || !Number.isFinite(livePrice.currentPrice)) {
        return fallback;
      }

      const hasPromotion =
        Number.isFinite(livePrice.compareAtPrice) &&
        Number(livePrice.compareAtPrice) > livePrice.currentPrice;
      const price = hasPromotion
        ? Number(livePrice.compareAtPrice)
        : livePrice.currentPrice;
      const promotionalPrice = hasPromotion
        ? livePrice.currentPrice
        : undefined;

      return {
        price,
        promotionalPrice,
        currentPrice: livePrice.currentPrice,
        discountPercentage: hasPromotion
          ? Math.round(((price - livePrice.currentPrice) / price) * 100)
          : undefined,
      };
    },
    [shopifyPrices],
  );

  const resolveVariantPricing = useCallback(
    (
      shopifyVariantId: string | null | undefined,
      fallbackPrice: number,
      fallbackCompareAtPrice?: number,
      productSlug?: string,
    ) => {
      const campaignPricing = productSlug
        ? getWinterSalePricing(productSlug)
        : null;

      if (campaignPricing) {
        return {
          price: campaignPricing.currentPrice,
          compareAtPrice: campaignPricing.price,
        };
      }

      const livePrice = shopifyVariantId
        ? shopifyPrices[shopifyVariantId]
        : undefined;

      if (!livePrice || !Number.isFinite(livePrice.currentPrice)) {
        return {
          price: fallbackPrice,
          compareAtPrice: fallbackCompareAtPrice,
        };
      }

      const compareAtPrice =
        Number.isFinite(livePrice.compareAtPrice) &&
        Number(livePrice.compareAtPrice) > livePrice.currentPrice
          ? Number(livePrice.compareAtPrice)
          : undefined;

      return {
        price: livePrice.currentPrice,
        compareAtPrice,
      };
    },
    [shopifyPrices],
  );

  const value = useMemo(
    () => ({ resolvePricing, resolveVariantPricing }),
    [resolvePricing, resolveVariantPricing],
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
}

export function useShopifyPricing() {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error(
      "useShopifyPricing deve ser usado dentro de ShopifyPricingProvider.",
    );
  }

  return context.resolvePricing;
}

export function useShopifyVariantPricing() {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error(
      "useShopifyVariantPricing deve ser usado dentro de ShopifyPricingProvider.",
    );
  }

  return context.resolveVariantPricing;
}
