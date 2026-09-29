// Todos los textos reales de la landing, para revisarlos de un vistazo.
// Fuente: arkorestaurant.com (comprobado el 29 de septiembre de 2026).
// Logo: arkorestaurant.com/logo.svg (un PNG dentro de un SVG), vectorizado con
// potrace en src/assets/arko/logo.svg para poder colorearlo con currentColor.
// Pendiente de Arko: el nombre de los platos de repuesto
// (photo-01 a photo-05, photo-16, photo-21, photo-25) y la carta de cócteles.

import entrada from '../assets/arko/paradas/0-entrada.jpg';
import espejos from '../assets/arko/paradas/1-lateral-entrada.jpg';
import mesaEspecial from '../assets/arko/paradas/2-mesa-especial.jpg';
import comedor from '../assets/arko/paradas/3-mesas.jpg';
import barra from '../assets/arko/paradas/4-barra.jpg';
import mimbre from '../assets/arko/paradas/5-barra-lateral.jpg';

import carpaccio from '../assets/arko/photo-07.jpg';
import ostra from '../assets/arko/photo-26.jpg';
import nigiri from '../assets/arko/photo-08.jpg';
import picanha from '../assets/arko/photo-15.jpg';
import gelato from '../assets/arko/photo-11.jpg';

export const arko = {
  name: 'Arko',
  cuisine: 'Cocina nikkei',
  reserveUrl: 'https://arkorestaurant.myrestoo.net/en/reservar',
  giftUrl: 'https://www.arkorestaurant.com/es/regala/',
  address: {
    street: 'Carrer Enric Granados 63',
    postalCode: '08008',
    city: 'Barcelona',
    area: 'Eixample',
    lat: 41.3910158,
    lon: 2.1579108,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Arko+Restaurant+Carrer+Enric+Granados+63+08008+Barcelona',
  },
  hours: { label: 'Todos los días', open: '13:00', close: '00:00' },
  phone: { label: '+34 938 29 95 72', href: 'tel:+34938299572' },
  instagram: { label: '@arko.barcelona', href: 'https://www.instagram.com/arko.barcelona/' },
  legal: [
    { label: 'Aviso legal', href: 'https://www.arkorestaurant.com/es/legal/' },
    { label: 'Privacidad', href: 'https://www.arkorestaurant.com/es/privacidad/' },
    { label: 'Cookies', href: 'https://www.arkorestaurant.com/es/cookies/' },
    { label: 'Términos de compra', href: 'https://www.arkorestaurant.com/es/terminos-compra/' },
  ],
};

export const seo = {
  title: 'Arko Barcelona · Restaurante nikkei en el Eixample',
  description:
    'Restaurante nikkei en Enric Granados 63, Eixample, Barcelona. Experiencias para dos desde 150 €. Abierto todos los días de 13:00 a 00:00. Reserva tu mesa.',
};

export const hero = {
  eyebrow: 'Arko · Nikkei en el Eixample',
  title: ['Cocina japonesa', 'con alma mediterránea'],
  subtitle: 'Técnica nipona, ingredientes del mar y del mercado, sabor de Barcelona.',
  cta: 'Reservar mesa',
  facts: [
    { label: 'Dónde', value: 'Enric Granados 63' },
    { label: 'Cuándo', value: 'Todos los días, 13:00 a 00:00' },
    { label: 'Para dos', value: 'Experiencias desde 150 €' },
  ],
  scrollCue: 'Desliza para entrar',
};

export const tagline = {
  text: 'Un restaurante donde la disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana.',
  coda: 'Sin concesiones: técnica nipona, ingredientes del mar y del mercado, sabor de Barcelona.',
};

