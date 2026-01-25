import re
import os

filepath = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'

if not os.path.exists(filepath):
    print(f"File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print("Original size:", len(content))

# 1. Header Logo Size
content = content.replace('height:  112px;', 'height: 80px;')

# 2. Navigation links
content = content.replace('href="#" data-lang="es">Tesis Inversión', 'href="#tesis" data-lang="es">Tesis Inversión')
content = content.replace('href="#" data-lang="en">Investment Thesis', 'href="#tesis" data-lang="en">Investment Thesis')
content = content.replace('href="#" data-lang="es">Data Lab', 'href="#datalab" data-lang="es">Data Lab')
content = content.replace('href="#" data-lang="en">Data Lab', 'href="#datalab" data-lang="en">Data Lab')
content = content.replace('href="#" data-lang="es">Certificaciones', 'href="#certificaciones" data-lang="es">Certificaciones')
content = content.replace('href="#" data-lang="en">Certifications', 'href="#certificaciones" data-lang="en">Certifications')

# 3. Section IDs
content = content.replace('<section class="property-analysis">', '<section id="tesis" class="property-analysis">')
content = content.replace('<div class="chart-container">', '<div id="datalab" class="chart-container">')
# For certifications in footer (around line 591)
content = content.replace('<div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 30px;">', '<div id="certificaciones" style="display: flex; justify-content: center; gap: 40px; margin-bottom: 30px;">')

# 4. Footer Signature Logo Scale
# Match the img tag that is immediately inside that specific div.
pattern = r'(<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; opacity: 0.3; margin-bottom: 20px;">\s*<img src="data:image/png;base64,[^"]+)(")'
replacement = r'\1" style="height: 48px; object-fit: contain;"'
content = re.sub(pattern, replacement, content)

# 5. Legal Modal Fix
content = content.replace("openLegalModal('b2b_es')", "openLegalModal('b2b')")
content = content.replace("openLegalModal('b2b_en')", "openLegalModal('b2b')")

# Fix lang detection logic
content = content.replace("const lang = document.body.className.split('-')[1] || 'es';", "const lang = document.body.classList.contains('lang-en') ? 'en' : 'es';")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated size:", len(content))
print("Update complete.")
