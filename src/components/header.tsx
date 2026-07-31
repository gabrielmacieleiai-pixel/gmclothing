"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { flushSync } from "react-dom";
import { CartButton } from "@/components/cart-button";
import { MenuIcon, SearchIcon, XIcon } from "@/components/icons";
import { getProductHref, getProductPricing, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

const links = [
  { href: "/colecao/frio", label: "Inverno" },
  { href: "/colecao", label: "Coleção" },
  { href: "/colecao/oversized", label: "Oversized" },
  { href: "/colecao?categoria=ultimas-pecas", label: "Últimas peças" },
  { href: "/acessorios", label: "Acessórios" },
  { href: "/#manifesto", label: "Manifesto" },
];

const salesLinks = [
  {
    href: "/colecao/frio",
    eyebrow: "Coleção Inverno",
    label: "Suéteres premium para os dias frios",
  },
  {
    href: "/colecoes/chenille-zara",
    eyebrow: "Chenille Zara",
    label: "Textura macia em cores selecionadas",
  },
  {
    href: "/colecao/oversized",
    eyebrow: "Oversized",
    label: "Modelagens amplas por R$ 99,90",
  },
  {
    href: "/colecao?categoria=promocao",
    eyebrow: "Promoções",
    label: "Peças selecionadas com condição especial",
  },
  {
    href: "/colecao?categoria=mais-vendidos",
    eyebrow: "Mais vendidos",
    label: "Os produtos mais procurados da GM",
  },
  {
    href: "/colecao?categoria=lancamentos",
    eyebrow: "Novidades",
    label: "Drops recentes e últimas unidades",
  },
];

const trustMessages = [
  "🚚 Frete grátis acima de R$ 299,90",
  "🔥 Oversized Premium por R$ 99,90",
  "❄️ Coleção Inverno disponível",
  "🎁 Dia dos Pais • O presente perfeito",
  "📦 Envio rápido para todo o Brasil",
];

function BrandMark() {
  return (
    <Link
      aria-label="GM Clothing - Início"
      className="group flex items-center gap-2.5 text-[#050505]"
      href="/"
      prefetch={false}
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
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[80] bg-[#f5f1e8] shadow-[0_8px_24px_rgba(5,5,5,0.08)]">
      <Link
        aria-label="GM Clothing - voltar para o início"
        className="block bg-[#050505] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.22em]"
        href="/"
        prefetch={false}
      >
        <span className="sm:hidden">GM Clothing / For men</span>
        <span className="hidden sm:inline">
          Nova coleção inverno / Suéteres premium / Atendimento via WhatsApp
        </span>
      </Link>
      <header className="relative z-50 border-b border-black/10 bg-[#f5f1e8]">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
          <MobileMenu key={pathname} />

          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:min-w-[180px] lg:translate-x-0">
            <BrandMark />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                className="text-xs font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-50"
                href={link.href}
                key={link.href}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-10 items-center justify-end gap-2 lg:min-w-[180px]">
            <SearchButton />
            <CartButton />
          </div>
        </div>
      </header>
      <TrustMarquee />
    </div>
  );
}

function TrustMarquee() {
  const repeatedMessages = [...trustMessages, ...trustMessages];

  return (
    <div
      aria-label="Benefícios da GM Clothing"
      className="overflow-hidden border-b border-white/10 bg-[#050505] text-white"
    >
      <div className="gm-trust-marquee flex w-max items-center py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] sm:py-3 sm:text-xs sm:tracking-[0.22em]">
        {repeatedMessages.map((message, index) => (
          <span className="flex items-center whitespace-nowrap" key={`${message}-${index}`}>
            <span className="px-5 text-white sm:px-8">{message}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearch(query);
  const results = normalizedQuery
    ? products
        .filter((product) => {
          const searchable = normalizeSearch(
            [
              product.name,
              product.shortName,
              product.category,
              product.collection,
              product.subcollection,
              ...(product.tags ?? []),
            ].join(" "),
          );
          return searchable.includes(normalizedQuery);
        })
        .slice(0, 6)
    : products.slice(0, 4);

  function closeSearch() {
    setIsSearchOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        aria-expanded={isSearchOpen}
        aria-label="Buscar produtos"
        className="hidden size-12 items-center justify-center border border-black/15 text-[#050505] transition-colors hover:bg-black hover:text-white sm:flex"
        onClick={() => setIsSearchOpen(true)}
        type="button"
      >
        <SearchIcon className="size-4" />
      </button>
      <button
        aria-expanded={isSearchOpen}
        aria-label="Buscar produtos"
        className="flex size-10 items-center justify-center border border-black/15 text-[#050505] transition-colors active:bg-white/70 sm:hidden"
        onClick={() => setIsSearchOpen(true)}
        type="button"
      >
        <SearchIcon className="size-4" />
      </button>

      {isSearchOpen ? (
        <div className="fixed inset-0 z-[120] bg-[#050505]/35 px-4 py-5 backdrop-blur-sm sm:px-6">
          <button
            aria-label="Fechar busca"
            className="absolute inset-0 cursor-default"
            onClick={closeSearch}
            type="button"
          />
          <div className="relative mx-auto max-w-2xl border border-black/10 bg-[#f5f1e8] p-4 shadow-2xl sm:p-6">
            <div className="flex items-center gap-3 border-b border-black/10 pb-3">
              <SearchIcon className="size-4 shrink-0" />
              <input
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sm font-bold uppercase tracking-[0.12em] outline-none placeholder:text-black/35"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar produto"
                type="search"
                value={query}
              />
              <button
                aria-label="Fechar busca"
                className="flex size-9 items-center justify-center border border-black/10 transition-colors hover:bg-black hover:text-white"
                onClick={closeSearch}
                type="button"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {results.length ? (
                results.map((product) => {
                  const pricing = getProductPricing(product, product.defaultColorId);

                  return (
                    <Link
                      className="group flex items-center justify-between gap-4 border border-black/10 bg-white/35 px-3 py-3 transition-colors hover:bg-white"
                      href={getProductHref(product)}
                      key={product.slug}
                      onClick={closeSearch}
                      prefetch={false}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-black uppercase tracking-[0.08em]">
                          {product.shortName}
                        </span>
                        <span className="mt-1 block truncate text-[10px] uppercase tracking-[0.14em] text-black/45">
                          {product.category}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-black">
                        {formatPrice(pricing.currentPrice)}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <p className="py-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    flushSync(() => {
      setIsMenuOpen(false);
    });
  }

  function closeMenuAfterNavigation() {
    window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
  }

  return (
    <div className="relative lg:hidden">
      <button
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        className="flex size-10 items-center justify-center border border-black/15"
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        <span className="sr-only">Abrir menu</span>
        <MenuIcon />
      </button>
      {isMenuOpen ? (
        <>
          <button
            aria-label="Fechar menu"
            className="fixed inset-0 top-[130px] z-40 bg-black/10 sm:top-[138px] lg:top-[152px]"
            onClick={closeMenu}
            type="button"
          />
          <nav className="absolute -left-4 top-[52px] z-50 w-screen border-b border-black/10 bg-[#f5f1e8] p-4 shadow-xl">
            <div className="mb-4 border border-black/10 bg-white/35 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                Comprar por interesse
              </p>
              <p className="mt-2 text-lg font-black uppercase tracking-[-0.04em]">
                Encontre sua peça em poucos toques.
              </p>
            </div>

            <div className="grid gap-2">
              {salesLinks.map((link) => (
                <Link
                  className="group flex items-center justify-between gap-4 border border-black/10 bg-[#f5f1e8] px-4 py-3 transition-colors hover:bg-white active:bg-white"
                  href={link.href}
                  key={link.href}
                  onClick={closeMenuAfterNavigation}
                  prefetch={false}
                >
                  <span>
                    <span className="block text-[13px] font-black uppercase tracking-[0.16em]">
                      {link.eyebrow}
                    </span>
                    <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-black/45">
                      {link.label}
                    </span>
                  </span>
                  <span className="text-base transition-transform group-hover:translate-x-1 group-active:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-5 border-t border-black/10 pt-2">
              {links.map((link) => (
                <Link
                  className="block border-b border-black/10 py-3 text-xs font-bold uppercase tracking-[0.18em] active:bg-white/70"
                  href={link.href}
                  key={link.href}
                  onClick={closeMenuAfterNavigation}
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
