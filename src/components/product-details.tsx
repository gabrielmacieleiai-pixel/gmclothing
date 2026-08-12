"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart-provider";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProductPricing } from "@/data/products";
import { formatCheckoutZip, saveCheckoutPrefill } from "@/lib/checkout-prefill";
import { formatPrice } from "@/lib/format";
import { getImageVariantSrc } from "@/lib/image-variants";
import { getShopifyCartUrl } from "@/lib/shopify";
import type { Product, ProductMedia } from "@/types/product";

type ProductDetailsProps = {
  product: Product;
  whatsappUrl: string;
  initialColorId?: string;
};

type ShippingQuoteOption = {
  id: string;
  name: string;
  company: string;
  price: number;
  deliveryTime: number | null;
};

type LocalDeliveryOption = {
  city: string;
  label: string;
  message: string;
  whatsappUrl: string;
};

const LOW_STOCK_THRESHOLD = 3;

export function ProductDetails({
  product,
  whatsappUrl,
  initialColorId,
}: ProductDetailsProps) {
  const { addItem, couponCode } = useCart();
  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);
  const productMedia = useMemo(
    () =>
      product.media?.length
        ? product.media
        : product.photos.map((photo) => ({ ...photo, type: "image" as const })),
    [product.media, product.photos],
  );
  const allMedia: ProductMedia[] = useMemo(
    () =>
      productMedia.length > 0
        ? productMedia
        : [
            {
              id: "produto-fallback",
              type: "image",
              src: "/products/detail-fabric.svg",
              alt: product.name,
            },
          ],
    [product.name, productMedia],
  );

  const colors = useMemo(() => {
    const uniqueColors = Array.from(
      new Map(
        product.variants.map((variant) => [variant.color.id, variant.color]),
      ).values(),
    );

    return uniqueColors.sort((firstColor, secondColor) => {
      const firstStock = getColorStock(product, firstColor.id);
      const secondStock = getColorStock(product, secondColor.id);

      return Number(secondStock > 0) - Number(firstStock > 0);
    });
  }, [product]);

  const sizes = Array.from(
    new Set(product.variants.map((variant) => variant.size)),
  );
  const initialSelectedColorId = colors.some(
    (color) => color.id === initialColorId,
  )
    ? initialColorId
    : colors[0]?.id;
  const initialMediaId =
    allMedia.find(
      (media) =>
        !media.colorId || media.colorId === initialSelectedColorId,
    )?.id ?? allMedia[0]?.id;
  const [selectedColorId, setSelectedColorId] = useState(initialSelectedColorId);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedMediaId, setSelectedMediaId] =
    useState<string | undefined>(initialMediaId);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [shippingCep, setShippingCep] = useState("");
  const [shippingMessage, setShippingMessage] = useState<string | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingQuoteOption[]>(
    [],
  );
  const [localDelivery, setLocalDelivery] =
    useState<LocalDeliveryOption | null>(null);
  const [isShippingLoading, setIsShippingLoading] = useState(false);

  const selectedColor = colors.find((color) => color.id === selectedColorId);
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.color.id === selectedColorId && variant.size === selectedSize,
  );
  const selectedColorStock = selectedColorId
    ? getColorStock(product, selectedColorId)
    : 0;
  const totalProductStock = product.variants.reduce(
    (total, variant) => total + Math.max(variant.stock, 0),
    0,
  );
  const productStatusBadge =
    totalProductStock === 0
      ? "Sem estoque"
      : selectedColorStock === 1
        ? "Últimas peças"
        : product.badge;
  const filteredMedia = allMedia.filter(
    (media) => !media.colorId || media.colorId === selectedColorId,
  );
  const visibleMedia = filteredMedia.length > 0 ? filteredMedia : allMedia;
  const selectedMedia =
    visibleMedia.find((media) => media.id === selectedMediaId) ??
    visibleMedia[0] ??
    allMedia[0];
  const pricing = useMemo(
    () => getProductPricing(product, selectedColorId),
    [product, selectedColorId],
  );
  const currentPrice = pricing.currentPrice;
  const canAddToCart =
    Boolean(selectedVariant) &&
    Boolean(selectedVariant?.stock && selectedVariant.stock > 0);
  const unavailableCtaLabel =
    totalProductStock === 0
      ? "Produto esgotado"
      : selectedColorStock === 0
        ? "Cor esgotada"
        : selectedSize
          ? "Tamanho esgotado"
          : "Escolha o tamanho";
  const showSizeGuide =
    product.showSizeGuide === true && Boolean(product.sizeGuide?.rows.length);
  const showOversizedMaterialProof =
    product.category === "Oversized" || product.collection === "Oversized";
  const productFeatures =
    product.features && product.features.length > 0
      ? product.features
      : product.details;
  const selectedPreview = getMediaPreview(selectedMedia);

  useEffect(() => {
    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
  }, [initialSelectedColorId, product.slug]);

  useEffect(() => {
    if (!isZoomOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsZoomOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isZoomOpen]);

  function handleGalleryScroll() {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    const nextIndex = Math.round(gallery.scrollLeft / gallery.clientWidth);
    const nextMedia = visibleMedia[nextIndex];

    if (nextMedia) {
      setSelectedMediaId(nextMedia.id);
    }
  }

  function goToMedia(mediaId: string, index: number) {
    setSelectedMediaId(mediaId);
    galleryRef.current?.scrollTo({
      left: index * galleryRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function moveMedia(direction: -1 | 1) {
    if (visibleMedia.length <= 1) {
      return;
    }

    const currentIndex = Math.max(
      visibleMedia.findIndex((media) => media.id === selectedMedia?.id),
      0,
    );
    const nextIndex =
      (currentIndex + direction + visibleMedia.length) % visibleMedia.length;
    const nextMedia = visibleMedia[nextIndex];

    if (nextMedia) {
      goToMedia(nextMedia.id, nextIndex);
    }
  }

  function selectColor(colorId: string) {
    const firstColorMedia = allMedia.find(
      (media) => !media.colorId || media.colorId === colorId,
    );

    setSelectedColorId(colorId);
    setSelectedSize(undefined);
    setSelectedMediaId(firstColorMedia?.id ?? allMedia[0]?.id);
    setCheckoutMessage(null);
    galleryRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function selectSize(size: string) {
    setSelectedSize(size);
    setCheckoutMessage(null);
  }

  function updateShippingCep(value: string) {
    const nextCep = formatCheckoutZip(value);
    const cepDigits = nextCep.replace(/\D/g, "");

    setShippingCep(nextCep);

    if (cepDigits.length !== 8) {
      setLocalDelivery(null);
    }

    if (cepDigits.length === 8) {
      saveCheckoutPrefill({ zip: nextCep });
    }
  }

  async function handleShippingQuote() {
    const cep = shippingCep.replace(/\D/g, "");

    if (cep.length !== 8) {
      setShippingOptions([]);
      setLocalDelivery(null);
      setShippingMessage("Digite um CEP válido com 8 números.");
      return;
    }

    setIsShippingLoading(true);
    setShippingMessage(null);
    setShippingOptions([]);
    setLocalDelivery(null);

    try {
      const response = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cep,
          price: currentPrice,
          productSlug: product.slug,
          quantity: 1,
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        options?: ShippingQuoteOption[];
        localDelivery?: LocalDeliveryOption | null;
      };

      setLocalDelivery(data.localDelivery ?? null);

      if (!response.ok || (!data.options?.length && !data.localDelivery)) {
        setShippingMessage(
          data.message ??
            "Não foi possível calcular o envio agora. Finalize pelo checkout ou fale no WhatsApp.",
        );
        return;
      }

      setShippingOptions(data.options ?? []);
      setShippingMessage(
        data.localDelivery
          ? `Entrega local disponível para ${data.localDelivery.city}.`
          : "Envio calculado para este CEP.",
      );
    } catch {
      setShippingMessage(
        "Não foi possível calcular o envio agora. Tente novamente em instantes.",
      );
    } finally {
      setIsShippingLoading(false);
    }
  }

  function buildCartItem() {
    if (!selectedColorId || !selectedSize) {
      setCheckoutMessage("Selecione cor e tamanho para continuar.");
      return null;
    }

    if (!selectedVariant || selectedVariant.stock <= 0) {
      setCheckoutMessage(
        "Essa combinação está indisponível no momento. Fale conosco pelo WhatsApp.",
      );
      return null;
    }

    const previewImage =
      getMediaPreview(selectedMedia) ??
      getMediaPreview(allMedia[0]) ??
      "/products/detail-fabric.svg";

    return {
      id: `${product.slug}-${selectedVariant.id}`,
      productSlug: product.slug,
      productName: product.name,
      shortName: product.shortName,
      image: getImageVariantSrc(previewImage, "card"),
      price: currentPrice,
      compareAtPrice: pricing.promotionalPrice ? pricing.price : undefined,
      colorName: selectedVariant.color.name,
      colorHex: selectedVariant.color.hex,
      size: selectedVariant.size,
      sku: selectedVariant.sku,
      shopifyVariantId: selectedVariant.shopifyVariantId,
      checkoutUrl: selectedVariant.yampiCheckoutUrl,
      quantity: 1,
      availableStock: selectedVariant.stock,
      kind: "product" as const,
    };
  }

  function handleAddToCart() {
    const cartItem = buildCartItem();

    if (!cartItem) {
      return;
    }

    addItem(cartItem);
    router.push("/carrinho");
  }

  function handleBuyNow() {
    const cartItem = buildCartItem();

    if (!cartItem) {
      return;
    }

    const checkoutUrl =
      getShopifyCartUrl(cartItem.shopifyVariantId, cartItem.quantity, {
        discountCode: couponCode || undefined,
        checkout: { zip: shippingCep },
      }) ??
      cartItem.checkoutUrl;

    if (!checkoutUrl) {
      setCheckoutMessage(
        "Essa combinação ainda não está disponível para checkout. Fale conosco pelo WhatsApp.",
      );
      return;
    }

    addItem(cartItem);
    window.location.href = checkoutUrl;
  }

  return (
    <>
      <section className="mx-auto grid max-w-[1536px] gap-8 overflow-hidden px-4 pb-36 sm:px-6 lg:grid-cols-[1.42fr_0.58fr] lg:gap-14 lg:px-10 lg:pb-24">
        <div className="order-1 min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="mb-5 lg:hidden">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
              {product.collection} / {product.category}
            </p>
            <h1 className="break-words text-3xl font-black uppercase leading-[0.9] tracking-display">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {pricing.promotionalPrice ? (
                <span className="text-xs uppercase tracking-[0.12em] text-black/35">
                  De{" "}
                  <span className="line-through">
                    {formatPrice(pricing.price)}
                  </span>
                </span>
              ) : null}
              <span className="text-xl font-black">
                Por {formatPrice(currentPrice)}
              </span>
              {pricing.discountPercentage ? (
                <span className="bg-[#050505] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                  {pricing.discountPercentage}% off
                </span>
              ) : null}
            </div>
          </div>

          <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
            <div
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-[#050505] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={handleGalleryScroll}
              ref={galleryRef}
            >
              {visibleMedia.map((media, index) => (
                <div
                  className="relative aspect-[2/3] w-full shrink-0 snap-center overflow-hidden sm:aspect-[3/4]"
                  key={media.id}
                >
                  {productStatusBadge ? (
                    <span className="absolute left-4 top-4 z-10 bg-[#050505] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                      {productStatusBadge}
                    </span>
                  ) : null}
                  <MediaFrame media={media} priority={index === 0} />
                </div>
              ))}
            </div>

            {visibleMedia.length > 1 ? (
              <>
                <button
                  aria-label="Imagem anterior"
                  className="absolute left-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-[#050505]/65 text-white backdrop-blur-sm transition hover:bg-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={() => moveMedia(-1)}
                  type="button"
                >
                  <ChevronLeft />
                </button>
                <button
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-[#050505]/65 text-white backdrop-blur-sm transition hover:bg-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={() => moveMedia(1)}
                  type="button"
                >
                  <ChevronRight />
                </button>
              </>
            ) : null}

            {selectedPreview ? (
              <button
                aria-label="Ampliar imagem do produto"
                className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-white/35 bg-[#050505]/65 text-white backdrop-blur-sm transition hover:bg-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setIsZoomOpen(true)}
                type="button"
              >
                <SearchIcon />
              </button>
            ) : null}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {visibleMedia.map((media, index) => (
              <button
                className={`relative aspect-[2/3] overflow-hidden border bg-[#050505] ${
                  selectedMedia?.id === media.id
                    ? "border-[#050505]"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
                key={media.id}
                onClick={() => goToMedia(media.id, index)}
                type="button"
              >
                <MediaFrame
                  media={media}
                  sizes="(max-width: 1024px) 30vw, 15vw"
                />
              </button>
            ))}
          </div>

          <div className="mt-5 lg:hidden">
            <p className="text-sm leading-6 text-black/55">
              {product.description}
            </p>
            <p className="mt-3 text-sm leading-6 text-black/70">
              {product.salesNote}
            </p>
          </div>
        </div>

        <div className="order-2 min-w-0 lg:py-10">
          <div className="hidden lg:block">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
            {product.collection} / {product.category}
          </p>
          <h1 className="max-w-[18rem] break-words text-3xl font-black uppercase leading-[0.9] tracking-display sm:max-w-none sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {pricing.promotionalPrice ? (
              <span className="text-sm uppercase tracking-[0.12em] text-black/35">
                De{" "}
                <span className="line-through">
                  {formatPrice(pricing.price)}
                </span>
              </span>
            ) : null}
            <span className="text-xl font-black">
              Por {formatPrice(currentPrice)}
            </span>
            {pricing.discountPercentage ? (
              <span className="bg-[#050505] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                {pricing.discountPercentage}% off
              </span>
            ) : null}
            <span className="text-[10px] uppercase tracking-[0.14em] text-black/40">
              ou 3x sem juros
            </span>
          </div>

          <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
            {product.description}
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-black/70">
            {product.salesNote}
          </p>
          {totalProductStock === 0 ? (
            <div className="mt-5 border border-[#050505] bg-[#050505] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Produto esgotado · indisponível no momento
            </div>
          ) : null}
          </div>

          <div className="my-6 grid grid-cols-2 gap-3 border-y border-black/15 py-4 text-[9px] font-bold uppercase tracking-[0.13em] text-black/50 sm:grid-cols-3 sm:text-center">
              <span>Checkout seguro</span>
            <span>Compra via WhatsApp</span>
            <span className="col-span-2 sm:col-span-1">
              {selectedColorStock <= 0
                ? "Indisponível no momento"
                : product.hideStockCount
                  ? "Disponível"
                  : selectedVariant &&
                      selectedVariant.stock > 0 &&
                      selectedVariant.stock <= LOW_STOCK_THRESHOLD
                    ? "Últimas unidades"
                    : `${selectedColorStock} peças disponíveis`}
            </span>
          </div>

          <div className="border-t border-black/15 py-6">
            <div className="mb-4 flex justify-between text-[10px] font-bold uppercase tracking-[0.18em]">
              <span>Cor</span>
              <span className="text-black/45">{selectedColor?.name}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {colors.map((color) => {
                const colorStock = getColorStock(product, color.id);
                const isUnavailable = colorStock === 0;

                return (
                  <button
                    aria-label={
                      isUnavailable
                        ? `Cor ${color.name} indisponível`
                        : `Selecionar cor ${color.name}`
                    }
                    className={`relative size-11 shrink-0 rounded-full border-2 p-1 transition-opacity ${
                      selectedColorId === color.id
                        ? "border-[#050505]"
                        : "border-transparent"
                    } ${isUnavailable ? "opacity-35" : ""}`}
                    key={color.id}
                    onClick={() => selectColor(color.id)}
                    title={color.name}
                    type="button"
                  >
                    <span
                      className="block size-full rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    {isUnavailable ? (
                      <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/55" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-black/15 py-6">
            <div className="mb-4 flex justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em]">
              <span>Tamanho</span>
              <span className="text-right text-black/45">
                {selectedColorStock <= 0
                    ? "Cor esgotada"
                  : selectedVariant &&
                      !product.hideStockCount &&
                      selectedVariant.stock <= LOW_STOCK_THRESHOLD
                    ? "Últimas unidades"
                    : "Escolha para adicionar"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
              {sizes.map((size) => {
                const variant = product.variants.find(
                  (item) =>
                    item.color.id === selectedColorId && item.size === size,
                );
                const isUnavailable = !variant || variant.stock === 0;

                return (
                  <button
                    aria-label={
                      isUnavailable
                        ? `Tamanho ${size} indisponível`
                        : `Selecionar tamanho ${size}`
                    }
                    className={`flex h-14 flex-col items-center justify-center gap-1 border text-xs font-bold transition-colors ${
                      selectedSize === size
                        ? "border-[#050505] bg-[#050505] text-white"
                        : isUnavailable
                          ? "cursor-not-allowed border-black/10 bg-black/[0.025] text-black/30"
                          : "border-black/20 hover:border-[#050505]"
                    }`}
                    disabled={isUnavailable}
                    key={size}
                    onClick={() => selectSize(size)}
                    type="button"
                  >
                    <span className={isUnavailable ? "line-through" : undefined}>
                      {size}
                    </span>
                    {isUnavailable ? (
                      <span className="text-[7px] font-bold uppercase tracking-[0.12em] no-underline">
                        Esgotado
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1.1fr_0.9fr]">
            <button
              className="flex h-14 w-full items-center justify-between bg-[#050505] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c8a96a] hover:text-[#050505] disabled:cursor-not-allowed disabled:bg-black/35 disabled:text-white"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              type="button"
            >
              {canAddToCart ? "Adicionar ao carrinho" : unavailableCtaLabel}
              <ArrowUpRight />
            </button>
            <button
              aria-disabled={!canAddToCart}
              className={`flex h-14 w-full items-center justify-center border px-5 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                canAddToCart
                  ? "border-[#050505] text-[#050505] hover:bg-[#050505] hover:text-white"
                  : "border-black/20 text-black/35"
              }`}
              onClick={handleBuyNow}
              disabled={!canAddToCart}
              type="button"
            >
              {canAddToCart ? "Comprar agora" : unavailableCtaLabel}
            </button>
          </div>

          {checkoutMessage ? (
            <p className="mt-3 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#8a2d1d]">
              {checkoutMessage}
            </p>
          ) : null}

          {selectedVariant ? (
            <div className="mt-3 flex justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-black/40">
              <span>SKU: {selectedVariant.sku}</span>
              <span>
                {product.hideStockCount
                  ? selectedVariant.stock > 0
                    ? "Disponível"
                    : "Esgotado"
                  : `${selectedVariant.stock} em estoque`}
              </span>
            </div>
          ) : null}

          {selectedVariant &&
          !selectedVariant.shopifyVariantId &&
          !selectedVariant.yampiCheckoutUrl ? (
            <p className="mt-3 text-[10px] leading-4 text-black/45">
              Compra direta ainda não configurada para esta variante. Você ainda
              pode comprar pelo WhatsApp.
            </p>
          ) : null}

          <WhatsAppButton href={whatsappUrl} label="Tirar dúvida no WhatsApp" />

          <div className="mt-6 border-t border-black/15 py-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Calcular envio
              </h2>
              <span className="text-[9px] uppercase tracking-[0.14em] text-black/35">
                Por CEP
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                aria-label="CEP para calcular envio"
                className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-[#050505]"
                inputMode="numeric"
                maxLength={9}
                onChange={(event) => updateShippingCep(event.target.value)}
                placeholder="Digite seu CEP"
                value={shippingCep}
              />
              <button
                className="h-12 border border-[#050505] px-5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#050505] hover:text-white disabled:cursor-wait disabled:opacity-55"
                disabled={isShippingLoading}
                onClick={handleShippingQuote}
                type="button"
              >
                {isShippingLoading ? "Calculando" : "Calcular"}
              </button>
            </div>

            {shippingMessage ? (
              <p className="mt-3 text-xs leading-5 text-black/50">
                {shippingMessage}
              </p>
            ) : null}

            {shippingOptions.length > 0 ? (
              <div className="mt-4 grid gap-2">
                {shippingOptions.map((option) => (
                  <div
                    className="flex items-center justify-between gap-4 border border-black/10 px-4 py-3 text-xs"
                    key={option.id}
                  >
                    <div>
                      <p className="font-bold uppercase tracking-[0.12em]">
                        {option.company} · {option.name}
                      </p>
                      <p className="mt-1 text-black/45">
                        {option.deliveryTime
                          ? `${option.deliveryTime} dias úteis`
                          : "Prazo a confirmar"}
                      </p>
                    </div>
                    <strong>{formatPrice(option.price)}</strong>
                  </div>
                ))}
              </div>
            ) : null}

            {localDelivery ? (
              <a
                className="mt-4 flex items-center justify-between gap-4 bg-[#050505] px-4 py-4 text-white transition hover:bg-black/80"
                href={localDelivery.whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>
                  <strong className="block text-[10px] uppercase tracking-[0.14em]">
                    {localDelivery.label}
                  </strong>
                  <span className="mt-1 block text-xs text-white/65">
                    {localDelivery.city} · {localDelivery.message}
                  </span>
                </span>
                <ArrowUpRight />
              </a>
            ) : null}
          </div>

          <div className="mt-8 border-t border-black/15">
            <details className="border-b border-black/15 py-5" open>
              <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.18em]">
                Características da peça
              </summary>
              <ul className="mt-4 space-y-2 text-xs leading-5 text-black/50">
                {productFeatures.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            </details>
            <details className="border-b border-black/15 py-5">
              <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.18em]">
                Envio
              </summary>
              <p className="mt-4 text-xs leading-5 text-black/50">
                O frete é calculado pelo CEP. A emissão automática da etiqueta
                fica preparada para integração com uma ferramenta de envio real.
              </p>
            </details>
            {showSizeGuide && product.sizeGuide ? (
              <details className="border-b border-black/15 py-5">
                <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.18em]">
                  Guia de medidas
                </summary>
                <SizeGuideTable product={product} />
              </details>
            ) : null}
          </div>
        </div>
      </section>

      {showOversizedMaterialProof ? (
        <section className="mx-auto hidden max-w-[1440px] gap-4 px-4 pb-20 sm:px-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="relative min-h-[360px] overflow-hidden bg-[#050505] sm:min-h-[460px]">
            <Image
              src={getImageVariantSrc(
                "/products/brand-assets/tecido-premium-alta-gramatura.webp",
                "hero",
              )}
              alt="Material de apoio mostrando tecido premium de alta gramatura"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#050505] px-5 py-10 text-white sm:px-8 lg:px-12">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c8a96a]">
              Compra com menos dúvida
            </p>
            <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.9] tracking-display sm:text-6xl">
              Material, caimento e presença.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/55">
              Antes de finalizar, o cliente entende o que está comprando: peça
              com leitura premium, conforto e construção pensada para o uso real.
            </p>
            <div className="mt-8 grid gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/55 sm:grid-cols-3">
              <span className="border border-white/15 px-4 py-4">
                Toque premium
              </span>
              <span className="border border-white/15 px-4 py-4">
                Fotos reais
              </span>
              <span className="border border-white/15 px-4 py-4">
                Suporte WhatsApp
              </span>
            </div>
          </div>
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#f5f1e8] px-4 py-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] md:hidden">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-black/45">
          <span>
            {selectedSize
              ? `${selectedColor?.name} / ${selectedSize}`
              : "Selecione sua peça"}
          </span>
          <span>Por {formatPrice(currentPrice)}</span>
        </div>
        <button
          aria-disabled={!canAddToCart}
          className={`flex h-12 w-full items-center justify-between px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white ${
            canAddToCart ? "bg-[#050505]" : "bg-black/35"
          }`}
          onClick={handleBuyNow}
          disabled={!canAddToCart}
          type="button"
        >
          {canAddToCart ? "Comprar agora" : unavailableCtaLabel}
          <ArrowUpRight />
        </button>
      </div>

      {isZoomOpen && selectedPreview ? (
        <div
          aria-label="Imagem ampliada do produto"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050505]/95 p-4 sm:p-8"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
        >
          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt={selectedMedia?.alt ?? product.name}
              className="object-contain"
              fill
              priority
              quality={90}
              sizes="100vw"
              src={getImageVariantSrc(selectedPreview, "detail")}
            />
            <button
              aria-label="Fechar imagem ampliada"
              className="absolute right-0 top-0 grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm"
              onClick={() => setIsZoomOpen(false)}
              type="button"
            >
              <XIcon />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function getColorStock(product: Product, colorId: string) {
  return product.variants
    .filter((variant) => variant.color.id === colorId)
    .reduce((total, variant) => total + variant.stock, 0);
}

function getMediaPreview(media?: ProductMedia) {
  if (!media) {
    return undefined;
  }

  return media.type === "image" ? media.src : media.poster;
}

function MediaFrame({
  media,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 65vw",
}: {
  media: ProductMedia;
  priority?: boolean;
  sizes?: string;
}) {
  if (media.type === "video") {
    if (media.disabled || !media.src) {
      return media.poster ? (
        <Image
          src={getImageVariantSrc(media.poster, "detail")}
          alt={media.alt ?? "Vídeo do produto"}
          fill
          quality={78}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[#050505] text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
          Vídeo em breve
        </div>
      );
    }

    return (
      <video
        className="size-full object-cover"
        controls
        muted
        playsInline
        poster={media.poster}
        preload="metadata"
      >
        <source src={media.src} />
      </video>
    );
  }

  return (
    <Image
      src={getImageVariantSrc(media.src, "detail")}
      alt={media.alt}
      fill
      priority={priority}
      quality={82}
      sizes={sizes}
      className="object-cover"
    />
  );
}

function SizeGuideTable({ product }: { product: Product }) {
  if (!product.sizeGuide) {
    return null;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <p className="mb-3 text-xs leading-5 text-black/50">
        {product.sizeGuide.note ?? "Medidas em centímetros."}
      </p>
      <table className="w-full min-w-[28rem] text-left text-xs text-black/55">
        <thead className="border-b border-black/15 text-[9px] uppercase tracking-[0.16em] text-black/40">
          <tr>
            <th className="py-3 pr-4">Tamanho</th>
            <th className="py-3 pr-4">Tórax</th>
            <th className="py-3 pr-4">Comprimento</th>
            <th className="py-3 pr-4">Manga</th>
            <th className="py-3">Ombro</th>
          </tr>
        </thead>
        <tbody>
          {product.sizeGuide.rows.map((row) => (
            <tr className="border-b border-black/10" key={row.size}>
              <td className="py-3 pr-4 font-bold text-black">{row.size}</td>
              <td className="py-3 pr-4">{row.chest ?? "-"}</td>
              <td className="py-3 pr-4">{row.length ?? "-"}</td>
              <td className="py-3 pr-4">{row.sleeve ?? "-"}</td>
              <td className="py-3">{row.shoulder ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
