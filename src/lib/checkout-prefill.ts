export type CheckoutPrefill = {
  zip?: string;
};

const CHECKOUT_PREFILL_STORAGE_KEY = "gm-clothing-checkout-prefill";

export function formatCheckoutZip(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function saveCheckoutPrefill(prefill: CheckoutPrefill) {
  if (typeof window === "undefined") {
    return;
  }

  const currentPrefill = getCheckoutPrefill();
  const nextPrefill = {
    ...currentPrefill,
    ...prefill,
  };

  window.localStorage.setItem(
    CHECKOUT_PREFILL_STORAGE_KEY,
    JSON.stringify(nextPrefill),
  );
}

export function getCheckoutPrefill(): CheckoutPrefill {
  if (typeof window === "undefined") {
    return {};
  }

  const savedPrefill = window.localStorage.getItem(
    CHECKOUT_PREFILL_STORAGE_KEY,
  );

  if (!savedPrefill) {
    return {};
  }

  try {
    return JSON.parse(savedPrefill) as CheckoutPrefill;
  } catch {
    return {};
  }
}
