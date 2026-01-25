import base64
import os

def to_b64(path):
    if not os.path.exists(path):
        print(f"Error: File not found {path}")
        return ""
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()

logo_nexus_path = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_de_blogs\assets\Logo Anclora Nexus Group.png'
logo_app_path = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_de_blogs\assets\logo_private_estates_only.png'
badges_path = r'C:\Users\Usuario\.gemini\antigravity\brain\9bc27ae5-6b39-4e4c-8768-094fe6ecc3ab\uploaded_media_1769299387233.png'

target_dir = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\assets'
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

output_path = os.path.join(target_dir, 'branding_assets.ts')
print(f"Writing to {output_path}")

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(f'export const LOGO_ANCLORA_NEXUS = "data:image/png;base64,{to_b64(logo_nexus_path)}";\n')
    f.write(f'export const LOGO_PRIVATE_ESTATES = "data:image/png;base64,{to_b64(logo_app_path)}";\n')
    f.write(f'export const COMPLIANCE_BADGES = "data:image/png;base64,{to_b64(badges_path)}";\n')

print("Done.")
