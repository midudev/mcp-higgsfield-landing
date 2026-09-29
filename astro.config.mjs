// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL real de esta landing. Canónica, sitemap, og:image y JSON-LD salen de aquí.
  site: 'https://arko-sushi.midudev.workers.dev',
  // CSS inline: evita una petición que bloquea el render (mejora el LCP en móvil).
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()]
  }
});
