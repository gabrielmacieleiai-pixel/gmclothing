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
    id: "drop-copa-brasil",
    eyebrow: "Drop Copa 2026",
    title: "Brasil em campo.",
    description:
      "Futebol, presença e leitura street em um drop limpo, rápido e focado em conversão.",
    href: "/copa-do-mundo",
    cta: "Ver coleção",
    palette: "military",
  },
  {
    id: "colecao-frio",
    eyebrow: "Lançamentos de frio",
    title: "Tricô com presença.",
    description:
      "Suéteres e polos de tricô com textura real, caimento limpo e visual premium.",
    href: "/colecao/frio",
    cta: "Ver lançamentos",
    image: brandAssets.brands2.frioHeroDesktop,
    mobileImage: brandAssets.brands2.frioHeroMobile,
    palette: "black",
    imageFit: "contain",
    mobileImageFit: "contain",
    imagePosition: "center",
    mobileImagePosition: "center top",
  },
];
