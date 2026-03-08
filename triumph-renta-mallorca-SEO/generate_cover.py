import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

# Configuration
BASE_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO"
FONTS_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\antigravity-awesome-skills\skills\canvas-design\canvas-fonts"
BG_IMAGE = os.path.join(BASE_DIR, "Imagen_portada_documentos.png")

# Logos
LOGO_ANCLORA = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_de_blogs\assets\logo-anclora-nexus-group.png"
LOGO_TRIUMPH = os.path.join(BASE_DIR, "logo_triumph_highres.png")

OUTPUT_DIR = os.path.join(BASE_DIR, "pro_covers")

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Professional Author & Bio
AUTHOR = "ANTONIO BALLESTEROS"
BIO = "FOUNDER & AI STRATEGIST"

def draw_gradient_text(draw_ctx, text, font, start_color, end_color):
    """Draws text with a vertical gradient without clipping."""
    w = int(draw_ctx.textlength(text, font=font))
    ascent, descent = font.getmetrics()
    h = ascent + descent + 40 
    
    gradient = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gradient)
    
    for i in range(h):
        r = int(start_color[0] + (end_color[0] - start_color[0]) * (i / h))
        g = int(start_color[1] + (end_color[1] - start_color[1]) * (i / h))
        b = int(start_color[2] + (end_color[2] - start_color[2]) * (i / h))
        g_draw.line((0, i, w, i), fill=(r, g, b, 255))
        
    mask = Image.new('L', (w, h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.text((0, 10), text, font=font, fill=255)
    
    return gradient, mask

def create_masterpiece_v7(title, subtitle, output_filename):
    print(f"Engineering Masterpiece Cover V7: {output_filename}")
    
    # 1. Background Setup
    img = Image.open(BG_IMAGE).convert("RGBA")
    target_w = 1414 
    target_h = 2000
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Apply global prestige treatment
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.35)
    
    # 2. Typography Setup
    font_main_path = os.path.join(FONTS_DIR, "InstrumentSerif-Regular.ttf")
    font_sub_path = os.path.join(FONTS_DIR, "Outfit-Regular.ttf")
    font_header_name_path = os.path.join(FONTS_DIR, "WorkSans-Bold.ttf")

    try:
        font_title = ImageFont.truetype(font_main_path, 140) 
        # Reduce title size if too long
        title_w_test = ImageDraw.Draw(Image.new("RGBA", (1,1))).textlength(title.upper(), font=font_title)
        if title_w_test > (target_w - 200):
            font_title = ImageFont.truetype(font_main_path, 100) 

        font_subtitle = ImageFont.truetype(font_sub_path, 42)  
        font_header_name = ImageFont.truetype(font_header_name_path, 34)
        font_header_bio = ImageFont.truetype(font_sub_path, 22)
    except:
        font_title = font_subtitle = font_header_name = font_header_bio = ImageFont.load_default()

    # 3. Design Layers
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

    if os.path.exists(LOGO_TRIUMPH):
        l_triumph = Image.open(LOGO_TRIUMPH).convert("RGBA")
        asp = l_triumph.height / l_triumph.width
        l_triumph = l_triumph.resize((logo_w_target, int(logo_w_target * asp)), Image.Resampling.LANCZOS)
        img.paste(l_triumph, (target_w - margin_side - logo_w_target, margin_top), l_triumph)

    # --- CENTER CONTENT ---
    center_x = target_w / 2
    title_text = title.upper()
    subtitle_text = subtitle.upper()
    
    title_w = draw.textlength(title_text, font=font_title)
    title_y = 800
    gap = 130 
    
    grad_img, grad_mask = draw_gradient_text(draw, title_text, font=font_title, start_color=(255,255,255), end_color=(212, 175, 55))
    title_x = int((target_w - title_w) / 2)
    
    glow_layer = Image.new("RGBA", img.size, (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.text((title_x, title_y), title_text, font=font_title, fill=(212, 175, 55, 80))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=10))
    img = Image.alpha_composite(img, glow_layer)
    img.paste(grad_img, (title_x, title_y - 10), grad_mask)

    line_w_long = 450
    draw.rectangle([center_x - line_w_long/2, title_y - gap + 25, center_x + line_w_long/2, title_y - gap + 25 + 4], fill=(212, 175, 55, 255))

    subtitle_y = title_y + 250
    sub_w = draw.textlength(subtitle_text, font=font_subtitle)
    draw.text(((target_w - sub_w) / 2, subtitle_y), subtitle_text, font=font_subtitle, fill=(255, 255, 255, 180))
    draw.rectangle([center_x - line_w_long/2, subtitle_y + 42 + gap, center_x + line_w_long/2, subtitle_y + 42 + gap + 4], fill=(212, 175, 55, 255))

    out = Image.alpha_composite(img, txt_layer)
    out.convert("RGB").save(os.path.join(OUTPUT_DIR, output_filename), "JPEG", quality=100)

# 15 COVERS LIST
COVERS_TO_GENERATE = [
    ("RESUMEN EJECUTIVO", "PROYECTO: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_RESUMEN_ES.jpg"),
    ("EXECUTIVE SUMMARY", "PROJECT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_RESUMEN_EN.jpg"),
    ("ZUSAMMENFASSUNG", "PROJEKT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_RESUMEN_DE.jpg"),
    ("JUSTIFICACIÓN DE ROI", "PROYECTO: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ROI_ES.jpg"),
    ("ROI JUSTIFICATION", "PROJECT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ROI_EN.jpg"),
    ("ROI-JUSTIFIZIERUNG", "PROJEKT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ROI_DE.jpg"),
    ("PROPUESTA DE CONSULTORÍA", "PROYECTO: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PROPUESTA_ES.jpg"),
    ("AI CONSULTANCY PROPOSAL", "PROJECT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PROPUESTA_EN.jpg"),
    ("STRATEGISCHES ANGEBOT", "PROJEKT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PROPUESTA_DE.jpg"),
    ("PLAN DE EJECUCIÓN", "PROYECTO: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PLAN_ES.jpg"),
    ("EXECUTION PLAN", "PROJECT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PLAN_EN.jpg"),
    ("AUSFÜHRUNGSPLAN", "PROJEKT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_PLAN_DE.jpg"),
    ("ANEXO CONTRACTUAL", "PROYECTO: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ANEXO_ES.jpg"),
    ("CONTRACTUAL ANNEX", "PROJECT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ANEXO_EN.jpg"),
    ("VERTRAGSANHANG", "PROJEKT: TRIUMPH RENTAL MALLORCA | 2025", "MASTERPIECE_V7_ANEXO_DE.jpg"),
]

for t, s, f in COVERS_TO_GENERATE:
    create_masterpiece_v7(t, s, f)
