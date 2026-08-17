"use client";

import { motion } from "framer-motion";
import { biography } from "@/data/biography";

/**
 * Linha do tempo animada da trajetória profissional.
 */
export function TrajectoryTimeline() {
  return (
    <ol className="relative space-y-10 border-l border-line pl-6 md:pl-8">
      {biography.timeline.map((item, index) => (
        <motion.li
          key={item.year}
          className="relative"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-copper md:-left-[2.4rem]" />
          <p className="text-xs uppercase tracking-[0.2em] text-copper">{item.year}</p>
          <h3
            className="mt-1 text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {item.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
            {item.text}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
