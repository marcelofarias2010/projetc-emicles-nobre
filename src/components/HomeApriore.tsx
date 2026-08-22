"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featured, getContemporaryArtworks } from "@/data/artworks";
import { biography } from "@/data/biography";
import { GalleryGrid } from "./GalleryGrid";

/**
 * Bloco Apriore: foto do artista e seleção contemporânea de obras.
 */
export function HomeApriore() {
  const contemporary = getContemporaryArtworks(60);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid items-end gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <motion.div
          className="relative aspect-[3/4] overflow-hidden bg-line/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={encodeURI(featured.artist)}
            alt="Emicles Nogueira Nobre com suas obras"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            unoptimized
          />
        </motion.div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-copper">
            {biography.aprioreEyebrow}
          </p>
          <h2
            className="mt-3 text-4xl tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {biography.aprioreTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {biography.aprioreLead}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-ink">
            {contemporary.length} {biography.aprioreCountLabel}
          </p>
          <Link
            href="/obras"
            className="btn-outline-dark mt-8"
          >
            Abrir apresentação completa
          </Link>
        </div>
      </div>

      <div className="mt-14">
        <GalleryGrid artworks={contemporary} showFilters={false} limit={12} />
        <div className="mt-8 text-center">
          <Link
            href="/obras"
            className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Ver todas as {contemporary.length} obras contemporâneas
          </Link>
        </div>
      </div>
    </section>
  );
}
