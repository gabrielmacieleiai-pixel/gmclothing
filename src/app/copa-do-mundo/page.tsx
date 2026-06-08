import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CopaCollectionBrowser } from "@/components/copa-collection-browser";
import { ArrowUpRight } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { brandAssets } from "@/data/brand-assets";
import { copaProducts, getProductHref } from "@/data/products";

export const metadata: Metadata = {
  title: "Drop Copa 2026",
  description:
    "Linha Copa 2026 da GM Clothing com camisetas de futebol e streetwear premium.",
  alternates: {
    canonical: "/copa-do-mundo",
  },
  openGraph: {
    title: "Drop Copa 2026 | GM Clothing",
    description:
      "Vista o momento. Futebol streetwear para a temporada de Copa.",
    images: [brandAssets.brands2.copaHeroDesktop],
  },
};

export default function CopaDoMundoPage() {
  const mainProduct =
    copaProducts.find((product) => product.subcollection === "Brasil") ??
    copaProducts[0];

  return (
    <>
      <div className="bg-[#f5f1e8]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Drop Copa 2026" },
          ]}
        />
      </div>

      <section className="relative overflow-hidden bg-[#050505] px-4 py-12 text-white sm:px-6 lg:px-10 lg:py-20">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -right-32 top-[-12%] size-[28rem] rounded-full bg-[#72c7ef]/20 blur-[110px]" />
          <div className="absolute bottom-[-20%] left-[-24%] size-[30rem] rounded-full bg-[#00865d]/20 blur-[130px]" />
        </div>
        <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#72c7ef]">
              Linha principal do momento
            </p>
            <h1 className="text-[18vw] font-black uppercase leading-[0.76] tracking-display sm:text-8xl lg:text-[10rem]">
              Drop Copa 2026
            </h1>
            <div className="mt-8 border-t border-white/15 pt-5">
              <p className="max-w-md text-sm leading-6 text-white/60">
                Futebol e streetwear em uma campanha feita para girar rápido,
                com Brasil como foco e apenas produtos coerentes com a Copa.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="flex h-12 items-center justify-center gap-3 bg-white px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050505]"
                  href="#produtos-copa"
                >
                  Ver coleção <ArrowUpRight />
                </Link>
                {mainProduct ? (
                  <Link
                    className="flex h-12 items-center justify-center gap-3 border border-white/20 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                    href={getProductHref(mainProduct)}
                  >
                    Comprar destaque
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] lg:min-h-[560px]">
            <Image
              alt="Campanha Drop Copa 2026 com Brasil em destaque"
              className="object-cover lg:hidden"
              fill
              priority
              sizes="100vw"
              src={brandAssets.brands2.copaHeroMobile}
            />
            <Image
              alt="Campanha Drop Copa 2026 com Brasil em destaque"
              className="hidden object-cover lg:block"
              fill
              priority
              sizes="52vw"
              src={brandAssets.brands2.copaHeroDesktop}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#72c7ef]">
                Brasil em destaque
              </p>
              <p className="max-w-md text-sm leading-6 text-white/65">
                Visual de campanha, produto real e foco de compra rápido para a
                temporada da Copa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#72c7ef] px-4 py-5 text-[#050505] sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-4 text-[10px] font-bold uppercase tracking-[0.18em] sm:grid-cols-3">
          <span>Brasil em destaque</span>
          <span>Produtos reais da campanha</span>
          <span>Checkout externo preparado</span>
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-4 text-white sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden border border-white/10 bg-white/5">
            <Image
              alt="Banner Brasil em campo GM Clothing"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={brandAssets.brands2.copaBrasilDesktop}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                Campanha Brasil
              </p>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border border-white/10 bg-white/5">
            <Image
              alt="Detalhes da camiseta Brasil Copa 2026"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={brandAssets.brands2.copaDetails}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                Detalhes que elevam
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#050505] px-4 py-14 text-white sm:px-6 lg:px-10 lg:py-20"
        id="produtos-copa"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#72c7ef]">
                Produtos da campanha
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-display sm:text-6xl">
                Vista o momento.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/55 lg:ml-auto">
              A linha exibe somente produtos ligados a futebol, seleção e Copa.
              Brasil guia a campanha; Argentina entra como produto, sem virar o
              foco principal da navegação.
            </p>
          </div>

          <CopaCollectionBrowser products={copaProducts} />
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 border-b border-black/15 pb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black/45">
              Pronta entrega
            </p>
            <h2 className="text-3xl font-black uppercase tracking-display sm:text-5xl">
              Produtos com maior giro
            </h2>
          </div>
          <ProductGrid products={copaProducts} />
        </div>
      </section>
    </>
  );
}
