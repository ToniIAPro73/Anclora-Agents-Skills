Tokens CSS (variables)

:root{
  /* Anclora Teal Premium */
  --anclora-teal-primary:   #0B313F; /* brand base */
  --anclora-teal-dark:      #07252F; /* footer / overlays */
  --anclora-teal-hover:     #124A50; /* hover / active */
  --anclora-teal-bg:        #0F3F45; /* secondary backgrounds */

  /* Optional helpers (neutral + gold placeholder) */
  --anclora-surface:        rgba(255,255,255,.04);
  --anclora-border:         rgba(255,255,255,.10);
  --anclora-text-on-teal:   rgba(255,255,255,.92);
  --anclora-text-muted:     rgba(255,255,255,.70);
}


Tokens Tailwind (theme.extend)

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        anclora: {
          teal: {
            primary: "#0B313F",
            dark: "#07252F",
            hover: "#124A50",
            bg: "#0F3F45",
          },
        },
      },
    },
  },
};


Reglas de uso (qué fondo para qué contexto)

PRIMARY #0B313F: fondo por defecto de marca. Logo, hero, portada de dossier, secciones “core”.

DARK #07252F: footer, overlays, páginas largas en modo “night”, modales, zonas de alta densidad.

HOVER #124A50: estados hover/active de botones y links, tabs activos, micro-acento (no como fondo dominante).

BACKGROUND #0F3F45: alternancia de secciones, cards grandes, bloques secundarios (mantiene identidad sin oscurecer demasiado).

Regla de oro: el dorado debe ir siempre “metalizado/texturizado”, evitar dorados planos chillones.