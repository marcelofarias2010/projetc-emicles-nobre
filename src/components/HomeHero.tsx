"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featured } from "@/data/artworks";
import { biography } from "@/data/biography";

/**
 * Hero full-bleed com marca do artista, overlays de legibilidade e CTAs.
 */
export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-deep text-white">
      <Image
        src={encodeURI(featured.hero)}
        alt="Obra de Emicles Nogueira Nobre"
        fill
        priority
        className="object-cover object-[center_30%]"
        sizes="100vw"
        unoptimized
      />

      {/* Camadas de contraste: topo (nav), base (conteúdo), lateral esquerda (texto) */}
      <div className="absolute inset-0 bg-black/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <div className="max-w-2xl rounded-sm bg-black/35 p-5 backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-0">
          <motion.p
            className="text-xs uppercase tracking-[0.28em] text-white/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {biography.tagline}
          </motion.p>

          <motion.h1
            className="mt-4 text-5xl leading-[0.95] tracking-tight text-shadow-hero md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display), serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Emicles Nogueira Nobre
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            {biography.heroLead}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Link
              href="/galeria"
              className="bg-copper px-5 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition hover:bg-[#8f4e32]"
            >
              Explorar obras
            </Link>
            <Link
              href="/trajetoria"
              className="border border-white/70 bg-black/35 px-5 py-3 text-sm text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              Conhecer a trajetória
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
