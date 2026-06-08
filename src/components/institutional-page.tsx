import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowUpRight } from "@/components/icons";
import type { InstitutionalPageContent } from "@/data/institutional-pages";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type InstitutionalPageProps = {
  page: InstitutionalPageContent;
};

export function InstitutionalPage({ page }: InstitutionalPageProps) {
  const whatsappUrl = createWhatsAppUrl(
    `Olá, GM Clothing! Tenho uma dúvida sobre ${page.title}.`,
  );

  return (
    <>
      <div className="bg-[#f5f1e8]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Atendimento" },
            { label: page.title },
          ]}
        />
      </div>

      <main className="bg-[#f5f1e8] px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1040px]">
          <section className="border-b border-black/15 pb-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-black/42">
              {page.eyebrow}
            </p>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.86] tracking-display text-[#050505] sm:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-6 text-black/58">
              {page.description}
            </p>
          </section>

          <section className="divide-y divide-black/10">
            {page.sections.map((section) => (
              <article className="grid gap-4 py-8 md:grid-cols-[0.35fr_0.65fr]" key={section.title}>
                <h2 className="text-sm font-black uppercase tracking-[0.08em] text-[#050505]">
                  {section.title}
                </h2>
                <p className="text-sm leading-7 text-black/58">
                  {section.body}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 bg-[#050505] p-5 text-white sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
              Ainda precisa de ajuda?
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-6 text-white/58">
                Fale com a GM Clothing pelo WhatsApp para atendimento direto.
              </p>
              <Link
                className="flex h-12 items-center justify-center gap-3 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505]"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp <ArrowUpRight />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
