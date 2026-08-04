import type { MetadataRoute } from "next";
import { activeProducts } from "@/data/products";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmclo.shop"
).replace(/\/$/, "");

const staticRoutes = [
  "",
  "/colecao",
  "/colecao/frio",
  "/colecao/oversized",
  "/colecao/crista",
  "/colecao/futebol",
  "/colecao/lancamentos",
  "/colecao/promocao",
  "/colecao/ultimas-pecas",
  "/colecoes/chenille-zara",
  "/acessorios",
  "/sobre",
  "/contato",
  "/trocas-e-devolucoes",
  "/prazo-de-envio",
  "/formas-de-pagamento",
  "/politica-de-privacidade",
  "/duvidas-frequentes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const productRoutes = Array.from(
    new Map(
      activeProducts.map((product) => {
        const slug = product.canonicalSlug ?? product.slug;

        return [
          slug,
          {
            url: `${siteUrl}/produto/${slug}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ];
      }),
    ).values(),
  );

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...productRoutes,
  ];
}
