import type { Metadata } from "next";
import Image from "next/image";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { featured } from "@/data/artworks";
import { biography } from "@/data/biography";

export const metadata: Metadata = {
  title: "Trajetória",
  description:
    "Trajetória de Emicles Nogueira Nobre: do Ceará ao Brasil e ao exterior, da publicidade às artes plásticas.",
};

/**
 * Página de trajetória conforme o roteiro digitalizado do artista.
 */
export default function TrajetoriaPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="relative min-h-[48svh] overflow-hidden bg-deep text-white">
        <Image
          src={encodeURI(featured.pop)}
          alt="Obra de Emicles Nogueira Nobre"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[48svh] max-w-7xl items-end px-4 pb-12 md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Biografia</p>
            <h1
              className="mt-3 text-4xl tracking-tight md:text-6xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Trajetória
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {biography.trajectoryLead}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:px-8 md:py-16">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-line/40">
            <Image
              src={encodeURI(featured.artist)}
              alt="Emicles Nogueira Nobre"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              unoptimized
            />
          </div>
          <p className="mt-4 text-sm text-ink-muted">{biography.portraitCaption}</p>
        </div>

        <div>
          <h2
            className="text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {biography.shortName}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {biography.summary}
          </p>

          <div className="mt-10">
            <h3
              className="text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Percorreu o Brasil
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {biography.citiesBrazil.map((city) => (
                <li
                  key={city}
                  className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-ink-muted"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3
              className="text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Exterior
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {biography.citiesAbroad.map((city) => (
                <li
                  key={city}
                  className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-ink-muted"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {biography.landmarks.map((item) => (
              <div key={item.title} className="border-t border-line pt-4">
                <h4
                  className="text-lg tracking-tight"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3
              className="text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Também foi
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {biography.roles.map((role) => (
                <li
                  key={role}
                  className="bg-bg-elevated px-3 py-1.5 text-sm text-ink-muted"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2
            className="mb-8 text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Linha do tempo
          </h2>
          <TrajectoryTimeline />

          <blockquote className="mt-12 max-w-3xl border-l-2 border-copper pl-5 text-xl italic text-ink md:text-2xl">
            “{biography.quote}”
          </blockquote>
        </div>
      </section>
    </div>
  );
}
