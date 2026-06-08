"use client";

import { useCart } from "@/components/cart-provider";

export function CartToast() {
  const { clearLastAdded, lastAddedItem, openCart } = useCart();

  if (!lastAddedItem) {
    return null;
  }

  return (
    <div className="fixed left-4 right-4 top-24 z-[70] mx-auto max-w-md border border-white/10 bg-[#050505] p-4 text-white shadow-2xl sm:left-auto sm:right-6 sm:top-28">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8a96a]">
            Adicionado ao carrinho
          </p>
          <p className="mt-2 text-sm font-bold uppercase">
            {lastAddedItem.shortName}
          </p>
          <p className="mt-1 text-xs text-white/50">
            {lastAddedItem.size ? `${lastAddedItem.colorName} / ${lastAddedItem.size}` : lastAddedItem.productName}
          </p>
        </div>
        <button
          className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50"
          onClick={clearLastAdded}
          type="button"
        >
          Fechar
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="h-11 border border-white/20 text-[10px] font-bold uppercase tracking-[0.16em]"
          onClick={openCart}
          type="button"
        >
          Ver carrinho
        </button>
        <button
          className="flex h-11 items-center justify-center bg-white text-[10px] font-bold uppercase tracking-[0.16em] text-[#050505]"
          onClick={clearLastAdded}
          type="button"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
