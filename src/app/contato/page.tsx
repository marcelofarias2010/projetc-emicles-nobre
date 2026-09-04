import type { Metadata } from "next";
import Image from "next/image";
import { biography } from "@/data/biography";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale sobre obras, acervo e visitas. Emicles Nogueira Nobre reside no Condomínio Morada dos Nobres, em Sobradinho, DF.",
};

const CONTACT_HERO = "/modalidades/Pintura/20220918_122743_HDR.JPG";

/**
 * Página de contato com cabeçalho visual no mesmo espírito da galeria.
 */
export default function ContatoPage() {
  return (
    <div className="pb-20 md:pb-28">
      <section className="relative min-h-[48svh] overflow-hidden bg-deep text-white">
        <Image
          src={encodeURI(CONTACT_HERO)}
          alt="Pintura — Emicles Nogueira Nobre"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[48svh] max-w-7xl items-end px-4 pb-12 pt-28 md:px-8 md:pt-32">
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
        <form className="space-y-4 border border-line bg-bg-elevated p-6 md:p-8">
          <div>
            <label htmlFor="name" className="text-xs uppercase tracking-[0.16em] text-ink-muted">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-2 w-full border border-line bg-bg px-3 py-2.5 outline-none focus:border-ink"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-[0.16em] text-ink-muted">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-2 w-full border border-line bg-bg px-3 py-2.5 outline-none focus:border-ink"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs uppercase tracking-[0.16em] text-ink-muted">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full resize-y border border-line bg-bg px-3 py-2.5 outline-none focus:border-ink"
              placeholder="Escreva sua mensagem..."
            />
          </div>
          <button
            type="button"
            className="bg-[#1a1714] px-5 py-3 text-sm text-white transition hover:bg-[#a65d3b]"
          >
            Enviar (em breve)
          </button>
          <p className="text-xs text-ink-muted">
            O envio do formulário será conectado em uma próxima etapa.
          </p>
        </form>

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
            <p className="mt-3 max-w-md text-sm text-ink-muted">
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
    </div>
  );
}
