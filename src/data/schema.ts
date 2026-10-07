import { contacto, experiencias, faqs, fotosPublicas, links, maridaje, platos, seo } from './arko';

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ogImage = {
  src: '/og-image.jpg',
  alt: 'Arko: cocina japonesa con alma mediterránea, junto a la entrada del restaurante',
};

export interface PageImage {
  loc: string;
  title: string;
  caption: string;
}

function abs(site: URL, path: string) {
  return new URL(path, site).href;
}

function euros(label: string) {
  const match = label.match(/\d+/);
  if (!match) throw new Error(`Precio sin cifra: ${label}`);
  return match[0];
}

export function pageImages(site: URL): PageImage[] {
  return fotosPublicas.map((foto) => ({
    loc: abs(site, foto.src),
    title: `${foto.lugar} · Arko`,
    caption: foto.alt,
  }));
}

export function structuredData(site: URL) {
  const home = new URL('/', site).href;
  const restaurantId = new URL('/#restaurant', site).href;
  const websiteId = new URL('/#website', site).href;
  const webpageId = new URL('/#webpage', site).href;
  const telephone = links.telefono.replace('tel:', '');
  const shareImage = {
    '@type': 'ImageObject',
    url: abs(site, ogImage.src),
    width: 1200,
    height: 630,
    caption: ogImage.alt,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': restaurantId,
        name: 'Arko',
        alternateName: ['Arko Restaurant', 'Arko Barcelona'],
        slogan: 'Cocina japonesa con alma mediterránea',
        description: seo.description,
        url: home,
        image: [
          shareImage,
          ...pageImages(site)
            .slice(0, 4)
            .map((photo) => ({ '@type': 'ImageObject', url: photo.loc, caption: photo.caption })),
        ],
        logo: abs(site, '/apple-touch-icon.png'),
        telephone,
        email: contacto.email,
        priceRange: '€€€',
        servesCuisine: ['Nikkei', 'Japonesa'],
        currenciesAccepted: 'EUR',
        acceptsReservations: true,
        menu: links.carta,
        hasMenu: {
          '@type': 'Menu',
          name: 'Carta de Arko',
          url: links.carta,
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Platos destacados',
              hasMenuItem: platos.map((plato) => ({
                '@type': 'MenuItem',
                name: plato.nombre,
                ...(plato.detalle ? { description: plato.detalle } : {}),
              })),
            },
            {
              '@type': 'MenuSection',
              name: 'Experiencias para dos',
              hasMenuItem: [
                ...experiencias.map((exp) => ({
                  '@type': 'MenuItem',
                  name: exp.nombre,
                  description: `${exp.descripcion} ${exp.porPersona}.`,
                  offers: { '@type': 'Offer', price: euros(exp.precio), priceCurrency: 'EUR' },
                })),
                {
                  '@type': 'MenuItem',
                  name: maridaje.nombre,
                  description: maridaje.descripcion,
                  offers: { '@type': 'Offer', price: euros(maridaje.precio), priceCurrency: 'EUR' },
                },
              ],
            },
          ],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: contacto.calle,
          postalCode: contacto.codigoPostal,
          addressLocality: contacto.localidad,
          addressRegion: 'Catalunya',
          addressCountry: 'ES',
        },
        geo: { '@type': 'GeoCoordinates', latitude: contacto.lat, longitude: contacto.lon },
        hasMap: links.maps,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: WEEK,
          opens: '13:00',
          closes: '00:00',
        },
        contactPoint: { '@type': 'ContactPoint', telephone, contactType: 'reservations' },
        sameAs: [links.instagram, 'https://www.arkorestaurant.com/es/'],
        mainEntityOfPage: { '@id': webpageId },
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: links.reservar,
            actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: 'Arko',
        alternateName: 'Arko Barcelona',
        description: seo.description,
        inLanguage: 'es-ES',
        publisher: { '@id': restaurantId },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: home,
        name: seo.title,
        description: seo.description,
        inLanguage: 'es-ES',
        isPartOf: { '@id': websiteId },
        about: { '@id': restaurantId },
        mainEntity: { '@id': restaurantId },
        primaryImageOfPage: shareImage,
      },
      {
        '@type': 'FAQPage',
        '@id': new URL('/#faq', site).href,
        url: new URL('/#preguntas', site).href,
        inLanguage: 'es-ES',
        isPartOf: { '@id': webpageId },
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
        })),
      },
    ],
  };
}
