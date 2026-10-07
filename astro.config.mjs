// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL real de esta landing. Canónica, sitemap, og:image y JSON-LD salen de aquí.
  site: 'https://arko-sushi.midudev.workers.dev',
  // Fuentes servidas desde el propio dominio, recortadas a latin con pyftsubset
  // (las originales son japonesas y pesan varios MB). Licencias OFL junto a los archivos.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Hina Mincho',
      cssVariable: '--font-hina',
      fallbacks: ['serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/hina-mincho-latin-400.woff2'], weight: 400, style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Zen Kaku Gothic New',
      cssVariable: '--font-zen',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/zen-kaku-gothic-new-latin-400.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/zen-kaku-gothic-new-latin-500.woff2'], weight: 500, style: 'normal' },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
