import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { catalogProducts } from "@/data/products";
import type { Product } from "@/types/product";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

type CollectionConfig = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  filterProducts: (products: Product[]) => Product[];
};

const collectionPages = {
  frio: {
    label: "Inverno",
    eyebrow: "Coleção Frio",
    title: "Textura para o inverno.",
    description: "Suéteres, tricôs e polos reunidos para uma escolha direta.",
    filterProducts: (products) => products.filter(isWinterProduct),
  },
  oversized: {
    label: "Oversized",
    eyebrow: "Caimento amplo",
    title: "Oversized GM.",
    description: "Modelagens amplas, estampas fortes e cores organizadas por produto.",
    filterProducts: (products) => products.filter(isOversizedProduct),
  },
  crista: {
    label: "Linha Cristã",
    eyebrow: "Linha Fate",
    title: "Vista propósito.",
    description: "Peças cristãs com linguagem urbana e identidade GM Clothing.",
    filterProducts: (products) => products.filter(isFaithProduct),
  },
  futebol: {
    label: "Futebol",
    eyebrow: "Football Culture",
    title: "Futebol para vestir.",
    description: "Brasil, seleções, retrôs e oversized de futebol em uma única linha.",
    filterProducts: (products) => products.filter(isFootballProduct),
  },
  promocao: {
    label: "Promoções",
    eyebrow: "Condições especiais",
    title: "Oferta sem enrolação.",
    description: "Produtos com preço promocional já aplicado e compra direta.",
    filterProducts: (products) => products.filter(isPromotionalProduct),
  },
  "ultimas-pecas": {
    label: "Últimas Peças",
    eyebrow: "Estoque limitado",
    title: "Garanta antes que acabe.",
    description: "Uma seleção curta para decidir rápido enquanto ainda há estoque.",
    filterProducts: (products) =>
      products.filter(
        (product) =>
          isFootballProduct(product) ||
          isFaithProduct(product) ||
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
    return { title: "Coleção não encontrada" };
  }

  return {
    title: collection.label,
    description: collection.description,
    alternates: { canonical: `/colecao/${slug}` },
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

  const products = sortCollectionProducts(
    slug,
    collection.filterProducts(catalogProducts),
  );

  return (
    <main className="bg-[#f5f1e8]">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Coleção", href: "/colecao" },
          { label: collection.label },
        ]}
      />
      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-10 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-[1440px] border-b border-black/15 pb-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
            {collection.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.88] tracking-display sm:text-7xl lg:text-8xl">
            {collection.title}
          </h1>
          <div className="mt-5 flex flex-col gap-3 text-sm text-black/55 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl leading-6">{collection.description}</p>
            <p className="shrink-0 font-bold uppercase tracking-[0.12em]">
              {products.length} {products.length === 1 ? "peça" : "peças"}
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="border border-black/10 bg-white px-5 py-12 text-center">
              <p className="text-sm text-black/55">Nenhuma peça ativa nesta linha.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function sortCollectionProducts(slug: string, products: Product[]) {
  if (slug !== "frio") {
    return products;
  }

  return [...products].sort(
    (firstProduct, secondProduct) =>
      Number(isChenilleProduct(secondProduct)) -
      Number(isChenilleProduct(firstProduct)),
  );
}

function isWinterProduct(product: Product) {
  return (
    product.collection === "Coleção Frio" ||
    product.category === "Suéter" ||
    product.category === "Polo Tricot"
  );
}

function isOversizedProduct(product: Product) {
  return (
    product.category === "Oversized" ||
    product.subcollection === "Oversized Futebol" ||
    product.styleTags?.includes("oversized") ||
    product.tags?.includes("oversized") ||
    hasAnyText(product, ["oversized"])
  );
}

function isChenilleProduct(product: Product) {
  return hasAnyText(product, ["chenile", "chenille"]);
}

function isFaithProduct(product: Product) {
  return hasAnyText(product, [
    "fate",
    "faith",
    "jesus",
    "salmo",
    "cristã",
    "crista",
    "propósito",
    "proposito",
  ]);
}

function isFootballProduct(product: Product) {
  return (
    product.campaign === "copa-2026" ||
    product.collection === "Copa do Mundo" ||
    product.category === "Jerseys" ||
    hasAnyText(product, [
      "futebol",
      "football",
      "copa",
      "brasil",
      "argentina",
      "portugal",
      "espanha",
      "cr7",
      "cristiano",
      "ronaldinho",
      "kaká",
      "kaka",
      "seleção",
      "selecao",
      "jersey",
    ])
  );
}

function isPromotionalProduct(product: Product) {
  return (
    Boolean(product.promotionalPrice) ||
    Boolean(product.colorPricing) ||
    hasAnyText(product, ["promoção", "promocao", "oferta", "sale"])
  );
}

function hasAnyText(product: Product, values: string[]) {
  const haystack = [
    product.name,
    product.shortName,
    product.collection,
    product.category,
    product.subcollection,
    ...(product.tags ?? []),
    ...(product.styleTags ?? []),
    product.badge,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return values.some((value) => haystack.includes(value.toLowerCase()));
}

function getCollectionConfig(slug: string) {
  return collectionPages[slug as keyof typeof collectionPages];
}
