import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Últimas peças | GM Clothing",
  description:
    "Peças finais da GM Clothing organizadas dentro da coleção principal.",
  alternates: {
    canonical: "/colecao?categoria=ultimas-pecas",
  },
};

export default function CopaDoMundoRedirectPage() {
  redirect("/colecao?categoria=ultimas-pecas");
}
