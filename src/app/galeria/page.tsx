"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { artworks, getContemporaryArtworks } from "@/data/artworks";
import { categories, type CategoryId } from "@/data/categories";

/**
 * Conteúdo da galeria com abas e filtros por modalidade.
 */
function GaleriaContent() {
  const searchParams = useSearchParams();
  const destaque = searchParams.get("destaque");
  const raw = searchParams.get("categoria");
  const initial =
    raw && categories.some((c) => c.id === raw) ? (raw as CategoryId) : "all";
  const isContemporary = destaque === "contemporaneas";
  const list = isContemporary ? getContemporaryArtworks(60) : artworks;

  return (
    <>
      <header className="mb-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#a65d3b]">
          {isContemporary ? "Apriore" : "Modalidades"}
        </p>
        <h1
          className="mt-3 text-4xl tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {isContemporary ? "Obras contemporâneas" : "Galeria"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5c574f] md:text-lg">
          {isContemporary
            ? "Seleção que abre o diálogo com o público — as peças contemporâneas do atelier."
            : "Explore as modalidades pelas quais Emicles Nogueira Nobre se identifica. Toque nas obras para ampliar."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <Link
            href="/galeria"
            className={!isContemporary ? "btn-solid-dark" : "btn-ghost"}
          >
            Todas as modalidades
          </Link>
          <Link
            href="/galeria?destaque=contemporaneas"
            className={isContemporary ? "btn-solid-dark" : "btn-ghost"}
          >
            Seleção contemporânea
          </Link>
        </div>
      </header>

      <GalleryGrid
        key={`${isContemporary ? "contemp" : "all"}-${initial}`}
        artworks={list}
        initialCategory={initial}
      />
    </>
  );
}

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
      <Suspense fallback={<p className="text-[#5c574f]">Carregando galeria…</p>}>
        <GaleriaContent />
      </Suspense>
    </div>
  );
}
