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
 * Monta o rótulo visível da categoria selecionada, com a contagem de obras.
 */
function getSelectedLabel(value: CategoryFilterValue, counts: Record<string, number>): string {
  if (value === "all") return `Todas (${counts.all ?? 0})`;
  const category = categories.find((item) => item.id === value);
  return `${category?.label ?? value} (${counts[value] ?? 0})`;
}

/**
 * Filtro de categorias: lista vertical no celular e chips no desktop.
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

    /**
     * Fecha o menu ao clicar fora ou pressionar Escape.
     */
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
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
   * Aplica a categoria escolhida e recolhe o menu móvel.
   */
  function selectCategory(next: CategoryFilterValue) {
    onChange(next);
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="sticky top-[4.5rem] z-30 -mx-4 mb-8 border-y border-line/70 bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] px-4 py-3 backdrop-blur-md md:mx-0 md:rounded-sm md:border md:px-3"
    >
      <div className="md:hidden">
        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
          Explorar categoria
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 border border-line bg-bg-elevated px-3 py-3 text-left"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="min-w-0 truncate text-sm tracking-wide">{getSelectedLabel(value, counts)}</span>
          <span
            className={`shrink-0 text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            ▾
          </span>
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Categorias da galeria"
            className="mt-2 max-h-[min(70vh,28rem)] overflow-y-auto border border-line bg-bg-elevated"
          >
            {options.map((option) => {
              const active = option.id === value;
              return (
                <li key={option.id} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-3 border-b border-line px-3 py-3.5 text-left last:border-b-0 ${
                      active ? "bg-ink text-bg" : "text-ink hover:bg-bg"
                    }`}
                    onClick={() => selectCategory(option.id)}
                  >
                    <span className="text-sm tracking-wide">{option.label}</span>
                    <span className={`text-xs tabular-nums ${active ? "text-bg/70" : "text-ink-muted"}`}>
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
              className={`border px-3 py-1.5 text-xs tracking-wide transition ${
                active
                  ? "border-ink bg-ink text-bg"
                  : "border-line bg-bg-elevated text-ink-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              {option.label} ({option.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
