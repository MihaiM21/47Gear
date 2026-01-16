import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "@/components/logo-square";
import CartModal from "@/components/cart/modal";
import { NavbarWrapper } from "./navbar-wrapper";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-menu");
  return (
    <NavbarWrapper>
      <nav id="header" className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="flex w-full items-center">
          {/* Logo */}
          <div className="flex w-full md:w-1/4 justify-center md:justify-start">
            <Link
              href={"/"}
              prefetch={true}
              className="flex items-center group"
            >
              <LogoSquare />
            </Link>
          </div>

          {/* Center Nav */}
          <div className="hidden md:flex md:w-1/2 justify-center">
            <div className="flex items-center gap-8">
              <Link
                href="/search"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                prefetch={false}
              >
                Shop
              </Link>
              <Link
                href="/about-us"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/contact-us"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                prefetch={false}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side - Cart & Account */}
          
          <div className="flex justify-end md:w-1/4 items-center gap-4">
            <Link
              href="/profile"
              className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors"
              prefetch={false}
            >
              My Account
            </Link>
            <CartModal />
          </div>
        </div>
      </nav>
    </NavbarWrapper>
  );
}
