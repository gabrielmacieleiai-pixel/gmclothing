"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { ArrowUpRight } from "@/components/icons";
import { getCheckoutUrlBySku } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { isLocalDeliveryCity } from "@/lib/local-delivery";
import { getShopifyCartPermalink } from "@/lib/shopify";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { FormEvent } from "react";

type CheckoutField =
  | "fullName"
  | "cpf"
  | "email"
  | "phone"
  | "cep"
  | "street"
  | "number"
  | "complement"
  | "district"
  | "city"
  | "state";

type ViaCepResponse = {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
};

const requiredFields: CheckoutField[] = [
  "fullName",
  "cpf",
  "email",
  "phone",
  "cep",
  "street",
  "number",
  "district",
  "city",
  "state",
];

const fieldOrder: CheckoutField[] = [
  "fullName",
  "cpf",
  "email",
  "phone",
  "cep",
  "street",
  "number",
  "complement",
  "district",
  "city",
  "state",
];

const fieldLabels: Record<CheckoutField, string> = {
  fullName: "Nome completo",
  cpf: "CPF",
  email: "E-mail",
  phone: "Telefone / WhatsApp",
  cep: "CEP",
  street: "Rua",
  number: "Número",
  complement: "Complemento",
  district: "Bairro",
  city: "Cidade",
  state: "Estado",
};

const fieldAutoComplete: Partial<Record<CheckoutField, string>> = {
  fullName: "name",
  cpf: "off",
  email: "email",
  phone: "tel",
  cep: "postal-code",
  street: "address-line1",
  number: "address-line2",
  complement: "address-line3",
  district: "address-level3",
  city: "address-level2",
  state: "address-level1",
};

