import os
import zipfile
import tempfile
import shutil
from pathlib import Path
from defusedxml import minidom

# Configuración
SOURCE_DIR = Path("Entregables")
OUTPUT_DIR = Path("Entregables_v1.0")
VERSION_SUFFIX = "_v1.0"

def is_pseudo_title(para):
    """
    Heurística para detectar párrafos que deberían ser títulos.
    Criterios:
    1. Texto en negrita (<w:b/>).
    2. Texto corto (menos de 15 palabras).
    3. O texto en mayúsculas sostenidas.
    """
    text_nodes = para.getElementsByTagName("w:t")
    text = "".join([t.firstChild.data for t in text_nodes if t.firstChild])
    text = text.strip()
    
    if not text:
        return False
    
    # Ignorar párrafos que ya parecen ser de sistema o extremadamente largos
    if len(text) > 200:
        return False

    # Buscar marca de negrita en los runs del párrafo
    has_bold = False
    for r in para.getElementsByTagName("w:r"):
        if r.getElementsByTagName("w:b"):
            has_bold = True
            break
            
    is_all_caps = text.isupper() and any(c.isalpha() for c in text)
    is_short = len(text.split()) < 12
    
    # Si es corto y es negrita o mayúsculas, lo marcamos como título
    return (has_bold and is_short) or (is_all_caps and is_short)

def fix_styles_in_xml(xml_path):
    """Modifica el XML para asegurar que los títulos tengan el estilo correcto para el índice."""
    with open(xml_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    dom = minidom.parseString(content)
    paragraphs = dom.getElementsByTagName("w:p")
    
    modified_count = 0
    for para in paragraphs:
        # Si detectamos que es un título por heurística
        if is_pseudo_title(para):
            # Asegurar w:pPr
            pPr_list = para.getElementsByTagName("w:pPr")
            if pPr_list:
                pPr = pPr_list[0]
            else:
                pPr = dom.createElement("w:pPr")
                para.insertBefore(pPr, para.firstChild)
            
            # Verificar si ya tiene un estilo de Heading
            existing_style = pPr.getElementsByTagName("w:pStyle")
            if existing_style:
                style_val = existing_style[0].getAttribute("w:val")
                if "Heading" in style_val:
                    continue # Ya es un título
                else:
                    existing_style[0].setAttribute("w:val", "Heading1")
            else:
                # Añadir estilo Heading1
                pStyle = dom.createElement("w:pStyle")
                pStyle.setAttribute("w:val", "Heading1")
                pPr.insertBefore(pStyle, pPr.firstChild)
            
            modified_count += 1
            
    if modified_count > 0:
        # Devolver el XML serializado (sin pretty print para no romper Word)
        return dom.toxml(encoding="UTF-8")
    return None

def process_file(file_path):
    """Procesa un archivo docx: renombra, descomprime, arregla XML y recomprime."""
    print(f"Procesando: {file_path.name}")
    
    # Crear nombre de salida
    new_name = file_path.stem + VERSION_SUFFIX + file_path.suffix
    target_path = OUTPUT_DIR / new_name
    
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_path = Path(tmpdir)
        
        # Extraer
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(tmp_path)
            
        # Modificar document.xml
        doc_xml = tmp_path / "word" / "document.xml"
        if doc_xml.exists():
            new_xml = fix_styles_in_xml(doc_xml)
            if new_xml:
                with open(doc_xml, "wb") as f:
                    f.write(new_xml)
        
        # Comprimir de nuevo
        shutil.make_archive(str(target_path).replace(".docx", ""), 'zip', tmp_path)
        # Renombrar de .zip a .docx
        shutil.move(str(target_path).replace(".docx", ".zip"), target_path)

def main():
    if not SOURCE_DIR.exists():
        print(f"Error: La carpeta {SOURCE_DIR} no existe.")
        return

    OUTPUT_DIR.mkdir(exist_ok=True)
    
    docx_files = list(SOURCE_DIR.glob("*.docx"))
    print(f"Encontrados {len(docx_files)} archivos.")
    
    for f in docx_files:
        try:
            process_file(f)
        except Exception as e:
            print(f"Error procesando {f.name}: {e}")

    print(f"\nProceso completado. Archivos guardados en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
