export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  offer?: string;
  highlights?: Array<{
    label: string;
    value: string;
  }>;
  description: string;
  href: string;
  cta: string;
  secondaryHref?: string;
  secondaryCta?: string;
  image?: string;
  mobileImage?: string;
  palette: "black" | "navy" | "military" | "bone" | "gold" | "sale";
  imageFit?: "cover" | "contain";
  mobileImageFit?: "cover" | "contain";
  composedImage?: boolean;
  imagePosition?: string;
  mobileImagePosition?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "liquidacao-inverno",
    eyebrow: "Liquidação de inverno",
    title: "Liquidação",
    offer: "Inverno com preço de saída.",
    highlights: [
      { label: "Chenille Zara", value: "R$199,90" },
      { label: "Suéteres selecionados", value: "R$149,90" },
    ],
    description:
      "Todos os suéteres e peças de frio reunidos. Estoque limitado.",
    href: "/colecao/frio",
    cta: "Ver tudo de inverno",
    palette: "sale",
  },
  {
    id: "oversized-essentials",
    eyebrow: "Streetwear premium",
    title: "Oversized",
    offer: "Modelagem ampla. Presença real.",
    description:
      "Fotos reais, cortes amplos e peças diretas para quem quer presença sem exagero.",
    href: "/colecao/oversized",
    cta: "Ver oversized",
    secondaryHref: "/colecao",
    secondaryCta: "Ver coleção",
    image: "/products/imagens para o site/794c1315-508b-448e-ac92-3e85c062f95d.png",
    mobileImage: "/products/imagens para o site/1eaa7081-dc80-4678-b44e-b0d52741caa9.png",
    palette: "black",
    imageFit: "cover",
    mobileImageFit: "cover",
    composedImage: true,
    imagePosition: "center center",
    mobileImagePosition: "center top",
  },
  {
    id: "ultimas-pecas",
    eyebrow: "Estoque limitado",
    title: "Últimas Peças",
    offer: "Estoque curto. Escolha direta.",
    description:
      "Streetwear para garantir rápido antes que acabe o estoque.",
    href: "/colecao/ultimas-pecas",
    cta: "Ver ofertas",
    palette: "black",
  },
];
