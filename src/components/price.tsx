import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "RON",
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={clsx("font-bold text-white", className)}>
    <span className="text-2xl bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
    </span>
    <span
      className={clsx("ml-1 text-sm text-gaming-300", currencyCodeClassName)}
    >{`${currencyCode}`}</span>
  </p>
);

export default Price;
