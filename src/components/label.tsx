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
      <div className="flex w-full items-center justify-between p-2 text-sm font-medium text-white">
        <h3 className="line-clamp-1 flex-grow leading-tight tracking-tight font-bold">
          {title}
        </h3>
        <Price
          className="flex-none rounded-lg bg-accent-primary py-1 px-3 text-white font-bold shadow-sm"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="text-white/90 text-xs ml-1"
        />
      </div>
    </div>
  );
}
