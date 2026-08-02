export type CouponResult =
  | {
      valid: true;
      code: string;
      discount: 0;
      message: string;
    }
  | {
      valid: false;
      discount: 0;
      message: string;
    };

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase();
}

export function calculateCouponDiscount(
  code: string,
  subtotal: number,
): CouponResult {
  void subtotal;
  const normalizedCode = normalizeCouponCode(code);

  if (!normalizedCode) {
    return {
      valid: false,
      discount: 0,
      message: "Digite um cupom para aplicar.",
    };
  }

  return {
    valid: true,
    code: normalizedCode,
    discount: 0,
    message: "Cupom adicionado. O desconto será validado pela Shopify no checkout.",
  };
}
