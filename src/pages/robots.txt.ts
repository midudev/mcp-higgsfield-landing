import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta site en astro.config.mjs');
  const sitemap = new URL('/sitemap.xml', site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
