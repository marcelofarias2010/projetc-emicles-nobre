/**
 * Mídia do carrossel da home — public/modalidades/carrousel.
 */

export type HeroSlide = {
  /** Imagem desktop (2560×1440). */
  src: string;
  /** Imagem otimizada para celular (1280×720). */
  srcMobile: string;
  alt: string;
  label: string;
};

/** Sufixo para forçar atualização de cache ao trocar as fotos do hero. */
const HERO_CACHE = "v8";

/**
 * Slides do carrossel full-bleed (s0…s14).
 */
const CAROUSEL_SLIDE_NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
] as const;

export const heroCarousel: HeroSlide[] = CAROUSEL_SLIDE_NUMBERS.map((n) => ({
  src: `/modalidades/carrousel/s${n}.jpg?${HERO_CACHE}`,
  srcMobile: `/modalidades/carrousel/mobile/s${n}.jpg?${HERO_CACHE}`,
  alt: `Obra de Emicles Nogueira Nobre — slide ${n}`,
  label: String(n).padStart(2, "0"),
}));

/** Reexport das capas para o showcase (fonte: modality-covers.json). */
export { modalityCovers } from "./artworks";
