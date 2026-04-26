import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export const metadata = {
  title: "Toate Produsele - Mousepad-uri Gaming | 47Gear România",
  description: "Explorează întreaga gamă de mousepad-uri gaming premium 47Gear. Control perfect, durabilitate maximă, livrare rapidă în toată România. Găsește mousepad-ul ideal!",
  keywords: [
    "mousepad gaming",
    "produse gaming",
    "accesorii gaming romania",
    "mousepad profesional",
    "mousepad mare",
    "echipament gaming",
    "mousepad control",
    "mousepad xxl"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search`,
  },
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
  let products = await getProducts({ sortKey, reverse, query: searchValue });
  
  // When sorting by Relevance, show mousepads first and bundles last
  if (sortKey === 'RELEVANCE') {
    products = products.sort((a, b) => {
      const aTagsLower = a.tags.map(tag => tag.toLowerCase()).join(' ');
      const bTagsLower = b.tags.map(tag => tag.toLowerCase()).join(' ');
      const aTitleLower = a.title.toLowerCase();
      const bTitleLower = b.title.toLowerCase();
      
      const aIsBundle = aTagsLower.includes('bundle') || 
                        aTitleLower.includes('bundle') ||
                        aTitleLower.includes('pack');
      const bIsBundle = bTagsLower.includes('bundle') || 
                        bTitleLower.includes('bundle') ||
                        bTitleLower.includes('pack');
      
      const aIsMousepad = aTagsLower.includes('mousepad') || 
                          aTagsLower.includes('mouse pad') ||
                          aTitleLower.includes('mousepad');
      const bIsMousepad = bTagsLower.includes('mousepad') || 
                          bTagsLower.includes('mouse pad') ||
                          bTitleLower.includes('mousepad');
      
      // Mousepads first (return -1 to put a before b)
      if (aIsMousepad && !bIsMousepad) return -1;
      if (!aIsMousepad && bIsMousepad) return 1;
      
      // Bundles last (return 1 to put a after b)
      if (aIsBundle && !bIsBundle) return 1;
      if (!aIsBundle && bIsBundle) return -1;
      
      // Keep original order for others
      return 0;
    });
  }
  
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

      {/* Marketing Banner */}
      <div className="relative py-4 md:py-8 bg-gradient-to-r from-black via-accent-secondary/5 to-black rounded-2xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(138,99,255,0.15),transparent_70%)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Mousepad-ul care îți face aim-ul mai consistent.
          </h2>
          <p className="text-base md:text-lg text-white/85">
            Testează 15 zile fără risc. Banii înapoi dacă nu simți diferența în performanță.
          </p>
          {/* <div className="grid gap-2 sm:grid-cols-3 pt-2">
            <div className="rounded-lg border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Fără risc</p>
              <p className="text-sm font-semibold text-white">Testează 15 zile</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Garanție</p>
              <p className="text-sm font-semibold text-white">Banii înapoi dacă nu simți diferența</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Disponibilitate</p>
              <p className="text-sm font-semibold text-white">Stoc limitat pe lotul curent</p>
            </div>
          </div> */}
        </div>
      </div>

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
