"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { modalityCovers } from "@/data/heroMedia";

/**
 * Bloco de modalidades na home — capas a partir de public/modalidades/.
 */
export function CategoryShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
        >
          <Link
            href={`/galeria?categoria=${category.id}`}
            className="group relative block aspect-[4/5] overflow-hidden bg-deep"
          >
            <Image
              src={encodeURI(modalityCovers[category.id] ?? "/modalidades/abertura/banner.JPG")}
              alt={category.label}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
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
