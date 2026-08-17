import Image from "next/image";
import Link from "next/link";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HomeHero } from "@/components/HomeHero";
import { artworks, featured } from "@/data/artworks";
import { biography } from "@/data/biography";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="grain mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden bg-line/40">
            <Image
              src={encodeURI(featured.artist)}
              alt="Retrato de Emicles Nogueira Nobre"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              unoptimized
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-copper">O artista</p>
            <h2
              className="mt-3 text-4xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Uma vida dedicada às artes
            </h2>
            <div className="mt-5 space-y-4">
              {biography.home.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/trajetoria"
              className="mt-8 inline-flex border border-ink px-5 py-3 text-sm transition hover:bg-ink hover:text-bg"
            >
              Ler trajetória completa
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-copper">Linguagens</p>
            <h2
              className="mt-3 text-4xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Categorias de criação
            </h2>
            <p className="mt-4 text-ink-muted">
              Pintura, desenho, argila, sucata e temas nordestinos — linguagens
              que acompanham décadas de produção no Distrito Federal e no Brasil.
            </p>
          </div>
          <CategoryShowcase />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-copper">Seleção</p>
            <h2
              className="mt-3 text-4xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Obras em destaque
            </h2>
          </div>
          <Link href="/galeria" className="text-sm text-ink-muted underline-offset-4 hover:underline">
            Ver galeria completa
          </Link>
        </div>
        <GalleryGrid artworks={artworks} showFilters={false} limit={12} />
      </section>
    </>
  );
}
