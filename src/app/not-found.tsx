import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "A página solicitada não foi encontrada. Volte para a coleção da GM Clothing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[65svh] flex-col items-center justify-center px-4 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
        Erro 404
      </p>
      <h1 className="mt-4 text-6xl font-black uppercase tracking-display sm:text-8xl">
        Peça não encontrada.
      </h1>
      <Link
        href="/colecao"
        className="mt-8 bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
      >
        Voltar para coleção
      </Link>
    </section>
  );
}
