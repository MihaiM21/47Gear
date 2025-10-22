'use client'; 

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import { useFormState } from "react-dom";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "./actions";
import { useActionState } from "react";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4A2B74] to-[#8A63FF] p-4 tracking-wide text-white font-medium shadow-glow-sm transition-all duration-300 overflow-hidden";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";
  const hoverClasses = "hover:shadow-glow-purple hover:scale-[1.02] transform";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        <span className="relative z-10 uppercase tracking-wider">Out of Stock</span>
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4 flex items-center justify-center rounded-full bg-white/10 p-1">
          <PlusIcon className="h-5 w-5 text-white" />
        </div>
        <span className="relative z-10 uppercase tracking-wider">Select an Option</span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, hoverClasses, "group")}
    >
      <div className="absolute left-0 ml-4 flex items-center justify-center rounded-full bg-white/10 p-1">
        <PlusIcon className="h-5 w-5 text-white" />
      </div>
      <span className="relative z-10 uppercase tracking-wider">Add To Cart</span>
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shine-effect"></div>
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;
  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
      className="mt-6 transform transition-transform duration-300 hover:translate-y-[-2px]"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#4A2B74] to-[#8A63FF] opacity-30 blur-lg rounded-lg"></div>
        <SubmitButton
          availableForSale={availableForSale}
          selectedVariantId={selectedVariantId}
        />
      </div>
      <p className="sr-only" role="status" aria-label="polite">
        {message}
      </p>
    </form>
  );
}
