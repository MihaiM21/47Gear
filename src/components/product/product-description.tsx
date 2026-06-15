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
          {/* <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Detalii produs</h3> */}
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

      {/* Risk-Free Guarantee Section */}
      <div className="space-y-2 p-4 rounded-2xl border border-accent-primary/20 bg-accent-primary/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-accent-secondary mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Testează 14 zile</p>
              <p className="text-xs text-white/60">Timp pentru a testa mousepad-ul</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-accent-secondary mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Banii înapoi 100%</p>
              <p className="text-xs text-white/60">Dacă nu simți diferența in performanță</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-0">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="text-xs text-white/50 mb-1">Calitate</div>
          <div className="text-sm font-medium text-white">Materiale Premium</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="text-xs text-white/50 mb-1">Garantie</div>
          <div className="text-sm font-medium text-white">1 an</div>
        </div>
      </div>
    </div>
  );
}
