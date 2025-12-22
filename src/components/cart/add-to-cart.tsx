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
    "relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] p-4 tracking-wide text-white font-semibold shadow-lg transition-all duration-500 overflow-hidden group";
  const disabledClasses = "cursor-not-allowed opacity-50 hover:opacity-50";
  const hoverClasses = "hover:shadow-neon-purple hover:scale-[1.02] hover:bg-[position:100%_0] active:scale-[0.98]";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        <span className="relative z-10 text-sm uppercase tracking-widest">Out of Stock</span>
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
        <PlusIcon className="h-5 w-5 text-white" />
        <span className="relative z-10 text-sm uppercase tracking-widest">Select an Option</span>
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, hoverClasses)}
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>
      <PlusIcon className="h-5 w-5 text-white relative z-10 group-hover:rotate-90 transition-transform duration-300" />
      <span className="relative z-10 text-sm uppercase tracking-widest">Adauga in cos</span>
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
