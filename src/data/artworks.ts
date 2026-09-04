import type { CategoryId } from "./categories";
import scans from "./gallery-from-modalidades.json";
import modalityCoverMap from "./modality-covers.json";

export type Artwork = {
  id: string;
  title: string;
  category: CategoryId;
  src: string;
  year: number | null;
  description: string;
};

const PLACEHOLDER =
  "Obra de Emicles Nogueira Nobre. Descrição completa será publicada em breve.";

type ScanItem = {
  id: string;
  title: string;
  category: string;
  src: string;
  year: number | null;
};

/**
 * Catálogo principal: somente arquivos em public/modalidades/.
 */
export const artworks: Artwork[] = (scans as ScanItem[]).map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category as CategoryId,
  src: item.src,
  year: item.year,
  description: PLACEHOLDER,
}));

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

/** Capas por modalidade (geradas a partir das pastas). */
export const modalityCovers = modalityCoverMap as Record<CategoryId, string>;

/** Destaques de apoio — somente public/modalidades/. */
export const featured = {
  artist: "/modalidades/abertura/artista3.jpg",
  artistAlt: "/modalidades/abertura/nobreComEstatua.JPG",
  banner: "/modalidades/abertura/banner.JPG",
  communication: "/modalidades/abertura/comunicacao.png",
};

const CONTEMPORARY_TARGET = 60;

/**
 * Seleciona até 60 obras, equilibrando as modalidades.
 */
export function getContemporaryArtworks(limit = CONTEMPORARY_TARGET): Artwork[] {
  const byCategory = new Map<CategoryId, Artwork[]>();
  for (const artwork of artworks) {
    const list = byCategory.get(artwork.category) ?? [];
    list.push(artwork);
    byCategory.set(artwork.category, list);
  }

  const buckets = [...byCategory.values()];
  const selected: Artwork[] = [];
  let index = 0;

  while (selected.length < limit) {
    let added = false;
    for (const bucket of buckets) {
      if (index < bucket.length && selected.length < limit) {
        selected.push(bucket[index]);
        added = true;
      }
    }
    if (!added) break;
    index += 1;
  }

  return selected;
}
