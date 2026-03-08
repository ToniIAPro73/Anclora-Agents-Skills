# Tokens de Diseño · Anclora Private Estates

## Tokens CSS (Variables :root)
```css
:root {
  /* Anclora Teal Premium Palette */
  --anclora-teal-primary: #0B313F;
  --anclora-teal-dark:    #07252F;
  --anclora-teal-hover:   #124A50;
  --anclora-teal-bg:      #0F3F45;
  --anclora-gold:         #D4AF37;

  /* Typography */
  --font-headlines: 'Cardo', serif;
  --font-body:      'Inter', sans-serif;
  --font-accents:   'Fraunces', serif; /* Sustituto premium de Canela */
  --font-secondary: 'Cormorant Garamond', serif;

  /* Premium Gold Gradient (Multi-stop) */
  --gold-gradient: linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 50%, #FBF5B7 55%, #AA771C 100%);
}
```

## Tokens Tailwind (theme.extend)
```javascript
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
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        headlines: ["Cardo", "serif"],
        body: ["Inter", "sans-serif"],
        accents: ["Fraunces", "serif"],
      },
      backgroundImage: {
        'gold-metallic': "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 50%, #FBF5B7 55%, #AA771C 100%)",
      }
    },
  },
};
```

## Reglas de Uso
1. **PRIMARY (#0B313F)**: Contextos "core" de marca (Hero, Portadas).
2. **DARK (#07252F)**: Footer, modales, zonas de profundidad visual.
3. **HOVER (#124A50)**: Solo para interacciones y micro-acentos.
4. **GOLD**: Prohibido el uso de dorados planos. Usar siempre el gradiente metálico configurado para transmitir exclusividad.