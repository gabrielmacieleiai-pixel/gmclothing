import type { Metadata } from "next";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Acessórios",
  description:
    "Estrutura de acessórios masculinos GM Clothing: óculos de sol, brincos, cordões e pulseiras em breve.",
  alternates: {
    canonical: "/acessorios",
  },
};

export default function AcessoriosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Acessórios" },
        ]}
      />
      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8a96a]">
            Em breve
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
            Detalhes que elevam o estilo.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-white/55">
            A estrutura de acessórios está pronta para receber produtos reais
            com fotos, estoque, variantes e checkout quando o catálogo entrar.
          </p>
        </div>
      </section>
      <section className="bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <AccessoryCrossSell />
        </div>
      </section>
    </>
  );
}
