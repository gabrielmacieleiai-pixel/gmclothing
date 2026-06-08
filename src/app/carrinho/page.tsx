import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Carrinho",
  description:
    "Revise produtos, tamanhos, cores, quantidades e cupom antes do checkout GM Clothing.",
  alternates: {
    canonical: "/carrinho",
  },
};

export default function CarrinhoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Coleção", href: "/colecao" },
          { label: "Carrinho" },
        ]}
      />
      <CartPage />
    </>
  );
}