export const experiences = {
  title: 'Dos experiencias para dos',
  intro: 'Elige cuánto quieres probar. Las dos están pensadas para compartir.',
  items: [
    {
      name: 'Arko Short Experience',
      detail: 'Menú para 2 personas: sushi, starters, principal y postre.',
      price: '150 €',
      per: 'para 2',
    },
    {
      name: 'Arko Full Experience',
      detail: 'Menú degustación completo para 2 personas, 11 pases.',
      price: '250 €',
      per: 'para 2',
    },
  ],
  pairing: {
    name: 'Maridaje',
    detail: 'Selección de vinos armonizados.',
    price: '+100 €',
  },
  gift: 'Regalar una experiencia',
};

export const menu = {
  title: 'Cinco platos para empezar a conocernos',
  intro: 'Los destacados de la carta.',
  dishes: [
    {
      name: 'Carpaccio de ventresca Bluefin trufado',
      detail: 'Kizami, wasabi y crema de aguacate.',
      image: carpaccio,
      publicSrc: '/photos/photo-07.jpg',
      alt: 'Carpaccio de ventresca con láminas de trufa negra y puntos de crema de aguacate sobre un plato alargado',
    },
    {
      name: 'Ostra',
      detail: 'Con salsa ponzu de fruta de la pasión.',
      image: ostra,
      publicSrc: '/photos/photo-26.jpg',
      alt: 'Ostras sobre sal gruesa, una de ellas con perlas amarillas de fruta de la pasión',
    },
    {
      name: 'Nigiri Selección',
      detail: '',
      image: nigiri,
      publicSrc: '/photos/photo-08.jpg',
      alt: 'Nigiris de salmón flambeado, pescado blanco, wagyu y anguila sobre una bandeja blanca',
    },
    {
      name: 'Picanha de Wagyu a la brasa',
      detail: 'Yuca frita y salsa tarí.',
      image: picanha,
      publicSrc: '/photos/photo-15.jpg',
      alt: 'Picanha de wagyu a la brasa laminada en un plato de cerámica, con yuca frita al lado',
    },
    {
      name: 'Gelato de lúcuma',
      detail: 'Sablé, nueces pecanas y caramelo salado.',
      image: gelato,
      publicSrc: '/photos/photo-11.jpg',
      alt: 'Helado de lúcuma con caramelo en un cuenco de piedra delante de una pared de espirales de yeso',
    },
  ],
};

export const rice = {
  title: 'El arroz que lo cambia todo',
  body: 'Arroz Koshihikari con vinagre de arroz rojo de una casa japonesa fundada en 1937.',
  facts: [
    { value: '1937', label: 'Fundación de la casa japonesa de nuestro vinagre de arroz rojo' },
    { value: '100 %', label: 'Salmón y atún libres de anisakis, sin antibióticos ni hormonas' },
    { value: 'Sin gluten', label: 'Toda la soja que servimos en sala' },
  ],
};

export const reserve = {
  title: 'Tu mesa en Enric Granados 63',
  body: 'Reserva online o llámanos.',
  closing: 'Te guardamos mesa.',
};

export const faq = [
  {
    q: '¿Qué es Arko?',
    a: 'Arko es un restaurante de cocina nikkei en Carrer Enric Granados 63, 08008 Barcelona, en el Eixample. La técnica japonesa se encuentra con el producto mediterráneo y la herencia peruana.',
  },
  {
    q: '¿Qué horario tiene Arko?',
    a: 'Abrimos todos los días, de lunes a domingo, de 13:00 a 00:00.',
  },
  {
    q: '¿Dónde está Arko?',
    a: 'En Carrer Enric Granados 63, 08008 Barcelona, en el Eixample. Reserva online o llama al +34 938 29 95 72.',
  },
  {
    q: '¿Qué es la cocina nikkei?',
    a: 'Es la cocina que nace del encuentro entre Japón y Perú. En Arko la disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana.',
  },
  {
    q: '¿Tenéis opciones sin gluten?',
    a: 'Toda la soja que servimos en sala es sin gluten. Si tienes alguna alergia o intolerancia, cuéntanoslo al reservar.',
  },
  {
    q: '¿Es seguro el pescado crudo?',
    a: 'El salmón y el atún que servimos son 100 % libres de anisakis y no llevan antibióticos ni hormonas.',
  },
  {
    q: '¿Cuánto cuesta cenar en Arko?',
    a: 'La Arko Short Experience es un menú para 2 personas con sushi, starters, principal y postre por 150 €. La Arko Full Experience es el menú degustación de 11 pases para 2 personas por 250 €. El maridaje de vinos son 100 € más.',
  },
  {
    q: '¿Puedo regalar una experiencia?',
    a: 'Sí. Puedes regalar cualquiera de las dos experiencias desde nuestra página de regalos.',
    link: { label: 'Regalar una experiencia', href: 'https://www.arkorestaurant.com/es/regala/' },
  },
  {
    q: '¿Cómo reservo mesa en Arko?',
    a: 'Online, desde el botón de reservar, o por teléfono en el +34 938 29 95 72.',
  },
];

