import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { brandAssets } from "@/data/brand-assets";
import { catalogProducts, getProductHref } from "@/data/products";
import { getImageVariantSrc } from "@/lib/image-variants";
import type { Product } from "@/types/product";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

type CollectionConfig = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  filterProducts: (products: Product[]) => Product[];
};

const collectionPages = {
  oversized: {
    label: "Oversized",
    eyebrow: "Coleção Oversized",
    title: "Caimento amplo. Presença real.",
    description:
      "Peças oversized organizadas em um espaço próprio para compra rápida, com foto grande, preço claro e troca de cor dentro do produto.",
    image: brandAssets.brands2.oversizedHeroDesktop,
    accent: "text-[#9faa83]",
    filterProducts: (products) =>
      products.filter(
        (product) =>
          product.category === "Oversized" ||
          product.subcollection === "Oversized Futebol" ||
          product.styleTags?.includes("oversized") ||
          product.tags?.includes("oversized"),
      ),
  },
  frio: {
    label: "Coleção Frio",
    eyebrow: "Textura e inverno",
    title: "Frio sem cara de básico.",
    description:
      "Suéteres e polos de tricô em uma vitrine separada, limpa e pensada para valorizar textura, caimento e acabamento.",
    image: brandAssets.brands2.chenileHero,
    accent: "text-[#c8a96a]",
    filterProducts: (products) =>
      products.filter(
        (product) =>
          product.collection === "Coleção Frio" ||
          product.category === "Suéter" ||
          product.category === "Polo Tricot",
      ),
  },
} satisfies Record<string, CollectionConfig>;

export function generateStaticParams() {
  return Object.keys(collectionPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionConfig(slug);

  if (!collection) {
    return {
      title: "Coleção não encontrada",
    };
  }

  return {
    title: collection.label,
    description: collection.description,
    alternates: {
      canonical: `/colecao/${slug}`,
    },
    openGraph: {
      title: `${collection.label} | GM Clothing`,
      description: collection.description,
      images: [collection.image],
    },
  };
}

export default async function CollectionLandingPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionConfig(slug);

  if (!collection) {
    notFound();
  }

  const products = collection.filterProducts(catalogProducts);
  const highlightProduct = products[0];

  return (
    <>
      <div className="bg-[#f5f1e8]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Coleção", href: "/colecao" },
            { label: collection.label },
          ]}
        />
      </div>

      <section className="relative overflow-hidden bg-[#050505] px-4 py-14 text-white sm:px-6 lg:px-10 lg:py-20">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(255,255,255,0.10),transparent_32%),radial-gradient(circle_at_8%_88%,rgba(200,169,106,0.12),transparent_34%)] lg:hidden" />
          <div className="absolute -right-32 top-[-12%] hidden size-[28rem] rounded-full bg-white/10 blur-[110px] lg:block" />
          <div className="absolute bottom-[-22%] left-[-24%] hidden size-[32rem] rounded-full bg-[#c8a96a]/12 blur-[110px] lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex min-h-[430px] flex-col justify-end border border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:p-10">
            <p
              className={`mb-4 text-[10px] font-bold uppercase tracking-[0.28em] ${collection.accent}`}
            >
              {collection.eyebrow}
            </p>
            <h1 className="max-w-4xl text-[4rem] font-black uppercase leading-[0.78] tracking-display sm:text-8xl lg:text-[8.5rem]">
              {collection.title}
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-6 text-white/58">
              {collection.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {highlightProduct ? (
                <Link
                  className="flex h-12 items-center justify-center gap-3 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505] lg:transition lg:duration-200 lg:hover:bg-[#d4b06a]"
                  href={getProductHref(highlightProduct)}
                  prefetch={false}
                >
                  Ver destaque <ArrowUpRight />
                </Link>
              ) : null}
              <Link
                className="flex h-12 items-center justify-center gap-3 border border-white/20 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white lg:transition lg:duration-200 lg:hover:border-white"
                href="/colecao"
                prefetch={false}
              >
                Todas as coleções
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-white/10 bg-[#f5f1e8] lg:min-h-[620px]">
            <Image
              alt={`Campanha ${collection.label} GM Clothing`}
              className="object-contain p-5"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              src={getImageVariantSrc(collection.image, "hero")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-col gap-4 border-b border-black/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
                Produtos da coleção
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-display sm:text-5xl">
                {collection.label}
              </h2>
            </div>
            <p className="text-sm text-black/50">
              {products.length} peça{products.length === 1 ? "" : "s"} nesta seleção.
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="border border-black/10 bg-white px-5 py-12 text-center">
              <p className="text-sm text-black/55">
                Nenhuma peça ativa nesta coleção por enquanto.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function getCollectionConfig(slug: string) {
  return collectionPages[slug as keyof typeof collectionPages];
}
