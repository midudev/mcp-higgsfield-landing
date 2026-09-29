// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio de Arko: se usa para la URL canónica y el og:image absolutos.
  site: 'https://www.arkorestaurant.com',
  // CSS inline: evita una petición que bloquea el render (mejora el LCP en móvil).
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()]
  }
});
