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
    default: "47Gear - Premium Gaming Mousepads",
    template: "%s "
  },
  description: "Experience unmatched control with premium gaming mousepads engineered for champions. Precision, comfort, and durability for professional gamers.",
  keywords: ["gaming mousepads", "gaming gear", "esports equipment", "pro gaming", "mousepad", "gaming accessories"],
  authors: [{ name: "47Gear" }],
  creator: "47Gear",
  publisher: "47Gear",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "47Gear",
    title: "47Gear - Premium Gaming Mousepads",
    description: "Experience unmatched control with premium gaming mousepads engineered for champions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "47Gear - Premium Gaming Mousepads",
    description: "Experience unmatched control with premium gaming mousepads engineered for champions.",
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
