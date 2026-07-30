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
      className={`mb-10 flex items-end justify-between gap-4 border-b pb-5 sm:mb-8 sm:gap-6 ${
        inverse ? "border-white/20" : "border-black/15"
      }`}
    >
      <div>
        <p
          className={`mb-3 text-[9px] font-bold uppercase tracking-[0.22em] sm:mb-2 sm:text-[10px] sm:tracking-[0.24em] ${
            inverse ? "text-white/45" : "text-black/45"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="max-w-[16ch] text-[2rem] font-black uppercase leading-[0.95] tracking-display sm:max-w-none sm:text-5xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          className="flex shrink-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
          href={href}
          prefetch={false}
        >
          {action} <ArrowUpRight />
        </Link>
      ) : null}
    </div>
  );
}
