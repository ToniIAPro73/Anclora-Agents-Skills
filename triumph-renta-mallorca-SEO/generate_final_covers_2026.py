import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import warnings

# Suppress DecompressionBombWarning
warnings.simplefilter('ignore', Image.DecompressionBombWarning)

# Configuración Base
BASE_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO"
FONTS_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\antigravity-awesome-skills\skills\canvas-design\canvas-fonts"
OUTPUT_DIR = os.path.join(BASE_DIR, "pro_covers")

# Activos
BG_IMAGE = os.path.join(BASE_DIR, "Imagen_portada_documentos.png")
LOGO_ANCLORA = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\assets_anclora\logo-anclora-nexus-group.png"
LOGO_CLIENTE = os.path.join(BASE_DIR, "logo_triumph_highres.png")

AUTHOR = "ANTONIO BALLESTEROS"
BIO = "FOUNDER & AI STRATEGIST"
YEAR = "2026"

def draw_gradient_text(draw_ctx, text, font, start_color, end_color):
    """Renderiza texto con gradiente vertical."""
    try:
        w = int(draw_ctx.textlength(text, font=font))
    except AttributeError:
        w, _ = draw_ctx.textsize(text, font=font)
        
    ascent, descent = font.getmetrics()
    h = ascent + descent + 60
    
    gradient = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gradient)
    
    for i in range(h):
        ratio = i / h
        r = int(start_color[0] + (end_color[0] - start_color[0]) * ratio)
        g = int(start_color[1] + (end_color[1] - start_color[1]) * ratio)
        b = int(start_color[2] + (end_color[2] - start_color[2]) * ratio)
        g_draw.line((0, i, w, i), fill=(r, g, b, 255))
        
    mask = Image.new('L', (w, h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.text((0, 20), text, font=font, fill=255)
    
    return gradient, mask

def create_cover(title, subtitle_template, output_filename, lang="ES"):
    print(f"Generating cover: {output_filename}")
    
    try:
        img = Image.open(BG_IMAGE).convert("RGBA")
    except FileNotFoundError:
        print(f"Error: Background image not found at {BG_IMAGE}")
        return

    # Dimensiones objetivo (A4 a 150-200 DPI aprox o lo que sea el original)
    target_w = 1414 
    target_h = 2000
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Oscurecer fondo
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.35)
    
    # Fuentes
    try:
        # Reducir tamaño título principal de 140 a 110 para que quepan títulos largos como "AI CONSULTANCY PROPOSAL"
        font_title = ImageFont.truetype(os.path.join(FONTS_DIR, "InstrumentSerif-Regular.ttf"), 110)
        font_subtitle = ImageFont.truetype(os.path.join(FONTS_DIR, "Outfit-Regular.ttf"), 42)
        font_header_name = ImageFont.truetype(os.path.join(FONTS_DIR, "WorkSans-Bold.ttf"), 34)
        font_header_bio = ImageFont.truetype(os.path.join(FONTS_DIR, "Outfit-Regular.ttf"), 22)
    except OSError:
        print("Warning: Fonts not found, using default.")
        font_title = font_subtitle = font_header_name = font_header_bio = ImageFont.load_default()

    # Capa de texto
    txt_layer = Image.new("RGBA", img.size, (0,0,0,0))
    draw = ImageDraw.Draw(txt_layer)
    
    margin_side = 100
    margin_top = 80
    
    # --- HEADER: LOGO ANCLORA + AUTHOR ---
    logo_w_target = int(target_w * 0.09)
    if os.path.exists(LOGO_ANCLORA):
        l_anclora = Image.open(LOGO_ANCLORA).convert("RGBA")
        asp = l_anclora.height / l_anclora.width
        l_anclora = l_anclora.resize((logo_w_target, int(logo_w_target * asp)), Image.Resampling.LANCZOS)
        img.paste(l_anclora, (margin_side, margin_top), l_anclora)
        
        text_x_start = margin_side + logo_w_target + 35
        draw.text((text_x_start, margin_top + 5), AUTHOR, font=font_header_name, fill=(255, 255, 255, 255))
        draw.text((text_x_start, margin_top + 45), BIO, font=font_header_bio, fill=(212, 175, 55, 255))
    else:
        print(f"Warning: Anclora Logo not found at {LOGO_ANCLORA}")

    # --- HEADER RIGHT: CLIENT LOGO ---
    if os.path.exists(LOGO_CLIENTE):
        l_client = Image.open(LOGO_CLIENTE).convert("RGBA")
        # Ajustar tamaño (max width ~250px, max height ~120px)
        max_w, max_h = 280, 140
        ratio = min(max_w / l_client.width, max_h / l_client.height)
        new_size = (int(l_client.width * ratio), int(l_client.height * ratio))
        l_client = l_client.resize(new_size, Image.Resampling.LANCZOS)
        
        # Posicionar a la derecha
        pos_x = target_w - margin_side - new_size[0]
        pos_y = margin_top + (max_h - new_size[1]) // 2 # Centrado verticalmente en el hueco
        
        img.paste(l_client, (pos_x, pos_y), l_client)
    else:
        # Placeholder si no hay logo
        ph_w, ph_h = 240, 120
        draw.rectangle([target_w - margin_side - ph_w, margin_top, target_w - margin_side, margin_top + ph_h], outline=(255,255,255,120), width=3)
        draw.text((target_w - margin_side - ph_w + 30, margin_top + 40), "[ TRIUMPH RENT ]", font=font_header_bio, fill=(255, 255, 255, 100))

    # --- CENTER CONTENT ---
    center_x = target_w / 2
    title_text = title.upper()
    
    # Calcular y centrar título con gradiente
    try:
        title_w = draw.textlength(title_text, font=font_title)
    except AttributeError:
        title_w, _ = draw.textsize(title_text, font=font_title)
        
    title_y = 800
    gap = 130 
    
    grad_img, grad_mask = draw_gradient_text(draw, title_text, font=font_title, start_color=(255,255,255), end_color=(212, 175, 55))
    img.paste(grad_img, (int((target_w - title_w) / 2), title_y - 20), grad_mask)

    # Línea decorativa superior
    line_w_long = 150 * 3
    draw.rectangle([center_x - line_w_long/2, title_y - gap + 25, center_x + line_w_long/2, title_y - gap + 25 + 4], fill=(212, 175, 55, 255))

    # Subtítulo (PROYECTO + AÑO)
    year_label = "AÑO" if lang == "ES" else ("YEAR" if lang == "EN" else "JAHR")
    # Subtítulo fijo con el año 2026
    final_subtitle = f"PROJECT: TRIUMPH RENTAL MALLORCA | {year_label} {YEAR}"
    
    try:
        sub_w = draw.textlength(final_subtitle, font=font_subtitle)
    except AttributeError:
        sub_w, _ = draw.textsize(final_subtitle, font=font_subtitle)
        
    draw.text(((target_w - sub_w) / 2, title_y + 250), final_subtitle, font=font_subtitle, fill=(255, 255, 255, 180))
    
    # Línea decorativa inferior
    draw.rectangle([center_x - line_w_long/2, title_y + 250 + 42 + gap, center_x + line_w_long/2, title_y + 250 + 42 + gap + 4], fill=(212, 175, 55, 255))

    # Guardar
    out = Image.alpha_composite(img, txt_layer)
    out.convert("RGB").save(os.path.join(OUTPUT_DIR, output_filename), "JPEG", quality=95)


def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    types_to_gen = [
        {"id": "RESUMEN", "ES": "RESUMEN EJECUTIVO", "EN": "EXECUTIVE SUMMARY", "DE": "ZUSAMMENFASSUNG"},
        {"id": "ROI", "ES": "ANÁLISIS DE ROI", "EN": "ROI ANALYSIS", "DE": "ROI ANALYSE"}, # Nombre aproximado, verificar si ROI tiene título especial
        {"id": "PLAN", "ES": "PLAN DE EJECUCIÓN", "EN": "EXECUTION PLAN", "DE": "AUSFUEHRUNGSPLAN"},
        {"id": "ANEXO", "ES": "ANEXO CONTRACTUAL", "EN": "CONTRACTUAL ANNEX", "DE": "VERTRAGSANHANG"},
        {"id": "PROPUESTA", "ES": "PROPUESTA DE CONSULTORÍA IA", "EN": "AI CONSULTANCY PROPOSAL", "DE": "STRATEGISCHES ANGEBOT"},
    ]
    
    # Generar las 15 variaciones
    for t in types_to_gen:
        for lang in ["ES", "EN", "DE"]:
            # Nombre de archivo esperado por md_to_docx_generator.py: MASTERPIECE_V7_{TYPE}_{LANG}.jpg
            filename = f"MASTERPIECE_V7_{t['id']}_{lang}.jpg"
            create_cover(t[lang], "", filename, lang=lang)

if __name__ == "__main__":
    main()
