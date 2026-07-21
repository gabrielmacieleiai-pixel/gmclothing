import Link from "next/link";
import { CartButton } from "@/components/cart-button";
import { MenuIcon } from "@/components/icons";

const links = [
  { href: "/colecao/frio", label: "Inverno" },
  { href: "/colecao", label: "Coleção" },
  { href: "/colecao/oversized", label: "Oversized" },
  { href: "/copa-do-mundo", label: "Últimas peças" },
  { href: "/acessorios", label: "Acessórios" },
  { href: "/#manifesto", label: "Manifesto" },
];

function BrandMark() {
  return (
    <Link
      aria-label="GM Clothing - Início"
      className="group flex items-center gap-2.5 text-[#050505]"
      href="/"
    >
      <span className="font-serif text-[2rem] font-black leading-none tracking-[-0.12em] sm:text-[2.35rem]">
        GM
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-black tracking-[-0.04em] sm:text-base">
          Clothing
        </span>
        <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.28em] text-black/45">
          For Men
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <div className="bg-[#050505] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 sm:px-4 sm:text-xs sm:tracking-[0.22em]">
        <span className="sm:hidden">GM Clothing / For men</span>
        <span className="hidden sm:inline">
          Nova coleção inverno / Suéteres premium / Atendimento via WhatsApp
        </span>
      </div>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f5f1e8]/92 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
          <details className="group relative lg:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center border border-black/15">
              <span className="sr-only">Abrir menu</span>
              <MenuIcon />
            </summary>
            <nav className="absolute -left-4 top-[52px] flex w-screen flex-col border-b border-black/10 bg-[#f5f1e8] p-6 shadow-xl">
              {links.map((link) => (
                <Link
                  className="border-b border-black/10 py-4 text-sm font-bold uppercase tracking-[0.18em]"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>

          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:min-w-[180px] lg:translate-x-0">
            <BrandMark />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                className="text-xs font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-50"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-10 justify-end lg:min-w-[180px]">
            <CartButton />
          </div>
        </div>
      </header>
    </>
  );
}
