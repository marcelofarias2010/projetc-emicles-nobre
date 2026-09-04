import Image from "next/image";
import Link from "next/link";
import { biography } from "@/data/biography";

const VIDA_SRC = "/modalidades/Concreto/concreto (5).JPG";

/**
 * Andanças na home: título largo e escultura Vida flutuando à direita.
 */
export function HomeTrajectoryTeaser() {
  return (
    <section className="border-t border-line bg-bg-elevated" aria-labelledby="home-wanderings-title">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-copper">Trajetória</p>

        <div className="mt-4 md:flow-root">
          <figure className="mb-8 w-full max-w-[240px] md:float-right md:mb-6 md:ml-10 md:w-[34%] md:max-w-[300px]">
            <div className="relative aspect-[2/3] overflow-hidden bg-line/30">
              <Image
                src={encodeURI(VIDA_SRC)}
                alt="Escultura Vida, em concreto — entrada de Sobradinho (DF), 2002"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 240px, 300px"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
              Escultura Vida · Sobradinho (DF)
            </figcaption>
          </figure>

          <h2
            id="home-wanderings-title"
            className="text-3xl tracking-tight md:text-5xl md:leading-[1.12]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {biography.wanderingsTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {biography.wanderingsLead}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {biography.wanderingsBody}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {[...biography.citiesBrazil, ...biography.citiesAbroad].map((city) => (
              <li
                key={city}
                className="border border-line bg-bg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-ink-muted"
              >
                {city}
              </li>
            ))}
          </ul>

          <blockquote className="mt-10 max-w-2xl border-l-2 border-copper pl-5 text-lg italic text-ink md:text-xl">
            “{biography.quote}”
          </blockquote>
          <Link href="/trajetoria" className="btn-outline-dark mt-8">
            Ler trajetória completa
          </Link>
        </div>
      </div>
    </section>
  );
}
