"use client";

import { useMemo, useState } from "react";
import type { Artwork } from "@/data/artworks";
import { categories, type CategoryId } from "@/data/categories";
import { ArtworkLightbox } from "./ArtworkLightbox";
import { CategoryFilter } from "./CategoryFilter";

type Props = {
  artworks: Artwork[];
  initialCategory?: CategoryId | "all";
  showFilters?: boolean;
  limit?: number;
};

/**
 * Grade de galeria com filtros por categoria e lightbox.
 */
export function GalleryGrid({
  artworks,
  initialCategory = "all",
  showFilters = true,
  limit,
}: Props) {
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const list =
      category === "all" ? artworks : artworks.filter((a) => a.category === category);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [artworks, category, limit]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: artworks.length };
    for (const c of categories) {
      map[c.id] = artworks.filter((a) => a.category === c.id).length;
    }
    return map;
  }, [artworks]);

  /**
   * Filtra a grade pela modalidade escolhida.
   */
  function handleCategoryChange(next: CategoryId | "all") {
    setCategory(next);
    setActiveIndex(null);
  }

  return (
    <div>
      {showFilters && (
        <CategoryFilter value={category} counts={counts} onChange={handleCategoryChange} />
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((artwork, index) => (
          <button
            key={artwork.id}
            type="button"
            className="group mb-4 block w-full break-inside-avoid text-left"
            onClick={() => setActiveIndex(index)}
          >
            <span className="relative block overflow-hidden bg-[#cfc8bc]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artwork.src}
                alt={artwork.title}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </span>
            <span className="mt-2 flex items-baseline justify-between gap-3">
              <span
                className="text-sm"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {artwork.title}
              </span>
              <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-[#5c574f]">
                {categories.find((c) => c.id === artwork.category)?.label}
              </span>
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[#5c574f]">Nenhuma obra nesta categoria.</p>
      )}

      <ArtworkLightbox
        items={filtered}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </div>
  );
}
