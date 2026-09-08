import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { biography } from "@/data/biography";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Emicles Nogueira Nobre — Artes",
    template: "%s | Emicles Nogueira Nobre",
  },
  description: biography.siteDescription,
  icons: {
    icon: [
      { url: "/modalidades/abertura/nobre_abertura.png", type: "image/png" },
    ],
    apple: [{ url: "/modalidades/abertura/nobre_abertura.png", type: "image/png" }],
  },
  openGraph: {
    title: "Emicles Nogueira Nobre — Artes",
    description: biography.siteDescription,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
