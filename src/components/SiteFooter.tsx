import Image from "next/image";
import Link from "next/link";
import { biography } from "@/data/biography";
import { BrandMark } from "./BrandMark";

const whatsappHref = `https://wa.me/${biography.whatsapp}?text=${encodeURIComponent(
  "Olá, Emicles! Vi seu site e gostaria de conversar sobre sua arte.",
)}`;

/**
 * Ícone do Facebook (SVG inline).
 */
function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.48h-1.26c-1.243 0-1.63.778-1.63 1.576v1.888h2.773l-.443 2.91h-2.33v7.03C18.343 21.244 22 17.08 22 12.06z" />
    </svg>
  );
}

/**
 * Ícone do Instagram (SVG inline).
 */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 1.75a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
    </svg>
  );
}

/**
 * Ícone do WhatsApp (SVG inline).
 */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Rodapé com imagem de abertura à esquerda e conteúdo textual à direita.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-deep text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.2fr)] md:gap-12 md:px-8">
        <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden md:mx-0 md:max-w-none">
          <Image
            src="/modalidades/abertura/61-desenho.jpeg"
            alt="A vida de cada pessoa é uma caixinha de surpresas — NOBRE"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 100vw, 48vw"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-10">
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

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Navegação
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/galeria" className="hover:text-white">
                    Galeria
                  </Link>
                </li>
                <li>
                  <Link
                    href="/galeria?destaque=contemporaneas"
                    className="hover:text-white"
                  >
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
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li>
                  <a
                    href="https://www.facebook.com/emiclesnobre"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <FacebookIcon className="h-4 w-4 shrink-0 text-white/70" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/emiclesnogueiranobre/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <InstagramIcon className="h-4 w-4 shrink-0 text-white/70" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/emicles.nobre/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <InstagramIcon className="h-4 w-4 shrink-0 text-white/70" />
                    Instagram (atelier)
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
