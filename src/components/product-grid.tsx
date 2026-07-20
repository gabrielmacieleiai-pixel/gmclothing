import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  inverse?: boolean;
};

export function ProductGrid({ products, inverse = false }: ProductGridProps) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product) => (
        <ProductCard
          inverse={inverse}
          product={product}
          priority={false}
          key={product.slug}
        />
      ))}
    </div>
  );
}
