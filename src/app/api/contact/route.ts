import { NextResponse } from "next/server";
import { biography } from "@/data/biography";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

/**
 * Valida e envia a mensagem do formulário de contato por e-mail.
 */
export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  // Honeypot anti-spam — bots preenchem campos ocultos
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Informe seu nome." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Informe um e-mail válido." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Escreva uma mensagem com pelo menos 10 caracteres." },
      { status: 400 },
    );
  }

  const destination = biography.email;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${destination}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Contato pelo site Nobre Arts — ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
      }),
    });

    const payload = (await response.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
      error?: string;
    } | null;

    if (!response.ok) {
      const detail =
        payload?.message || payload?.error || "Não foi possível enviar a mensagem agora.";
      return NextResponse.json({ ok: false, error: detail }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      message: "Mensagem enviada com sucesso. Em breve entraremos em contato.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Falha de conexão ao enviar. Tente novamente ou use o WhatsApp." },
      { status: 502 },
    );
  }
}
