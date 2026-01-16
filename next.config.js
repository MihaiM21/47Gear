/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  // Removed ignoreBuildErrors for production safety
  // Fix any TypeScript errors before deploying
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  reactStrictMode: true, // Enable React strict mode for better error detection
  
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Configure experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@headlessui/react', '@heroicons/react'],
  },
};
