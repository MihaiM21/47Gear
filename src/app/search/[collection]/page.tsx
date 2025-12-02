import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { sort } = resolvedSearchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: resolvedParams.collection,
    sortKey,
    reverse,
  });

  // Format the collection name to be more readable
  const formattedCollectionName = resolvedParams.collection
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="relative">
      {/* Premium background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px] animate-floatingOrbs"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[120px] animate-floatingOrbs" style={{ animationDelay: '2s' }}></div>
      </div>
    
      <div className="space-y-8 px-4">
        {/* Enhanced header section */}
        <div className="relative py-12 px-6 rounded-2xl bg-gradient-to-br from-gaming-800/40 to-accent-primary/10 backdrop-blur-sm border border-accent-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent animate-premiumFadeInUp">
              {formattedCollectionName}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mb-6 shimmer"></div>
            
            <p className="text-white/70 text-lg mb-0 max-w-2xl leading-relaxed">
              Explorează colecția noastră premium {formattedCollectionName.toLowerCase()}, creată pentru 
              performanță și precizie. Fiecare produs este creat cu grijă pentru gamerii seriosati.
            </p>
          </div>
        </div>

        {/* Products grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="relative group">
              <div className="relative rounded-full bg-accent-primary/20 p-8 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                  <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                  <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path>
                  <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-accent-secondary to-white bg-clip-text text-transparent">
              Nu s-au găsit produse
            </h3>
            <p className="text-white/60 text-lg mb-8">Nu am putut găsi niciun produs în această colecție</p>
          </div>
        ) : (
          <div className="relative px-4">
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductGridItems products={products} />
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
