import type { APIRoute } from 'astro';
import { contacto, experiencias, faqs, links, maridaje, seo } from '../data/arko';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta site en astro.config.mjs');
  const home = new URL('/', site).href;
  const experienceLines = experiencias
    .map((exp) => `- ${exp.nombre}: ${exp.precio} (${exp.porPersona}). ${exp.descripcion}`)
    .join('\n');
  const questions = faqs.map((faq) => `### ${faq.pregunta}\n\n${faq.respuesta}`).join('\n\n');
  const body = `# Arko

> ${seo.description}

Cocina japonesa con alma mediterránea. La disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana.

## Datos

- Dirección: ${contacto.calle}, ${contacto.ciudad} (${contacto.barrio})
- Horario: ${contacto.horario}. ${contacto.cocina}.
- Teléfono: ${contacto.telefono}
- Email: ${contacto.email}
- Cocina: nikkei. Técnica japonesa, producto mediterráneo y herencia peruana.
${experienceLines}
- ${maridaje.nombre}: ${maridaje.precio}. ${maridaje.descripcion}
- Carta: ${links.carta}
- Reservas: ${links.reservar}
- Regalar: ${links.regalar}
- Instagram: ${links.instagram}
- Página: ${home}

## Preguntas frecuentes

${questions}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
