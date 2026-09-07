import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria por modalidades: bronze e cobre, concreto, desenho e pintura, escultura e sucata de Emicles Nogueira Nobre.",
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
