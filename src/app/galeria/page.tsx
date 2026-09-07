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
      <section className="relative overflow-hidden bg-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(166,93,59,0.28), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(255,255,255,0.06), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-7xl items-end px-4 pb-12 pt-28 md:px-8 md:pt-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">
              {isContemporary ? "Apriore" : "Modalidades"}
            </p>
            <h1
              className="mt-3 text-4xl tracking-tight md:text-6xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {isContemporary ? "Obras contemporâneas" : "Galeria"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {isContemporary
                ? "Seleção que abre o diálogo com o público — as peças contemporâneas do atelier."
                : "Explore as modalidades pelas quais Emicles Nogueira Nobre se identifica. Toque nas obras para ampliar."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <Link
                href="/galeria"
                className={!isContemporary ? "btn-solid-dark" : "btn-outline-light"}
              >
                Todas as modalidades
              </Link>
              <Link
                href="/galeria?destaque=contemporaneas"
                className={isContemporary ? "btn-solid-dark" : "btn-outline-light"}
              >
                Seleção contemporânea
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <GalleryGrid
          key={`${isContemporary ? "contemp" : "all"}-${initial}`}
          artworks={list}
          initialCategory={initial}
        />
      </div>
    </>
  );
}

export default function GaleriaPage() {
  return (
    <div className="pb-16 md:pb-24">
      <Suspense fallback={<p className="px-4 pt-28 text-[#5c574f]">Carregando galeria…</p>}>
        <GaleriaContent />
      </Suspense>
    </div>
  );
}
