import type { CategoryId } from "./categories";
import generated from "./artworks.generated.json";
import { categoryOverridesByObraNumber } from "./categoryOverrides";

export type Artwork = {
  id: string;
  title: string;
  category: CategoryId;
  src: string;
  year: number | null;
  description: string;
};

const PLACEHOLDER = "Obra de Emicles Nogueira Nobre.";

/**
 * Extrai o número da obra a partir do título "Obra N".
 */
function getObraNumber(title: string): number | null {
  const match = /^Obra (\d+)$/.exec(title);
  return match ? Number(match[1]) : null;
}

/**
 * Catálogo de obras gerado a partir da pasta public/img, com curadoria manual.
 */
export const artworks: Artwork[] = (generated as Omit<Artwork, "description">[]).map(
  (item) => {
    const obraNumber = getObraNumber(item.title);
    const override =
      obraNumber !== null ? categoryOverridesByObraNumber[obraNumber] : undefined;

    return {
      ...item,
      category: (override ?? item.category) as CategoryId,
      description: PLACEHOLDER,
    };
  },
);

/**
 * Filtra obras por categoria.
 */
export function getArtworksByCategory(category: CategoryId | "all"): Artwork[] {
  if (category === "all") return artworks;
  return artworks.filter((a) => a.category === category);
}

/**
 * Busca uma obra pelo id.
 */
export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

/** Imagens de destaque para a home e trajetória */
export const featured = {
  hero: "/img/sertao.jpg",
  artist: "/img/artista.jpg",
  painting: "/img/cores1.jpg",
  clay: "/img/argila.jpg",
  scrap: "/img/sucata1.jpg",
  graphite: "/img/grafite.jpg",
  zodiac: "/img/aries.jpg",
  pop: "/img/artPop.jpg",
};
