import clsx from "clsx";
import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode,
  position = "bottom",
  availableForSale = false,
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
  availableForSale?: boolean;
}) {
  // 1. Format just the number without the currency symbol
  const formattedNumber = new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));

  // 2. Extract symbol ($, €, RON etc.)
  const currencySymbol = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value || currencyCode;

  return (
    <div
      className={clsx(
        "flex w-full srccontainer/label",
        {
          "lg:px-10 lg:pb-[15%]": position === "center",
        }
      )}
    >
      <div className="rounded-3xl flex w-full flex-col gap-2 p-4 text-sm font-medium text-white">
        <h3 className="line-clamp-2 text-xl font-bold text-white group-hover:text-accent-secondary transition-colors duration-300 leading-snug">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="inline-flex items-baseline gap-1">
            {/* SHOW NUMBER */}
            <span className="text-l font-bold text-white">
              {formattedNumber}
            </span>
            
            {/* SHOW CURRENCY SYMBOL */}
            <span className="text-xs text-gaming-300 font-medium uppercase">
              {currencySymbol}
            </span>
          </div>

          {availableForSale ? (
            <div className="inline-flex items-center gap-1 text-accent-green text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Stock
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 text-red-500 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}