"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  calculateCouponDiscount,
  normalizeCouponCode,
} from "@/lib/coupons";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  lastAddedItem: CartItem | null;
  subtotal: number;
  discount: number;
  total: number;
  totalItems: number;
  couponCode: string;
  couponMessage: string | null;
  cartMessage: string | null;
  addItem: (item: CartItem) => void;
  applyCoupon: (code: string) => void;
  clearCartMessage: () => void;
  clearCoupon: () => void;
  closeCart: () => void;
  clearLastAdded: () => void;
  openCart: () => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const addItem = useCallback((item: CartItem) => {
    let nextMessage: string | null = null;

    setItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);
      const availableStock = item.availableStock ?? Number.MAX_SAFE_INTEGER;

      if (availableStock <= 0) {
        nextMessage = "Produto indisponível no momento.";
        return currentItems;
      }

      if (!existingItem) {
        return [
          ...currentItems,
          { ...item, quantity: Math.min(item.quantity, availableStock) },
        ];
      }

      return currentItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: clampQuantity(
                cartItem.quantity + item.quantity,
                cartItem.availableStock,
              ),
            }
          : cartItem,
      );
    });

    if (nextMessage) {
      setCartMessage(nextMessage);
      return;
    }

    setCartMessage(null);
    setLastAddedItem(item);
    window.setTimeout(() => setLastAddedItem(null), 3200);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    let nextMessage: string | null = null;

    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          if (quantity > (item.availableStock ?? Number.MAX_SAFE_INTEGER)) {
            nextMessage = "Estoque insuficiente para essa quantidade.";
          }

          return {
            ...item,
            quantity: clampQuantity(quantity, item.availableStock),
          };
        })
        .filter((item) => item.quantity > 0),
    );

    setCartMessage(nextMessage);
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );
  const discount = useMemo(() => {
    if (!appliedCouponCode) {
      return 0;
    }

    return calculateCouponDiscount(appliedCouponCode, subtotal).discount;
  }, [appliedCouponCode, subtotal]);
  const total = useMemo(() => Math.max(0, subtotal - discount), [discount, subtotal]);

  const applyCoupon = useCallback(
    (code: string) => {
      const result = calculateCouponDiscount(code, subtotal);
      const normalizedCode = normalizeCouponCode(code);

      setCouponCode(normalizedCode);
      setCouponMessage(result.message);
      setAppliedCouponCode(result.valid ? result.code : null);
    },
    [subtotal],
  );

  const clearCoupon = useCallback(() => {
    setCouponCode("");
    setCouponMessage(null);
    setAppliedCouponCode(null);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      lastAddedItem,
      subtotal,
      discount,
      total,
      totalItems,
      couponCode,
      couponMessage,
      cartMessage,
      addItem,
      applyCoupon,
      clearCartMessage: () => setCartMessage(null),
      clearCoupon,
      closeCart: () => setIsOpen(false),
      clearLastAdded: () => setLastAddedItem(null),
      openCart: () => setIsOpen(true),
      removeItem,
      updateQuantity,
    }),
    [
      addItem,
      applyCoupon,
      cartMessage,
      clearCoupon,
      couponCode,
      couponMessage,
      discount,
      isOpen,
      items,
      lastAddedItem,
      removeItem,
      subtotal,
      total,
      totalItems,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function clampQuantity(quantity: number, availableStock?: number) {
  if (quantity <= 0) {
    return 0;
  }

  if (typeof availableStock === "number") {
    return Math.min(quantity, availableStock);
  }

  return quantity;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
