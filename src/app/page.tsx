import Link from "next/link";
import Image from "next/image";

export const metadata = {
  description:
    "Pro Pad - Premium gaming mousepads for professional gamers and enthusiasts.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-gaming-900 to-gaming-800 text-white">
      <section className="w-full pt-12 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-8 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
            <div className="relative z-10">
              <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text px-3 py-1 text-sm font-medium text-transparent border border-accent-primary/30">
                New Collection
              </div>
              <h1 className="lg:leading-tight text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] bg-gradient-to-r from-white to-gaming-200 bg-clip-text text-transparent mb-6">
                Level Up Your <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text">Gaming Experience</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gaming-300 md:text-xl mb-8">
                Explore our premium collection of high-performance mousepads designed for 
                precision, comfort, and durability. Trusted by pro gamers worldwide.
              </p>
              <div className="flex flex-col w-full md:flex-row gap-3 text-nowrap">
                <Link
                  href="/search/"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  prefetch={false}
                >
                  Shop Now
                </Link>
                {/* <Link
                  href="/search/productivity-collection"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-accent-primary bg-gaming-800/50 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-gaming-700 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  prefetch={false}
                >
                  Office Solutions
                </Link>
                <Link
                  href="/search/sales"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-accent-red/50 bg-gaming-800/50 px-6 py-3 text-sm font-medium text-accent-red shadow-lg transition-all duration-300 hover:bg-accent-red/10 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
                  prefetch={false}
                >
                  Special Offers
                </Link> */}
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-10 blur-xl"></div>
              <div className="relative rounded-2xl border border-gaming-600 overflow-hidden shadow-2xl transform rotate-1 transition-transform hover:rotate-0 duration-500">
                <div className="aspect-[4/3] w-full bg-gaming-700 flex items-center justify-center p-4">
                  <div className="w-[90%] h-[80%] rounded-md relative bg-gaming-800 border border-gaming-600 shadow-inner">
                    {/* This is where you would put a real product image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-accent-primary font-bold text-2xl">PRO PAD XL</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-accent-green text-gaming-900 text-xs font-bold px-2 py-1 rounded">FEATURED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-gaming-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-block rounded-full bg-gaming-800 border border-accent-primary px-3 py-1 text-sm text-accent-secondary font-medium">
                Superior Performance
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gaming-200 bg-clip-text text-transparent">
                Why Choose Pro Pad?
              </h2>
              <p className="max-w-[900px] text-gaming-300 md:text-xl/relaxed">
                Our mousepads are engineered with premium materials and cutting-edge technology to deliver unmatched gaming performance.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gaming-800/50 border border-gaming-700 p-6 rounded-xl transition-all duration-300 hover:border-accent-primary hover:shadow-neon">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Speed & Precision</h3>
              <p className="text-gaming-300">Micro-textured surface for pixel-perfect accuracy and lightning-fast tracking speed.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gaming-800/50 border border-gaming-700 p-6 rounded-xl transition-all duration-300 hover:border-accent-primary hover:shadow-neon">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Durability</h3>
              <p className="text-gaming-300">Premium materials designed to withstand intense gaming sessions day after day.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gaming-800/50 border border-gaming-700 p-6 rounded-xl transition-all duration-300 hover:border-accent-primary hover:shadow-neon">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Comfort</h3>
              <p className="text-gaming-300">Ergonomic designs with anti-fatigue padding for extended gaming comfort.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gaming-800/50 border border-gaming-700 p-6 rounded-xl transition-all duration-300 hover:border-accent-primary hover:shadow-neon">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customization</h3>
              <p className="text-gaming-300">Multiple sizes and designs to fit your setup and personal style.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gaming-900 to-gaming-800">
        <div className="container space-y-12 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-gaming-800 border border-accent-primary px-3 py-1 text-sm text-accent-secondary font-medium">
                Premium Selection
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Explore Our Collections
              </h2>
              <p className="max-w-[900px] text-gaming-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our range of premium mousepads for every gaming style and setup.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <Link
                href="/search/gaming-collection"
                className="group"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gaming-700 bg-gaming-800 group-hover:border-accent-primary transition-all duration-300 relative shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold text-white mb-2">Gaming Series</h3>
                      <p className="text-gaming-300 mb-4">Performance mousepads for competitive gaming</p>
                      <span className="inline-block bg-accent-primary text-white text-sm font-medium px-4 py-2 rounded-md transition-transform group-hover:scale-105">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link
                href="/search/rgb-collection"
                className="group"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gaming-700 bg-gaming-800 group-hover:border-accent-secondary transition-all duration-300 relative shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold text-white mb-2">RGB Series</h3>
                      <p className="text-gaming-300 mb-4">Light up your setup with RGB-enabled mousepads</p>
                      <span className="inline-block bg-accent-secondary text-white text-sm font-medium px-4 py-2 rounded-md transition-transform group-hover:scale-105">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link
                href="/search/desk-collection"
                className="group"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gaming-700 bg-gaming-800 group-hover:border-accent-green transition-all duration-300 relative shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold text-white mb-2">Desk Series</h3>
                      <p className="text-gaming-300 mb-4">Full-desk mousepads for complete coverage</p>
                      <span className="inline-block bg-accent-green text-white text-sm font-medium px-4 py-2 rounded-md transition-transform group-hover:scale-105">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gaming-800 to-gaming-900 overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-accent-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block rounded-full bg-accent-red/10 border border-accent-red px-4 py-1 text-sm text-accent-red font-medium mb-4">
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-red to-accent-primary bg-clip-text text-transparent">
              Special Promotions
            </h2>
            <p className="text-gaming-300 text-xl">
              Upgrade your setup with premium mousepads at special prices. Don't miss these exclusive deals!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gaming-800/60 border border-gaming-700 p-8 rounded-2xl shadow-lg hover:shadow-neon-cyan transition-all duration-300">
              <div className="bg-accent-red/10 text-accent-red rounded-full px-4 py-1 text-sm inline-block font-bold mb-4">
                SAVE 25%
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Gamer Bundle</h3>
              <p className="text-gaming-300 mb-6">
                Get our premium XL mousepad plus a matching wrist rest at a special bundle price.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-accent-red line-through mr-2">$59.99</span>
                  <span className="text-white font-bold text-2xl">$44.99</span>
                </div>
                <Link
                  href="/search/sales"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-accent-red hover:bg-accent-red/90 px-6 py-2 text-sm font-medium text-white shadow transition-all duration-300 hover:scale-105"
                  prefetch={false}
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="bg-gaming-800/60 border border-gaming-700 p-8 rounded-2xl shadow-lg hover:shadow-neon transition-all duration-300">
              <div className="bg-accent-secondary/10 text-accent-secondary rounded-full px-4 py-1 text-sm inline-block font-bold mb-4">
                NEW CUSTOMER
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10% Off First Order</h3>
              <p className="text-gaming-300 mb-6">
                Sign up for our newsletter and receive 10% off your first purchase.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-bold">Use code: <span className="text-accent-secondary">NEWPAD10</span></span>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-accent-primary hover:bg-accent-primary/90 px-6 py-2 text-sm font-medium text-white shadow transition-all duration-300 hover:scale-105"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
