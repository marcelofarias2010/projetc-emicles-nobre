"use client";

import { biography } from "@/data/biography";

/**
 * Linha do tempo da trajetória — conteúdo sempre visível (sem opacity 0).
 */
export function TrajectoryTimeline() {
  return (
    <ol className="relative space-y-8 border-l border-line pl-6 md:space-y-10 md:pl-8">
      {biography.timeline.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative">
          <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-copper md:-left-[2.4rem]" />
          <p className="text-xs uppercase tracking-[0.2em] text-copper">{item.year}</p>
          <h3
            className="mt-1 text-xl tracking-tight md:text-2xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {item.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
            {item.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
