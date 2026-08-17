"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { artworks } from "@/data/artworks";
import { categories, type CategoryId } from "@/data/categories";

/**
 * Conteúdo da galeria com leitura do parâmetro de categoria na URL.
 */
function GaleriaContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("categoria");
  const initial =
    raw && categories.some((c) => c.id === raw) ? (raw as CategoryId) : "all";

  return <GalleryGrid artworks={artworks} initialCategory={initial} />;
}

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <header className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-copper">Acervo</p>
        <h1
          className="mt-3 text-4xl tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Galeria
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
          Pintura, desenho e outras linguagens de Emicles Nogueira Nobre.
          Filtre por categoria e toque nas obras para ampliar.
        </p>
      </header>

      <Suspense fallback={<p className="text-ink-muted">Carregando galeria…</p>}>
        <GaleriaContent />
      </Suspense>
    </div>
  );
}
