export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '47Gear',
    description: 'Magazin online de mousepad-uri gaming premium în România. Control perfect, durabilitate maximă, livrare rapidă.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com'}/logo/logo.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com'}/logo/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressLocality: 'România',
    },
    sameAs: [
      'https://www.instagram.com/47gear',
      'https://www.facebook.com/47gear',
      'https://twitter.com/47gear',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${process.env.WHATSAPP_PHONE_NUMBER}`,
      contactType: 'customer service',
      areaServed: 'RO',
      availableLanguage: ['Romanian', 'English'],
    },
    priceRange: '$$',
    currenciesAccepted: 'RON',
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '47Gear - Mousepad-uri Gaming Premium România',
    alternateName: '47Gear',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com',
    description: 'Magazin online mousepad-uri gaming profesionale în România',
    inLanguage: 'ro-RO',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  url: string;
  sku?: string;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku || product.name.replace(/\s+/g, '-').toLowerCase(),
    brand: {
      '@type': 'Brand',
      name: product.brand || '47Gear',
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: `https://schema.org/${product.availability}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: '47Gear',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
