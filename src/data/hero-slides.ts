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
  palette: "black" | "navy" | "military" | "bone" | "gold";
  imageFit?: "cover" | "contain";
  mobileImageFit?: "cover" | "contain";
  composedImage?: boolean;
  imagePosition?: string;
  mobileImagePosition?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "colecao-frio",
    eyebrow: "WINTER SALE",
    title: "O frio voltou.",
    offer: "Os preços também mudaram.",
    highlights: [
      { label: "Chenille Zara", value: "R$199,90" },
      { label: "Outros suéteres", value: "R$149,90" },
    ],
    description: "Peças selecionadas para os dias frios. Enquanto houver estoque.",
    href: "/sale-inverno",
    cta: "Ver Winter Sale",
    image: "/products/winter/sueter-chenile-zara/caramelo/01-frente.webp",
    palette: "gold",
    imageFit: "cover",
    mobileImageFit: "cover",
    composedImage: false,
    imagePosition: "center top",
    mobileImagePosition: "center top",
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
