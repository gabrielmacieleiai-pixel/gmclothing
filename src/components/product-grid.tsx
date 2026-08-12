import { ProductCard } from "@/components/product-card";
import { sortProductsByAvailability } from "@/data/products";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  inverse?: boolean;
  priorityCount?: number;
};

export function ProductGrid({
  products,
  inverse = false,
  priorityCount = 0,
}: ProductGridProps) {
  const orderedProducts = sortProductsByAvailability(products);

  return (
    <div className="-mx-4 flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-3 scroll-px-[8vw] [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10 [&::-webkit-scrollbar]:hidden">
      {orderedProducts.map((product, index) => (
        <ProductCard
          inverse={inverse}
          product={product}
          priority={index < priorityCount}
          key={product.slug}
        />
      ))}
    </div>
  );
}

