import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria por modalidades: pinturas, gravuras, esculturas, sucata e Zodíaco de Emicles Nogueira Nobre.",
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
