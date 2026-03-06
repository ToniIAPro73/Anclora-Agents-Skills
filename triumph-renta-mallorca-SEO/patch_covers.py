from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

def patch_year_on_covers(directory):
    path = Path(directory)
    text_color = (210, 210, 210) 
    
    try:
        font = ImageFont.truetype("arial.ttf", 26)
    except:
        font = ImageFont.load_default()

    for img_file in path.glob("*.jpg"):
        name = img_file.name.upper()
        # Determinar el texto del subtítulo según el idioma
        if "_ES" in name or "RESUMEN_EJECUTIVO" in name:
            sub_text = "PROYECTO: TRIUMPH RENTAL MALLORCA | 2026"
        elif "_DE" in name:
            sub_text = "PROJEKT: TRIUMPH RENTAL MALLORCA | 2026"
        else: # Default EN
            sub_text = "PROJECT: TRIUMPH RENTAL MALLORCA | 2026"
            
        print(f"Reconstruyendo: {img_file.name} -> {sub_text}")
        img = Image.open(img_file).convert('RGB')
        draw = ImageDraw.Draw(img)
        
        # 1. LIMPIEZA TOTAL DE LA LÍNEA DEL SUBTÍTULO (Vertical 1050-1110)
        # Usamos un color de fondo promedio de la zona
        bg_color = img.getpixel((width // 2, 1040)) if (width := img.width) else (40, 45, 52)
        draw.rectangle([100, 1050, img.width - 100, 1120], fill=bg_color)
        
        # 2. ESCRIBIR EL SUBTÍTULO CENTRADO
        # Calculamos el ancho del texto para centrarlo
        # (width // 2) - (text_width // 2)
        # Nota: con load_default() no podemos medir fácil, asumimos aprox 14px por char
        text_w = len(sub_text) * 14
        draw.text(((img.width - text_w) // 2, 1070), sub_text, fill=text_color, font=font)
        
        # 3. LIMPIEZA TOTAL DE ARTEFACTOS INFERIORES
        draw.rectangle([500, 1800, img.width, img.height], fill=bg_color)
        
        img.save(img_file, quality=98)

if __name__ == "__main__":
    patch_year_on_covers(r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO\pro_covers")
