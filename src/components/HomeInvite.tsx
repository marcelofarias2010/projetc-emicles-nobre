import Image from "next/image";
import Link from "next/link";
import { biography } from "@/data/biography";

/**
 * Convite de estreia do site 2026/2027, com a marca de abertura do artista.
 */
export function HomeInvite() {
  return (
    <section className="bg-bg text-ink" aria-labelledby="home-invite-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-8 md:py-20">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none">
          <Image
            src="/modalidades/abertura/nobre_abertura.png"
            alt="Emicles Nogueira Nobre — marca NOBRE"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 42vw"
            priority
            unoptimized
          />
        </div>

        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-copper">
            {biography.inviteEyebrow}
          </p>
          <h2
            id="home-invite-title"
            className="mt-4 text-4xl tracking-tight md:text-6xl"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {biography.inviteTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted md:text-xl">
            {biography.inviteLead}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted md:text-xl">
            {biography.inviteBody}
          </p>
          <Link href="/galeria" className="btn-outline-dark mt-8">
            {biography.inviteCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
