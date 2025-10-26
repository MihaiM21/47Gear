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
    <nav className="flex items-center justify-between p-4 lg:px-8 sticky top-0 bg-black/95 backdrop-blur-md z-[999] border-b border-accent-primary/30 shadow-neon">
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
            {/* <div className="ml-3 flex-none text-sm font-bold uppercase md:hidden lg:block hover:animate-pulse">
              <span className="text-accent-primary">47</span><span className="text-accent-yellow">GEAR</span>
            </div> */}
          </Link>

          {menu.length > 0 ? (
            <ul className="hidden gap-8 text-sm md:flex md:items-center ml-4">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-white relative px-1 py-2 font-medium transition-all duration-200 hover:text-accent-secondary group"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-primary transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="group relative px-3 py-2 text-sm font-medium text-white transition-all duration-300"
              prefetch={false}
            >
              Home
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/search"
              className="group relative px-3 py-2 text-sm font-medium text-white transition-all duration-300"
              prefetch={false}
            >
              Products
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about-us"
              className="group relative px-3 py-2 text-sm font-medium text-white transition-all duration-300"
              prefetch={false}
            >
              About Us
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact-us"
              className="group relative px-3 py-2 text-sm font-medium text-white transition-all duration-300"
              prefetch={false}
            >
              Contact Us
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          {/* <div className="ml-6">
            <Search />
          </div> */}
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
