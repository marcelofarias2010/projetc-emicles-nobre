"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { Artwork } from "@/data/artworks";
import { getCategoryLabel } from "@/data/categories";

type Props = {
  items: Artwork[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/**
 * Lightbox com navegação por teclado e swipe visual para explorar obras.
 */
export function ArtworkLightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null;
  const artwork = index !== null ? items[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      const next = (index + delta + items.length) % items.length;
      onChange(next);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && artwork && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/92 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p
                className="truncate text-lg"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {artwork.title}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                {getCategoryLabel(artwork.category)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/25 px-3 py-1.5 text-sm"
            >
              Fechar
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 md:px-10">
            <button
              type="button"
              aria-label="Obra anterior"
              onClick={() => go(-1)}
              className="absolute left-2 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 md:flex"
            >
              ‹
            </button>

            <motion.div
              key={artwork.id}
              className="relative h-full max-h-[78vh] w-full max-w-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                if (info.offset.x > 80) go(-1);
              }}
            >
              <Image
                src={encodeURI(artwork.src)}
                alt={artwork.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </motion.div>

            <button
              type="button"
              aria-label="Próxima obra"
              onClick={() => go(1)}
              className="absolute right-2 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 md:flex"
            >
              ›
            </button>
          </div>

          <p className="px-4 pb-5 text-center text-sm text-white/60 md:px-8">
            {artwork.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
