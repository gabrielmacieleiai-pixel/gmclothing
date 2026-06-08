"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type LeadForm = {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
};

const initialForm: LeadForm = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
};

export function LeadCapture() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField(key: keyof LeadForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.localStorage.setItem(
      "gm-clothing-lead",
      JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
    );
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <section
      className="bg-[#050505] px-4 py-14 text-white sm:px-6 lg:px-10"
      id="lead-capture"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 border border-white/10 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c8a96a]">
            Acesso GM
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.85] tracking-display sm:text-6xl">
            Entre antes do drop.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
            Cadastre-se para receber avisos de reposição, drops e ofertas
            limitadas. Sem spam. Só presença.
          </p>
        </div>

        {submitted ? (
          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase">Cadastro recebido.</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Quando o próximo drop abrir, a GM entra em contato.
            </p>
          </div>
        ) : (
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
            <LeadInput
              label="Nome"
              onChange={(value) => updateField("name", value)}
              required
              value={form.name}
            />
            <LeadInput
              label="Telefone"
              onChange={(value) => updateField("phone", value)}
              value={form.phone}
            />
            <LeadInput
              label="WhatsApp"
              onChange={(value) => updateField("whatsapp", value)}
              required
              value={form.whatsapp}
            />
            <LeadInput
              label="E-mail"
              onChange={(value) => updateField("email", value)}
              required
              type="email"
              value={form.email}
            />
            <button
              className="h-14 bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505] sm:col-span-2"
              type="submit"
            >
              Entrar na lista
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function LeadInput({
  label,
  onChange,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
        {label}
      </span>
      <input
        className="h-12 w-full border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#c8a96a]"
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}
