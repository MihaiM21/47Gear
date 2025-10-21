import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
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
    <div className="space-y-8">
      {/* Header section */}
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-purple">
          {formattedCollectionName}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-accent-primary to-purple-600 rounded-full mb-6"></div>
        
        <p className="text-white/80 mb-6 max-w-2xl">
          Explore our premium {formattedCollectionName.toLowerCase()} collection, designed for 
          performance and precision. Each product is carefully crafted for serious gamers.
        </p>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass-card">
          <div className="rounded-full bg-accent-primary/20 p-6 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary h-8 w-8">
              <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">No products found</h3>
          <p className="text-white/70 mt-2">We couldn't find any products in this collection</p>
        </div>
      ) : (
        <div className="relative">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductGridItems products={products} />
          </Grid>
        </div>
      )}
    </div>
  );
}
