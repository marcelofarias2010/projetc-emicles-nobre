"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { featured } from "@/data/artworks";

const categoryCovers: Record<string, string> = {
  pintura: featured.painting,
  argila: featured.clay,
  "escultura-sucata": featured.scrap,
  grafite: featured.graphite,
  zodiaco: featured.zodiac,
  nordeste: featured.hero,
  retratos: featured.artist,
  acervo: featured.pop,
};

/**
 * Bloco de categorias na home com entrada animada.
 */
export function CategoryShowcase() {
  const highlights = categories.filter((c) =>
    ["pintura", "argila", "escultura-sucata", "grafite", "zodiaco", "nordeste"].includes(
      c.id,
    ),
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
        >
          <Link
            href={`/galeria?categoria=${category.id}`}
            className="group relative block aspect-[4/5] overflow-hidden bg-deep"
          >
            <Image
              src={encodeURI(categoryCovers[category.id] ?? featured.painting)}
              alt={category.label}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3
                className="text-2xl"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {category.label}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/75">
                {category.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
