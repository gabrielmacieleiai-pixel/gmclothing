import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  href?: string;
  action?: string;
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  href,
  action = "Ver tudo",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-8 flex items-end justify-between gap-6 border-b pb-5 ${
        inverse ? "border-white/20" : "border-black/15"
      }`}
    >
      <div>
        <p
          className={`mb-2 text-[10px] font-bold uppercase tracking-[0.24em] ${
            inverse ? "text-white/45" : "text-black/45"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="text-3xl font-black uppercase tracking-display sm:text-5xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] sm:flex"
          href={href}
        >
          {action} <ArrowUpRight />
        </Link>
      ) : null}
    </div>
  );
}
