import os

doc_md_dir = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO\Doc_md"

def update_dates():
    for f in os.listdir(doc_md_dir):
        if f.endswith(".md"):
            path = os.path.join(doc_md_dir, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if "2025" in content:
                print(f"Updating {f}")
                new_content = content.replace("2025", "2026")
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)

if __name__ == "__main__":
    update_dates()
