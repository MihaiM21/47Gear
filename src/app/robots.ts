const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/management-portal", "/api/admin", "/api/", "/login", "/register", "/profile"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/management-portal", "/api/admin", "/api/", "/login", "/register", "/profile"],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
