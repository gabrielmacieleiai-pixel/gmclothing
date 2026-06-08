import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductDetails } from "@/components/product-details";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import {
  copaProducts,
  getCopaProductBySlug,
  getProductHref,
  getRelatedProducts,
} from "@/data/products";
import { withCheckoutUrls } from "@/lib/checkout";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type CopaProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ cor?: string }>;
};

export function generateStaticParams() {
  return copaProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: CopaProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCopaProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto Copa não encontrado",
      description: "Produto não encontrado no Drop Copa 2026 da GM Clothing.",
    };
  }

  return {
    title: `${product.name} | Drop Copa 2026`,
    description: product.description,
    alternates: {
      canonical: `/copa-do-mundo/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | GM Clothing`,
      description: product.description,
      images: product.photos[0] ? [product.photos[0].src] : undefined,
      type: "website",
    },
  };
}

export default async function CopaProductPage({
  params,
  searchParams,
}: CopaProductPageProps) {
  const { slug } = await params;
  const { cor } = (await searchParams) ?? {};
  const product = getCopaProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productForSale = withCheckoutUrls(product);
  const whatsappUrl = getWhatsAppUrl(product.name);
  const related = getRelatedProducts(product, copaProducts, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Drop Copa 2026", href: "/copa-do-mundo" },
          { label: product.subcollection ?? product.category },
          { label: product.shortName },
        ]}
      />

      <ProductDetails
        key={`${product.slug}-${cor ?? ""}`}
        product={productForSale}
        whatsappUrl={whatsappUrl}
        initialColorId={cor}
      />

      <section className="border-t border-black/15 bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <AccessoryCrossSell
            eyebrow="Complete o look"
            title="Acessórios em breve"
          />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-black/15 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <SectionHeading
              eyebrow="Drop Copa 2026"
              title="Complete o uniforme"
              href="/copa-do-mundo"
              action="Ver Drop"
            />
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}

      <section className="bg-[#050505] px-4 py-12 text-white sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#72c7ef]">
              Campanha ativa
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-display">
              Copa 2026 na GM.
            </h2>
          </div>
          <Link
            className="flex h-12 items-center justify-center border border-white/20 px-5 text-[10px] font-bold uppercase tracking-[0.18em]"
            href={getProductHref(product)}
          >
            Voltar ao topo
          </Link>
        </div>
      </section>
    </>
  );
}
