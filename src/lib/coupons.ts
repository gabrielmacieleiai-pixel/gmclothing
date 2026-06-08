export type Coupon = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
};

export type CouponResult =
  | {
      valid: true;
      code: string;
      discount: number;
      message: string;
    }
  | {
      valid: false;
      discount: 0;
      message: string;
    };

export const couponMap: Record<string, Coupon> = {
  GM10: {
    code: "GM10",
    type: "percentage",
    value: 10,
    active: false,
  },
};

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase();
}

export function calculateCouponDiscount(code: string, subtotal: number): CouponResult {
  const normalizedCode = normalizeCouponCode(code);
  const coupon = couponMap[normalizedCode];

  if (!normalizedCode) {
    return {
      valid: false,
      discount: 0,
      message: "Digite um cupom para aplicar.",
    };
  }

  if (!coupon || !coupon.active) {
    return {
      valid: false,
      discount: 0,
      message: "Cupom invalido ou indisponivel no momento.",
    };
  }

  const discount =
    coupon.type === "percentage"
      ? subtotal * (coupon.value / 100)
      : Math.min(coupon.value, subtotal);

  return {
    valid: true,
    code: coupon.code,
    discount,
    message: "Cupom aplicado com sucesso.",
  };
}
