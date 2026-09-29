import type { APIRoute } from 'astro';
import { pageImages } from '../data/schema';

function xml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta site en astro.config.mjs');
  const loc = new URL('/', site).href;
  const images = [
    {
      loc: new URL('/og-image.jpg', site).href,
      title: 'Arko · Cocina japonesa con alma mediterránea',
      caption: 'Arko: cocina japonesa con alma mediterránea, junto a la entrada del restaurante',
    },
    ...pageImages(site),
  ]
    .map(
      (image) => `    <image:image>
      <image:loc>${xml(image.loc)}</image:loc>
      <image:title>${xml(image.title)}</image:title>
      <image:caption>${xml(image.caption)}</image:caption>
    </image:image>`,
    )
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${xml(loc)}</loc>
${images}
  </url>
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
