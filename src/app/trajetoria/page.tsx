import type { Metadata } from "next";
import Image from "next/image";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { featured } from "@/data/artworks";
import { biography } from "@/data/biography";

export const metadata: Metadata = {
  title: "Trajetória",
  description:
    "Origens em Crateús, gestão na CODEVASF e produção artística de Emicles Nogueira Nobre, com obras no Japão, Estados Unidos e Canadá.",
};

export default function TrajetoriaPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="relative min-h-[55svh] overflow-hidden bg-deep text-white">
        <Image
          src={encodeURI(featured.pop)}
          alt="Obra de Emicles Nogueira Nobre"
          fill
          className="object-cover opacity-70"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[55svh] max-w-7xl items-end px-4 pb-14 md:px-8">
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

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-8 md:py-24">
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
            Vida e ofício
          </h2>
          <div className="mt-5 space-y-8 text-base leading-relaxed text-ink-muted">
            <p>{biography.intro}</p>
            {biography.sections.map((section) => (
              <div key={section.title}>
                <h3
                  className="text-xl tracking-tight text-ink"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {section.title}
                </h3>
                <p className="mt-3">{section.text}</p>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {biography.internationalCollections.map((country) => (
              <li
                key={country}
                className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-ink-muted"
              >
                {country}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <h3
              className="mb-8 text-2xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Linha do tempo
            </h3>
            <TrajectoryTimeline />
          </div>
        </div>
      </section>
    </div>
  );
}
