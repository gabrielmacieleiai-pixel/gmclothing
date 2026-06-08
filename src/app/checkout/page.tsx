import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Pré-checkout GM Clothing para cadastro, endereço e resumo do pedido antes do pagamento externo.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Carrinho", href: "/carrinho" },
          { label: "Checkout" },
        ]}
      />
      <CheckoutForm />
    </>
  );
}
