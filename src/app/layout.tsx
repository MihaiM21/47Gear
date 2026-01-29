import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-context";
import WhatsAppFloat from "@/components/whatsapp-float";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "47Gear - Mousepad-uri Gaming Premium | Magazin Online România",
    template: "%s | 47Gear"
  },
  description: "Cumpără mousepad-uri gaming premium în România. Livrare rapidă, control perfect, durabilitate maximă. Mousepad-uri profesionale pentru gaming competitiv. Comanda acum!",
  keywords: [
    "mousepad gaming", "mousepad gaming romania", "mousepad profesional", "mousepad gaming mare",
    "mouse pad gaming", "pad gaming", "mousepad xxl", "mousepad rgb",
    "mousepad esports", "mousepad gamer", "accesorii gaming", "echipament gaming",
    "mousepad rapid", "mousepad control", "mousepad mare gaming", "cel mai bun mousepad",
    "mousepad gaming ieftin", "mousepad calitate", "mousepad rezistent"
  ],
  authors: [{ name: "47Gear" }],
  creator: "47Gear",
  publisher: "47Gear",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "47Gear",
    title: "47Gear - Mousepad-uri Gaming Premium România",
    description: "Magazin online mousepad-uri gaming în România. Control perfect, durabilitate maximă, livrare rapidă. Echipament premium pentru gameri profesioniști.",
    images: [
      {
        url: '/images/mousepads/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mousepad-uri Gaming Premium 47Gear',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "47Gear - Mousepad-uri Gaming Premium România",
    description: "Mousepad-uri gaming profesionale. Control perfect, durabilitate maximă. Livrare rapidă în România.",
    creator: "@47gear",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const cartId = cookiesStore.get("cartId")?.value;
  const cart = getCart(cartId);
  return (
    <html lang="ro" data-theme={process.env.SITE_THEME || 'default'}>
      <head>
        {/* Preconnect to Shopify CDN for instant image loading */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <CartProvider cartPromise={cart}>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
