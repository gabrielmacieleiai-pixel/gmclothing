import { ProductCard } from "@/components/product-card";
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
  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
      {products.map((product, index) => (
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
