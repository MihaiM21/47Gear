import ContentCreatorsDisplay from './content-creators-section';

interface ContentCreator {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  link?: string;
}

async function getContentCreators(): Promise<ContentCreator[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000");
    
    const response = await fetch(`${baseUrl}/api/content-creators?featured=true`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content creators');
    }
    
    const data = await response.json();
    return data.creators || [];
  } catch (error) {
    console.error('Error fetching content creators:', error);
    return [];
  }
}

export default async function ContentCreatorsSection() {
  const creators = await getContentCreators();
  return <ContentCreatorsDisplay creators={creators} />;
}
