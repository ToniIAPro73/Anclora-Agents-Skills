import React from 'react';
import { LOGO_ANCLORA_NEXUS, COMPLIANCE_BADGES } from './assets/branding_assets';

/**
 * Anclora Nexus Group - Premium Footer
 * 
 * Features:
 * - Ultra-compact design to minimize scroll height.
 * - Scaled-down Anclora Nexus Group logo.
 * - Compliance badges (GDPR, ISO 9001, EU REG).
 * - Bilingual legal links (Privacidad, Cookies, Código Ético, Términos B2B).
 * - Fiscal and legal data per 2026 compliance standards.
 */

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070a] text-white/60 py-8 px-6 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Row: Logo & Compliance Badges */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          
          {/* Main Logo - Focused on Anclora Nexus Group */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img 
              src={LOGO_ANCLORA_NEXUS} 
              alt="Anclora Nexus Group" 
              className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
            <span className="text-[10px] uppercase tracking-[0.2em] font-light text-white/30">
              Una iniciativa de Anclora Nexus Group
            </span>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex flex-col items-center gap-1">
              <img src={COMPLIANCE_BADGES} alt="Compliance Badges" className="h-10 w-auto" />
            </div>
          </div>
        </div>

        {/* Middle Row: Legal Navigation */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8 text-xs font-medium tracking-wide">
          <a href="/es/legal/privacidad" className="hover:text-[#D4AF37] transition-colors">PRIVACIDAD</a>
          <span className="text-white/10 hidden md:block">|</span>
          <a href="/es/legal/cookies" className="hover:text-[#D4AF37] transition-colors">COOKIES</a>
          <span className="text-white/10 hidden md:block">|</span>
          <a href="/es/legal/codigo-etico" className="hover:text-[#D4AF37] transition-colors">CÓDIGO ÉTICO</a>
          <span className="text-white/10 hidden md:block">|</span>
          <a href="/es/legal/terminos-b2b" className="hover:text-[#D4AF37] transition-colors">TÉRMINOS B2B</a>
        </div>

        {/* Bottom Section: Fiscal Data & Copyright */}
        <div className="w-full pt-6 border-t border-white/5 text-center flex flex-col gap-2">
          <div className="text-[10px] leading-relaxed max-w-3xl mx-auto space-y-1">
            <p>
              <strong>Anclora Private Estates S.L.</strong> • CIF: B-XXXXXXXX • Registro Mercantil de Palma de Mallorca, Tomo XXXX, Folio XX, Hoja PM-XXXXX
            </p>
            <p>
              Sede Social: Paseo del Borne, 15, 07012 Palma de Mallorca, Islas Baleares • API Nº XXXX
            </p>
          </div>
          
          <p className="text-[9px] mt-4 uppercase tracking-widest text-white/20">
            © 2026 ANCLORA NEXUS GROUP. ALL RIGHTS RESERVED. | ID: ANG-PRT-2026-EU
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
