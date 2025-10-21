import clsx from "clsx";
import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    <div
      className={clsx(
        "flex w-full srccontainer/label",
        {
          "lg:px-10 lg:pb-[15%]": position === "center",
        }
      )}
    >
      <div className="flex w-full items-center justify-between p-3 text-sm font-medium text-white group-hover:opacity-100 opacity-90 transition-opacity">
        <h3 className="line-clamp-1 flex-grow leading-tight tracking-tight font-bold text-white group-hover:text-gradient-purple transition-colors duration-300">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-gradient-to-r from-accent-primary to-purple-600 py-1.5 px-4 text-white font-bold shadow-glow-sm group-hover:shadow-glow-purple transition-all duration-300"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="text-white/90 text-xs ml-1 font-medium"
        />
      </div>
    </div>
  );
}
