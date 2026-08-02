import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { formatCep, isLocalDeliveryCity } from "@/lib/local-delivery";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type ShippingPackage = {
  width: number;
  height: number;
  length: number;
  weight: number;
};

type FrenetShippingService = {
  Carrier?: string;
  CarrierCode?: string;
  DeliveryTime?: string | number;
  Error?: boolean | string;
  Msg?: string;
  OriginalDeliveryPrice?: string | number;
  ServiceCode?: string;
  ServiceDescription?: string;
  ShippingPrice?: string | number;
};

type FrenetQuoteResponse = {
  ShippingSevicesArray?: FrenetShippingService[];
  ShippingServicesArray?: FrenetShippingService[];
  Message?: string;
};

type ViaCepResponse = {
  erro?: boolean;
  localidade?: string;
  uf?: string;
};

const DEFAULT_PACKAGE: ShippingPackage = {
  width: 28,
  height: 6,
  length: 34,
  weight: 0.45,
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    cep?: string;
    price?: number;
    productSlug?: string;
    quantity?: number;
  } | null;
  const recipientCep = String(body?.cep ?? "").replace(/\D/g, "");

  if (recipientCep.length !== 8) {
    return NextResponse.json(
      { message: "Digite um CEP válido com 8 números.", options: [] },
      { status: 400 },
    );
  }

  const product = body?.productSlug ? getProductBySlug(body.productSlug) : null;
  const localDelivery = await getLocalDelivery(recipientCep, product?.name);

  const token = process.env.FRENET_TOKEN;
  const sellerCep = process.env.FRENET_SELLER_CEP?.replace(/\D/g, "");
  const baseUrl =
    process.env.FRENET_API_BASE_URL ?? "https://api.frenet.com.br";
  const normalizedBaseUrl = normalizeApiBaseUrl(baseUrl);

  if (!token || !sellerCep) {
    return NextResponse.json({
      configured: false,
      message:
        localDelivery
          ? "Entrega local disponível. Combine o valor e o horário pelo WhatsApp."
          : "Cálculo automático de envio via Frenet ainda não configurado. Preencha FRENET_TOKEN e FRENET_SELLER_CEP na Vercel e faça redeploy.",
      options: [],
      localDelivery,
    });
  }

  if (!normalizedBaseUrl) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "A variável FRENET_API_BASE_URL está inválida. Use https://api.frenet.com.br na Vercel.",
        options: [],
      },
      { status: 500 },
    );
  }

  const insuranceValue = Math.max(Number(body?.price ?? product?.price ?? 0), 1);
  const quantity = Math.max(Number(body?.quantity ?? 1), 1);
  const shippingPackage = getPackageForProduct(product?.category);

  const response = await fetch(
    `${normalizedBaseUrl}/shipping/quote`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        SellerCEP: sellerCep,
        RecipientCEP: recipientCep,
        ShipmentInvoiceValue: insuranceValue,
        ShippingItemArray: [
          {
            Height: shippingPackage.height,
            Length: shippingPackage.length,
            Quantity: quantity,
            Weight: shippingPackage.weight,
            Width: shippingPackage.width,
          },
        ],
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          localDelivery
            ? "Entrega local disponível. As outras opções de envio não puderam ser calculadas agora."
            : "Não foi possível calcular o envio agora. Confira o token da Frenet e o CEP de origem.",
        options: [],
        localDelivery,
      },
      { status: localDelivery ? 200 : 502 },
    );
  }

  const data = (await response.json()) as FrenetQuoteResponse;
  const services =
    data.ShippingSevicesArray ?? data.ShippingServicesArray ?? [];
  const options = services
    .filter((service) => !isServiceError(service))
    .map((service) => ({
      id: String(service.ServiceCode ?? service.ServiceDescription),
      name: service.ServiceDescription ?? "Entrega",
      company: service.Carrier ?? service.CarrierCode ?? "Transportadora",
      price: Number(service.ShippingPrice ?? service.OriginalDeliveryPrice ?? 0),
      deliveryTime: Number(service.DeliveryTime) || null,
    }))
    .filter((service) => service.price > 0)
    .slice(0, 4);

  return NextResponse.json({
    configured: true,
    message:
      options.length > 0
        ? "Envio calculado para este CEP."
        : data.Message ?? "Nenhuma opção de envio retornou para este CEP.",
    options,
    localDelivery,
  });
}

async function getLocalDelivery(cep: string, productName?: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const address = (await response.json()) as ViaCepResponse;

    if (
      address.erro ||
      !isLocalDeliveryCity(address.localidade, address.uf)
    ) {
      return null;
    }

    const city = address.localidade?.trim() ?? "região atendida";
    const productReference = productName ? ` para ${productName}` : "";

    return {
      city,
      label: "Combinar entrega pelo WhatsApp",
      message: "Valor, prazo e horário combinados diretamente com a GM Clothing.",
      whatsappUrl: createWhatsAppUrl(
        `Olá! Quero combinar a entrega local${productReference}. Meu CEP é ${formatCep(cep)} (${city}/SC).`,
      ),
    };
  } catch {
    return null;
  }
}

function isServiceError(service: FrenetShippingService) {
  return service.Error === true || service.Error === "true";
}

function normalizeApiBaseUrl(value: string) {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return null;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function getPackageForProduct(category?: string): ShippingPackage {
  const normalizedCategory = category?.toLowerCase() ?? "";

  if (
    normalizedCategory.includes("suéter") ||
    normalizedCategory.includes("polo") ||
    normalizedCategory.includes("frio")
  ) {
    return {
      width: 30,
      height: 8,
      length: 38,
      weight: 0.65,
    };
  }

  return DEFAULT_PACKAGE;
}
