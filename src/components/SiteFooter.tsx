import Link from "next/link";
import { biography } from "@/data/biography";
import { BrandMark } from "./BrandMark";

/**
 * Rodapé com links sociais e navegação secundária.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p
            className="text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Emicles Nogueira Nobre
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
            {biography.footerBlurb}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Navegação</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/galeria" className="hover:text-white">
                Galeria
              </Link>
            </li>
            <li>
              <Link href="/galeria?destaque=contemporaneas" className="hover:text-white">
                Obras contemporâneas
              </Link>
            </li>
            <li>
              <Link href="/trajetoria" className="hover:text-white">
                Trajetória
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-white">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Redes</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a
                href="https://www.facebook.com/emiclesnobre"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/emiclesnogueiranobre/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/emicles.nobre/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Instagram (atelier)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 sm:flex-row sm:gap-3 md:px-8">
        <span className="inline-flex items-center gap-2.5">
          <BrandMark size={22} className="ring-white/25" />
          <span>
            © {new Date().getFullYear()} {biography.fullName}. {biography.copyrightNote}
          </span>
        </span>
        <span className="hidden text-white/20 sm:inline" aria-hidden>
          ·
        </span>
        <span>
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/marcelofarias-analista/"
            target="_blank"
            rel="noreferrer"
            className="text-white/55 underline-offset-4 transition hover:text-white hover:underline"
          >
            Marcelo Alves Farias
          </a>
        </span>
      </div>
    </footer>
  );
}
