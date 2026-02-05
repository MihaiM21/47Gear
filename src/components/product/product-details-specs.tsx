import { Image } from "@/lib/shopify/types";

export function ProductDetailsAndSpecs({ images }: { images: Image[] }) {
  const surfaceImage = images[0]?.url || '/images/mousepads/impulse/water.jpg';
  const baseImage = images.length > 1 ? images[images.length - 4]?.url : '/images/mousepads/impulse/back_front.jpg';

  return (
    <div className="mb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Detalii Produs
          </h2>
          <p className="text-lg text-white/60">
            Caracteristici premium pentru performanță maximă
          </p>
        </div>

        {/* Features with Images Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Premium Surface */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={surfaceImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Premium Surface"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gaming-900 via-gaming-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-secondary/20 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Suprafață Premium</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Material textil din poliester cu micro-textură fină, optimizat pentru control precis și mișcări fluide. Compatibil cu senzori optici și laser.
                </p>
              </div>
            </div>
            <div className="p-5 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/70">
                <svg className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Structură uniformă și fină pentru alunecare lină</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <svg className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Echilibru optim între viteză și control</span>
              </div>
            </div>
          </div>

          {/* Anti-Slip Base */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={baseImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Anti-Slip Base"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gaming-900 via-gaming-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Bază Antiderapantă</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Cauciuc antiderapant menține mousepad-ul ferm pe birou. Margini cusute pentru durabilitate maximă.
                </p>
              </div>
            </div>
            <div className="p-5 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/70">
                <svg className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Stabilitate excelentă în gaming intens</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <svg className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Print sublimat inclusiv pe margini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Liquid Resistance */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                <svg className="w-5 h-5 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Rezistență la lichide</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-2">
                  Suprafață <span className="text-white">hidrofobă</span> - lichidele nu pătrund imediat. Șterge rapid pentru protecție optimă.
                </p>
                <p className="text-xs text-amber-400/90">⚠️ Nu este complet impermeabil</p>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Întreținere simplă</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-2">
                  Curățare manuală cu lavetă umedă. Printul sublimat nu se șterge sau decolorează.
                </p>
                <p className="text-xs text-amber-400/90">⚠️ Evită substanțe chimice agresive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information Section */}
        <div className="rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">De ce nu este complet impermeabil?</h3>
              <div className="space-y-3 text-sm md:text-base text-white/80 leading-relaxed">
                <p>
                  <span className="text-white font-medium">Mousepad-ul nu este complet impermeabil, și asta este intenționat.</span>
                </p>
                <p>
                  Dacă ar fi fost 100% impermeabil, ar fi fost necesar un strat plastifiat aplicat deasupra suprafeței textile. Un astfel de strat ar fi afectat <span className="text-white">alunecarea naturală a mouse-ului</span>, <span className="text-white">precizia senzorului</span> și <span className="text-white">confortul în utilizarea pe termen lung</span>.
                </p>
                <p>
                  În plus, suprafețele plastifiate sunt mult mai predispuse la <span className="text-white">zgârieturi și uzură vizibilă</span>, ceea ce duce la degradarea rapidă a suprafeței și la performanță inconsistentă în timp.
                </p>
                <p>
                  De asemenea, în cazul suprafețelor complet impermeabile, efectul de impermeabilitate tinde să se diminueze după spălări repetate și utilizare îndelungată, pierzându-și eficiența inițială.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Specs Compact */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Specificații Tehnice</h3>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center border border-white/10">
                <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <div className="text-xs text-white/50 mb-1">Dimensiuni</div>
              <div className="text-base font-semibold text-white">900 × 400mm</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center border border-white/10">
                <svg className="w-6 h-6 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div className="text-xs text-white/50 mb-1">Grosime</div>
              <div className="text-base font-semibold text-white">3mm</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center border border-white/10">
                <svg className="w-8 h-8 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div className="text-xs text-white/50 mb-1">Material</div>
              <div className="text-base font-semibold text-white">Material Textil cu Micro-Textură</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-sm justify-center">
              <div className="w-5 h-5 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70">Margini cusute</span>
            </div>
            <div className="flex items-center gap-3 text-sm justify-center">
              <div className="w-5 h-5 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70">Compatibilitate universală</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
