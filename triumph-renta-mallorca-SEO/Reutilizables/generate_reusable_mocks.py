import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

# Configuration
BASE_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO"
FONTS_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\antigravity-awesome-skills\skills\canvas-design\canvas-fonts"

# Corrected path to the background image
BG_IMAGE = os.path.join(BASE_DIR, "Imagen_portada_documentos.png")

# Logos
LOGO_ANCLORA = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_de_blogs\assets\logo-anclora-Nexus-Group.png"

OUTPUT_DIR = os.path.join(BASE_DIR, "Reutilizables")

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

AUTHOR = "ANTONIO BALLESTEROS"
BIO = "FOUNDER & AI STRATEGIST"

def draw_gradient_text(draw_ctx, text, font, start_color, end_color):
    w = int(draw_ctx.textlength(text, font=font))
    ascent, descent = font.getmetrics()
    h = ascent + descent + 60
    gradient = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gradient)
    for i in range(h):
        r = int(start_color[0] + (end_color[0] - start_color[0]) * (i / h))
        g = int(start_color[1] + (end_color[1] - start_color[1]) * (i / h))
        b = int(start_color[2] + (end_color[2] - start_color[2]) * (i / h))
        g_draw.line((0, i, w, i), fill=(r, g, b, 255))
    mask = Image.new('L', (w, h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.text((0, 20), text, font=font, fill=255)
    return gradient, mask

def create_mock_cover(title, subtitle_proto, output_filename):
    print(f"Engineering Mock: {output_filename}")
    if not os.path.exists(BG_IMAGE):
        print(f"Error: {BG_IMAGE} no encontrado.")
        return

    img = Image.open(BG_IMAGE).convert("RGBA")
    target_w = 1414 
    target_h = 2000
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.35)
    
    font_main_path = os.path.join(FONTS_DIR, "InstrumentSerif-Regular.ttf")
    font_sub_path = os.path.join(FONTS_DIR, "Outfit-Regular.ttf")
    font_bold_path = os.path.join(FONTS_DIR, "Outfit-Bold.ttf")
    font_header_name_path = os.path.join(FONTS_DIR, "WorkSans-Bold.ttf")

    try:
        font_title = ImageFont.truetype(font_main_path, 140) 
        font_subtitle = ImageFont.truetype(font_sub_path, 42)  
        font_header_name = ImageFont.truetype(font_header_name_path, 34)
        font_header_bio = ImageFont.truetype(font_sub_path, 22)
    except:
        font_title = font_subtitle = font_header_name = font_header_bio = ImageFont.load_default()

    txt_layer = Image.new("RGBA", img.size, (0,0,0,0))
    draw = ImageDraw.Draw(txt_layer)
    margin_side = 100
    margin_top = 80
    
    # --- HEADER ---
    logo_w_target = int(target_w * 0.09)
    if os.path.exists(LOGO_ANCLORA):
        l_anclora = Image.open(LOGO_ANCLORA).convert("RGBA")
        asp = l_anclora.height / l_anclora.width
        l_anclora = l_anclora.resize((logo_w_target, int(logo_w_target * asp)), Image.Resampling.LANCZOS)
        img.paste(l_anclora, (margin_side, margin_top), l_anclora)
        text_x_start = margin_side + logo_w_target + 35
        draw.text((text_x_start, margin_top + 5), AUTHOR, font=font_header_name, fill=(255, 255, 255, 255))
        draw.text((text_x_start, margin_top + 45), BIO, font=font_header_bio, fill=(212, 175, 55, 255))

    # [TOP RIGHT] Placeholder for Company Logo
    ph_w, ph_h = 240, 120
    draw.rectangle([target_w - margin_side - ph_w, margin_top, target_w - margin_side, margin_top + ph_h], outline=(255,255,255,120), width=3)
    draw.text((target_w - margin_side - ph_w + 30, margin_top + 40), "[ LOGO CLIENTE ]", font=font_header_bio, fill=(255, 255, 255, 100))

    # --- CENTER ---
    center_x = target_w / 2
    title_text = title.upper()
    title_w = draw.textlength(title_text, font=font_title)
    title_y = 800
    gap = 130 
    
    grad_img, grad_mask = draw_gradient_text(draw, title_text, font=font_title, start_color=(255,255,255), end_color=(212, 175, 55))
    img.paste(grad_img, (int((target_w - title_w) / 2), title_y - 20), grad_mask)

    line_w_long = 150 * 3
    draw.rectangle([center_x - line_w_long/2, title_y - gap + 25, center_x + line_w_long/2, title_y - gap + 25 + 4], fill=(212, 175, 55, 255))

    sub_w = draw.textlength(subtitle_proto.upper(), font=font_subtitle)
    draw.text(((target_w - sub_w) / 2, title_y + 250), subtitle_proto.upper(), font=font_subtitle, fill=(255, 255, 255, 180))
    draw.rectangle([center_x - line_w_long/2, title_y + 250 + 42 + gap, center_x + line_w_long/2, title_y + 250 + 42 + gap + 4], fill=(212, 175, 55, 255))

    out = Image.alpha_composite(img, txt_layer)
    out.convert("RGB").save(os.path.join(OUTPUT_DIR, output_filename), "JPEG", quality=100)
    print(f"Generated: {output_filename}")

types_to_gen = [
    {"id": "resumen_ejecutivo", "ES": "RESUMEN EJECUTIVO", "EN": "EXECUTIVE SUMMARY", "DE": "ZUSAMMENFASSUNG"},
    {"id": "auditoria_seo_geo", "ES": "AUDITORÍA SEO/GEO", "EN": "SEO/GEO AUDIT", "DE": "SEO/GEO AUDIT"},
    {"id": "plan_ejecucion", "ES": "PLAN DE EJECUCIÓN", "EN": "EXECUTION PLAN", "DE": "AUSFUEHRUNGSPLAN"},
    {"id": "anexo_contractual", "ES": "ANEXO CONTRACTUAL", "EN": "CONTRACTUAL ANNEX", "DE": "VERTRAGSANHANG"},
    {"id": "propuesta_consultoria", "ES": "PROPUESTA DE CONSULTORÍA IA", "EN": "AI CONSULTANCY PROPOSAL", "DE": "STRATEGISCHES ANGEBOT"},
]

for t in types_to_gen:
    for lang in ["ES", "EN", "DE"]:
        title = t[lang]
        sub = f"PROYECTO: [ NOMBRE ] | [ {'AÑO' if lang == 'ES' else ('YEAR' if lang == 'EN' else 'JAHR')} ]"
        create_mock_cover(title, sub, f"mock_{t['id']}_{lang.lower()}.jpg")
