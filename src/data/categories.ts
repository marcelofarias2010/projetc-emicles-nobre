/**
 * Modalidades oficiais — pastas em public/modalidades/.
 * (carrousel/ e abertura/ são apoio visual, não filtros da galeria.)
 */
export type CategoryId =
  | "pintura"
  | "desenho"
  | "bronze"
  | "escultura"
  | "concreto"
  | "cobre"
  | "sucata"
  | "signos";

export type Category = {
  id: CategoryId;
  label: string;
  /** Nome da pasta em public/modalidades/ */
  folder: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "pintura",
    folder: "Pintura",
    label: "Pintura",
    description: "Telas e composições em pintura.",
  },
  {
    id: "desenho",
    folder: "Desenho",
    label: "Desenho",
    description: "Desenhos, grafites e traços de estudo e expressão.",
  },
  {
    id: "bronze",
    folder: "Bronze",
    label: "Bronze",
    description: "Esculturas e volumes em bronze.",
  },
  {
    id: "escultura",
    folder: "Escultura",
    label: "Escultura",
    description: "Esculturas e formas em volume, incluindo argila.",
  },
  {
    id: "concreto",
    folder: "Concreto",
    label: "Concreto",
    description: "Formas e relevos trabalhados em concreto.",
  },
  {
    id: "cobre",
    folder: "Cobre",
    label: "Cobre",
    description: "Relevos e peças em cobre.",
  },
  {
    id: "sucata",
    folder: "Sucata",
    label: "Sucata",
    description: "Esculturas e montagens em metal reciclado.",
  },
  {
    id: "signos",
    folder: "Signos",
    label: "Signos",
    description: "Série dos signos e releituras simbólicas.",
  },
];

/**
 * Retorna o rótulo de uma categoria a partir do id.
 */
export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
