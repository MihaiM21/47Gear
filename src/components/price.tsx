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
} & React.ComponentProps<"p">) => {
  
  // 1. Formatăm numărul (fără simbol)
  const formattedNumber = new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));

  // 2. Extragem doar simbolul monedei
  const currencySymbol = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value || currencyCode;

  return (
    <p suppressHydrationWarning={true} className={clsx("font-bold text-white flex items-baseline gap-1", className)}>
      {/* Afișăm numărul */}
      <span className="text-2xl text-gaming-300">
        {formattedNumber}
      </span>
      
      {/* Afișăm simbolul după număr */}
      <span className={clsx("text-sm", currencyCodeClassName)}>
        {currencySymbol}
      </span>
    </p>
  );
};

export default Price;