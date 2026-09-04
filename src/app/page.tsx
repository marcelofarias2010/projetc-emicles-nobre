import { CategoryShowcase } from "@/components/CategoryShowcase";
import { HomeHero } from "@/components/HomeHero";
import { HomeInvite } from "@/components/HomeInvite";
import { HomeTrajectoryTeaser } from "@/components/HomeTrajectoryTeaser";

/**
 * Home: carrossel, convite 2026/2027, andanças e modalidades.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeInvite />
      <HomeTrajectoryTeaser />

      <section className="border-t border-line" aria-labelledby="home-modalities-title">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-copper">Modalidades</p>
            <h2
              id="home-modalities-title"
              className="mt-3 text-3xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Pelas quais o artista se identifica
            </h2>
            <p className="mt-3 text-ink-muted">
              Pintura, desenho, bronze, escultura, concreto, cobre, sucata e signos.
            </p>
          </div>
          <CategoryShowcase />
        </div>
      </section>
    </>
  );
}
