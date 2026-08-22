"""Extrai imagens dos PDFs de modalidades para public/gallery."""
from __future__ import annotations

import re
from pathlib import Path

import fitz

DOC = Path("doc")
OUT = Path("public/gallery")

# Mapeamento arquivo → pasta da modalidade no site
PDF_MAP = {
    "pintura.pdf": "pinturas",
    "gravuras.pdf": "gravuras",
    "escultura.pdf": "esculturas",
    "sucata.pdf": "esculturas-sucata",
    "zodiaco.pdf": "zodiaco",
}


def slugify(name: str) -> str:
    """Normaliza nome de arquivo PDF para chave do mapa."""
    n = name.lower().strip()
    n = n.replace("á", "a").replace("à", "a").replace("â", "a")
    n = n.replace("é", "e").replace("í", "i").replace("ó", "o").replace("ô", "o")
    n = n.replace("ú", "u").replace("ç", "c")
    return n


def extract_pdf(pdf_path: Path, folder: str) -> list[dict]:
    """
    Extrai cada página do PDF como imagem JPEG em public/gallery/<folder>.
    Retorna metadados das obras geradas.
    """
    dest = OUT / folder
    dest.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    items: list[dict] = []
    # ~180 dpi — equilíbrio qualidade/tamanho
    mat = fitz.Matrix(1.8, 1.8)

    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat, alpha=False)
        filename = f"{folder}-{i + 1:03d}.jpg"
        out_path = dest / filename
        pix.save(str(out_path), output="jpeg", jpg_quality=85)
        items.append(
            {
                "id": f"{folder}-{i + 1:03d}",
                "title": f"Obra {i + 1}",
                "category": folder,
                "src": f"/gallery/{folder}/{filename}",
                "year": None,
                "page": i + 1,
                "sourcePdf": pdf_path.name,
            }
        )
        print(f"  [{i + 1}/{doc.page_count}] {out_path} ({out_path.stat().st_size // 1024} KB)")

    doc.close()
    return items


def main() -> None:
    all_items: list[dict] = []
    pdfs = [p for p in DOC.glob("*.pdf") if not p.name.lower().startswith("emicles")]

    for pdf in sorted(pdfs, key=lambda p: p.name.lower()):
        key = slugify(pdf.name)
        # match known keys
        folder = None
        for fname, fldr in PDF_MAP.items():
            if key == fname or key.replace(" ", "") == fname:
                folder = fldr
                break
        # Zodíaco with encoding issues
        if folder is None and "zod" in key:
            folder = "zodiaco"
        if folder is None and "escultura" in key and "sucata" not in key:
            folder = "esculturas"
        if folder is None:
            print(f"SKIP unknown: {pdf.name} (key={key})")
            continue

        print(f"=== {pdf.name} -> {folder} ===")
        items = extract_pdf(pdf, folder)
        all_items.extend(items)
        print(f"  total: {len(items)} páginas\n")

    # catalog JSON
    catalog_path = Path("src/data/gallery-from-scans.json")
    catalog_path.parent.mkdir(parents=True, exist_ok=True)
    import json

    catalog_path.write_text(json.dumps(all_items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Catálogo: {catalog_path} ({len(all_items)} obras)")

    # logomarca
    logo_src = DOC / "logomarca.jpeg"
    if not logo_src.exists():
        logo_src = DOC / "logomarca.jpg"
    if logo_src.exists():
        logo_dest = Path("public/brand/logomarca.jpeg")
        logo_dest.parent.mkdir(parents=True, exist_ok=True)
        logo_dest.write_bytes(logo_src.read_bytes())
        print(f"Logo: {logo_dest}")


if __name__ == "__main__":
    main()
