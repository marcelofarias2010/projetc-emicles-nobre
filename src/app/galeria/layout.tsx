import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria por modalidades: pintura, desenho, bronze, escultura, concreto, cobre, sucata e signos de Emicles Nogueira Nobre.",
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
