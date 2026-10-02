import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { negocio } from "@/data/negocio";

const corpo = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-corpo", display: "swap" });
const titulo = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--f-titulo", display: "swap" });

const descricao =
  "Pizzas, esfihas e hambúrgueres ao estilo de São Paulo, em Ferreiros, Braga. Mais de 20 anos de experiência. Peça por WhatsApp (912 447 755), ligue ou venha ter connosco.";

export const metadata: Metadata = {
  metadataBase: new URL(negocio.dominio),
  title: "iFome Pizzaria | Pizzas e esfihas brasileiras em Braga",
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    title: "iFome Pizzaria — Melhor Pizzaria e Esfiharia Brasileira",
    description: descricao,
    url: negocio.dominio,
    siteName: negocio.nome,
    locale: "pt_PT",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "iFome Pizzaria" }],
  },
  twitter: { card: "summary_large_image", title: "iFome Pizzaria", description: descricao, images: ["/og.jpg"] },
  icons: { icon: "/logo-round.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#121212", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${corpo.variable} ${titulo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
