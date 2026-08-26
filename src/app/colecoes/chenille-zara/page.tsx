import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { catalogProducts } from "@/data/products";

const collectionSlug = "sueter-chenile-zara";

export const metadata: Metadata = {
  title: "Chenille Zara",
  description:
    "Textura premium, toque macio e presença para os dias frios. Conheça o Chenille Zara da GM Clothing.",
  alternates: {
    canonical: "/colecoes/chenille-zara",
  },
  openGraph: {
    title: "Chenille Zara | GM Clothing",
    description:
      "Textura premium, toque macio e presença para os dias frios.",
    url: "/colecoes/chenille-zara",
    type: "website",
  },
};

export default function ChenilleZaraCollectionPage() {
  const products = catalogProducts.filter(
    (product) =>
      product.active &&
      (product.canonicalSlug ?? product.slug) === collectionSlug,
  );

  return (
    <>
      <div className="bg-white">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Coleções", href: "/colecao" },
            { label: "Chenille Zara" },
          ]}
        />
      </div>

      <div className="bg-white text-[#050505]">
        <section className="border-b border-black/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
              Coleção de inverno
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3.25rem,11vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
              CHENILLE ZARA
            </h1>
            <p className="mt-7 max-w-md text-sm leading-6 text-black/60 sm:text-base">
              Textura premium, toque macio e presença para os dias frios.
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/12 pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
                  Produtos da coleção
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
                  Chenille Zara
                </h2>
              </div>
              <p className="shrink-0 text-right text-xs uppercase tracking-[0.12em] text-black/45">
                {products.length} {products.length === 1 ? "peça" : "peças"}
              </p>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} priorityCount={1} />
            ) : (
              <div className="border border-black/10 bg-white px-5 py-14 text-center">
                <p className="text-sm text-black/60">
                  Nenhuma peça Chenille Zara está disponível no momento.
                </p>
                <Link
                  className="mt-6 inline-flex h-11 items-center justify-center bg-[#050505] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c8a96a] hover:text-[#050505]"
                  href="/colecao/frio"
                  prefetch={false}
                >
                  Ver coleção de frio
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
