'use client';

interface ContentCreator {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    youtube?: string;
    twitch?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
}

interface ContentCreatorsDisplayProps {
  creators: ContentCreator[];
}

export default function ContentCreatorsDisplay({ creators }: ContentCreatorsDisplayProps) {
  if (creators.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-black via-gaming-900/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,99,255,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Colaboratorii{' '}
            <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
              Noștri
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Content creators cu care colaborăm pentru a vă aduce cele mai bune produse și experiențe gaming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="group bg-gradient-to-b from-gaming-800/50 to-gaming-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(138,99,255,0.2)]"
            >
              {/* Creator Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-900 via-gaming-900/20 to-transparent z-10" />
                <img
                  src={creator.imageUrl}
                  alt={creator.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>

              {/* Creator Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                  {creator.name}
                </h3>
                <p className="text-gaming-300 leading-relaxed mb-4">
                  {creator.bio}
                </p>

                {/* Social Links */}
                {Object.keys(creator.socialLinks || {}).length > 0 && (
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    {creator.socialLinks.youtube && (
                      <a
                        href={creator.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gaming-700/50 hover:bg-accent-red/20 border border-white/5 hover:border-accent-red/30 flex items-center justify-center text-gaming-300 hover:text-accent-red transition-all"
                        aria-label="YouTube"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.twitch && (
                      <a
                        href={creator.socialLinks.twitch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gaming-700/50 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 flex items-center justify-center text-gaming-300 hover:text-purple-400 transition-all"
                        aria-label="Twitch"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.instagram && (
                      <a
                        href={creator.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gaming-700/50 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/30 flex items-center justify-center text-gaming-300 hover:text-pink-400 transition-all"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.tiktok && (
                      <a
                        href={creator.socialLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gaming-700/50 hover:bg-white/20 border border-white/5 hover:border-white/30 flex items-center justify-center text-gaming-300 hover:text-white transition-all"
                        aria-label="TikTok"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.twitter && (
                      <a
                        href={creator.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gaming-700/50 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/30 flex items-center justify-center text-gaming-300 hover:text-blue-400 transition-all"
                        aria-label="Twitter/X"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
