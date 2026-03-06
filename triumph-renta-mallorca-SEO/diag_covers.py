from PIL import Image
import os
from pathlib import Path

def find_text_area(image_path):
    img = Image.open(image_path).convert('RGB')
    width, height = img.size
    print(f"DEBUG_IMAGE_SIZE={width}x{height}")
    
    potential_pixels = []
    # Escaneamos con cuidado
    for y in range(1000, height - 20, 1):
        for x in range(width // 2, width - 20):
            r, g, b = img.getpixel((x, y))
            if r > 195 and g > 195 and b > 195: # Muy claro
                potential_pixels.append((x, y))
    
    if not potential_pixels:
        print("DEBUG_NOT_FOUND")
        return
        
    potential_pixels.sort(key=lambda p: p[0], reverse=True)
    last_x = potential_pixels[0][0]
    last_y = potential_pixels[0][1]
    
    print(f"DEBUG_LAST_PIXEL=({last_x},{last_y})")
    
    # Encontrar el inicio del bloque
    sorted_by_x = sorted(potential_pixels, key=lambda p: p[0])
    first_x = sorted_by_x[0][0]
    
    sorted_by_y = sorted(potential_pixels, key=lambda p: p[1])
    min_y = sorted_by_y[0][1]
    max_y = sorted_by_y[-1][1]
    
    print(f"DEBUG_AREA=X:{first_x}-{last_x}, Y:{min_y}-{max_y}")

if __name__ == "__main__":
    find_text_area(r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO\pro_covers\MASTERPIECE_V7_RESUMEN_ES.jpg")
