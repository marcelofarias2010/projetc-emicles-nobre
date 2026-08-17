import type { Metadata } from "next";
import { biography } from "@/data/biography";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale sobre obras, acervo e visitas. Emicles Nogueira Nobre reside no Condomínio Morada dos Nobres, em Sobradinho, DF.",
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-copper">Fale conosco</p>
        <h1
          className="mt-3 text-4xl tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Contato
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
          Para conversar sobre o acervo, exposições ou a trajetória de{" "}
          {biography.fullName}, envie uma mensagem ou acompanhe as redes sociais.
        </p>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
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
            className="bg-ink px-5 py-3 text-sm text-bg transition hover:bg-copper"
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

          <div>
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Residência
            </h2>
            <p className="mt-3 max-w-md text-ink-muted">{biography.residence}</p>
            <p className="mt-3 max-w-md text-sm text-ink-muted">
              Aos {biography.age} anos, o artista mantém daqui a conexão com a
              arte e com a memória cultural das décadas de produção no Distrito
              Federal e no Brasil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
