import Footer from "@/components/layout/footer";
import Collections from "@/components/layout/search/collections";
import FilterList from "@/components/layout/search/filter";
import { sorting } from "@/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-black/80 to-black -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-radial from-accent-primary/10 to-transparent opacity-50 -z-10"></div>
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl -z-10"></div>
        {/* <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-accent-primary/5 blur-3xl -z-10"></div> */}
        
        {/* Content */}
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 pt-12 text-white md:flex-row relative z-0">
          <div>
            <div className="order-first w-full flex-none md:max-w-[200px] glass-card p-4 md:p-6 h-fit mb-8 md:mb-8">
              <h2 className="text-xl font-bold mb-4 text-gradient-purple">Categories</h2>
              <Collections />
            </div>
            <div className="order-first flex-none md:order-first md:w-[200px] glass-card p-4 md:p-6 h-fit">
              <h2 className="text-xl font-bold mb-4 text-gradient-purple">Filters</h2>
              <FilterList list={sorting} title="" />
            </div>
          </div>
          
          <div className="order-last min-h-screen w-full md:order-none">
            {children}
          </div>
          
        </div>
      </div>
    </>
  );
}
