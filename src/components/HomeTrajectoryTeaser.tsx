import Link from "next/link";
import { biography } from "@/data/biography";

/**
 * Teaser da trajetória na home, com citação de fechamento do roteiro.
 */
export function HomeTrajectoryTeaser() {
  return (
    <section className="border-t border-line bg-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-white/50">Trajetória</p>
        <h2
          className="mt-3 max-w-3xl text-3xl tracking-tight md:text-5xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Como bom cearense, percorreu meio mundo
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {biography.homeTeaser[0]} {biography.homeTeaser[1]}
        </p>
        <blockquote className="mt-8 max-w-2xl border-l border-copper pl-5 text-lg italic text-white/85 md:text-xl">
          “{biography.quote}”
        </blockquote>
        <Link href="/trajetoria" className="btn-outline-light mt-8">
          Ler trajetória completa
        </Link>
      </div>
    </section>
  );
}
