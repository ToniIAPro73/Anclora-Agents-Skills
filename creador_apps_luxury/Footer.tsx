import React from 'react';
import { LOGO_ANCLORA_NEXUS } from './assets/branding_assets';
import { Check, Shield } from 'lucide-react';

/**
 * Anclora Nexus Group - Ultimate Premium Footer v2.0
 * 
 * Design Philosophy:
 * - High-fidelity "Data Lab" aesthetic.
 * - Multi-row hierarchical navigation.
 * - Distinct compliance identifiers (GDPR, ISO 9001, EU REG).
 * - Integrated fiscal and legal data.
 */

const Footer = () => {
  return (
    <footer className="bg-[#0A1F3D] text-white/80 py-16 px-8 font-sans border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Row 1: Tactical Navigation & Language */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b border-white/5 pb-8">
          <nav className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            <a href="/tesis" className="hover:text-[#C5A059] transition-colors">Tesis Inversión</a>
            <a href="/datalab" className="hover:text-[#C5A059] transition-colors">Data Lab</a>
            <a href="/certificaciones" className="hover:text-[#C5A059] transition-colors">Certificaciones</a>
          </nav>
          
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-[10px] font-bold text-[#C5A059] cursor-default">ES</span>
            <span className="text-white/10">|</span>
            <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">EN</button>
            <span className="text-white/10">|</span>
            <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">DE</button>
          </div>
        </div>

        {/* Row 2: Central Branding / Functional Space */}
        <div className="w-full h-80 bg-white/5 border border-white/10 mb-16 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1F3D]/80 pointer-events-none"></div>
          <div className="text-center z-10 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
             <p className="text-[12px] uppercase tracking-[1em] mb-2 font-light">Anclora Strategic Holdings</p>
             <div className="h-px w-20 bg-[#C5A059] mx-auto"></div>
          </div>
        </div>

        {/* Row 3: Compliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center rounded-sm group-hover:border-[#C5A059] transition-colors duration-500">
              <Check className="text-white" size={24} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">GDPR</span>
          </div>
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center rounded-sm group-hover:border-[#C5A059] transition-colors duration-500">
              <Check className="text-white" size={24} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">ISO 9001</span>
          </div>
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center rounded-md group-hover:border-[#C5A059] transition-colors duration-500">
              <Shield className="text-white" size={24} fill="currentColor" fillOpacity={0.1} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">EU REG</span>
          </div>
        </div>

        {/* Row 4: Master Legal Links (Gold) */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
          {['PRIVACIDAD', 'COOKIES', 'CÓDIGO ÉTICO', 'TÉRMINOS B2B'].map((link) => (
            <a key={link} href={`/legal/${link.toLowerCase().replace(' ', '-')}`} 
               className="text-[11px] font-bold text-[#C5A059] tracking-[0.3em] hover:text-white transition-all hover:scale-110 active:scale-95">
              {link}
            </a>
          ))}
        </div>

        {/* Row 5: Institutional Disclaimer */}
        <div className="max-w-4xl text-center mb-16">
          <p className="text-[10px] leading-relaxed text-white/30 italic uppercase tracking-wider font-light">
            <span className="font-bold text-white/50">Disclaimer Institucional:</span> Los datos presentados en Anclora Data Lab v2.0 se basan en análisis históricos y proyecciones algorítmicas propias. Anclora Nexus Group opera bajo las normativas más estrictas de la UE y estándares internacionales de transparencia UHNWI.
          </p>
        </div>

        {/* Row 6: Final Signature & Corporate Data */}
        <div className="w-full pt-12 border-t border-white/5 flex flex-col items-center gap-8 text-center">
          
          <div className="flex flex-col items-center gap-4">
             <img src={LOGO_ANCLORA_NEXUS} alt="Parent Logo" className="h-3 w-auto opacity-40 hover:opacity-100 transition-opacity" />
             <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">© 2026 ANCLORA NEXUS GROUP. ALL RIGHTS RESERVED.</p>
          </div>

          <div className="text-[9px] text-white/10 tracking-[0.1em] flex flex-wrap justify-center gap-4">
            <span>ID: ANG-PRT-2026-EU</span>
            <span className="hidden md:inline">|</span>
            <span>ANCLORA PRIVATE ESTATES S.L. • B-XXXXXXXX</span>
            <span className="hidden md:inline">|</span>
            <span>PASEO DEL BORNE, 15, 07012 PALMA DE MALLORCA</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
