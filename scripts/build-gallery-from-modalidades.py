"""Gera catálogo e capas a partir de public/modalidades/ (exceto carrousel e abertura)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("public/modalidades")
OUT = Path("src/data/gallery-from-modalidades.json")
COVERS_OUT = Path("src/data/modality-covers.json")
MOSAICO = ROOT / "mosaico"

# Capas fixas da pasta mosaico (quando existirem).
MOSAICO_COVERS: dict[str, str] = {
    "pintura": "Pinturas.jpg",
    "desenho": "desenho.jpg",
    "bronze": "Bronze.jpg",
    "cobre": "cobre.jpg",
    "concreto": "Concreto.jpg",
    "escultura": "Argila.jpg",
    "sucata": "Sucata.jpg",
    "signos": "signos.jpg",
}

# Pasta em disco → id no site
MODALITIES = [
    ("Pintura", "pintura", "Pintura"),
    ("Desenho", "desenho", "Desenho"),
    ("Bronze", "bronze", "Bronze"),
    ("Escultura", "escultura", "Escultura"),
    ("Concreto", "concreto", "Concreto"),
    ("Cobre", "cobre", "Cobre"),
    ("Sucata", "sucata", "Sucata"),
    ("Signos", "signos", "Signos"),
]

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def pretty_title(filename: str, label: str, index: int) -> str:
    """Monta título legível a partir do nome do arquivo."""
    stem = Path(filename).stem
    cleaned = re.sub(r"[_\-]+", " ", stem)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    # remove prefixos repetitivos da modalidade
    cleaned = re.sub(
        rf"^{re.escape(label)}\s*",
        "",
        cleaned,
        flags=re.IGNORECASE,
    ).strip(" -_.")
    if cleaned and not re.fullmatch(r"\d+", cleaned):
        return f"{label} — {cleaned}"
    return f"{label} {index}"


def list_images(folder: Path) -> list[Path]:
    files = [
        f
        for f in folder.iterdir()
        if f.is_file() and f.suffix.lower() in IMAGE_EXTS
    ]
    return sorted(files, key=lambda f: f.name.lower())


def main() -> None:
    items: list[dict] = []
    covers: dict[str, str] = {}
    counts: dict[str, int] = {}

    for folder_name, category_id, label in MODALITIES:
        folder = ROOT / folder_name
        if not folder.is_dir():
            print(f"MISSING folder: {folder}")
            continue
        files = list_images(folder)
        counts[category_id] = len(files)
        if not files:
            continue

        # capa: preferir mosaico/; senão maior arquivo da pasta da modalidade
        mosaic_name = MOSAICO_COVERS.get(category_id)
        mosaic_path = MOSAICO / mosaic_name if mosaic_name else None
        if mosaic_path and mosaic_path.exists():
            covers[category_id] = f"/modalidades/mosaico/{mosaic_path.name}"
        else:
            cover = max(files, key=lambda f: f.stat().st_size)
            covers[category_id] = f"/modalidades/{folder_name}/{cover.name}"

        for i, f in enumerate(files, start=1):
            items.append(
                {
                    "id": f"{category_id}-{i:03d}",
                    "title": pretty_title(f.name, label, i),
                    "category": category_id,
                    "src": f"/modalidades/{folder_name}/{f.name}",
                    "year": None,
                    "page": i,
                    "source": f"public/modalidades/{folder_name}",
                }
            )

    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    COVERS_OUT.write_text(json.dumps(covers, ensure_ascii=False, indent=2), encoding="utf-8")
    print("counts", counts, "total", len(items))
    print("covers", covers)


if __name__ == "__main__":
    main()
