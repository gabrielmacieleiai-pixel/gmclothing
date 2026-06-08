import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CollectionBrowser } from "@/components/collection-browser";
import { ArrowUpRight } from "@/components/icons";
import { brandAssets } from "@/data/brand-assets";
import { catalogProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Coleção",
  description:
    "Coleção de streetwear premium da GM Clothing com Copa, oversized e peças de frio.",
  alternates: {
    canonical: "/colecao",
  },
  openGraph: {
    title: "Coleção | GM Clothing",
    description:
      "Streetwear masculino premium com curadoria GM Clothing.",
    images: ["/products/brand-assets/oversized-essential-preta-editorial.jpg"],
  },
};

const collectionHighlights = [
  {
    label: "Copa do Mundo",
    href: "/copa-do-mundo",
    image: brandAssets.brands2.copaBrasilDesktop,
  },
  {
    label: "Oversized",
    href: "/colecao?categoria=oversized#catalogo",
    image: brandAssets.brands2.oversizedHeroDesktop,
  },
  {
    label: "Coleção Frio",
    href: "/colecao?categoria=frio#catalogo",
    image: brandAssets.brands2.frioHeroDesktop,
  },
];

type CollectionPageProps = {
  searchParams?: Promise<{ categoria?: string }>;
};

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const { categoria } = (await searchParams) ?? {};

  return (
    <>
      <div className="bg-[#f5f1e8]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Coleção" },
          ]}
        />
      </div>

      <section className="relative overflow-hidden bg-ink px-4 py-14 text-bone sm:px-6 lg:px-10 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={brandAssets.brands2.brandAtmosphere}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
          <Image
            src={brandAssets.brands2.collectionOverview}
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover opacity-62"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-acid">
            GM Clothing / Drop atual
          </p>
          <h1 className="max-w-4xl text-[3.4rem] font-black uppercase leading-[0.78] tracking-display sm:text-8xl lg:text-[9rem]">
            Coleção
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-6 text-white/55">
            Copa, oversized e frio organizados para compra rápida no celular.
            Fotos grandes, informação limpa e foco no produto.
          </p>
          <div className="mt-10 flex flex-col gap-4 border-t border-white/20 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>{catalogProducts.length} peças selecionadas</p>
            <p>Peças limitadas. Presença real.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-3">
          {collectionHighlights.map((highlight) => (
            <Link
              className="group relative min-h-[300px] overflow-hidden bg-[#050505] text-white"
              href={highlight.href}
              key={highlight.label}
            >
              <Image
                src={highlight.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
                <span className="text-xl font-black uppercase tracking-display">
                  {highlight.label}
                </span>
                <span className="grid size-10 place-items-center border border-white/30">
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12" id="catalogo">
        <div className="mx-auto max-w-[1440px]">
          <CollectionBrowser
            products={catalogProducts}
            initialFilterId={categoria}
          />
        </div>
      </section>
    </>
  );
}
