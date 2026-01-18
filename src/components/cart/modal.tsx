"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import OpenCart from "./open-cart";
import CloseCart from "./close-cart";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }

      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-[1000]">
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
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-accent-primary/20 bg-gradient-to-b from-black/95 via-gaming-900/95 to-black/95 backdrop-blur-2xl p-6 text-white shadow-2xl md:w-[420px]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-accent-primary/20">
                <p className="text-xl font-bold text-gaming-300">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart} className="p-2 rounded-lg hover:bg-accent-primary/20 transition-colors duration-200">
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-accent-primary/20 blur-2xl"></div>
                    <ShoppingCartIcon className="relative h-24 w-24 text-accent-primary/50 mb-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Your Cart is Empty</h3>
                  <p className="text-gaming-300 text-center mb-6 max-w-xs">Start adding items to see them here</p>
                  <Link 
                    href="/search" 
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-neon-purple hover:scale-105"
                  >
                    Start Shopping
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[
                                name.toLocaleLowerCase()
                              ] = value;
                            }
                          }
                        );
                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="lex w-full flex-col border-b border-neutral-300 dark:border-neutral-700 pb-6"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              
                            </div>
                            <div className="flex flex-row">
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gaming-600 bg-gaming-700 hover:border-accent-primary transition-all duration-300">
                                <Image
                                  className="h-full w-full object-cover transition-all duration-300 hover:scale-110"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText || item.merchandise.product.title
                                  }
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                />
                              </div>
                              <Link
                                href={merchandiseUrl}
                                onClick={closeCart}
                                className="z-30 ml-2 flex flex-row space-x-4 group"
                              >
                                <div className="flex flex-1 flex-col text-base">
                                  <span className="leading-tight">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <p className="text-sm text-white dark:text-white">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}
                                </div>
                              </Link>
                            </div>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                              <div className="mt-2 flex flex-row items-center gap-4">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                              
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-gaming-300">
                    <div className="mb-3 flex items-center justify-between border-b border-gaming-700 pb-3">
                      <p>Taxe</p>
                      <Price
                        className="text-right text-base text-white"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-gaming-700 pb-3 pt-1">
                      <p>Transport</p>
                      <p className="text-right text-gaming-200">Calculat la checkout</p>
                    </div>
                    <div className="mb-6 flex items-center justify-between border-b border-gaming-700 pb-3 pt-1">
                      <p className="font-bold text-white">Total</p>
                      <Price
                        className="text-right text-lg font-bold text-accent-primary"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-lg bg-accent-primary p-4 text-center text-sm font-bold text-white transition-all duration-300 hover:shadow-neon transform hover:scale-[1.02]"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : <><span className="text-white">Checkout</span></>}
    </button>
  );
}
