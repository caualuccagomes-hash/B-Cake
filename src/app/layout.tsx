import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import "./globals.css";
import { business } from "@/lib/content";
export const metadata: Metadata = {
  title: {
    default: "BêCake — Confeitaria Artesanal em Tianguá",
    template: "%s | BêCake",
  },
  description:
    "Bolos, doces e referências delicadas para celebrar. Conheça a BêCake, confeitaria artesanal em Tianguá desde 2020, e consulte sua encomenda.",
  robots: { index: !!process.env.SITE_URL, follow: !!process.env.SITE_URL },
  openGraph: {
    title: "BêCake — momentos feitos de doçura",
    description: "Confeitaria artesanal em Tianguá — CE.",
    locale: "pt_BR",
    type: "website",
    ...(process.env.SITE_URL
      ? {
          images: [
            {
              url: `${process.env.SITE_URL}/opengraph-image`,
              width: 1200,
              height: 630,
            },
          ],
        }
      : {}),
  },
  ...(process.env.SITE_URL
    ? { metadataBase: new URL(process.env.SITE_URL) }
    : {}),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: business.name,
    description: "Confeitaria artesanal em Tianguá, com atuação desde 2020.",
    telephone: business.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Luiz Pinto de Mesquita — Centro",
      addressLocality: "Tianguá",
      addressRegion: "CE",
      postalCode: "62320-000",
      addressCountry: "BR",
    },
    sameAs: [business.instagram],
  };
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