// Recorrido: seis paradas (fotos recortadas a 9:16), cinco tramos entre ellas
// y tres cinemagraphs, todo generado con el MCP de Higgsfield (Kling 3.0 pro).
// Los tramos van unidos en un solo vídeo; en la web se usan los cinemagraphs de
// la primera y la última parada (el de la barra queda en raw-video/p4.mp4).
export const wines = {
  publicSrc: '/photos/6-vinos.jpg',
  alt: 'El pasillo de las vitrinas de vino de Arko, con una puerta de espejo al fondo',
};

export const stops = [
  {
    id: 'entrada',
    label: 'La entrada',
    publicSrc: '/photos/0-entrada.jpg',
    still: entrada,
    alt: 'La entrada de Arko: un cerezo en flor sobre la puerta de cristal, ventanas ovaladas y mesas de nogal',
    cinemagraph: '/video/paradas/0.mp4',
  },
  {
    id: 'espejos',
    label: 'Los espejos',
    publicSrc: '/photos/1-lateral-entrada.jpg',
    still: espejos,
    alt: 'Pared de espejos de borde orgánico junto a una ventana ovalada, con sillas tapizadas y alfombra índigo y naranja',
  },
  {
    id: 'mesa-especial',
    label: 'La mesa especial',
    publicSrc: '/photos/2-mesa-especial.jpg',
    still: mesaEspecial,
    alt: 'Reservado redondo de cuero bajo una lámpara colgante, con plantas y un bonsái en una tinaja blanca',
  },
  {
    id: 'comedor',
    label: 'El comedor',
    publicSrc: '/photos/3-mesas.jpg',
    still: comedor,
    alt: 'Comedor largo con mesas de nogal, espejos ovalados en la pared y arcos de yeso',
  },
  {
    id: 'barra',
    label: 'La barra',
    publicSrc: '/photos/4-barra.jpg',
    still: barra,
    alt: 'La barra con espirales de arena talladas, una ola de yeso iluminada encima y ramas de cerezo en el techo',
  },
  {
    id: 'mimbre',
    label: 'El reservado de mimbre',
    publicSrc: '/photos/5-barra-lateral.jpg',
    still: mimbre,
    alt: 'El reservado de mimbre junto a un cerezo rosa y la barra de espirales, bajo un techo con el dibujo de la alfombra',
    cinemagraph: '/video/paradas/5.mp4',
  },
];

// Los cinco tramos unidos con fundidos de 4 fotogramas: 589 fotogramas, 24,5 s.
export const tour = {
  src: '/video/recorrido.mp4',
  srcMobile: '/video/recorrido-m.mp4',
};

export const nav = [
  { label: 'El local', href: '#entrada' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'La carta', href: '#carta' },
  { label: 'El arroz', href: '#arroz' },
  { label: 'Reservar', href: '#reserva' },
  { label: 'Preguntas', href: '#preguntas' },
];
