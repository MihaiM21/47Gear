import { GridTileImage } from "@/components/grid/tile";
import Gallery from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductDescription } from "@/components/product/product-description";
import { ProductDetailsAndSpecs } from "@/components/product/product-details-specs";
import { ProductFAQ } from "@/components/product/product-faq";
import { ProductStory } from "@/components/product/product-story";
import { ReviewsSection } from "@/components/product/reviews-section-wrapper";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Image } from "@/lib/shopify/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  // Generate Romanian SEO-friendly title and description
  const seoTitle = product.seo.title || `${product.title} - Mousepad Gaming Premium | 47Gear`;
  const seoDescription = product.seo.description || 
    `Cumpără ${product.title} - mousepad gaming profesional cu control perfect și durabilitate maximă. Livrare rapidă în România. Preț special online!`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      product.title.toLowerCase(),
      "mousepad gaming",
      "mousepad romania",
      "mousepad gaming profesional",
      "mousepad mare",
      "mousepad control",
      "accesorii gaming",
      "47gear"
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/product/${handle}`,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      images: url
        ? [
            {
              url,
              width,
              height,
              alt: alt || `${product.title} - Mousepad Gaming`,
            },
          ]
        : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return notFound();
  return (
    <ProductProvider>
      <div className="mt-12 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row lg:gap-16 mb-24">
          {/* Gallery */}
          <div className="w-full lg:w-3/5">
            <Suspense
              fallback={
                <div className="relative w-full min-h-[400px] bg-gaming-900/50 rounded-2xl animate-pulse" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 mt-8 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* Product Details & Specifications */}
        <ProductDetailsAndSpecs images={product.images} />

        {/* FAQ Section */}
        <ProductFAQ />

        {/* Product Story */}
        <div className="mb-24">
          <ProductStory productHandle={product.handle} />
        </div>

        {/* Reviews Section */}
        <ReviewsSection 
          productId={product.id}
          productName={product.title}
          productHandle={product.handle}
        />

        {/* Related Products */}
        {/* <RelatedPRoducts id={product.id} /> */}
      </div>
    </ProductProvider>
  );
}

async function RelatedPRoducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className="border-t border-white/5 pt-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Ar putea să-ți placă</h2>
        <p className="text-white/60 text-lg">Explorează produse similare alese pentru tine</p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="group"
          >
            <Link
              className="block"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gaming-900/30 group-hover:border-white/20 transition-all duration-500">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                    availableForSale: product.availableForSale,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
