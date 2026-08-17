/**
 * Categorias de arte usadas na galeria e nos filtros.
 */
export type CategoryId =
  | "pintura"
  | "argila"
  | "escultura-sucata"
  | "grafite"
  | "zodiaco"
  | "nordeste"
  | "retratos"
  | "acervo";

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "pintura",
    label: "Pintura",
    description:
      "Técnicas variadas de pintura em tela — a linguagem mais consolidada do artista.",
  },
  {
    id: "argila",
    label: "Argila e cerâmica",
    description:
      "Formas modeladas em argila e cerâmica, parte da produção tridimensional do ateliê.",
  },
  {
    id: "escultura-sucata",
    label: "Escultura e sucata",
    description:
      "Esculturas e montagens em sucata e metal reciclado.",
  },
  {
    id: "grafite",
    label: "Grafite e pontilhismo",
    description:
      "Desenho a grafite, pontilhismo e cartum — o traço do desenhista em primeiro plano.",
  },
  {
    id: "zodiaco",
    label: "Zodíaco",
    description:
      "Série de relevos e painéis dos signos do zodíaco.",
  },
  {
    id: "nordeste",
    label: "Nordeste e cultura",
    description:
      "A identidade visual do Nordeste, das raízes em Crateús, transparece na cultura popular e no sertão.",
  },
  {
    id: "retratos",
    label: "Retratos e figuras",
    description:
      "Retratos, figuras humanas e séries de rostos.",
  },
  {
    id: "acervo",
    label: "Acervo fotográfico",
    description:
      "Registro fotográfico de obras e momentos da produção no Distrito Federal.",
  },
];

/**
 * Retorna o rótulo de uma categoria a partir do id.
 */
export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
