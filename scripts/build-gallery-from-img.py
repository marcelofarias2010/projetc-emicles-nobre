"""Gera catálogo a partir de public/img/ com base nos nomes renomeados."""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

IMG = Path("public/img")
OUT = Path("src/data/gallery-from-img.json")

SKIP_PREFIXES = (
    "artista",
    "brazao",
)

# Arquivos específicos fora do bronze (ou da galeria).
RECLASSIFY = {
    "escultura.jpg": "esculturas-argila",
    "nobre2.jpg": "esculturas-sucata",
    "nobre3.jpg": "esculturas-argila",
    "escultura_sucata20.jpg": "pinturas",
    "palhaco.jpg": "esculturas-sucata",
    "calendar1.jpg": "pinturas",
    "calendar2.jpg": "pinturas",
    # Pinturas reclassificadas pelo artista
    "zika.jpg": "esculturas-sucata",
    "pintura46.jpg": "esculturas-concreto",
    "vida.jpg": "esculturas-concreto",
    "pescadores.jpg": "esculturas-concreto",
    "passaro.jpg": "esculturas-concreto",
    "fundos.jpg": "esculturas-concreto",
    "caatinga.jpg": "esculturas-concreto",
    "perfeicao.jpg": "esculturas-argila",
    "moranga.jpg": "esculturas-argila",
    "maosLimpas.jpg": "esculturas-argila",
    "mandala.jpg": "esculturas-argila",
    "malucoBeleza.jpg": "esculturas-sucata",
}
SKIP_FILES = {
    "nobre4.jpg",
    "pescador.jpg",  # duplicata de pescadores.jpg
}

LABELS = {
    "pinturas": "Pintura",
    "gravuras": "Gravura",
    "esculturas": "Bronze",
    "esculturas-sucata": "Sucata",
    "esculturas-argila": "Argila",
    "esculturas-concreto": "Concreto",
    "zodiaco": "Zodíaco",
}

# Destaques da home (Apriore): ficam no início de cada modalidade.
FEATURED_FIRST = {
    "pinturas": ["pintura19.jpg"],
    "esculturas": ["escultura_bronze30.JPG", "escultura_bronze14.jpg"],
}


def normalize(name: str) -> str:
    """Remove acentos e normaliza o nome do arquivo."""
    stem = Path(name).stem
    nfkd = unicodedata.normalize("NFKD", stem)
    ascii_name = "".join(c for c in nfkd if not unicodedata.combining(c))
    return ascii_name.lower().replace(" ", "").replace("-", "_")


def classify(filename: str) -> str | None:
    """Classifica o arquivo em uma modalidade a partir do nome."""
    n = normalize(filename)
    lower_name = filename.lower()

    if lower_name in {s.lower() for s in SKIP_FILES}:
        return None
    if lower_name in {k.lower(): v for k, v in RECLASSIFY.items()}:
        # map by lower key
        for key, cat in RECLASSIFY.items():
            if key.lower() == lower_name:
                return cat

    if any(n.startswith(p) for p in SKIP_PREFIXES):
        return None

    # Typos conhecidos do rename
    if n.startswith("escultira") or n.startswith("esculturaa"):
        return "esculturas"
    if n.startswith("quador_argila"):
        return "esculturas-argila"

    if n.startswith("escultura_sucata") or n.startswith("sucata"):
        return "esculturas-sucata"
    if (
        n.startswith("escultura_argila")
        or n.startswith("quadro_argila")
        or n.startswith("jarro_argila")
        or n.startswith("jarroargila")
        or n in {"jarro", "jarropassaro", "doispalhacos"}
    ):
        return "esculturas-argila"
    if n.startswith("escultura_concreto"):
        return "esculturas-concreto"
    if n.startswith("escultura_bronze"):
        return "esculturas"
    if n.startswith("grafit") or n.startswith("gravura") or n in {"quadrinho"}:
        return "gravuras"
    if (
        n.startswith("zodiaco")
        or n.startswith("zodia")
        or n in {"vir"}
    ):
        return "zodiaco"
    if (
        n.startswith("pintura")
        or n.startswith("tela")
        or n
        in {
            "artpop",
            "marcelo",
            "quadro",
            "serartista",
            "sertao",
            "viverarte",
            "xadrez",
        }
    ):
        return "pinturas"

    return None


def pretty_title(filename: str, category: str, index: int) -> str:
    """Monta um título legível a partir do nome do arquivo."""
    stem = Path(filename).stem
    # remove prefixos de modalidade
    cleaned = re.sub(
        r"^(pintura|tela|grafit|grafite|gravura|escultura_bronze|escultura_sucata|"
        r"escultura_argila|escultura_concreto|escultura|escultira|esculturaa|"
        r"sucata|zodiaco|zodia|quadro_argila|quador_argila|jarro_argila|"
        r"pinturafrancisco|pinturajustica|pinturajusty|pinturapalhaco|"
        r"pintura_palhaco|pintura_)",
        "",
        stem,
        flags=re.IGNORECASE,
    )
    cleaned = cleaned.replace("_", " ").replace(".", " ").strip(" -_")
    cleaned = re.sub(r"\s+", " ", cleaned)
    if cleaned and not cleaned.isdigit():
        # capitaliza palavras
        words = []
        for w in cleaned.split(" "):
            if w.lower() in {"de", "da", "do", "e"}:
                words.append(w.lower())
            else:
                words.append(w[:1].upper() + w[1:] if w else w)
        label = " ".join(words)
        return f"{LABELS[category]} — {label}"
    return f"{LABELS[category]} {index}"


def main() -> None:
    files = [
        f
        for f in IMG.iterdir()
        if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
    ]
    files.sort(key=lambda f: f.name.lower())

    buckets: dict[str, list[Path]] = {k: [] for k in LABELS}
    unclassified: list[str] = []

    for f in files:
        category = classify(f.name)
        if not category:
            skipped = any(normalize(f.name).startswith(p) for p in SKIP_PREFIXES)
            skipped = skipped or f.name.lower() in {s.lower() for s in SKIP_FILES}
            if not skipped:
                unclassified.append(f.name)
            continue
        buckets[category].append(f)

    items = []
    for category, flist in buckets.items():
        priority = [n.lower() for n in FEATURED_FIRST.get(category, [])]
        flist = sorted(
            flist,
            key=lambda f: (
                priority.index(f.name.lower())
                if f.name.lower() in priority
                else len(priority),
                f.name.lower(),
            ),
        )
        for i, f in enumerate(flist, start=1):
            items.append(
                {
                    "id": f"{category}-{i:03d}",
                    "title": pretty_title(f.name, category, i),
                    "category": category,
                    "src": f"/img/{f.name}",
                    "year": None,
                    "page": i,
                    "source": "public/img",
                }
            )

    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    counts = {k: len(v) for k, v in buckets.items()}
    print("counts", counts, "total", len(items))
    if unclassified:
        print("unclassified", len(unclassified))
        for name in unclassified:
            print(" -", name)


if __name__ == "__main__":
    main()
