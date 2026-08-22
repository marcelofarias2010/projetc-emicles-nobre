"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { biography } from "@/data/biography";
import { heroCarousel } from "@/data/heroMedia";

const SLIDE_MS = 3000;

/**
 * Hero full-bleed com carrossel automático: uma imagem por modalidade (a cada 3s).
 */
export function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [dialogueStep, setDialogueStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroCarousel.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [slide]);

  useEffect(() => {
    const sequence = window.setInterval(() => {
      setDialogueStep((step) => (step + 1) % 4);
    }, 4000);
    return () => window.clearInterval(sequence);
  }, []);

  const current = heroCarousel[slide];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#1a1714] text-white">
      <div className="absolute inset-0 z-0" aria-hidden>
        {heroCarousel.map((item, index) => (
          <div
            key={item.src}
            className="hero-slide absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: index === slide ? 1 : 0,
              zIndex: index === slide ? 1 : 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              width={4288}
              height={2848}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-[1] bg-black/35" aria-hidden />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/15 to-black/70"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-4 pb-10 pt-28 md:px-8 md:pb-14">
        <div className="max-w-3xl pt-4 md:pt-8">
          <p className="text-xs uppercase tracking-[0.28em] text-white/85">
            {biography.tagline}
          </p>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#c4a484] md:text-base">
            {biography.openingTitle}
          </p>
          <h1
            className="mt-3 text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
            style={{
              fontFamily: "var(--font-display), serif",
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
            }}
          >
            Emicles Nogueira Nobre
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/92 md:text-lg">
            {biography.openingLead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/galeria" className="btn-solid-dark">
              Explorar galeria
            </Link>
            <Link href="/trajetoria" className="btn-outline-light">
              Conhecer a trajetória
            </Link>
          </div>
        </div>

        <div className="mt-10 grid max-w-4xl gap-3 md:grid-cols-2 md:gap-4">
          <div
            className="rounded-sm border border-white/25 bg-black/50 p-4 backdrop-blur-sm md:p-5"
            style={{ opacity: dialogueStep === 0 || dialogueStep === 1 ? 1 : 0.45 }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#c4a484]">Amigo</p>
            <p className="mt-2 text-base leading-relaxed md:text-lg">
              {biography.dialogueQuestion}
            </p>
          </div>
          <div
            className="rounded-sm border border-[#a65d3b]/60 bg-[#a65d3b]/30 p-4 backdrop-blur-sm md:p-5"
            style={{ opacity: dialogueStep >= 1 ? 1 : 0.45 }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#c4a484]">
              {biography.shortName}
            </p>
            <p className="mt-2 text-base leading-relaxed md:text-lg">
              “{biography.dialogueAnswer}”
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {heroCarousel.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Foto ${index + 1}: ${item.label}`}
              aria-current={index === slide}
              onClick={() => setSlide(index)}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                index === slide ? "w-9 bg-white" : "w-3 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
          <Link
            href={`/galeria?categoria=${current.category}`}
            className="text-xs uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          >
            {String(slide + 1).padStart(2, "0")} /{" "}
            {String(heroCarousel.length).padStart(2, "0")}
            {" · "}
            {current.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
