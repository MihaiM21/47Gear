import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-context";
import WhatsAppFloat from "@/components/whatsapp-float";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "47Gear",
  description: "Mousepads and accessories for gamers.",
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
    <html lang="en" data-theme={process.env.SITE_THEME || 'default'}>
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
