"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { useCart } from "@/components/cart-provider";
import { ArrowUpRight } from "@/components/icons";
import { getCheckoutPrefill } from "@/lib/checkout-prefill";
import { formatPrice } from "@/lib/format";
import { getShopifyCartPermalink } from "@/lib/shopify";
import type { FormEvent } from "react";

export function CartPage() {
  const {
    applyCoupon,
    cartMessage,
    clearCartMessage,
    clearCoupon,
    couponCode,
    couponMessage,
    discount,
    items,
    removeItem,
    subtotal,
    total,
    updateQuantity,
  } = useCart();
  const [couponInput, setCouponInput] = useState(couponCode);
  const [checkoutZip] = useState(() => getCheckoutPrefill().zip);
  const hasItems = items.length > 0;
  const shopifyItems = items.map((item) => ({
    quantity: item.quantity,
    variantId: item.shopifyVariantId,
  }));
  const canUseShopifyCheckout =
    hasItems && shopifyItems.every((item) => Boolean(item.variantId));
  const shopifyCheckoutUrl = canUseShopifyCheckout
    ? getShopifyCartPermalink(shopifyItems, {
        discountCode: couponCode || undefined,
        checkout: { zip: checkoutZip },
      })
    : null;
  const checkoutHref = shopifyCheckoutUrl ?? "/checkout";
  function handleCouponSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyCoupon(couponInput);
  }

  return (
    <section className="bg-[#f5f1e8] px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
              Carrinho
            </p>
            <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-display sm:text-6xl">
              Revise seu pedido
            </h1>
          </div>

          {cartMessage ? (
            <button
              className="mb-4 w-full border border-[#8a2d1d]/25 bg-[#8a2d1d]/5 px-4 py-3 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#8a2d1d]"
              onClick={clearCartMessage}
              type="button"
            >
              {cartMessage}
            </button>
          ) : null}

          {hasItems ? (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  className="grid gap-4 border border-black/10 bg-white/60 p-3 sm:grid-cols-[120px_1fr]"
                  key={item.id}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd3]">
                    <Image
                      alt={item.productName}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 120px"
                      src={item.image}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                        {item.sku}
                      </p>
                      <h2 className="mt-2 text-xl font-black uppercase leading-none tracking-display">
                        {item.productName}
                      </h2>
                      <div className="mt-4 grid gap-2 text-xs text-black/55 sm:grid-cols-2">
                        <span>Cor: {item.colorName ?? "Única"}</span>
                        <span>Tamanho: {item.size ?? "Único"}</span>
                        <span>
                          Unitário:{" "}
                          {item.compareAtPrice ? (
                            <>
                              <span className="text-black/35 line-through">
                                De {formatPrice(item.compareAtPrice)}
                              </span>{" "}
                            </>
                          ) : null}
                          Por {formatPrice(item.price)}
                        </span>
                        <span>
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      {typeof item.availableStock === "number" ? (
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                          Estoque disponível: {item.availableStock}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <button
                        className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/35"
                        onClick={() => removeItem(item.id)}
                        type="button"
                      >
                        Remover
                      </button>
                      <div className="flex items-center border border-black/15">
                        <button
                          className="size-11 text-sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          type="button"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          className="size-11 text-sm disabled:cursor-not-allowed disabled:text-black/25"
                          disabled={
                            typeof item.availableStock === "number" &&
                            item.quantity >= item.availableStock
                          }
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-black/10 bg-white/60 px-5 py-14 text-center">
              <p className="text-lg font-black uppercase tracking-display">
                Seu carrinho está vazio.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">
                Escolha uma peça, selecione cor e tamanho, e volte para revisar
                tudo antes do checkout.
              </p>
              <Link
                className="mx-auto mt-6 flex h-12 w-fit items-center gap-3 bg-[#050505] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                href="/colecao"
              >
                Ver coleção <ArrowUpRight />
              </Link>
            </div>
          )}

          <div className="mt-10 border-t border-black/10 pt-8">
            <AccessoryCrossSell
              eyebrow="Cross-sell"
              title="Complete seu estilo"
            />
          </div>
        </div>

        <aside className="h-fit border border-black/10 bg-white/70 p-5 lg:sticky lg:top-28">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
            Resumo
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-display">
            Pedido
          </h2>

          <form className="mt-6" onSubmit={handleCouponSubmit}>
            <label
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45"
              htmlFor="coupon"
            >
              Cupom de desconto
            </label>
            <div className="mt-2 grid grid-cols-[1fr_auto] border border-black/15">
              <input
                className="min-w-0 bg-transparent px-3 py-3 text-sm outline-none"
                id="coupon"
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Digite seu cupom"
                value={couponInput}
              />
              <button
                className="bg-[#050505] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                type="submit"
              >
                Aplicar
              </button>
            </div>
            {couponMessage ? (
              <div className="mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-black/45">
                <span>{couponMessage}</span>
                {discount > 0 ? (
                  <button onClick={clearCoupon} type="button">
                    Remover
                  </button>
                ) : null}
              </div>
            ) : null}
          </form>

          <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-black/50">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between">
                <span className="text-black/50">Desconto</span>
                <span className="font-bold">-{formatPrice(discount)}</span>
              </div>
            ) : couponCode ? (
              <div className="flex justify-between gap-4 text-xs">
                <span className="text-black/50">Cupom {couponCode}</span>
                <span className="text-right font-bold">Calculado na Shopify</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span className="text-black/50">Frete</span>
              <span className="font-bold">A calcular</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-base">
              <span className="font-black uppercase tracking-[0.12em]">Total</span>
              <span className="font-black">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            <a
              className={`flex h-14 items-center justify-center bg-[#050505] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white ${
                hasItems ? "" : "pointer-events-none opacity-40"
              }`}
              href={checkoutHref}
            >
              Finalizar compra
            </a>
            <Link
              className="flex h-12 items-center justify-center border border-black/15 px-5 text-[10px] font-bold uppercase tracking-[0.18em]"
              href="/colecao"
              prefetch={false}
            >
              Continuar comprando
            </Link>
          </div>

          <p className="mt-4 text-[10px] leading-4 text-black/40">
            Pagamento final preparado para checkout externo. Esta etapa revisa
            produtos, variantes e dados antes da finalização.
          </p>
        </aside>
      </div>
    </section>
  );
}
