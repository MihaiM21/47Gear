import { getCollections, getPages, getProducts } from "@/lib/shopify";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes with priority and change frequency
  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/search`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/about-us`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact-us`, priority: 0.6, changeFrequency: 'monthly' as const },
  ].map((route) => ({
    ...route,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt,
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...staticRoutes, ...fetchedRoutes];
}
