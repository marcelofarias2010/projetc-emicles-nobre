"""Atualiza títulos das obras por modalidade."""
import json
from collections import Counter
from pathlib import Path

p = Path("src/data/gallery-from-scans.json")
items = json.loads(p.read_text(encoding="utf-8"))
labels = {
    "pinturas": "Pintura",
    "gravuras": "Gravura",
    "esculturas": "Escultura",
    "esculturas-sucata": "Sucata",
    "zodiaco": "Zodíaco",
}
for it in items:
    prefix = labels.get(it["category"], "Obra")
    it["title"] = f"{prefix} {it['page']}"
p.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
print("updated", len(items), dict(Counter(i["category"] for i in items)))
