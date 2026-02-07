"use client";

import { Menu } from "@/lib/shopify/types";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";
import Search from "./search";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-accent-primary/50 text-accent-secondary transition-colors md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-black pb-6">
              <div className="p-4">
                {/* <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-accent-primary/50 text-accent-secondary transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button> */}
                <div className="mb-4 mt-24 w-full">
                  {/* <Search /> */}
                </div>
                <ul className="flex w-full flex-col">
                  <li className=" py-2 text-xl text-white transition-colors hover:text-accent-primary">
                    <Link href="/search" prefetch={false} onClick={closeMobileMenu} className="justify-center flex mr-2">
                      Products
                    </Link>
                  </li>
                  <li className="py-2 text-xl text-white transition-colors hover:text-accent-primary">
                    <Link href="/about-us" prefetch={false} onClick={closeMobileMenu} className="justify-center flex mr-2">
                      About Us
                    </Link>
                  </li>
                  <li className="py-2 text-xl text-white transition-colors hover:text-accent-primary">
                    <Link href="/contact-us" prefetch={false} onClick={closeMobileMenu} className="justify-center flex mr-2">
                      Contact Us
                    </Link>
                  </li>
                  <li className="py-2 text-xl text-white transition-colors hover:text-accent-primary">
                    <a href="https://account.47gear.ro" className="justify-center flex mr-2">
                      My Account
                    </a>
                  </li>
                  {menu.length > 0 ? 
                    menu.map((item: Menu) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                        key={item.title}
                      >
                        <Link
                          href={item.path}
                          prefetch={true}
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))
                  : null}
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
