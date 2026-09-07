/**
 * Modalidades oficiais — pastas em public/modalidades/.
 * (carrousel/, abertura/ e mosaico/ são apoio visual, não filtros da galeria.)
 */
export type CategoryId =
  | "bronze-e-cobre"
  | "concreto"
  | "desenho-e-pintura"
  | "escultura"
  | "sucata";

export type Category = {
  id: CategoryId;
  label: string;
  /** Nome da pasta em public/modalidades/ */
  folder: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "bronze-e-cobre",
    folder: "Bronze_e_Cobre",
    label: "Bronze e Cobre",
    description: "Esculturas, relevos e a série zodiacal em bronze e cobre.",
  },
  {
    id: "concreto",
    folder: "Concreto",
    label: "Concreto",
    description: "Formas e relevos trabalhados em concreto.",
  },
  {
    id: "desenho-e-pintura",
    folder: "Desenho_e_Pintura",
    label: "Desenho e Pintura",
    description: "Desenhos, grafites, telas e composições em pintura.",
  },
  {
    id: "escultura",
    folder: "Escultura",
    label: "Escultura",
    description: "Esculturas e formas em volume, incluindo argila.",
  },
  {
    id: "sucata",
    folder: "Sucata",
    label: "Sucata",
    description: "Esculturas e montagens em metal reciclado.",
  },
];

/**
 * Retorna o rótulo de uma categoria a partir do id.
 */
export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
