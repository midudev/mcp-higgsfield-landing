import type { APIRoute } from 'astro';
import { arko, experiences, faq, hero, seo } from '../data/arko';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta site en astro.config.mjs');
  const home = new URL('/', site).href;
  const experienceLines = experiences.items
    .map((item) => `- ${item.name}: ${item.price} ${item.per}. ${item.detail}`)
    .join('\n');
  const questions = faq.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n');
  const body = `# ${arko.name}

> ${seo.description}

${hero.title[0]} ${hero.title[1]}. ${hero.subtitle}

## Datos

- Dirección: ${arko.address.street}, ${arko.address.postalCode} ${arko.address.city} (${arko.address.area})
- Horario: ${arko.hours.label}, ${arko.hours.open} a ${arko.hours.close}
- Teléfono: ${arko.phone.label}
- Cocina: nikkei. Técnica japonesa, producto mediterráneo y herencia peruana.
${experienceLines}
- ${experiences.pairing.name}: ${experiences.pairing.price}. ${experiences.pairing.detail}
- Reservas: ${arko.reserveUrl}
- Regalar: ${arko.giftUrl}
- Instagram: ${arko.instagram.href}
- Página: ${home}

## Preguntas frecuentes

${questions}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
