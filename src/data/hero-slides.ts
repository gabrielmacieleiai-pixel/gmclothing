export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  offer?: string;
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
    eyebrow: "Nova coleção inverno",
    title: "Sale Inverno",
    offer: "Chenile Zara de R$399,90 por R$249,90",
    description:
      "O suéter principal da temporada: textura real, toque macio e visual premium para comprar agora.",
    href: "/colecoes/chenille-zara",
    cta: "Ver coleção",
    secondaryHref: "/colecao/frio",
    secondaryCta: "Ver inverno",
    image: "/products/imagens para o site/2855d6bb-8bdb-4316-a4a1-2788772328aa.png",
    mobileImage: "/products/imagens para o site/6af50d10-d52c-477a-9b65-36ee207a0da7.png",
    palette: "gold",
    imageFit: "cover",
    mobileImageFit: "cover",
    composedImage: true,
    imagePosition: "center center",
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
