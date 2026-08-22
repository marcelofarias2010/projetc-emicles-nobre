import { CategoryShowcase } from "@/components/CategoryShowcase";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HomeHero } from "@/components/HomeHero";
import { HomeTrajectoryTeaser } from "@/components/HomeTrajectoryTeaser";
import { getContemporaryArtworks } from "@/data/artworks";
import { biography } from "@/data/biography";
import Image from "next/image";
import Link from "next/link";

/**
 * Home: hero com carrossel + diálogo, Apriore compacto, modalidades e trajetória.
 */
export default function HomePage() {
  const contemporary = getContemporaryArtworks(60);

  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-12">
          <div className="relative aspect-[3/4] max-h-[420px] overflow-hidden bg-line/40 md:max-h-none">
            <Image
              src={encodeURI("/img/artista.jpg")}
              alt="Emicles Nogueira Nobre com escultura"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
              unoptimized
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-copper">
              {biography.aprioreEyebrow}
            </p>
            <h2
              className="mt-3 text-3xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {biography.aprioreTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              {biography.aprioreLead}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-ink">
              {contemporary.length} {biography.aprioreCountLabel}
            </p>
            <Link href="/galeria?destaque=contemporaneas" className="btn-outline-dark mt-6">
              Ver seleção contemporânea
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <GalleryGrid artworks={contemporary} showFilters={false} limit={6} />
        </div>
      </section>

      <section className="border-y border-line bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-copper">Modalidades</p>
            <h2
              className="mt-3 text-3xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Pelas quais o artista se identifica
            </h2>
            <p className="mt-3 text-ink-muted">
              Pinturas, gravuras, esculturas, sucata e a série Zodíaco.
            </p>
          </div>
          <CategoryShowcase />
        </div>
      </section>

      <HomeTrajectoryTeaser />
    </>
  );
}
