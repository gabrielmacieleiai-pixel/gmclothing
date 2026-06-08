"use client";

import { useCart } from "@/components/cart-provider";

export function CartButton() {
  const { openCart, totalItems } = useCart();

  return (
    <button
      className="relative flex size-10 items-center justify-center border border-black/15 text-[10px] font-black uppercase transition-colors hover:border-black lg:size-11"
      onClick={openCart}
      type="button"
      aria-label={`Abrir carrinho com ${totalItems} item${totalItems === 1 ? "" : "s"}`}
    >
      Bag
      {totalItems > 0 ? (
        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-[#c8a96a] text-[10px] text-[#050505]">
          {totalItems}
        </span>
      ) : null}
    </button>
  );
}