const brazilStates = [
  { value: "", label: "Selecione" },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const initialForm = fieldOrder.reduce(
  (fields, key) => ({ ...fields, [key]: "" }),
  {} as Record<CheckoutField, string>,
);

export function CheckoutForm() {
  const { couponCode, discount, items, subtotal, total } = useCart();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState<string | null>(null);
  const [cepMessage, setCepMessage] = useState<string | null>(null);
  const [localDeliveryCity, setLocalDeliveryCity] = useState<string | null>(
    null,
  );
  const [isCepLoading, setIsCepLoading] = useState(false);
  const hasItems = items.length > 0;
  const localDeliveryWhatsAppUrl = localDeliveryCity
    ? createWhatsAppUrl(
        `Olá! Quero combinar a entrega local do meu pedido. Meu CEP é ${form.cep} (${localDeliveryCity}/SC).`,
      )
    : null;

  function updateField(field: CheckoutField, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setMessage(null);

    if (field !== "cep") {
      return;
    }

    setCepMessage(null);
  }

  async function handleCepChange(value: string) {
    const nextCep = formatCep(value);
    const cepDigits = getOnlyDigits(nextCep);

    setForm((currentForm) => ({ ...currentForm, cep: nextCep }));
    setMessage(null);
    setCepMessage(null);
    setLocalDeliveryCity(null);

    if (cepDigits.length !== 8) {
      return;
    }

    setIsCepLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data = (await response.json()) as ViaCepResponse;

      if (!response.ok || data.erro) {
        setCepMessage("CEP não encontrado. Revise o número e tente novamente.");
        return;
      }

      setForm((currentForm) => ({
        ...currentForm,
        cep: nextCep,
        street: currentForm.street || data.logradouro || "",
        district: currentForm.district || data.bairro || "",
        city: currentForm.city || data.localidade || "",
        state: currentForm.state || data.uf || "",
      }));
      const hasLocalDelivery = isLocalDeliveryCity(data.localidade, data.uf);

      setLocalDeliveryCity(hasLocalDelivery ? data.localidade?.trim() ?? null : null);
      setCepMessage(
        hasLocalDelivery
          ? "Endereço preenchido. Entrega local disponível."
          : "Endereço preenchido pelo CEP.",
      );
    } catch {
      setCepMessage("Não foi possível buscar o CEP agora. Preencha manualmente.");
    } finally {
      setIsCepLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasItems) {
      setMessage("Seu carrinho está vazio.");
      return;
    }

    const missingField = requiredFields.find((field) => !form[field].trim());

    if (missingField) {
      setMessage(`Preencha o campo ${fieldLabels[missingField]} para continuar.`);
      return;
    }

    const shopifyItems = items.map((item) => ({
      quantity: item.quantity,
      variantId: item.shopifyVariantId,
    }));
    const allItemsHaveShopifyVariant = shopifyItems.every(
      (item) => Boolean(item.variantId),
    );
    const shopifyCheckoutUrl = allItemsHaveShopifyVariant
      ? getShopifyCartPermalink(shopifyItems, {
          discountCode: couponCode || undefined,
          checkout: { zip: form.cep },
        })
      : null;

    if (shopifyCheckoutUrl) {
      window.location.href = shopifyCheckoutUrl;
      return;
    }

    const singleCheckoutUrl =
      items.length === 1
        ? items[0]?.checkoutUrl ?? getCheckoutUrlBySku(items[0]?.sku) ?? null
        : null;

    if (singleCheckoutUrl) {
      window.location.href = singleCheckoutUrl;
      return;
    }

    setMessage(
      "Uma ou mais variantes ainda não têm ID de checkout da Shopify configurado. Revise os IDs no mapa de variantes ou finalize pelo WhatsApp.",
    );
  }

  return (
    <section className="bg-white px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
            Pré-checkout
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-display sm:text-6xl">
            Dados para finalizar
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-black/55">
            Preencha contato e envio. O pagamento final abre no checkout seguro
            da Shopify com os itens do carrinho.
          </p>

          <form
            className="mt-8 grid gap-4 border border-black/10 bg-white/65 p-4 sm:grid-cols-2 sm:p-6"
            onSubmit={handleSubmit}
          >
            {fieldOrder.map((field) => {
              const isWide = field === "fullName" || field === "street";
              const isRequired = requiredFields.includes(field);

              return (
                <label
                  className={isWide ? "sm:col-span-2" : undefined}
                  key={field}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                    {fieldLabels[field]}
                    {isRequired ? " *" : ""}
                  </span>

                  {field === "state" ? (
                    <select
                      autoComplete={fieldAutoComplete[field]}
                      className="mt-2 h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none transition-colors focus:border-black"
                      onChange={(event) => updateField(field, event.target.value)}
                      required={isRequired}
                      value={form[field]}
                    >
                      {brazilStates.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      autoComplete={fieldAutoComplete[field]}
                      className="mt-2 h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none transition-colors focus:border-black"
                      inputMode={getInputMode(field)}
                      maxLength={field === "cep" ? 9 : undefined}
                      onChange={(event) =>
                        field === "cep"
                          ? handleCepChange(event.target.value)
                          : updateField(field, event.target.value)
                      }
                      required={isRequired}
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                    />
                  )}

                  {field === "cep" && (isCepLoading || cepMessage) ? (
                    <span className="mt-2 block text-[10px] uppercase tracking-[0.12em] text-black/45">
                      {isCepLoading ? "Buscando CEP..." : cepMessage}
                    </span>
                  ) : null}
                </label>
              );
            })}

            {localDeliveryWhatsAppUrl ? (
              <a
                className="flex items-center justify-between gap-4 bg-[#050505] px-5 py-4 text-white transition hover:bg-black/80 sm:col-span-2"
                href={localDeliveryWhatsAppUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>
                  <strong className="block text-[10px] uppercase tracking-[0.16em]">
                    Combinar entrega pelo WhatsApp
                  </strong>
                  <span className="mt-1 block text-xs text-white/65">
                    {localDeliveryCity} · valor, prazo e horário combinados com a
                    GM Clothing.
                  </span>
                </span>
                <ArrowUpRight />
              </a>
            ) : null}

            {message ? (
              <p className="border border-[#8a2d1d]/25 bg-[#8a2d1d]/5 px-4 py-3 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#8a2d1d] sm:col-span-2">
                {message}
              </p>
            ) : null}

            <button
              className="flex h-14 items-center justify-center gap-3 bg-[#050505] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:bg-black/35 sm:col-span-2"
              disabled={!hasItems}
              type="submit"
            >
              Finalizar compra <ArrowUpRight />
            </button>
          </form>
        </div>

        <aside className="h-fit border border-black/10 bg-white/70 p-5 lg:sticky lg:top-28">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
            Resumo do pedido
          </p>
          <div className="mt-5 space-y-4">
            {hasItems ? (
              items.map((item) => (
                <div
                  className="border-b border-black/10 pb-4 last:border-b-0"
                  key={item.id}
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase">
                        {item.shortName}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-black/40">
                        {item.colorName ?? "Cor única"} / {item.size ?? "Único"} /
                        Qtd. {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-black/50">
                Adicione produtos ao carrinho para continuar.
              </p>
            )}
          </div>

          <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-black/50">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">Desconto</span>
              <span className="font-bold">-{formatPrice(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">Frete</span>
              <span className="font-bold">A calcular</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-base">
              <span className="font-black uppercase tracking-[0.12em]">Total</span>
              <span className="font-black">{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            className="mt-6 flex h-12 items-center justify-center border border-black/15 px-5 text-[10px] font-bold uppercase tracking-[0.18em]"
            href="/carrinho"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </section>
  );
}

function getInputMode(field: CheckoutField) {
  if (field === "cpf" || field === "phone" || field === "cep") {
    return "numeric";
  }

  return undefined;
}

function getOnlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCep(value: string) {
  const digits = getOnlyDigits(value).slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
