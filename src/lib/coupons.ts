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

type CouponDefinition = {
  active: boolean;
  type: "percentage";
  value: number;
};

const couponMap: Record<string, CouponDefinition> = {
  FDR20: {
    active: true,
    type: "percentage",
    value: 20,
  },
};

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase();
}

export function calculateCouponDiscount(
  code: string,
  subtotal: number,
): CouponResult {
  const normalizedCode = normalizeCouponCode(code);

  if (!normalizedCode) {
    return {
      valid: false,
      discount: 0,
      message: "Digite um cupom para aplicar.",
    };
  }

  const coupon = couponMap[normalizedCode];

  if (!coupon || !coupon.active) {
    return {
      valid: false,
      discount: 0,
      message: "Cupom inválido ou indisponível.",
    };
  }

  const discount =
    coupon.type === "percentage"
      ? Math.round(subtotal * (coupon.value / 100) * 100) / 100
      : 0;

  return {
    valid: true,
    code: normalizedCode,
    discount,
    message: `Cupom ${normalizedCode} aplicado: ${coupon.value}% de desconto.`,
  };
}
