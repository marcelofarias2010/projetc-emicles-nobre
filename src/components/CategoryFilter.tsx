"use client";

import { useEffect, useId, useRef, useState } from "react";
import { categories, type CategoryId } from "@/data/categories";

type CategoryFilterValue = CategoryId | "all";

type Props = {
  value: CategoryFilterValue;
  counts: Record<string, number>;
  onChange: (value: CategoryFilterValue) => void;
};

type Option = {
  id: CategoryFilterValue;
  label: string;
  count: number;
};

/**
 * Monta o rótulo da categoria selecionada com contagem.
 */
function getSelectedLabel(value: CategoryFilterValue, counts: Record<string, number>): string {
  if (value === "all") return `Todas (${counts.all ?? 0})`;
  const category = categories.find((item) => item.id === value);
  return `${category?.label ?? value} (${counts[value] ?? 0})`;
}

/**
 * Filtro de modalidades — chips no desktop e lista no mobile.
 */
export function CategoryFilter({ value, counts, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const options: Option[] = [
    { id: "all", label: "Todas", count: counts.all ?? 0 },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: counts[category.id] ?? 0,
    })),
  ];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  /**
   * Seleciona categoria e fecha o menu móvel.
   */
  function selectCategory(next: CategoryFilterValue) {
    onChange(next);
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="sticky top-[4.5rem] z-30 -mx-4 mb-4 border-y border-[#cfc8bc]/80 bg-[#f7f6f3]/95 px-4 py-3 backdrop-blur-md md:mx-0 md:rounded-sm md:border md:px-3"
    >
      <div className="md:hidden">
        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#5c574f]">
          Explorar categoria
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 border border-[#cfc8bc] bg-white px-3 py-3 text-left"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="min-w-0 truncate text-sm tracking-wide text-[#1a1714]">
            {getSelectedLabel(value, counts)}
          </span>
          <span className={`shrink-0 text-[#5c574f] ${open ? "rotate-180" : ""}`} aria-hidden>
            ▾
          </span>
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Categorias da galeria"
            className="mt-2 max-h-[min(70vh,28rem)] overflow-y-auto border border-[#cfc8bc] bg-white"
          >
            {options.map((option) => {
              const active = option.id === value;
              return (
                <li key={option.id} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-3 border-b border-[#cfc8bc] px-3 py-3.5 text-left last:border-b-0 ${
                      active ? "chip-active w-full" : "chip w-full"
                    }`}
                    onClick={() => selectCategory(option.id)}
                  >
                    <span className="text-sm tracking-wide">{option.label}</span>
                    <span
                      className={`text-xs tabular-nums ${active ? "text-white/70" : "text-[#5c574f]"}`}
                    >
                      {option.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="hidden flex-wrap gap-2 md:flex">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => selectCategory(option.id)}
              className={active ? "chip-active" : "chip"}
            >
              {option.label} ({option.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
