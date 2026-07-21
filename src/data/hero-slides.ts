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
    title: "Chenile com presença.",
    description:
      "O suéter Chenile Zara guia a coleção: textura real, toque macio e visual premium para vender agora.",
    href: "/colecao/frio",
    cta: "Ver inverno",
    image: brandAssets.brands2.chenileHero,
    mobileImage: brandAssets.brands2.chenileHeroAlt,
    palette: "gold",
    imageFit: "contain",
    mobileImageFit: "contain",
    imagePosition: "center",
    mobileImagePosition: "center top",
  },
  {
    id: "drop-copa-brasil",
    eyebrow: "Últimas peças Copa",
    title: "Futebol em promoção.",
    description:
      "Oversized Brasil, Cristiano Ronaldo e retrôs selecionadas para girar estoque sem roubar o foco da coleção principal.",
    href: "/copa-do-mundo",
    cta: "Ver peças",
    palette: "military",
  },
];
