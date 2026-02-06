import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

# Configuration
BASE_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO"
FONTS_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\antigravity-awesome-skills\skills\canvas-design\canvas-fonts"
BG_IMAGE = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\triumph-renta-mallorca-SEO\Imagen_portada_documentos2.png"

# Logos
LOGO_ANCLORA = r"c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_de_blogs\assets\logo-anclora-nexus-group.png"
# Placeholder for company logo
LOGO_PLACEHOLDER_TEXT = "[ LOGO EMPRESA CLIENTE ]"

OUTPUT_DIR = os.path.join(BASE_DIR, "Reutilizables")

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Professional Author & Bio
AUTHOR = "ANTONIO BALLESTEROS"
BIO = "FOUNDER & AI STRATEGIST"

def draw_gradient_text(draw_ctx, text, font, start_color, end_color):
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

def create_mock_cover(title, subtitle_proto, output_filename):
    print(f"Engineering Mock Masterpiece Cover: {output_filename}")
    
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
        font_placeholder = ImageFont.truetype(font_sub_path, 24)
    except:
        font_title = font_subtitle = font_header_name = font_header_bio = font_placeholder = ImageFont.load_default()

    txt_layer = Image.new("RGBA", img.size, (0,0,0,0))
    draw = ImageDraw.Draw(txt_layer)
    margin_side = 100
    margin_top = 80
    
    # --- HEADER: SYMMETRIC DUAL LOGO (MOCK) ---
    logo_w_target = int(target_w * 0.09)
    
    # [TOP LEFT] ANCLORA LOGO
    if os.path.exists(LOGO_ANCLORA):
        l_anclora = Image.open(LOGO_ANCLORA).convert("RGBA")
        asp = l_anclora.height / l_anclora.width
        l_anclora = l_anclora.resize((logo_w_target, int(logo_w_target * asp)), Image.Resampling.LANCZOS)
        img.paste(l_anclora, (margin_side, margin_top), l_anclora)
        
        text_x_start = margin_side + logo_w_target + 35
        draw.text((text_x_start, margin_top + 5), AUTHOR, font=font_header_name, fill=(255, 255, 255, 255))
        draw.text((text_x_start, margin_top + 45), BIO, font=font_header_bio, fill=(212, 175, 55, 255))

    # [TOP RIGHT] COMPANY PLACEHOLDER
    placeholder_box_w = 200
    placeholder_box_h = 100
    placeholder_x = target_w - margin_side - placeholder_box_w
    draw.rectangle([placeholder_x, margin_top, placeholder_x + placeholder_box_w, margin_top + placeholder_box_h], outline=(255,255,255,100), width=2)
    pw = draw.textlength("[ LOGO ]", font=font_placeholder)
    draw.text((placeholder_x + (placeholder_box_w - pw)/2, margin_top + 40), "[ LOGO ]", font=font_placeholder, fill=(255, 255, 255, 150))

    # --- CENTER CONTENT ---
    center_x = target_w / 2
    title_text = title.upper()
    subtitle_text = subtitle_proto.upper()
    
    title_w = draw.textlength(title_text, font=font_title)
    title_y = 800
    gap = 130 
    
    # 3.1 GRADIENT TITLE
    start_c = (255, 255, 255) # White
    end_c = (212, 175, 55)   # Gold
    grad_img, grad_mask = draw_gradient_text(draw, title_text, font=font_title, start_color=start_c, end_color=end_c)
    title_x = int((target_w - title_w) / 2)
    img.paste(grad_img, (title_x, title_y - 10), grad_mask)

    # 3.2 TOP LINE (Triple length)
    line_w_long = 150 * 3
    draw.rectangle([center_x - line_w_long/2, title_y - gap + 25, center_x + line_w_long/2, title_y - gap + 25 + 4], fill=(212, 175, 55, 255))

    # 3.3 SUBTITLE (MOCK)
    subtitle_y = title_y + 250
    sub_w = draw.textlength(subtitle_text, font=font_subtitle)
    draw.text(((target_w - sub_w) / 2, subtitle_y), subtitle_text, font=font_subtitle, fill=(255, 255, 255, 180))

    # 3.4 BOTTOM LINE
    draw.rectangle([center_x - line_w_long/2, subtitle_y + 60 + gap, center_x + line_w_long/2, subtitle_y + 60 + gap + 4], fill=(212, 175, 55, 255))

    # Composite and save
    out = Image.alpha_composite(img, txt_layer)
    out.convert("RGB").save(os.path.join(OUTPUT_DIR, output_filename), "JPEG", quality=100)
    print(f"Mock generated: {output_filename}")

# Create Mocks for each type
create_mock_cover("RESUMEN EJECUTIVO", "PROYECTO: [ NOMBRE PROYECTO ] | [ AÑO ]", "mock_resumen_ejecutivo_es.jpg")
create_mock_cover("AUDITORÍA SEO/GEO", "PROYECTO: [ NOMBRE PROYECTO ] | [ AÑO ]", "mock_auditoria_seo_es.jpg")
create_mock_cover("PLAN DE EJECUCIÓN", "PROYECTO: [ NOMBRE PROYECTO ] | [ AÑO ]", "mock_plan_ejecucion_es.jpg")
create_mock_cover("ANÁLISIS DE MERCADO", "PROYECTO: [ NOMBRE PROYECTO ] | [ AÑO ]", "mock_analisis_mercado_es.jpg")
create_mock_cover("PROPUESTA DE VALOR", "PROYECTO: [ NOMBRE PROYECTO ] | [ AÑO ]", "mock_propuesta_valor_es.jpg")
