import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-black/38 sm:px-6 lg:px-10"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link
                className="transition-colors hover:text-black"
                href={item.href}
                prefetch={false}
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-black/55" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast ? <span className="text-black/20">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
