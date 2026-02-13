'use client';

interface ContentCreator {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  link?: string;
}

interface ContentCreatorsDisplayProps {
  creators: ContentCreator[];
}

export default function ContentCreatorsDisplay({ creators }: ContentCreatorsDisplayProps) {
  if (creators.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-black/50 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <p className="text-white/40 text-sm uppercase tracking-wider mb-8">Content Creators</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {creators.map((creator) => {
              const content = (
                <div className="group text-center">
                  <div className="mb-3 overflow-hidden rounded-lg">
                    <img
                      src={creator.imageUrl}
                      alt={creator.name}
                      className="w-32 h-32 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  </div>
                  <p className="text-white/60 text-sm">{creator.name}</p>
                </div>
              );

              return creator.link ? (
                <a
                  key={creator.id}
                  href={creator.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={creator.id}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
