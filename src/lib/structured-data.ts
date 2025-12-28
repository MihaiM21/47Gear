export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '47Gear',
    description: 'Premium gaming mousepads for professional gamers',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com'}/logo/logo.png`,
    sameAs: [
      'https://www.instagram.com/47gear',
      'https://www.facebook.com/47gear',
      'https://twitter.com/47gear',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${process.env.WHATSAPP_PHONE_NUMBER}`,
      contactType: 'customer service',
      availableLanguage: ['Romanian', 'English'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '47Gear',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://47gear.com',
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: '47Gear',
      },
    },
    brand: {
      '@type': 'Brand',
      name: '47Gear',
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
