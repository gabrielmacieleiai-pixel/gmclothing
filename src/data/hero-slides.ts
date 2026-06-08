import { brandAssets } from "@/data/brand-assets";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
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
      "Estilo fora dele. Camiseta versão jogador com presença de Copa e leitura street.",
    href: "/copa-do-mundo",
    cta: "Ver coleção",
    image: brandAssets.brands2.copaHeroDesktop,
    mobileImage: brandAssets.brands2.copaHeroMobile,
    palette: "military",
    imageFit: "cover",
    mobileImageFit: "cover",
    imagePosition: "center",
    mobileImagePosition: "center",
  },
  {
    id: "colecao-frio",
    eyebrow: "Lançamentos de frio",
    title: "Tricô com presença.",
    description:
      "Suéteres e polos de tricô com textura real, caimento limpo e visual premium.",
    href: "/colecao?categoria=frio#catalogo",
    cta: "Ver lançamentos",
    image: brandAssets.brands2.frioHeroDesktop,
    mobileImage: brandAssets.brands2.frioHeroMobile,
    palette: "black",
    imagePosition: "center",
    mobileImagePosition: "center top",
  },
  {
    id: "drop-oversized",
    eyebrow: "Drop Oversized",
    title: "Peso visual.",
    description:
      "Modelagem ampla, tecido encorpado e visual urbano para quem não veste qualquer coisa.",
    href: "/colecao?categoria=oversized#catalogo",
    cta: "Explorar oversized",
    image: brandAssets.brands2.oversizedHeroDesktop,
    mobileImage: brandAssets.brands2.oversizedHeroMobile,
    palette: "black",
    imagePosition: "center",
    mobileImagePosition: "center",
  },
  {
    id: "manifesto-gm",
    eyebrow: "Manifesto GM",
    title: "Streetwear com identidade.",
    description:
      "Propósito, presença e cultura urbana em peças pensadas para posicionamento.",
    href: "/#manifesto",
    cta: "Conhecer a marca",
    image: brandAssets.brands2.brandAtmosphere,
    mobileImage: brandAssets.brands2.oversizedManifesto,
    palette: "gold",
    imagePosition: "center",
    mobileImagePosition: "center",
  },
];
