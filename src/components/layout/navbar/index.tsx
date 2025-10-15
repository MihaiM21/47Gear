import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "@/components/logo-square";
import CartModal from "@/components/cart/modal";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-menu");
  return (
    <nav className="flex items-center justify-between p-4 lg:px-8 sticky top-0 bg-gaming-800/90 backdrop-blur-md z-[999] border-b border-accent-primary/30 shadow-md">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href={"/"}
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6 group"
          >
            <LogoSquare />
            <div className="ml-3 flex-none text-sm font-bold uppercase md:hidden lg:block bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              47Gear
            </div>
          </Link>

          {menu.length > 0 ? (
            <ul className="hidden gap-8 text-sm md:flex md:items-center ml-4">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-gaming-100 relative px-1 py-2 font-medium transition-all duration-200 hover:text-accent-secondary group"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {/* <div className="space-x-4">
            <Link
              href="/search/"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="/search/"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              prefetch={false}
            >
              About  Us
            </Link>
            <Link
              href="/search/"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              prefetch={false}
              
            >
              Contact Us
            </Link>
          </div> */}

          {/* Version 2 header */}
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
