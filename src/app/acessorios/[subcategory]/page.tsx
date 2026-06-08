import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccessoryCrossSell } from "@/components/accessory-cross-sell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  accessoryCategories,
  getAccessoryCategoryBySlug,
} from "@/data/accessories";

type AccessorySubcategoryPageProps = {
  params: Promise<{ subcategory: string }>;
};

export function generateStaticParams() {
  return accessoryCategories.map((category) => ({
    subcategory: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: AccessorySubcategoryPageProps): Promise<Metadata> {
  const { subcategory } = await params;
  const category = getAccessoryCategoryBySlug(subcategory);

  if (!category) {
    return {
      title: "Acessório não encontrado",
      description: "Subcategoria de acessórios não encontrada.",
    };
  }

  return {
    title: category.label,
    description: category.description,
    alternates: {
      canonical: category.href,
    },
  };
}

export default async function AccessorySubcategoryPage({
  params,
}: AccessorySubcategoryPageProps) {
  const { subcategory } = await params;
  const category = getAccessoryCategoryBySlug(subcategory);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Acessórios", href: "/acessorios" },
          { label: category.label },
        ]}
      />
      <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8a96a]">
            Acessórios / Em breve
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.86] tracking-display sm:text-7xl">
            {category.label}
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-white/55">
            {category.description}
          </p>
        </div>
      </section>
      <section className="bg-[#f5f1e8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <AccessoryCrossSell
            eyebrow="Outras categorias"
            title="Complete o estilo"
          />
        </div>
      </section>
    </>
  );
}
