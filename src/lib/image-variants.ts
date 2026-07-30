type ImageVariant = "card" | "detail" | "hero";

const PRODUCT_IMAGE_PREFIX = "/products/";

export function getImageVariantSrc(src: string, variant: ImageVariant) {
  if (!src.startsWith(PRODUCT_IMAGE_PREFIX) || src.endsWith(".svg")) {
    return src;
  }

  const fileName = src
    .slice(PRODUCT_IMAGE_PREFIX.length)
    .replace(/[\\/]+/g, "__")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/\.(jpe?g|png|webp)$/i, ".webp");

  return `${PRODUCT_IMAGE_PREFIX}_optimized/${variant}/${fileName}`;
}
