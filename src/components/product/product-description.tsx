import { Product } from "@/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="space-y-8">
      {/* Title & Price */}
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full">
          <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Premium Gaming</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">{product.title}</h1>
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold text-white">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
          {/* <span className="text-sm text-white/40">Free shipping</span> */}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Variant Selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Description */}
      {product.descriptionHtml ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Detalii produs</h3>
          <Prose
            className="text-base leading-relaxed text-white/60"
            html={product.descriptionHtml}
          />
        </div>
      ) : null}

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Add to Cart */}
      <AddToCart product={product} />

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="text-xs text-white/50 mb-1">Calitate</div>
          <div className="text-sm font-medium text-white">Materiale Premium</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="text-xs text-white/50 mb-1">Garantie</div>
          <div className="text-sm font-medium text-white">2 ani</div>
        </div>
      </div>
    </div>
  );
}
