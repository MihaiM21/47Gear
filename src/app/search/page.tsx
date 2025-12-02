import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export const metadata = {
  title: "Products | 47Gear",
  description: "Find premium gaming gear and accessories for professional gamers.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams before using it
  const params = await searchParams;
  const sort = typeof params?.sort === 'string' ? params.sort : undefined;
  const searchValue = typeof params?.q === 'string' ? params.q : '';
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";
  
  return (
    <div className="space-y-8">
      {/* Header section */}
      {/* <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-purple">
          Gaming Products
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-accent-primary to-purple-600 rounded-full mb-6"></div>
        
        {searchValue ? (
          <div className="glass-card p-4 mb-6 inline-block">
            <p className="text-white/90">
              {products.length === 0
                ? "There are no products that match "
                : `Showing ${products.length} ${resultsText} for `}
              <span className="font-bold text-white">&quot;{searchValue}&quot;</span>
            </p>
          </div>
        ) : (
          <p className="text-white/80 mb-6 max-w-2xl">
            Discover our premium selection of gaming gear, designed for performance and precision. 
            Each product is carefully crafted for serious gamers who demand the best.
          </p>
        )}
      </div> */}

      {/* Products grid */}
      {products.length > 0 ? (
          <div className="relative px-4">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductGridItems products={products} />
          </Grid>
          
          {/* Empty state */}
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-full bg-accent-primary/20 p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary h-8 w-8">
                  <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Nu s-au găsit produse</h3>
              <p className="text-white/70 mt-2">Incearca sa ajustezi cautarea sau filtrele</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
