"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { biography } from "@/data/biography";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "/", label: "Início" },
  { href: "/galeria", label: "Galeria" },
  { href: "/trajetoria", label: "Trajetória" },
  { href: "/contato", label: "Contato" },
];

/**
 * Cabeçalho responsivo com contraste estável sobre imagens claras.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  /** No hero, mantém faixa escura translúcida — evita texto branco sobre pintura clara */
  const overHero = isHome && !scrolled && !open;
  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        overHero
          ? "bg-gradient-to-b from-black/75 via-black/45 to-transparent text-white"
          : solid
            ? "bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md"
            : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 md:gap-3">
          <BrandMark
            size={40}
            priority
            className={overHero ? "ring-white/35 shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : "ring-line"}
          />
          <span className="min-w-0">
            <span
              className={`block truncate text-xl tracking-tight md:text-2xl ${
                overHero ? "drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)]" : ""
              }`}
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Emicles Nogueira Nobre
            </span>
            <span
              className={`block text-[0.65rem] uppercase tracking-[0.22em] ${
                solid && !overHero ? "text-ink-muted" : "text-white/80"
              } ${overHero ? "drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]" : ""}`}
            >
              {biography.headerSubtitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-2 text-sm tracking-wide transition ${
                  overHero
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-ink/5 text-ink"
                      : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center md:hidden ${
            overHero ? "rounded-sm bg-black/35" : ""
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t md:hidden ${open ? "block" : "hidden"} ${
          solid
            ? "border-line/40 bg-bg text-ink"
            : "border-white/10 bg-deep/95 text-white"
        }`}
      >
        <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-current/10 py-3 text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
