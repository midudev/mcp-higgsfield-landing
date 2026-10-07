// Datos verificados en arkorestaurant.com (6 de octubre de 2026) y en el intake.
// Todo lo que no se ha podido verificar va marcado como `pending` y solo se ve en desarrollo.

import type { ImageMetadata } from 'astro';
import entrada from '../assets/photos/0-entrada.webp';
import lateralEntrada from '../assets/photos/1-lateral-entrada.webp';
import mesaEspecial from '../assets/photos/2-mesa-especial.webp';
import mesas from '../assets/photos/3-mesas.webp';
import barra from '../assets/photos/4-barra.webp';
import barraLateral from '../assets/photos/5-barra-lateral.webp';
import vinos from '../assets/photos/6-vinos.webp';
// Primer fotograma de cada clip del paseo, sacado del propio MP4 para que encaje exactamente con él:
// ffmpeg -i public/video/paseo-1.mp4 -frames:v 1 -vf "scale=in_color_matrix=bt709:in_range=tv:out_range=pc,format=rgb24" paseo-1.png
import poster1 from '../assets/paseo/paseo-1.webp';
import poster2 from '../assets/paseo/paseo-2.webp';
import poster3 from '../assets/paseo/paseo-3.webp';
import poster4 from '../assets/paseo/paseo-4.webp';
import poster5 from '../assets/paseo/paseo-5.webp';
import poster6 from '../assets/paseo/paseo-6.webp';

export const photos = { entrada, lateralEntrada, mesaEspecial, mesas, barra, barraLateral, vinos };

export const seo = {
  title: 'Arko · Sushi y cocina nikkei en el Eixample, Barcelona',
  description:
    'Restaurante japonés con alma mediterránea en Enric Granados 63, Barcelona. Sushi, nigiri y wagyu, con menús para dos desde 150 €. Abierto todos los días.',
};

// Paseo por Arko (scroll world): un clip 16:9 sin audio por tramo, que avanza o retrocede con el scroll.
// Mientras el clip de un tramo no ha cargado se ve su primer fotograma (`poster`).
// Para que el scrub sea fluido, cada clip necesita keyframes muy seguidos. El color va marcado como BT.709 con curva
// sRGB: sin marcar, o con curva BT.709, el navegador pinta el vídeo más claro que el póster y el cambio se nota.
// ffmpeg -i clip.mp4 -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 28 -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -color_primaries bt709 -color_trc iec61966-2-1 -colorspace bt709 -color_range tv -movflags +faststart+write_colr public/video/paseo-1.mp4
export type Parada = {
  id: string;
  lugar: string;
  /** Clip que va de esta parada a la siguiente. El de la última sigue hasta el final de la sección. */
  clip: string;
  /** Punto horizontal del vídeo (0 a 100) que queda a la vista en móvil, donde el 16:9 se recorta. */
  focus: number;
  /** Primer fotograma del clip, 16:9 como el vídeo. Se ve mientras el clip carga y encaja con él al aparecer. */
  poster: ImageMetadata;
  alt: string;
};

export const paseo: { paradas: Parada[] } = {
  paradas: [
    {
      id: 'inicio',
      lugar: 'La entrada',
      clip: '/video/paseo-1.mp4',
      focus: 50,
      poster: poster1,
      alt: 'Entrada de Arko: un cerezo en flor bajo la bóveda blanca, entre dos ventanas ovaladas',
    },
    {
      id: 'nikkei',
      lugar: 'Los espejos',
      clip: '/video/paseo-2.mp4',
      focus: 50,
      poster: poster2,
      alt: 'Espejos de marco de madera y forma orgánica sobre los bancos de piel del comedor',
    },
    {
      id: 'precio',
      lugar: 'La mesa redonda',
      clip: '/video/paseo-3.mp4',
      focus: 50,
      poster: poster3,
      alt: 'Mesa redonda con banco de piel curvo bajo una lámpara cónica',
    },
    {
      id: 'producto',
      lugar: 'La sala',
      clip: '/video/paseo-4.mp4',
      focus: 50,
      poster: poster4,
      alt: 'Sala principal con mesas de madera, espejos ovalados y luz cálida',
    },
    {
      id: 'shari',
      lugar: 'La barra de sushi',
      clip: '/video/paseo-5.mp4',
      focus: 50,
      poster: poster5,
      alt: 'Barra de sushi con espirales de arena talladas en el frontal',
    },
    {
      id: 'como-reservar',
      lugar: 'La barra',
      clip: '/video/paseo-6.mp4',
      focus: 50,
      poster: poster6,
      alt: 'Barra junto a un cerezo, con nichos ovalados llenos de botellas',
    },
  ],
};

export const links = {
  reservar: 'https://arkorestaurant.myrestoo.net/es/reservar',
  regalar: 'https://www.arkorestaurant.com/es/regala/',
  carta: 'https://www.arkorestaurant.com/es/menu/',
  maps: 'https://maps.google.com/?q=Carrer+Enric+Granados+63+Barcelona',
  instagram: 'https://www.instagram.com/arko.barcelona/',
  telefono: 'tel:+34938299572',
  email: 'mailto:hola@arkorestaurant.com',
};

