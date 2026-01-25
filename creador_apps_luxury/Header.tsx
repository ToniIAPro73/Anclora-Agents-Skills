import React from 'react';
import { LOGO_PRIVATE_ESTATES } from './assets/branding_assets';

/**
 * Anclora Private Estates - Premium Header
 * 
 * Features:
 * - Prominent application logo (h-14) for strong brand dominance.
 * - Minimalist navigation following luxury brand guidelines.
 * - Semi-transparent navy background with subtle border.
 */

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-[#0A1F3D]/95 backdrop-blur-md border-b border-white/10 z-50 px-8 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <a href="/" className="transition-transform hover:scale-[1.02]">
          <img 
            src={LOGO_PRIVATE_ESTATES} 
            alt="Anclora Private Estates" 
            className="h-14 w-auto drop-shadow-2xl"
          />
        </a>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <a href="/es/propiedades" className="text-white font-medium tracking-widest text-[11px] uppercase hover:text-[#D4AF37] transition-colors">Propiedades</a>
        <a href="/es/servicios" className="text-white font-medium tracking-widest text-[11px] uppercase hover:text-[#D4AF37] transition-colors">Servicios</a>
        <a href="/es/inversores" className="text-white font-medium tracking-widest text-[11px] uppercase hover:text-[#D4AF37] transition-colors">Inversores</a>
        <a href="/es/contacto" className="bg-[#D4AF37] text-[#0A1F3D] px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-[#e6c96e] transition-all">Contacto</a>
      </nav>
      
      {/* Mobile Menu Icon (Placeholder) */}
      <div className="md:hidden text-[#D4AF37]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </header>
  );
};

// Removed redundant export default Header;
