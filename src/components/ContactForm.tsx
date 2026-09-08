"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Formulário de contato com envio via API do site.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  /**
   * Envia nome, e-mail e mensagem para /api/contact.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFeedback(result.error || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setFeedback(result.message || "Mensagem enviada com sucesso.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Falha de conexão. Tente novamente ou use o WhatsApp.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-line bg-bg-elevated p-6 md:p-8"
      noValidate
    >
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.16em] text-ink-muted">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
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
          required
          autoComplete="email"
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
          required
          minLength={10}
          className="mt-2 w-full resize-y border border-line bg-bg px-3 py-2.5 outline-none focus:border-ink"
          placeholder="Escreva sua mensagem..."
        />
      </div>

      {/* Honeypot — oculto para humanos */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#1a1714] px-5 py-3 text-sm text-white transition hover:bg-[#a65d3b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar"}
      </button>

      {feedback && (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-[#2f6b3a]" : "text-[#9b3b2e]"}`}
        >
          {feedback}
        </p>
      )}

      {!feedback && (
        <p className="text-xs text-ink-muted">
          A mensagem será enviada para o e-mail do artista. Para resposta imediata, use o WhatsApp.
        </p>
      )}
    </form>
  );
}
