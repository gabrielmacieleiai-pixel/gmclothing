import { brandAssets } from "@/data/brand-assets";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image?: string;
  mobileImage?: string;
  palette: "black" | "navy" | "military" | "bone" | "gold";
  imageFit?: "cover" | "contain";
  mobileImageFit?: "cover" | "contain";
  imagePosition?: string;
  mobileImagePosition?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "colecao-frio",
    eyebrow: "Nova coleção inverno",
    title: "Chenile Zara",
    description:
      "O suéter que abre a temporada: textura real, toque macio e presença premium para vender agora.",
    href: "/colecao/frio",
    cta: "Ver coleção",
    image: brandAssets.brands2.chenileHero,
    mobileImage: brandAssets.brands2.chenileHero,
    palette: "gold",
    imageFit: "cover",
    mobileImageFit: "cover",
    imagePosition: "center top",
    mobileImagePosition: "center top",
  },
  {
    id: "oversized-essentials",
    eyebrow: "Streetwear premium",
    title: "Oversized com atitude",
    description:
      "Modelagens amplas, fotos reais e peças diretas para quem quer presença sem exagero.",
    href: "/colecao/oversized",
    cta: "Ver oversized",
    image: brandAssets.brands2.oversizedHeroDesktop,
    mobileImage: brandAssets.brands2.oversizedHeroMobile,
    palette: "black",
    imageFit: "cover",
    mobileImageFit: "cover",
    imagePosition: "center",
    mobileImagePosition: "center",
  },
];
