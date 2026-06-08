import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductDetails } from "@/components/product-details";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import {
  activeProducts,
  getRelatedProducts,
  getProductBySlug,
  getProductHref,
  getProductRedirectBySlug,
  getProductRedirectHref,
} from "@/data/products";
import { withCheckoutUrls } from "@/lib/checkout";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ cor?: string }>;
};

export function generateStaticParams() {
  return activeProducts
    .filter((product) => product.campaign !== "copa-2026")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const redirectTarget = getProductRedirectBySlug(slug);
  const product = getProductBySlug(redirectTarget?.slug ?? slug);

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "Produto não encontrado na GM Clothing.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/produto/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | GM Clothing`,
      description: product.description,
      images: product.photos[0] ? [product.photos[0].src] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const { cor } = (await searchParams) ?? {};
  const product = getProductBySlug(slug);

  if (!product) {
    const redirectHref = getProductRedirectHref(slug);

    if (redirectHref) {
      redirect(redirectHref);
    }

    notFound();
  }

  if (product.campaign === "copa-2026") {
    redirect(getProductHref(product));
  }

  const productForSale = withCheckoutUrls(product);
  const whatsappUrl = getWhatsAppUrl(product.name);
  const related = getRelatedProducts(product, activeProducts, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Coleção", href: "/colecao" },
          { label: product.category },
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
            eyebrow="Combine com"
            title="Acessórios para completar"
          />
        </div>
      </section>

      <section className="border-t border-black/15 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Complete o visual"
            title="Você também pode curtir"
          />
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  );
}
