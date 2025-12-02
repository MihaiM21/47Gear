
import { GridTileImage } from "@/components/grid/tile";
import Gallery from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductDescription } from "@/components/product/product-description";
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

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
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
                <div className="relative aspect-square w-full bg-gaming-900/50 rounded-2xl animate-pulse" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
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

        {/* Product Specifications & Features */}
        <ProductSpecs />

        {/* Related Products */}
        <RelatedPRoducts id={product.id} />
      </div>
    </ProductProvider>
  );
}

function ProductSpecs() {
  return (
    <div className="border-t border-white/5 pt-16 pb-24">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Creat Pentru Campioni
        </h2>
        <p className="text-lg text-white/60 leading-relaxed">
          Fiecare mousepad este creat cu materiale de precizie și atenție la detalii, 
          oferind avantajul de performanță de care ai nevoie pentru a domina competiția.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        {/* Premium Surface */}
        <div className="group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gaming-900/30 mb-6 group-hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <svg className="w-12 h-12 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div className="text-white/40 text-sm font-medium">Feature Showcase</div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Suprafață Premium</h3>
          <p className="text-white/60 leading-relaxed">
            Material de înaltă calitate cu micro-textură oferă echilibrul perfect între viteză și control. 
            Optimizat pentru senzori optici și laser, asigurând tracking perfect la nivel de pixel.
          </p>
        </div>

        {/* Anti-Slip Base */}
        <div className="group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gaming-900/30 mb-6 group-hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <svg className="w-12 h-12 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div className="text-white/40 text-sm font-medium">Feature Showcase</div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Bază Antiderapantă</h3>
          <p className="text-white/60 leading-relaxed">
            Baza din cauciuc natural ține mousepad-ul ferm pe loc în timpul sesiunilor intense de gaming. 
            Fără alunecare, fără distracții—doar performanță pură.
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Specificații Tehnice</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Size */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center border border-white/10">
              <svg className="w-8 h-8 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">Dimensiuni</div>
              <div className="text-lg font-semibold text-white">900 × 400mm</div>
            </div>
          </div>

          {/* Thickness */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center border border-white/10">
              <svg className="w-8 h-8 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">Grosime</div>
              <div className="text-lg font-semibold text-white">3mm</div>
            </div>
          </div>

          {/* Material */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center border border-white/10">
              <svg className="w-8 h-8 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">Material</div>
              <div className="text-lg font-semibold text-white">Material Textil cu Micro-Textură</div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium mb-1">Margini Cusute</div>
                <div className="text-sm text-white/50">Margini întărite previn despărțirea firelor și asigură durabilitate de lungă durată</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium mb-1">Spălabil la Mașină</div>
                <div className="text-sm text-white/50">Ușor de curățat și întreținut pentru performanță constantă</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium mb-1">Compatibilitate Universală</div>
                <div className="text-sm text-white/50">Funcționează perfect cu toate tipurile de mouse și senzori</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium mb-1">Materiale Ecologice</div>
                <div className="text-sm text-white/50">Proces de producție sustenabil cu materiale netoxice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function RelatedPRoducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className="border-t border-white/5 pt-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Ar Putea Să-ți Placă</h2>
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
