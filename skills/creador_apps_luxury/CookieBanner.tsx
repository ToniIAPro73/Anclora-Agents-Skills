import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

/**
 * CookieBanner v4.2 - Anclora Private Estates
 * TypeScript implementation of the GDPR compliance banner.
 */

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

type ViewMode = 'simple' | 'settings';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always active
    analytics: false,
    marketing: false
  });
  const [view, setView] = useState<ViewMode>('simple');

  useEffect(() => {
    // Check if consent already exists
    const consent = localStorage.getItem('anclora_consent_v4.2');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (data: CookiePreferences) => {
    localStorage.setItem('anclora_consent_v4.2', JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      version: "4.2.0"
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:max-w-md z-[9999] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-[#0A1F3D] border border-[#C5A059]/30 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden font-['Montserrat']">
        
        {/* Decorative Header */}
        <div className="h-1 bg-gradient-to-r from-[#C5A059] via-[#8D734A] to-[#C5A059]"></div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center text-[#0A1F3D]">
              <Cookie size={18} />
            </div>
            <h3 className="font-serif italic text-lg tracking-tight">Privacidad & Cookies</h3>
          </div>

          {view === 'simple' ? (
            <>
              <p className="text-[11px] text-white/70 leading-relaxed mb-6 italic">
                En Anclora Private Estates utilizamos tecnologías propias y de terceros para asegurar la excelencia en su navegación y para cualificar el interés en activos de inversión de lujo.
              </p>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleAcceptAll}
                  className="w-full bg-[#C5A059] text-[#0A1F3D] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#dec28d] transition-all"
                >
                  Aceptar Todas
                </button>
                <button 
                  onClick={() => setView('settings')}
                  className="w-full border border-white/20 text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                >
                  Configurar Preferencias
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3 mb-6">
                {/* Switch: Essential */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Técnicas</span>
                    <span className="text-[8px] text-white/40 italic">Inhabilitables por seguridad</span>
                  </div>
                  <div className="w-8 h-4 bg-[#C5A059] rounded-full relative opacity-50 cursor-not-allowed">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-[#0A1F3D] rounded-full"></div>
                  </div>
                </div>

                {/* Switch: Analytics */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Análisis</span>
                    <span className="text-[8px] text-white/40 italic">Optimización de experiencia UHNWI</span>
                  </div>
                  <button 
                    onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                    className={`w-8 h-4 rounded-full relative transition-colors ${preferences.analytics ? 'bg-[#C5A059]' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-[#0A1F3D] rounded-full transition-all ${preferences.analytics ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>

                {/* Switch: Marketing */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Marketing</span>
                    <span className="text-[8px] text-white/40 italic">Ofertas exclusivas de inversión</span>
                  </div>
                  <button 
                    onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                    className={`w-8 h-4 rounded-full relative transition-colors ${preferences.marketing ? 'bg-[#C5A059]' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-[#0A1F3D] rounded-full transition-all ${preferences.marketing ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setView('simple')}
                  className="flex-1 border border-white/20 text-white py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Volver
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="flex-1 bg-[#C5A059] text-[#0A1F3D] py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-[#dec28d] transition-all"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
            <a href="#privacy" className="text-[8px] uppercase tracking-widest text-[#8D734A] hover:text-[#C5A059] transition-colors font-bold">Ver política completa</a>
            <div className="flex items-center gap-1 text-[8px] font-bold text-white/30 uppercase">
              <ShieldCheck size={10} /> GDPR Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Preview Component for Canvas - Converted to TS
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F7F2] relative overflow-hidden flex flex-col items-center justify-center p-12">
      {/* Simulated Brand Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
        <h1 className="text-[20vw] font-serif font-bold text-[#0A1F3D]">ANCLORA</h1>
      </div>

      <div className="text-center z-10">
        <h1 className="font-serif text-5xl text-[#0A1F3D] mb-4 italic">Sistema de Consentimiento v4.2</h1>
        <p className="text-[#8D734A] uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Protocolo SDD - Blindaje Legal Automático</p>
        
        <div className="p-8 bg-white shadow-xl border border-gray-100 max-w-2xl">
          <p className="text-sm text-gray-500 leading-relaxed font-['Montserrat']">
            Este componente se carga automáticamente siguiendo las reglas de la <strong>Constitución</strong>. 
            El banner de cookies en Anclora no es un accesorio, es el primer filtro de <strong>Cumplimiento Normativo</strong>.
          </p>
        </div>
      </div>

      <CookieBanner />
    </div>
  );
};

export default App;
