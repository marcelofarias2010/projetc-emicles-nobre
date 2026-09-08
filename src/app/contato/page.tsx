import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { biography } from "@/data/biography";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale sobre obras, acervo e visitas. Emicles Nogueira Nobre reside no Condomínio Morada dos Nobres, em Sobradinho, DF.",
};

const whatsappHref = `https://wa.me/${biography.whatsapp}?text=${encodeURIComponent(
  "Olá, Emicles! Vi seu site e gostaria de conversar sobre sua arte.",
)}`;

/**
 * Ícone oficial do WhatsApp (SVG inline).
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
 * Página de contato com formulário, e-mail, WhatsApp e redes sociais.
 */
export default function ContatoPage() {
  return (
    <div className="pb-20 md:pb-28">
      <section className="relative overflow-hidden bg-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(166,93,59,0.28), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(255,255,255,0.06), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-7xl items-end px-4 pb-12 pt-28 md:px-8 md:pt-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Fale conosco</p>
            <h1
              className="mt-3 text-4xl tracking-tight md:text-6xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Contato
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Para conversar sobre o acervo, exposições ou a trajetória de{" "}
              {biography.fullName}, envie uma mensagem ou acompanhe as redes sociais.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-12 grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8">
        <ContactForm />

        <div className="space-y-8">
          <div>
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Contato direto
            </h2>
            <p className="mt-3 text-ink-muted">
              <a
                className="underline-offset-4 hover:text-ink hover:underline"
                href={`mailto:${biography.email}`}
              >
                {biography.email}
              </a>
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-3 border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-[#128C7E] transition hover:bg-[#25D366]/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-ink">WhatsApp</span>
                <span className="block text-sm text-ink-muted">
                  {biography.whatsappDisplay} — mensagem direta
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-md text-sm text-ink-muted">
              {biography.residence}. Aos {biography.age} anos, o artista mantém a
              conexão com a arte e com a memória cultural de décadas de produção.
            </p>
          </div>

          <div>
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Redes sociais
            </h2>
            <ul className="mt-4 space-y-3 text-ink-muted">
              <li>
                <a
                  className="underline-offset-4 hover:text-ink hover:underline"
                  href="https://www.facebook.com/emiclesnobre"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook — emiclesnobre
                </a>
              </li>
              <li>
                <a
                  className="underline-offset-4 hover:text-ink hover:underline"
                  href="https://www.instagram.com/emiclesnogueiranobre/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram — @emiclesnogueiranobre
                </a>
              </li>
              <li>
                <a
                  className="underline-offset-4 hover:text-ink hover:underline"
                  href="https://www.instagram.com/emicles.nobre/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram — @emicles.nobre
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp com Emicles Nogueira Nobre"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] md:bottom-8 md:right-8"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