export const contacto = {
  calle: 'Carrer Enric Granados 63',
  ciudad: '08008 Barcelona',
  codigoPostal: '08008',
  localidad: 'Barcelona',
  barrio: 'Eixample',
  lat: 41.3910158,
  lon: 2.1579108,
  telefono: '+34 938 29 95 72',
  email: 'hola@arkorestaurant.com',
  instagram: '@arko.barcelona',
  horario: 'Lunes a domingo, de 13:00 a 00:00',
  cocina: 'Cocina hasta las 23:00',
};

export const legal = [
  { label: 'Aviso legal', href: 'https://www.arkorestaurant.com/es/legal/' },
  { label: 'Privacidad', href: 'https://www.arkorestaurant.com/es/privacidad/' },
  { label: 'Cookies', href: 'https://www.arkorestaurant.com/es/cookies/' },
  { label: 'Términos de compra', href: 'https://www.arkorestaurant.com/es/terminos-compra/' },
];

export const nav = [
  { label: 'Recorrido', href: '#nikkei' },
  { label: 'Carta', href: '#carta' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Preguntas', href: '#preguntas' },
];

export const experiencias = [
  {
    nombre: 'Arko Short Experience',
    descripcion: 'Menú para 2 personas. Sushi, starters, principal y postre.',
    precio: '150 €',
    porPersona: '75 € por persona',
  },
  {
    nombre: 'Arko Full Experience',
    descripcion: 'Menú degustación completo para 2 personas. 11 pases.',
    precio: '250 €',
    porPersona: '125 € por persona',
    etiqueta: 'Más popular',
  },
];

export const maridaje = {
  nombre: 'Maridaje',
  descripcion: 'Selección de vinos armonizados con el menú, para 2 personas.',
  precio: '+100 €',
};

export const platos = [
  { nombre: 'Carpaccio de ventresca Bluefin trufado', detalle: 'Kizami, wasabi y crema de aguacate' },
  { nombre: 'Ostra con salsa ponzu de fruta de la pasión', detalle: '' },
  { nombre: 'Nigiri Selección', detalle: '' },
  { nombre: 'Picanha de Wagyu a la brasa', detalle: 'Yuca frita y salsa tarí' },
  { nombre: 'Gelato de lúcuma', detalle: 'Sablé, nueces pecanas y caramelo salado' },
];

export const prensa = {
  medio: 'El Periódico',
  fecha: '12 de septiembre de 2024',
  titular: 'Arko un restaurante japonés muy ‘ibicenco’ en el centro de Barcelona',
  entradilla:
    'El nuevo establecimiento de la calle de Enric Granados propone platos eclécticos con excelente producto en un ambiente que te transporta a la isla balear.',
  url: 'https://www.elperiodico.com/es/gastronomia/restaurantes/20240912/arko-restaurante-japones-barcelona-107827904',
};

export type Faq = { pregunta: string; respuesta: string; pending?: string };

export const faqs: Faq[] = [
  {
    pregunta: '¿Qué es Arko?',
    respuesta:
      'Arko es un restaurante de cocina nikkei en Carrer Enric Granados 63, 08008 Barcelona, en el Eixample. La técnica japonesa se encuentra con el producto mediterráneo y la herencia peruana.',
  },
  {
    pregunta: '¿Qué es la cocina nikkei?',
    respuesta:
      'Es la cocina que nace del encuentro entre Japón y Perú. En Arko unimos la técnica japonesa y la herencia peruana con el producto del mar y del mercado mediterráneo.',
  },
  {
    pregunta: '¿Cuánto cuesta cenar en Arko?',
    respuesta:
      'Puedes pedir a la carta o elegir una experiencia para dos: Short Experience por 150 € (75 € por persona) o Full Experience, de 11 pases, por 250 € (125 € por persona). El maridaje de vinos suma 100 € para dos.',
  },
  {
    pregunta: '¿Es seguro comer pescado crudo?',
    respuesta:
      'El salmón y el atún que servimos son 100 % libres de anisakis, sin antibióticos ni hormonas.',
  },
  {
    pregunta: '¿Tenéis opciones sin gluten?',
    respuesta:
      'Toda la soja que servimos en sala es sin gluten. Si tienes alguna alergia o intolerancia, llámanos al +34 938 29 95 72 antes de venir.',
    pending: 'Validar con el restaurante la redacción sobre alergias.',
  },
  {
    pregunta: '¿Qué horario tiene Arko?',
    respuesta: 'Abrimos de lunes a domingo, de 13:00 a 00:00. La cocina sirve hasta las 23:00.',
  },
  {
    pregunta: '¿Dónde está Arko?',
    respuesta:
      'En Carrer Enric Granados 63, 08008 Barcelona, en el corazón del Eixample. Reserva online o llama al +34 938 29 95 72.',
  },
  {
    pregunta: '¿Hacéis grupos o eventos privados?',
    respuesta: 'Sí. Escríbenos a hola@arkorestaurant.com y lo organizamos contigo.',
  },
  {
    pregunta: '¿Puedo regalar una cena?',
    respuesta:
      'Sí. Vendemos vouchers digitales de la Short y la Full Experience, válidos 12 meses y sin fecha fija. El código llega por email al momento. La compra es final y no admite devolución.',
  },
];

export const faqsPendientes = [
  '¿Puedo cancelar o cambiar mi reserva? Falta la política de cancelación.',
  '¿Las experiencias se piden al reservar o en la mesa? Falta confirmarlo.',
];
