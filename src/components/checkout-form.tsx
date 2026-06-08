"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { ArrowUpRight } from "@/components/icons";
import { formatPrice } from "@/lib/format";
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

const initialForm = Object.keys(fieldLabels).reduce(
  (fields, key) => ({ ...fields, [key]: "" }),
  {} as Record<CheckoutField, string>,
);

export function CheckoutForm() {
  const { discount, items, subtotal, total } = useCart();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState<string | null>(null);
  const hasItems = items.length > 0;

  function updateField(field: CheckoutField, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setMessage(null);
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

    const singleCheckoutUrl =
      items.length === 1 ? items[0]?.checkoutUrl ?? null : null;

    if (singleCheckoutUrl) {
      window.location.href = singleCheckoutUrl;
      return;
    }

    setMessage(
      "Checkout externo para carrinho com múltiplos itens ainda está preparado para integração. Finalize pelo WhatsApp ou configure os links Yampi de pacote.",
    );
  }

  return (
    <section className="bg-[#f5f1e8] px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
            Pré-checkout
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-display sm:text-6xl">
            Dados para finalizar
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-black/55">
            Esta etapa organiza contato, endereço e resumo do pedido. O pagamento
            final continua preparado para checkout externo.
          </p>

          <form
            className="mt-8 grid gap-4 border border-black/10 bg-white/65 p-4 sm:grid-cols-2 sm:p-6"
            onSubmit={handleSubmit}
          >
            {(
              [
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
              ] as CheckoutField[]
            ).map((field) => (
              <label
                className={
                  field === "fullName" || field === "street"
                    ? "sm:col-span-2"
                    : undefined
                }
                key={field}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  {fieldLabels[field]}
                  {requiredFields.includes(field) ? " *" : ""}
                </span>
                <input
                  className="mt-2 h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none transition-colors focus:border-black"
                  onChange={(event) => updateField(field, event.target.value)}
                  required={requiredFields.includes(field)}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                />
              </label>
            ))}

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
                        {item.colorName ?? "Cor única"} / {item.size ?? "Único"} / Qtd.{" "}
                        {item.quantity}
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
