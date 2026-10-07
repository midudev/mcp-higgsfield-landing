// Imágenes con URL fija en public/. Este archivo no importa nada de astro:assets porque también lo lee
// astro.config.mjs para añadir las imágenes al sitemap.

export const ogImage = {
  src: '/og-image.jpg',
  title: 'Arko · Cocina japonesa con alma mediterránea',
  alt: 'Arko: cocina japonesa con alma mediterránea, junto a la entrada del restaurante',
};

// Las mismas fotos del local en JPG con URL fija en public/photos: el sitemap de imágenes y el JSON-LD necesitan
// direcciones estables, no las que genera astro:assets en cada build.
export const fotosPublicas = [
  {
    src: '/photos/0-entrada.jpg',
    lugar: 'La entrada',
    alt: 'La entrada de Arko: un cerezo en flor sobre la puerta de cristal, ventanas ovaladas y mesas de nogal',
  },
  {
    src: '/photos/1-lateral-entrada.jpg',
    lugar: 'Los espejos',
    alt: 'Pared de espejos de borde orgánico junto a una ventana ovalada, con sillas tapizadas y alfombra índigo y naranja',
  },
  {
    src: '/photos/2-mesa-especial.jpg',
    lugar: 'La mesa redonda',
    alt: 'Reservado redondo de cuero bajo una lámpara colgante, con plantas y un bonsái en una tinaja blanca',
  },
  {
    src: '/photos/3-mesas.jpg',
    lugar: 'La sala',
    alt: 'Comedor largo con mesas de nogal, espejos ovalados en la pared y arcos de yeso',
  },
  {
    src: '/photos/4-barra.jpg',
    lugar: 'La barra de sushi',
    alt: 'La barra con espirales de arena talladas, una ola de yeso iluminada encima y ramas de cerezo en el techo',
  },
  {
    src: '/photos/5-barra-lateral.jpg',
    lugar: 'La barra',
    alt: 'El reservado de mimbre junto a un cerezo rosa y la barra de espirales, bajo un techo con el dibujo de la alfombra',
  },
  {
    src: '/photos/6-vinos.jpg',
    lugar: 'Los vinos',
    alt: 'El pasillo de las vitrinas de vino de Arko, con una puerta de espejo al fondo',
  },
];
