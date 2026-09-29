import { arko, experiences, faq, hero, menu, seo, stops, wines } from './arko';

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
  return [
    ...stops.map((stop) => ({
      loc: abs(site, stop.publicSrc),
      title: `${stop.label} · Arko`,
      caption: stop.alt,
    })),
    {
      loc: abs(site, wines.publicSrc),
      title: 'Los vinos · Arko',
      caption: wines.alt,
    },
    ...menu.dishes.map((dish) => ({
      loc: abs(site, dish.publicSrc),
      title: dish.name,
      caption: dish.alt,
    })),
  ];
}

export function structuredData(site: URL) {
  const home = new URL('/', site).href;
  const restaurantId = new URL('/#restaurant', site).href;
  const websiteId = new URL('/#website', site).href;
  const webpageId = new URL('/#webpage', site).href;
  const images = pageImages(site);
  const place = images.slice(0, 4);
  const shareImage = {
    '@type': 'ImageObject',
    url: abs(site, '/og-image.jpg'),
    width: 1200,
    height: 630,
    caption: 'Arko: cocina japonesa con alma mediterránea, junto a la entrada del restaurante',
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': restaurantId,
        name: arko.name,
        alternateName: 'Arko Barcelona',
        slogan: `${hero.title[0]} ${hero.title[1]}`,
        description: seo.description,
        url: home,
        image: [
          shareImage,
          ...place.map((photo) => ({
            '@type': 'ImageObject',
            url: photo.loc,
            caption: photo.caption,
          })),
        ],
        logo: abs(site, '/favicon.svg'),
        telephone: arko.phone.href.replace('tel:', ''),
        priceRange: '€€€',
        servesCuisine: ['Nikkei', 'Japonesa'],
        currenciesAccepted: 'EUR',
        acceptsReservations: true,
        menu: new URL('/#carta', site).href,
        hasMenu: {
          '@type': 'Menu',
          name: 'Carta de Arko',
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Destacados',
              hasMenuItem: menu.dishes.map((dish) => ({
                '@type': 'MenuItem',
                name: dish.name,
                ...(dish.detail ? { description: dish.detail } : {}),
                image: abs(site, dish.publicSrc),
              })),
            },
            {
              '@type': 'MenuSection',
              name: 'Experiencias para dos',
              hasMenuItem: [
                ...experiences.items.map((item) => ({
                  '@type': 'MenuItem',
                  name: item.name,
                  description: `${item.detail} ${item.price} ${item.per}.`,
                  offers: {
                    '@type': 'Offer',
                    price: euros(item.price),
                    priceCurrency: 'EUR',
                  },
                })),
                {
                  '@type': 'MenuItem',
                  name: experiences.pairing.name,
                  description: experiences.pairing.detail,
                  offers: {
                    '@type': 'Offer',
                    price: euros(experiences.pairing.price),
                    priceCurrency: 'EUR',
                  },
                },
              ],
            },
          ],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: arko.address.street,
          postalCode: arko.address.postalCode,
          addressLocality: arko.address.city,
          addressRegion: 'Catalunya',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: arko.address.lat,
          longitude: arko.address.lon,
        },
        hasMap: arko.address.mapsUrl,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: WEEK,
          opens: arko.hours.open,
          closes: arko.hours.close,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: arko.phone.href.replace('tel:', ''),
          contactType: 'reservations',
        },
        sameAs: [arko.instagram.href, 'https://www.arkorestaurant.com/es/'],
        mainEntityOfPage: { '@id': webpageId },
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: arko.reserveUrl,
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: arko.name,
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
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}
