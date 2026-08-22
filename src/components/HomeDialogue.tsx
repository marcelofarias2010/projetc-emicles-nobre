"use client";

import { motion } from "framer-motion";
import { biography } from "@/data/biography";

/**
 * Bloco de diálogo do roteiro — pergunta e resposta do artista.
 */
export function HomeDialogue() {
  return (
    <section className="border-b border-line bg-bg-elevated">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-copper">Diálogo</p>
          <h2
            className="mt-4 text-3xl leading-snug tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {biography.dialogueQuestion}
          </h2>
        </motion.div>

        <motion.blockquote
          className="border-l-2 border-copper pl-5 md:pl-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <p className="text-lg leading-relaxed text-ink md:text-xl">
            “{biography.dialogueAnswer}”
          </p>
          <footer className="mt-4 text-sm text-ink-muted">— {biography.shortName}</footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
