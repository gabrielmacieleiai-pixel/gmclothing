"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "@/components/cart-provider";
import { getCheckoutPrefill } from "@/lib/checkout-prefill";
import { formatPrice } from "@/lib/format";
import { getShopifyCartPermalink } from "@/lib/shopify";

export function CartDrawer() {
  const {
    applyCoupon,
    cartMessage,
    clearCartMessage,
    clearCoupon,
    closeCart,
    couponCode,
    couponMessage,
    discount,
    isOpen,
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
  const checkoutHref = canUseShopifyCheckout
    ? getShopifyCartPermalink(shopifyItems, {
        discountCode: couponCode || undefined,
        checkout: { zip: checkoutZip },
      })
    : "/checkout";

  function handleCouponSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyCoupon(couponInput);
  }
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        aria-label="Fechar carrinho"
        className={`absolute inset-0 bg-black/45 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
        type="button"
      />

      <aside
        className={`absolute bottom-0 right-0 flex max-h-[92svh] w-full flex-col bg-white text-[#050505] shadow-2xl transition-transform duration-300 sm:top-0 sm:h-full sm:max-h-none sm:max-w-md ${
          isOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-x-full sm:translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              Carrinho GM
            </p>
            <h2 className="text-xl font-black uppercase tracking-display">
              Sua seleção
            </h2>
          </div>
          <button
            className="border border-black/15 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em]"
            onClick={closeCart}
            type="button"
          >
            Fechar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
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
                <div className="grid grid-cols-[88px_1fr] gap-4" key={item.id}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd3]">
                    <Image
                      alt={item.productName}
                      className="object-cover"
                      fill
                      sizes="88px"
                      src={item.image}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold uppercase">
                          {item.shortName}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-black/40">
                          {item.size
                            ? `${item.colorName} / ${item.size}`
                            : item.productName}
                        </p>
                      </div>
                      <button
                        className="text-[10px] uppercase tracking-[0.14em] text-black/35"
                        onClick={() => removeItem(item.id)}
                        type="button"
                      >
                        Remover
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-black/15">
                        <button
                          className="size-9 text-sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          type="button"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          className="size-9 text-sm disabled:cursor-not-allowed disabled:text-black/25"
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
                      <p className="text-sm font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-black/10 px-5 py-12 text-center">
              <p className="text-sm font-bold uppercase">
                Seu carrinho está vazio.
              </p>
              <p className="mt-2 text-xs leading-5 text-black/45">
                Escolha uma peça, selecione tamanho e cor, e continue navegando.
              </p>
            </div>
          )}

        </div>

        <div className="border-t border-black/10 bg-white p-4">
          {hasItems ? (
            <form className="mb-4" onSubmit={handleCouponSubmit}>
              <label
                className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/45"
                htmlFor="drawer-coupon"
              >
                Cupom de desconto
              </label>
              <div className="mt-2 grid grid-cols-[1fr_auto] border border-black/15">
                <input
                  className="min-w-0 bg-transparent px-3 py-3 text-sm uppercase outline-none"
                  id="drawer-coupon"
                  onChange={(event) => setCouponInput(event.target.value)}
                  placeholder="Digite seu cupom"
                  value={couponInput}
                />
                <button
                  className="bg-[#050505] px-4 text-[9px] font-bold uppercase tracking-[0.14em] text-white"
                  type="submit"
                >
                  Aplicar
                </button>
              </div>
              {couponMessage ? (
                <div className="mt-2 flex items-start justify-between gap-3 text-[9px] uppercase leading-4 tracking-[0.1em] text-black/45">
                  <span>{couponMessage}</span>
                  {couponCode ? (
                    <button
                      className="shrink-0 font-bold text-black/70"
                      onClick={() => {
                        clearCoupon();
                        setCouponInput("");
                      }}
                      type="button"
                    >
                      Remover
                    </button>
                  ) : null}
                </div>
              ) : null}
            </form>
          ) : null}
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold uppercase tracking-[0.14em]">
              Subtotal
            </span>
            <span className="font-black">{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 ? (
            <div className="mb-2 flex items-center justify-between text-xs text-black/50">
              <span>Desconto</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          ) : couponCode ? (
            <div className="mb-2 flex items-center justify-between gap-3 text-[10px] text-black/50">
              <span>Cupom {couponCode}</span>
              <span className="text-right">Calculado na Shopify</span>
            </div>
          ) : null}
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold uppercase tracking-[0.14em]">Total</span>
            <span className="font-black">{formatPrice(total)}</span>
          </div>
          <div className="grid gap-2">
            <Link
              className="flex h-12 items-center justify-center border border-black/15 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em]"
              href="/carrinho"
              onClick={closeCart}
              prefetch={false}
            >
              Ver carrinho
            </Link>
            <a
              className={`flex h-14 items-center justify-center px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white ${
                hasItems ? "bg-[#050505]" : "pointer-events-none bg-black/35"
              }`}
              href={checkoutHref ?? "/checkout"}
              onClick={closeCart}
            >
              Finalizar compra
            </a>
          </div>
          <p className="mt-3 text-center text-[10px] leading-4 text-black/40">
            Pagamento seguro via Shopify. Você será direcionado ao checkout
            protegido para concluir a compra.
          </p>
        </div>
      </aside>
    </div>
  );
}
