/**
 * Modalidades artísticas alinhadas ao roteiro e aos nomes em public/img/.
 */
export type CategoryId =
  | "pinturas"
  | "gravuras"
  | "esculturas"
  | "esculturas-sucata"
  | "esculturas-argila"
  | "esculturas-concreto"
  | "zodiaco";

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "pinturas",
    label: "Pinturas",
    description:
      "Telas e composições em pintura — a linguagem mais consolidada do artista.",
  },
  {
    id: "gravuras",
    label: "Gravuras",
    description:
      "Gravuras e desenhos de traço denso, com formas orgânicas e simbólicas.",
  },
  {
    id: "esculturas",
    label: "Esculturas em bronze",
    description:
      "Esculturas figurativas e formas em volume, com ênfase no bronze.",
  },
  {
    id: "esculturas-sucata",
    label: "Esculturas em sucata",
    description:
      "Montagens e esculturas em metal reciclado e sucata.",
  },
  {
    id: "esculturas-argila",
    label: "Argila e cerâmica",
    description:
      "Esculturas, jarros e relevos em argila e cerâmica.",
  },
  {
    id: "esculturas-concreto",
    label: "Esculturas em concreto",
    description:
      "Formas e volumes trabalhados em concreto.",
  },
  {
    id: "zodiaco",
    label: "Zodíaco",
    description:
      "Série de relevos em metal com os signos e a arquitetura de Brasília.",
  },
];

/**
 * Retorna o rótulo de uma categoria a partir do id.
 */
export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
