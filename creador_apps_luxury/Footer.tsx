import React, { useState } from 'react';
import { LOGO_ANCLORA_NEXUS } from './assets/branding_assets';
import { Check, Shield, Info, ChevronRight } from 'lucide-react';

/**
 * Anclora Nexus Group - Ultimate High-Fidelity Footer v3.0
 * 
 * Features:
 * - Tiny signature parent logo (h-2.5).
 * - "Data Lab" style grid for GDPR, ISO 9001, and EU REG with verification state.
 * - Interactive legal links with integrated bilingual summaries.
 * - Precision institutional disclaimer.
 */

const Footer = () => {
  const [activeLegal, setActiveLegal] = useState<string | null>(null);

  const legalContent = {
    PRIVACIDAD: {
      url: "/legal/privacidad",
      es: "Sus datos serán tratados con la exclusiva finalidad de gestionar su solicitud y mantenerle informado sobre nuestras propiedades de lujo. No cedemos datos a terceros sin consentimiento expreso.",
      en: "Your data will be processed solely to manage your requests and keep you informed about our luxury properties. We do not share data with third parties without express consent."
    },
    COOKIES: {
      url: "/legal/cookies",
      es: "Utilizamos cookies propias y de terceros para mejorar su experiencia de navegación y realizar análisis estadísticos. Puede configurarlas en cualquier momento.",
      en: "We use first and third-party cookies to improve your browsing experience and perform statistical analysis. You can configure them at any time."
    },
    "CÓDIGO ÉTICO": {
      url: "/legal/codigo-etico",
      es: "Integridad y confidencialidad absoluta (UHNWI). Compromiso con el desarrollo sostenible y la excelencia tecnológica en Baleares.",
      en: "Integrity and absolute confidentiality (UHNWI). Commitment to sustainable development and technological excellence in the Balearic Islands."
    },
    "TÉRMINOS B2B": {
      url: "/legal/terminos-b2b",
      es: "Condiciones exclusivas para colaboradores inmobiliarios. Programa de referral (20%) y protección de leads 'First Touch Wins'.",
      en: "Exclusive conditions for real estate collaborators. Referral program (20%) and 'First Touch Wins' lead protection rules."
    }
  };

  return (
    <footer className="bg-[#05070a] text-white/50 py-20 px-8 font-sans border-t border-white/5 mt-32 select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Tactical Navigation Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-white/5 pb-8">
           <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
              <a href="/tesis" className="hover:text-[#C5A059] transition-all duration-300">Tesis Inversión</a>
              <a href="/datalab" className="hover:text-[#C5A059] transition-all duration-300 underline decoration-[#C5A059]/30 underline-offset-8">Anclora Data Lab</a>
              <a href="/certificaciones" className="hover:text-[#C5A059] transition-all duration-300">Certificaciones</a>
           </div>
           
           <div className="flex items-center gap-6 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/5 shadow-inner">
              <span className="text-[9px] font-black text-[#C5A059] tracking-widest cursor-default">ES</span>
              <span className="text-white/5 h-3 w-px"></span>
              <button className="text-[9px] font-bold text-white/20 hover:text-white transition-colors tracking-widest">EN</button>
              <span className="text-white/5 h-3 w-px"></span>
              <button className="text-[9px] font-bold text-white/20 hover:text-white transition-colors tracking-widest">DE</button>
           </div>
        </div>

        {/* Compliance Visualization Grid */}
        <div className="grid grid-cols-3 gap-12 md:gap-32 mb-20">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-white/[0.01] border border-white/10 flex items-center justify-center rounded-sm ring-1 ring-white/5 group-hover:border-[#C5A059]/50 transition-all duration-700 shadow-2xl">
              <Check className="text-[#C5A059] group-hover:text-white transition-colors" size={24} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">GDPR</span>
          </div>
          
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-white/[0.01] border border-white/10 flex items-center justify-center rounded-sm ring-1 ring-white/5 group-hover:border-[#C5A059]/50 transition-all duration-700 shadow-2xl">
               <Check className="text-[#C5A059] group-hover:text-white transition-colors" size={24} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">ISO 9001</span>
          </div>

          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-white/[0.01] border border-white/10 flex items-center justify-center rounded-sm ring-1 ring-white/5 group-hover:border-[#C5A059]/50 transition-all duration-700 shadow-2xl">
               <Shield className="text-[#C5A059] group-hover:text-white transition-colors" size={24} fill="currentColor" fillOpacity={0.05} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">EU REG</span>
          </div>
        </div>

        {/* Dynamic Legal Infrastructure */}
        <div className="w-full max-w-5xl space-y-12 mb-24">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 border-y border-white/5 py-8">
            {Object.keys(legalContent).map((key) => (
              <button 
                key={key}
                onMouseEnter={() => setActiveLegal(key)}
                className={`text-[11px] font-black tracking-[0.4em] transition-all duration-500 hover:scale-105 ${activeLegal === key ? 'text-white' : 'text-[#C5A059] opacity-70'}`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="min-h-[80px] text-center px-8 transition-opacity duration-1000 ease-in-out">
            {activeLegal ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                <p className="text-[11px] text-white/40 leading-relaxed italic mb-4">
                  {legalContent[activeLegal as keyof typeof legalContent].es}
                </p>
                <a href={legalContent[activeLegal as keyof typeof legalContent].url} className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-x-1 transition-transform">
                  Ver protocolo completo <ChevronRight size={12} />
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 text-white/10 uppercase tracking-[0.2em] text-[10px]">
                <Info size={14} opacity={0.5} /> Seleccione una división legal para ver detalles
              </div>
            )}
          </div>
        </div>

        {/* Institutional Foundation */}
        <div className="w-full flex flex-col items-center gap-12 text-center border-t border-white/5 pt-16">
          <div className="flex flex-col items-center gap-4">
            <img src={LOGO_ANCLORA_NEXUS} alt="Parent Logo" className="h-[10px] w-auto grayscale opacity-20 hover:opacity-100 transition-all duration-1000" />
            <p className="text-[8px] uppercase tracking-[0.6em] text-white/10 font-bold">Anclora Nexus Strategic Holdings</p>
          </div>

          <div className="max-w-4xl opacity-30 px-6">
            <p className="text-[9px] leading-relaxed uppercase tracking-wider font-light mb-8">
              <span className="font-black text-white/40">Disclaimer Institucional:</span> Los algoritmos de Anclora Data Lab v2.0 procesan datos históricos de activos UHNWI bajo estricto cumplimiento del Reglamento (UE) 2016/679. El acceso a redes privadas de inversión está sujeto a cualificación previa.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-[8px] font-black tracking-[0.3em] text-white/10 border-t border-white/[0.02] pt-8 w-full">
            <span>© 2026 ANCLORA NEXUS GROUP</span>
            <span className="hidden md:inline">|</span>
            <span>ID: ANG-LAB-PRO-2026-EU</span>
            <span className="hidden md:inline">|</span>
            <span>API Nº 12492-BAL</span>
            <span className="hidden md:inline">|</span>
            <span>PALMA • MADRID • LONDON</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
