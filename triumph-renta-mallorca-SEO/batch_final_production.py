import os
import sys
from pathlib import Path
import shutil

# Rutas de los scripts (skills)
SKILLS_DIR = Path(r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\skills")
GEN_SCRIPT_PATH = SKILLS_DIR / "md-to-docx-with-covers" / "scripts" / "md_to_docx_generator.py"
TOC_SCRIPT_PATH = SKILLS_DIR / "docx-toc-analyzer" / "scripts" / "generate_toc.py"

# Inyectar rutas para importar los módulos
sys.path.append(str(GEN_SCRIPT_PATH.parent))
sys.path.append(str(TOC_SCRIPT_PATH.parent))

from md_to_docx_generator import process_all_md
from generate_toc import generate_toc_in_doc

def run_production():
    # Rutas de datos
    BASE_DIR = Path(r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO")
    SRC_MD = BASE_DIR / "Doc_md"
    TEMP_DOCX = BASE_DIR / "temp_production"
    FINAL_OUT = BASE_DIR / "entregables"

    # Preparar carpetas
    if TEMP_DOCX.exists(): shutil.rmtree(TEMP_DOCX)
    TEMP_DOCX.mkdir(parents=True)
    
    if FINAL_OUT.exists(): shutil.rmtree(FINAL_OUT)
    FINAL_OUT.mkdir(parents=True)

    print(f"--- FASE 1: Conversión Base (Markdown -> DOCX) ---")
    process_all_md(str(SRC_MD), str(TEMP_DOCX))

    print(f"\n--- FASE 2: Premium Styling & TOC Analysis ---")
    for docx_file in TEMP_DOCX.glob("*.docx"):
        target_path = FINAL_OUT / docx_file.name
        print(f"Procesando TOC y Layout: {docx_file.name}")
        try:
            generate_toc_in_doc(str(docx_file), str(target_path))
        except Exception as e:
            print(f"Error procesando {docx_file.name}: {e}")

    # Limpieza
    # shutil.rmtree(TEMP_DOCX)
    print(f"\n--- PRODUCCIÓN FINALIZADA ---")
    print(f"Archivos listos en: {FINAL_OUT}")

if __name__ == "__main__":
    run_production()
