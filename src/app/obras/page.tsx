import { redirect } from "next/navigation";

/**
 * Rota legada: Obras passa a viver dentro da Galeria unificada.
 */
export default function ObrasRedirectPage() {
  redirect("/galeria?destaque=contemporaneas");
}
