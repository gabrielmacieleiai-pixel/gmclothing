import Link from "next/link";
import { footerHelpLinks } from "@/data/institutional-pages";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    "Olá, GM Clothing! Preciso de ajuda com uma compra.",
  );

  return (
    <footer className="bg-ink px-4 pb-8 pt-16 text-bone sm:px-6 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.55fr_0.85fr_1fr_1fr]">
          <div>
            <p className="max-w-xl text-4xl font-black uppercase leading-[0.88] tracking-display sm:text-6xl">
              Vista propósito.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
              Streetwear masculino criado em Balneário Camboriú. Peças
              limitadas, presença real.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
              Navegue
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/">Início</Link>
              <Link href="/colecao/frio">Inverno</Link>
              <Link href="/colecao">Coleção</Link>
              <Link href="/colecao?categoria=ultimas-pecas">Últimas peças</Link>
              <Link href="/acessorios">Acessórios</Link>
              <Link href="/carrinho">Carrinho</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
              Ajuda
            </p>
            <div className="flex flex-col gap-3 text-sm">
              {footerHelpLinks.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
              Atendimento
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <span>Seg a sex, 9h às 18h</span>
              <span>Balneário Camboriú, SC</span>
              <a href={whatsappUrl} rel="noreferrer" target="_blank">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:flex-row sm:justify-between">
          <span>2026 GM Clothing</span>
          <span>Streetwear com identidade</span>
        </div>
      </div>
    </footer>
  );
}
