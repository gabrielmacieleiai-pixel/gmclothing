import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  copaProducts,
  getCopaProductBySlug,
  getProductHref,
} from "@/data/products";

type LegacyCopaProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return copaProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: LegacyCopaProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCopaProductBySlug(slug);

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
      canonical: getProductHref(product),
    },
  };
}

export default async function LegacyCopaProductRedirectPage({
  params,
}: LegacyCopaProductPageProps) {
  const { slug } = await params;
  const product = getCopaProductBySlug(slug);

  if (!product) {
    notFound();
  }

  redirect(getProductHref(product));
}
