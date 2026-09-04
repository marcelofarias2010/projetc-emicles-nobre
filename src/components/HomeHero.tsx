"use client";

import { useEffect, useState } from "react";
import { heroCarousel } from "@/data/heroMedia";

const SLIDE_MS = 3000;

/**
 * Hero full-bleed: carrossel automático das obras em modalidades/carrousel (3s).
 * Sem texto sobre as imagens — só a mídia e indicadores discretos.
 */
export function HomeHero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (heroCarousel.length === 0) return;
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroCarousel.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [slide]);

  if (heroCarousel.length === 0) {
    return <section className="relative min-h-[100svh] bg-[#1a1714]" aria-label="Destaque" />;
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#1a1714]" aria-label="Carrossel de obras">
      <div className="absolute inset-0 z-0">
        {heroCarousel.map((item, index) => (
          <div
            key={item.src}
            className="hero-slide absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{
              opacity: index === slide ? 1 : 0,
              zIndex: index === slide ? 1 : 0,
            }}
            aria-hidden={index !== slide}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              width={2400}
              height={1600}
              decoding="async"
              loading={index < 3 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      {/* Faixa leve no topo só para legibilidade do menu fixo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/50 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-4 pb-6 md:px-8 md:pb-8">
        <div className="flex max-w-[70%] flex-wrap items-center gap-1.5">
          {heroCarousel.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Ir para foto ${index + 1}`}
              aria-current={index === slide}
              onClick={() => setSlide(index)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                index === slide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-white/80 drop-shadow">
          {String(slide + 1).padStart(2, "0")} / {String(heroCarousel.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
