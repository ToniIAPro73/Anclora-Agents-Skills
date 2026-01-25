import re
import os

filepath = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'

if not os.path.exists(filepath):
    print(f"File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Certifications text sharpness
content = content.replace('font-size: 8px; font-weight: 900; letter-spacing: 0.2em; color: white; opacity: 0.6;">ISO 9001', 
                          'font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--anclora-gold); opacity: 0.9;">ISO 9001')
content = content.replace('font-size: 8px; font-weight: 900; letter-spacing: 0.2em; color: white; opacity: 0.6;">EU REG', 
                          'font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--anclora-gold); opacity: 0.9;">EU REG')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Certifications text sharpened.")
