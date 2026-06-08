const OFFICIAL_WHATSAPP_NUMBER = "5547989031221";
const DEFAULT_WHATSAPP_MESSAGE =
  "Ola, tenho interesse nesse produto do site GM Clothing.";

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const query = new URLSearchParams({ text: message });

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?${query.toString()}`;
}

export function getWhatsAppUrl(productName?: string) {
  if (productName) {
    return createWhatsAppUrl(
      `Ola, tenho interesse no produto ${productName} do site GM Clothing.`,
    );
  }

  return createWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
}
