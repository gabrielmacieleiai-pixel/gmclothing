import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { CartToast } from "@/components/cart-toast";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmclo.shop";
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "G-PBQZJHKBQF";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "GM Clothing",
  title: {
    default: "GM Clothing | Streetwear com identidade",
    template: "%s | GM Clothing",
  },
  description:
    "Streetwear masculino premium criado em Balneário Camboriú. Vista propósito.",
  keywords: [
    "GM Clothing",
    "streetwear masculino",
    "camiseta oversized",
    "Balneário Camboriú",
    "moda masculina premium",
  ],
  openGraph: {
    title: "GM Clothing | Streetwear com identidade",
    description:
      "Streetwear masculino premium criado em Balneário Camboriú. Vista propósito.",
    siteName: "GM Clothing",
    locale: "pt_BR",
    type: "website",
    images: ["/products/hero-faith.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GM Clothing | Streetwear com identidade",
    description:
      "Streetwear masculino premium criado em Balneário Camboriú. Vista propósito.",
    images: ["/products/hero-faith.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappUrl = createWhatsAppUrl(
    "Olá, GM Clothing! Quero conhecer as peças disponíveis.",
  );

  return (
    <html lang="pt-BR">
      <head>
        {googleTagId ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleTagId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <WhatsAppButton href={whatsappUrl} floating />
        </CartProvider>
      </body>
    </html>
  );
}
