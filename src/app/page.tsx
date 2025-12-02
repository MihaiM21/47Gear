import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/shopify";

export const metadata = {
  description:
    "47Gear - Premium gaming mousepads for professional gamers and enthusiasts.",
  openGraph: {
    type: "website",
  },
};

export default async function Home() {
  const collections = await getCollections();
  
  return (
    <main className="flex-1 text-white">
      {/* Hero Section - Centered Minimalist */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gaming-900 to-black">
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,99,255,0.08),transparent_60%)]" /> */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(74,43,116,0.06),transparent_50%)]" /> */}
          <Image
            src="/images/all_mousepads2.png"
            alt="Gaming Mousepad"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20 relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-8">
              {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
                <span className="text-xs font-medium text-white/80 tracking-wider uppercase">47Gear Presents</span>
              </div> */}
              
              {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                <span className="block text-white mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">47 Gear</span>

                <span className="block bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(138,99,255,0.4)]">Redefined</span>
              </h1> */}
              
              {/* <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Experience unmatched control with mousepads engineered for champions. Every move, every moment, perfected.
              </p> */}
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                <Link
                  href="/search/"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] text-lg shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
                  prefetch={false}
                >
                  <span>Vezi Produsele</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white rounded-full font-medium hover:bg-white/5 transition-all duration-300 text-lg backdrop-blur-sm shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                  prefetch={false}
                >
                  Află Mai Multe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-black relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Performanță fără Compromis
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Proiectat milimetric pentru precizie. Creat de jucători, pentru jucători.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Acuratețe</h3>
                <p className="text-white/50 leading-relaxed">Textură optimizată pentru senzorii moderni. Fiecare mișcare a mouse-ului este înregistrată in cel mai scurt timp.</p>
              </div>
              
              <div className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Rezistență în Timp</h3>
                <p className="text-white/50 leading-relaxed">Cusături premium și materiale care nu se degradează, indiferent cât de intens este folosit.</p>
              </div>
              
              <div className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Materiale Confortabile</h3>
                <p className="text-white/50 leading-relaxed">Material moale și bază ergonomică pentru a elimina disconfortul în sesiunile lungi de gaming.</p>
              </div>
              
              <div className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Premium</h3>
                <p className="text-white/50 leading-relaxed">Designuri unice care transformă un simplu accesoriu în piesa centrală a biroului.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 md:py-32 bg-gaming-900/30 relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Colecțiile Noastre
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Găsește mousepad-ul ideal pentru setup-ul tău
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {collections.slice(1, 4).map((collection) => {
                const collectionInfo = {
                  'gaming-collection': { badge: 'Pro Series', description: 'Precision performance for competitive play' },
                  'special-collection': { badge: 'Limited Edition', description: 'Unique designs for standout setups' },
                  'desk-collection': { badge: 'Extended', description: 'Full coverage for ultimate comfort' }
                };
                const info = collectionInfo[collection.handle as keyof typeof collectionInfo];
                
                return (
                  <Link key={collection.handle} href={collection.path} className="group block" prefetch={false}>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 bg-gaming-900/30">
                      {collection.image ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 via-transparent to-accent-primary/10 opacity-50" />
                          <Image
                            src={collection.image.url}
                            alt={collection.image.altText || collection.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-all duration-700 mix-blend-lighten"
                            style={{
                              filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                            }}
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 to-accent-primary/5" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-black" />
                      )}
                      <div className="relative h-full flex flex-col justify-end p-8">
                        {info && (
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80">
                              {info.badge}
                            </span>
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-secondary transition-colors">
                          {collection.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                          {info?.description || collection.description}
                        </p>
                        <div className="inline-flex items-center text-white text-sm font-medium group-hover:translate-x-2 transition-transform">
                          <span>Explorează</span>
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/search" 
                className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300 group"
                prefetch={false}
              >
                <span className="mr-2">Vezi Toate Produsele</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-6">Încrederea a mii de gameri din întreaga lume</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              <div className="text-white/60 text-lg font-bold">Team Alpha</div>
              <div className="text-white/60 text-lg font-bold">ProLeague</div>
              <div className="text-white/60 text-lg font-bold">GameCore</div>
              <div className="text-white/60 text-lg font-bold">NexusGG</div>
              <div className="text-white/60 text-lg font-bold">EpicPlay</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
