const LOCAL_DELIVERY_CITIES = new Set([
  "balneario camboriu",
  "camboriu",
  "itajai",
  "itapema",
]);

export function normalizeLocality(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function isLocalDeliveryCity(city?: string, state?: string) {
  if (!city || normalizeLocality(state ?? "SC") !== "sc") {
    return false;
  }

  return LOCAL_DELIVERY_CITIES.has(normalizeLocality(city));
}

export function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  return digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
}
