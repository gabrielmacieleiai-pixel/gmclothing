import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CollectionBrowser } from "@/components/collection-browser";
import { catalogProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Coleção",
  description:
    "Catálogo direto da GM Clothing com inverno, oversized, linha cristã, futebol, promoções e últimas peças.",
  alternates: {
    canonical: "/colecao",
  },
};

type CollectionPageProps = {
  searchParams?: Promise<{ categoria?: string }>;
};

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const { categoria } = (await searchParams) ?? {};

  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Coleção" }]}
      />
      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-10 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-[1440px] border-b border-black/15 pb-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
            Catálogo GM Clothing
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-display sm:text-7xl">
            Escolha sua linha
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-black/55">
            Produtos organizados por nicho, com acesso direto e sem etapas desnecessárias.
          </p>
        </div>
      </section>
      <section className="px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <CollectionBrowser
            products={catalogProducts}
            initialFilterId={categoria}
          />
        </div>
      </section>
    </main>
  );
}
