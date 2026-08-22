"""Gera catálogo a partir de fotos/ (alta resolução), por modalidade."""
from __future__ import annotations

import json
import re
from pathlib import Path

FOTOS = Path("fotos")
OUT = Path("src/data/gallery-from-scans.json")  # mantém o mesmo arquivo consumido pelo site


def cat(name: str) -> str | None:
    n = name.lower()
    base = re.sub(r"\.[^.]+$", "", n)

    if re.match(r"^(aries|arie|aqua|aquario|canc|cancer|capr|capricornio|escor|escorpiao|gem|gemeos|lea|leao|lib|libra|peix|paixes|sagit|sagitario|vir|virgem|touro|zodiaco|calendar)", base):
        return "zodiaco"
    if re.match(r"^sucata", base) or base == "sucata":
        return "esculturas-sucata"
    if re.match(r"^(bronze|escultur|escutura|port\d|nobre[234]|adao|anjo|mascaras|cavalo|cavalos|palhaco|doispalhac)", base):
        return "esculturas"
    if re.match(r"^grafit", base) or base in {"quadrinho", "caricatura"}:
        return "gravuras"
    if re.match(r"^(cobre)$", base):
        return "gravuras"
    if re.match(r"^(cores|tela|pinturas|artpop|faces|sertao|francisco|justica|justy|acrilico|criancas|iara|marcelo|fundos|incompleta|poeta|serartista|viverarte|xadrez|olhos|liberdade|trocadilho|artedepressao|caatinga|ciranda|pescador)", base):
        return "pinturas"
    if "acrilico" in base or "coloridas" in base:
        return "pinturas"
    return None


def main() -> None:
    files = [
        f
        for f in FOTOS.iterdir()
        if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    ]
    # prioriza maior resolução
    files.sort(key=lambda f: f.stat().st_size, reverse=True)

    buckets: dict[str, list] = {
        "pinturas": [],
        "gravuras": [],
        "esculturas": [],
        "esculturas-sucata": [],
        "zodiaco": [],
    }
    labels = {
        "pinturas": "Pintura",
        "gravuras": "Gravura",
        "esculturas": "Escultura",
        "esculturas-sucata": "Sucata",
        "zodiaco": "Zodíaco",
    }

    for f in files:
        c = cat(f.name)
        if not c:
            continue
        buckets[c].append(f)

    items = []
    for category, flist in buckets.items():
        for i, f in enumerate(flist, start=1):
            items.append(
                {
                    "id": f"{category}-{i:03d}",
                    "title": f"{labels[category]} {i}",
                    "category": category,
                    "src": f"/fotos/{f.name}",
                    "year": None,
                    "page": i,
                    "sourcePdf": "fotos/",
                }
            )

    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print({k: len(v) for k, v in buckets.items()}, "total", len(items))


if __name__ == "__main__":
    main()
