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
      <section className="w-full h-screen pt-12 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 relative overflow-hidden">
        {/* Abstract geometric shapes background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent-primary/5 blur-[100px]"></div>
          <div className="absolute top-[20%] -right-[20%] w-[40%] h-[40%] rounded-full bg-accent-secondary/5 blur-[80px]"></div>
          <div className="absolute -bottom-[10%] left-[30%] w-[50%] h-[50%] rounded-full bg-accent-tertiary/10 blur-[120px]"></div>
          <div className="absolute w-full h-full bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5 mix-blend-overlay"></div>
        </div>
        
        <div className="px-4 ml-20 md:px-6 space-y-10 xl:space-y-16 relative z-10">
          <div className="grid max-w-[1300px] mx-auto gap-8 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
            <div className="relative z-10">
              <div className="mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium border border-accent-primary/30 bg-gaming-800/60 backdrop-blur-sm">
                <span className="text-accent-secondary">Next-Gen</span> <span className="text-accent-yellow">Performance</span>
              </div>
              <h1 className="lg:leading-tight text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] bg-gradient-to-r from-white via-white to-gaming-200 bg-clip-text text-transparent mb-6">
                <span className="text-accent-secondary">Gaming</span> <span className="relative inline-block">
                  <span className="text-accent-secondary">Experience</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent-secondary/30 rounded-full"></span>
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gaming-300 md:text-xl mb-8 leading-relaxed">
                Explore our premium collection of high-performance mousepads designed for 
                precision, comfort, and durability. <span className="text-white font-medium">Trusted by pro gamers worldwide.</span>
              </p>
              <div className="flex flex-col w-full md:flex-row gap-4 text-nowrap">
                <Link
                  href="/search/"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary group relative overflow-hidden"
                  prefetch={false}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-[1.05] blur-md"></span>
                  <span className="relative flex items-center">
                    <span className="mr-2">Shop Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/search/special-collection"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-accent-secondary/30 bg-gaming-800/50 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:border-accent-secondary hover:shadow-neon-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary group"
                  prefetch={false}
                >
                  <span className="mr-2">Special Edition</span>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-yellow"></span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 opacity-70 blur-3xl animate-pulse"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:shadow-neon border border-accent-primary/20 flex items-center justify-center" style={{ width: '450px', height: '450px' }}>
                {/* Modern minimalist product display */}
                <div className="relative w-[400px] h-[400px] float-animation">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/mousepad_01.png"
                      alt="Pro Pad XL"
                      width={410}
                      height={410}
                      className="object-contain drop-shadow-[0_10px_30px_rgba(74,43,116,0.6)] z-10 transform transition-all duration-700 hover:scale-105 rounded-2xl"
                      priority
                    />
                    </div>
                  
                  {/* Enhanced floating accent elements */}
                  <div className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full bg-accent-primary/20 blur-xl animate-pulse"></div>
                  <div className="absolute bottom-[15%] right-[10%] w-24 h-24 rounded-full bg-accent-tertiary/20 blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-[50%] right-[15%] w-16 h-16 rounded-full bg-accent-secondary/20 blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  
                  <div className="absolute top-6 right-6">
                    <span className="bg-black/70 text-accent-secondary text-xs font-bold px-4 py-2 rounded-full border border-accent-secondary/30 shadow-neon-purple">FEATURED</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-black relative">
        {/* Background patterns and effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/circuit-pattern.png')] bg-repeat opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-block rounded-full bg-gaming-800/80 backdrop-blur-sm border border-accent-secondary/30 px-4 py-1.5 text-sm text-accent-secondary font-medium shadow-sm">
                By Gamers, For Gamers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white via-accent-secondary/80 to-white bg-clip-text text-transparent">
                Why Choose <span className="text-accent-secondary relative">47GEAR</span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
              <p className="max-w-[900px] text-gaming-300 md:text-xl/relaxed mt-4">
                Our mousepads are engineered with premium materials and cutting-edge technology to deliver 
                <span className="text-white font-medium"> unmatched gaming performance.</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - Enhanced with animations and modern design */}
            <div className="bg-gradient-to-br from-gaming-800/80 to-black/90 border border-gray-800 p-8 rounded-xl transition-all duration-500 hover:border-accent-primary hover:shadow-neon group">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transform group-hover:scale-110 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-[gradient_8s_ease_infinite] opacity-70"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors duration-300">Speed & Precision</h3>
              <p className="text-gaming-300 leading-relaxed">Micro-textured surface for pixel-perfect accuracy and lightning-fast tracking speed for competitive advantage.</p>
            </div>
            
            {/* Feature 2 - Enhanced with animations and modern design */}
            <div className="bg-gradient-to-br from-gaming-800/80 to-black/90 border border-gray-800 p-8 rounded-xl transition-all duration-500 hover:border-accent-primary hover:shadow-neon group">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transform group-hover:scale-110 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-[gradient_8s_ease_infinite] opacity-70"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors duration-300">Durability</h3>
              <p className="text-gaming-300 leading-relaxed">Premium materials designed to withstand intense gaming sessions with exceptional wear resistance.</p>
            </div>
            
            {/* Feature 3 - Enhanced with animations and modern design */}
            <div className="bg-gradient-to-br from-gaming-800/80 to-black/90 border border-gray-800 p-8 rounded-xl transition-all duration-500 hover:border-accent-primary hover:shadow-neon group">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transform group-hover:scale-110 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-[gradient_8s_ease_infinite] opacity-70"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors duration-300">Ergonomic Comfort</h3>
              <p className="text-gaming-300 leading-relaxed">Advanced ergonomic designs with anti-fatigue padding for extended gaming sessions without discomfort.</p>
            </div>
            
            {/* Feature 4 - Enhanced with animations and modern design */}
            <div className="bg-gradient-to-br from-gaming-800/80 to-black/90 border border-gray-800 p-8 rounded-xl transition-all duration-500 hover:border-accent-primary hover:shadow-neon group">
              <div className="bg-gradient-to-br from-accent-primary to-accent-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transform group-hover:scale-110 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-[gradient_8s_ease_infinite] opacity-70"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors duration-300">Personalization</h3>
              <p className="text-gaming-300 leading-relaxed">Multiple sizes, styles and custom designs to perfectly match your gaming setup and personal aesthetic.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/about-us" className="inline-flex items-center px-6 py-3 rounded-lg border border-accent-secondary/30 text-white hover:bg-accent-primary/10 transition-all duration-300 group">
              <span className="mr-2">Learn more about our technology</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Product Categories Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-black to-gaming-900 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-primary/5 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-accent-yellow/5 blur-[100px]"></div>
          <div className="absolute w-full h-full bg-[url('/images/hex-pattern.png')] bg-repeat opacity-5 mix-blend-overlay"></div>
        </div>
        
        <div className="container space-y-12 px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-block rounded-full bg-gaming-800/80 backdrop-blur-sm border border-accent-secondary/30 px-4 py-1.5 text-sm text-accent-secondary font-medium shadow-sm">
                Premium Selection
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-white via-accent-secondary to-white bg-clip-text text-transparent">
                Explore Our Collections
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-accent-tertiary to-accent-secondary"></div>
              <p className="max-w-[900px] text-gaming-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
                Discover our range of premium mousepads for every gaming style and setup.
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
            {/* Gaming Series - Enhanced with images and overlay effects */}
            <div className="group relative">
              <Link
                href="/search/gaming-collection"
                className="block"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl relative shadow-lg group-hover:shadow-neon transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-[url('/images/gaming-series-bg.jpg')] bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"></div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
                  
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-neon"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                    <div className="text-center z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">Gaming Series</h3>
                      <p className="text-gray-300 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">Performance mousepads for competitive gaming</p>
                      <span className="inline-block bg-accent-primary/80 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/50 backdrop-blur-sm border border-accent-primary/30 px-3 py-1 rounded-full text-xs text-accent-secondary font-medium">
                      Pro Choice
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Special Series - Enhanced with images and overlay effects */}
            <div className="group relative">
              <Link
                href="/search/special-collection"
                className="block"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl relative shadow-lg group-hover:shadow-neon-purple transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-[url('/images/special-series-bg.jpg')] bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"></div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
                  
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-neon-purple"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                    <div className="text-center z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">Special Series</h3>
                      <p className="text-gray-300 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">Light up your setup with our special design mousepads</p>
                      <span className="inline-block bg-accent-secondary/80 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/50 backdrop-blur-sm border border-accent-secondary/30 px-3 py-1 rounded-full text-xs text-accent-secondary font-medium">
                      Limited Edition
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desk Series - Enhanced with images and overlay effects */}
            <div className="group relative">
              <Link
                href="/search/desk-collection"
                className="block"
                prefetch={false}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl relative shadow-lg group-hover:shadow-neon-purple transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-[url('/images/desk-series-bg.jpg')] bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"></div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
                  
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-tertiary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-neon-dark"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                    <div className="text-center z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">Desk Series</h3>
                      <p className="text-gray-300 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">Full desk coverage for the ultimate gaming experience</p>
                      <span className="inline-block bg-accent-primary/80 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/50 backdrop-blur-sm border border-accent-primary/30 px-3 py-1 rounded-full text-xs text-accent-primary font-medium">
                      Best Seller
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              href="/search" 
              className="inline-flex items-center px-8 py-3 rounded-lg border border-white/10 text-white bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 group"
              prefetch={false}
            >
              <span className="mr-2">View All Collections</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* Content Creators Showcase Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gaming-900 to-black overflow-hidden relative">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-accent-primary/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-accent-tertiary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-1/4 h-1/4 bg-accent-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-full h-full bg-[url('/images/noise-pattern.png')] bg-repeat opacity-5 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-gaming-800/80 backdrop-blur-sm border border-accent-secondary/30 px-4 py-1.5 text-sm text-accent-secondary font-medium shadow-sm">
              Featured Creators
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-accent-secondary to-white bg-clip-text text-transparent">
              Our Gaming Partners
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-accent-tertiary to-accent-secondary"></div>
            <p className="text-gaming-300 text-xl mt-6 max-w-2xl mx-auto">
              Meet the talented content creators who trust 47GEAR for their gaming setups and share our passion for performance
            </p>
          </div>
          
          {/* Scrolling Creator Cards */}
          <div className="relative overflow-hidden py-8 px-4">
            {/* Animated Scrolling Container */}
            <div className="flex animate-[scroll_50s_linear_infinite] gap-8">
              {/* Creator 1 */}
              <div className="bg-gradient-to-br from-black/80 to-gaming-800/90 border border-accent-primary/20 p-6 rounded-xl shadow-lg min-w-[300px] md:min-w-[380px] flex flex-col items-center group transform transition-all duration-500 hover:scale-105 hover:border-accent-primary hover:shadow-neon">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-primary">
                    <Image 
                      src="/images/creator1.jpg"
                      alt="Pro Gamer Alex"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-accent-primary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-secondary transition-colors duration-300">Alex "NightFrag" Wilson</h3>
                <p className="text-accent-secondary text-sm mb-3">FPS Pro Player & Streamer</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 w-full">
                  <p className="text-gaming-300 text-sm italic">
                    "The responsiveness and tracking precision of 47GEAR mousepads gave me the edge I needed in competitive play."
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Creator 2 */}
              <div className="bg-gradient-to-br from-black/80 to-gaming-800/90 border border-accent-secondary/20 p-6 rounded-xl shadow-lg min-w-[300px] md:min-w-[380px] flex flex-col items-center group transform transition-all duration-500 hover:scale-105 hover:border-accent-secondary hover:shadow-neon-purple">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-secondary">
                    <Image 
                      src="/images/creator2.jpg"
                      alt="Pro Gamer Sarah"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-accent-secondary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-secondary transition-colors duration-300">Sarah "PixelQueen" Chen</h3>
                <p className="text-accent-secondary text-sm mb-3">Content Creator & MOBA Player</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 w-full">
                  <p className="text-gaming-300 text-sm italic">
                    "After switching to 47GEAR, my wrist fatigue during long streams has significantly reduced. Amazing quality!"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Creator 3 */}
              <div className="bg-gradient-to-br from-black/80 to-gaming-800/90 border border-accent-primary/20 p-6 rounded-xl shadow-lg min-w-[300px] md:min-w-[380px] flex flex-col items-center group transform transition-all duration-500 hover:scale-105 hover:border-accent-primary hover:shadow-neon">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-primary">
                    <Image 
                      src="/images/creator3.jpg"
                      alt="Pro Gamer Marcus"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-accent-primary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-secondary transition-colors duration-300">Marcus "StratMaster" Johnson</h3>
                <p className="text-accent-secondary text-sm mb-3">Strategy Game Expert & Coach</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 w-full">
                  <p className="text-gaming-300 text-sm italic">
                    "When precision matters in strategy games, I trust 47GEAR. Their desk pads transformed my setup entirely."
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Creator 4 */}
              <div className="bg-gradient-to-br from-black/80 to-gaming-800/90 border border-accent-secondary/20 p-6 rounded-xl shadow-lg min-w-[300px] md:min-w-[380px] flex flex-col items-center group transform transition-all duration-500 hover:scale-105 hover:border-accent-secondary hover:shadow-neon-purple">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-secondary">
                    <Image 
                      src="/images/creator4.jpg"
                      alt="Pro Gamer Elena"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-accent-secondary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-secondary transition-colors duration-300">Elena "BlazeDragon" Rodriguez</h3>
                <p className="text-accent-secondary text-sm mb-3">RPG Specialist & Community Leader</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 w-full">
                  <p className="text-gaming-300 text-sm italic">
                    "For marathon gaming sessions, nothing beats the comfort and precision of my 47GEAR setup."
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-secondary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Duplicate cards for infinite scroll effect */}
              <div className="bg-gradient-to-br from-black/80 to-gaming-800/90 border border-accent-primary/20 p-6 rounded-xl shadow-lg min-w-[300px] md:min-w-[380px] flex flex-col items-center group transform transition-all duration-500 hover:scale-105 hover:border-accent-primary hover:shadow-neon">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-primary">
                    <Image 
                      src="/images/creator1.jpg"
                      alt="Pro Gamer Alex"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-accent-primary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-secondary transition-colors duration-300">Alex "NightFrag" Wilson</h3>
                <p className="text-accent-secondary text-sm mb-3">FPS Pro Player & Streamer</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 w-full">
                  <p className="text-gaming-300 text-sm italic">
                    "The responsiveness and tracking precision of 47GEAR mousepads gave me the edge I needed in competitive play."
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gaming-800 p-2 rounded-full hover:bg-accent-primary transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Shadow overlays to indicate more content */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              href="/creators"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-neon-purple hover:scale-105"
            >
              <span>Meet All Our Creators</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pro Teams/Sponsors Section */}
      <section className="w-full py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Trusted By Professional Teams</h2>
            <p className="text-gaming-300">Join thousands of satisfied gamers who have leveled up their experience</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="w-32 h-12 bg-gaming-800/50 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-xl font-bold text-white/50">Team Alpha</span>
            </div>
            <div className="w-32 h-12 bg-gaming-800/50 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-xl font-bold text-white/50">ProLeague</span>
            </div>
            <div className="w-32 h-12 bg-gaming-800/50 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-xl font-bold text-white/50">GameCore</span>
            </div>
            <div className="w-32 h-12 bg-gaming-800/50 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-xl font-bold text-white/50">NexusGG</span>
            </div>
            <div className="w-32 h-12 bg-gaming-800/50 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-xl font-bold text-white/50">EpicPlay</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
