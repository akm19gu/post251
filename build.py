import markdown
import os

content_dir = "content"
public_dir = "public"

# Create public directory if it doesn't exist
os.makedirs(public_dir, exist_ok=True)

for filename in os.listdir(content_dir):
    if filename.endswith(".md"):
        md_filepath = os.path.join(content_dir, filename)
        html_filename = filename.replace(".md", ".html")
        html_filepath = os.path.join(public_dir, html_filename)

        with open(md_filepath, "r", encoding="utf-8") as f:
            md_content = f.read()
        
        html_content = markdown.markdown(md_content)
        
        with open(html_filepath, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        print(f"Converted {md_filepath} to {html_filepath}")

print("Markdown to HTML conversion complete.")
