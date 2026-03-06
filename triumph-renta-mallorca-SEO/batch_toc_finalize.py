import os
import subprocess
import sys

# Rutas
entregables_dir = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO\entregables"
toc_script = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\skills\docx-toc-analyzer\scripts\generate_toc.py"

def process_all():
    files = [f for f in os.listdir(entregables_dir) if f.endswith(".docx")]
    
    for f in files:
        f_path = os.path.join(entregables_dir, f)
        print(f"Finalizing TOC for: {f}")
        
        # Lógica de detección de idioma y reenumeración
        lang = 'es'
        renum = 'True'
        
        if '_EN' in f.upper() or 'PROPOSAL' in f.upper():
            lang = 'en'
            # SOLO para la propuesta EN respetamos el NO reenumerar si el usuario lo pidió
            if 'PROPOSAL' in f.upper():
                renum = 'False'
        elif '_DE' in f.upper():
            lang = 'de'
            
        # Llamar a generate_toc.py pero pasando los parámetros si es necesario
        # (Aunque generate_toc ya tiene su propia lógica en __main__, aquí la forzamos para seguridad)
        
        cmd = [
            "python", 
            toc_script, 
            f_path, 
            f_path, 
            f"renumber={renum}", 
            f"lang={lang}"
        ]
        
        subprocess.run(cmd)

if __name__ == "__main__":
    process_all()
