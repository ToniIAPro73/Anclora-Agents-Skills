import re
import os

def extract_b64(ts_content, var_name):
    pattern = rf'export const {var_name} = "(data:image\/[a-zA-Z]+;base64,[^"]+)";'
    match = re.search(pattern, ts_content)
    if match:
        return match.group(1)
    return None

def update_html():
    ts_path = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\assets\branding_assets.ts'
    html_path = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'
    
    with open(ts_path, 'r', encoding='utf-8') as f:
        ts_content = f.read()
    
    logo_symbol = extract_b64(ts_content, 'LOGO_PRIVATE_ESTATES_SYMBOL')
    logo_nexus = extract_b64(ts_content, 'LOGO_ANCLORA_NEXUS')
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 1. Update Header Logo and Styles
    # Change .logo-nav height in CSS (line 86)
    html_content = re.sub(r'(\.logo-nav\s+\{\s+height:\s+)(\d+px)', r'\1 112px', html_content) # h-28 is 112px
    
    # Update Header HTML (lines 497-501)
    new_header = f'''    <header class="site-header">
        <div class="header-left">
            <a href="/" style="transition: all 0.5s ease;">
                <img src="{logo_symbol}" alt="Anclora Signature" class="logo-nav" style="filter: drop-shadow(0 0 20px rgba(197, 160, 89, 0.4));">
            </a>
        </div>'''
    html_content = re.sub(r'<header class="site-header">.*?<div class="header-left">.*?<img src=".*?" alt=".*?" class="logo-nav">.*?</div>', new_header, html_content, flags=re.DOTALL)

    # 2. Update Footer Structure
    # We want to replace lines 584-634 approx.
    # The new footer matches the "Ultra-Compact" aesthetic.
    
    new_footer_html = f'''    <footer style="padding: 40px 5% 30px; background: #05070A; border-top: 1px solid rgba(212, 175, 55, 0.1); margin-top: 80px;">
        <!-- Micro Brand Signature -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; opacity: 0.3; margin-bottom: 20px;">
            <img src="{logo_nexus}" alt="Anclora Nexus" style="height: 10px; width: auto; filter: grayscale(1);">
            <p style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.6em; color: white;">Anclora Nexus Strategic Holdings</p>
        </div>

        <!-- Schematic Compliance Section -->
        <div style="display: flex; justify-content: center; gap: 60px; margin-bottom: 30px; opacity: 0.5;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9 12l2 2 4-4"/></svg>
                <span style="font-size: 8px; font-weight: 900; letter-spacing: 0.2em; color: white; opacity: 0.6;">GDPR</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="1.5"><path d="M4 20h16M7 20v-4M12 20v-9M17 20v-14"/></svg>
                <span style="font-size: 8px; font-weight: 900; letter-spacing: 0.2em; color: white; opacity: 0.6;">ISO 9001</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="1.5"><rect x="5" y="5" width="14" height="14" rx="0.5"/><circle cx="12" cy="12" r="3"/></svg>
                <span style="font-size: 8px; font-weight: 900; letter-spacing: 0.2em; color: white; opacity: 0.6;">EU REG</span>
            </div>
        </div>

        <div class="footer-legal-links" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
            <a href="javascript:void(0)" onclick="openLegalModal('privacidad')" data-lang="es">Privacidad</a>
            <a href="javascript:void(0)" onclick="openLegalModal('privacidad')" data-lang="en">Privacy</a>
            <a href="javascript:void(0)" onclick="openLegalModal('cookies')" data-lang="es">Cookies</a>
            <a href="javascript:void(0)" onclick="openLegalModal('cookies')" data-lang="en">Cookies</a>
            <a href="javascript:void(0)" onclick="openLegalModal('etico')" data-lang="es">Código Ético</a>
            <a href="javascript:void(0)" onclick="openLegalModal('etico')" data-lang="en">Code of Ethics</a>
            <a href="javascript:void(0)" onclick="openLegalModal('b2b')" data-lang="es">Términos B2B</a>
            <a href="javascript:void(0)" onclick="openLegalModal('b2b')" data-lang="en">B2B Terms</a>
        </div>

        <div class="legal-disclaimer" style="margin: 20px auto; opacity: 0.2;">
            <p data-lang="es"><strong>Disclaimer Institucional:</strong> Los datos presentados en Anclora Data Lab v2.0 se basan en análisis históricos y proyecciones algorítmicas propias. Anclora Nexus Group opera bajo las normativas más estrictas de la UE.</p>
            <p data-lang="en"><strong>Institutional Disclaimer:</strong> Data in Anclora Data Lab v2.0 is based on historical analysis and proprietary algorithmic projections. Anclora Nexus Group operates under the strictest EU regulations.</p>
        </div>
        
        <p class="copyright" style="font-size: 8px; opacity: 0.3;">&copy; 2026 ANCLORA NEXUS GROUP • ID: ANG-PRT-2026-EU</p>
    </footer>'''

    html_content = re.sub(r'<footer>.*?</footer>', new_footer_html, html_content, flags=re.DOTALL)

    # 3. Update the legal texts in JS to be more comprehensive (based on React summaries)
    new_legal_js = '''        const legalTexts = {
            privacidad: {
                es: "<h3>Protocolo de Privacidad</h3><p>Sus datos serán tratados con la exclusiva finalidad de gestionar su solicitud y mantenerle informado sobre nuestras propiedades de lujo. No cedemos datos a terceros sin su consentimiento expreso, de acuerdo con el RGPD y la LOPDGDD.</p><ul><li><strong>Responsable:</strong> Anclora Private Estates S.L.</li><li><strong>Derechos:</strong> Acceso, rectificación, supresión y portabilidad vía privacidad@ancloraprivateestates.com.</li></ul>",
                en: "<h3>Data Privacy Protocol</h3><p>Your data will be processed solely to manage your requests and keep you informed about our luxury properties. We do not share data with third parties without your express consent, in compliance with GDPR regulations.</p><ul><li><strong>Controller:</strong> Anclora Private Estates S.L.</li><li><strong>Rights:</strong> Access, rectification, deletion, and portability via privacy@ancloraprivateestates.com.</li></ul>"
            },
            cookies: {
                es: "<h3>Gestión de Cookies</h3><p>Utilizamos cookies propias y de terceros para asegurar la excelencia en su navegación, realizar análisis estadísticos y cualificar el interés en activos de inversión estratégicos.</p><ul><li><strong>Técnicas:</strong> Consentimiento, sesión e idioma (no inhabilitables).</li><li><strong>Analíticas:</strong> Optimización de la experiencia UHNWI.</li></ul>",
                en: "<h3>Cookie Management</h3><p>We use first and third-party cookies to ensure a great browsing experience, perform statistical analysis, and qualify interest in strategic investment assets.</p><ul><li><strong>Essential:</strong> Consent, session, and language (non-disableable).</li><li><strong>Analytics:</strong> UHNWI experience optimization.</li></ul>"
            },
            etico: {
                es: "<h3>Código Ético Corporativo</h3><p>El Código Ético de Anclora se basa en la transparencia, la integridad y la confidencialidad absoluta (UHNWI). Nos comprometemos con el desarrollo sostenible de Baleares y la excelencia profesional.</p>",
                en: "<h3>Corporate Code of Ethics</h3><p>Anclora's Code of Ethics is based on transparency, integrity, and absolute confidentiality (UHNWI). We are committed to the sustainable development of the Balearic Islands and professional excellence.</p>"
            },
            b2b: {
                es: "<h3>Términos y Condiciones B2B</h3><p>Condiciones específicas para colaboradores y partners inmobiliarios cualificados. Incluye el programa de referral (20%) y el protocolo de protección de leads 'First Touch Wins'.</p>",
                en: "<h3>B2B Terms & Conditions</h3><p>Specific conditions for qualified real estate collaborators and partners. Includes the referral program (20%) and the 'First Touch Wins' lead protection protocol.</p>"
            }
        };'''
    
    html_content = re.sub(r'const legalTexts = \{.*?\};', new_legal_js, html_content, flags=re.DOTALL)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("HTML updated successfully with high-fidelity components and assets.")

if __name__ == "__main__":
    update_html()
