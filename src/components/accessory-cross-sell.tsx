import { getActiveAccessoryProducts } from "@/data/accessories";
import { formatPrice } from "@/lib/format";

type AccessoryCrossSellProps = {
  compact?: boolean;
  title?: string;
  eyebrow?: string;
};

export function AccessoryCrossSell({
  compact = false,
  title = "Complete o look",
  eyebrow = "Acessórios",
}: AccessoryCrossSellProps) {
  const activeAccessories = getActiveAccessoryProducts();

  if (activeAccessories.length === 0) {
    return null;
  }

  return (
    <div>
      <div className={compact ? "mb-4" : "mb-6"}>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-none tracking-display sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
        {activeAccessories.map((accessory) => (
          <article
            className="border border-black/10 bg-white/55 p-4"
            key={accessory.id}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
              {accessory.subcategory}
            </p>
            <h3 className="mt-2 text-sm font-black uppercase">
              {accessory.shortName}
            </h3>
            <p className="mt-2 text-xs leading-5 text-black/50">
              {accessory.pitch}
            </p>
            <p className="mt-4 text-sm font-black">
              {formatPrice(accessory.price)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
