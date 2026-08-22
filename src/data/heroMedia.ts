import type { CategoryId } from "./categories";
import { categories, getCategoryLabel } from "./categories";

export type HeroSlide = {
  src: string;
  alt: string;
  label: string;
  category: CategoryId;
};

/** Sufixo para forçar atualização de cache ao trocar as fotos do hero. */
const HERO_CACHE = "v4";

/**
 * Carrossel do hero: uma prévia por modalidade (arquivos em public/media).
 */
export const heroCarousel: HeroSlide[] = categories.map((category) => ({
  src: `/media/hero-${category.id}.jpg?${HERO_CACHE}`,
  alt: `${category.label} — Emicles Nogueira Nobre`,
  label: getCategoryLabel(category.id),
  category: category.id,
}));

/** Capas das modalidades na home (obras reais em public/img). */
export const modalityCovers: Record<CategoryId, string> = {
  pinturas: "/img/pintura63.jpg",
  gravuras: "/img/grafit9.jpg",
  esculturas: "/img/escultura_bronze20.jpg",
  "esculturas-sucata": "/img/escultura_sucata15.jpg",
  "esculturas-argila": "/img/quadro_argila13.jpg",
  "esculturas-concreto": "/img/escultura_concreto9.jpg",
  zodiaco: "/img/zodiaco3.jpg",
};
