import markdown
import os
import pathlib

# ディレクトリ設定
CONTENT_DIR = pathlib.Path("content")
PUBLIC_DIR  = pathlib.Path("public")

# HTML にしたい .md ↔ .html の対応表
SLUGS = {
    "introduction.md": "introduction.html",
    "concept.md":       "concept.html",
    "tracks.md":        "tracks.html",
}

# public フォルダを確実に作る
PUBLIC_DIR.mkdir(exist_ok=True)

for md_name, html_name in SLUGS.items():
    md_path  = CONTENT_DIR / md_name
    html_path = PUBLIC_DIR / html_name

    if not md_path.exists():
        print(f"⚠️ {md_path} が見つからない")
        continue

    md_text = md_path.read_text(encoding="utf-8")
    html_text = markdown.markdown(md_text)

    html_path.write_text(html_text, encoding="utf-8")
    print(f"✓ {md_name} → {html_name}")

print("Markdown → HTML 変換完了")

