import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria de pintura, desenho e outras linguagens de Emicles Nogueira Nobre, artista de Crateús com obras no Brasil e no exterior.",
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
