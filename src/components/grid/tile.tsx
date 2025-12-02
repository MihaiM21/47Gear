import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
    availableForSale?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-2xl glass-card relative",
        {
          relative: label,
          "border-2 border-accent-primary shadow-glow-purple": active,
          "border border-white/10 hover:border-accent-primary/70": !active,
        }
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-black/40 to-black/60 opacity-80 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent-primary/20 to-transparent z-0"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/20 rounded-full blur-3xl z-0 opacity-50"></div>
      
      {/* Product image with hover effects */}
      {props.src ? (
        <div className="relative h-full w-full z-10 p-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <Image
            className={clsx("relative object-contain z-10 transition-all duration-700", {
              "ease-in-out group-hover:scale-110 group-hover:rotate-1 drop-shadow-lg":
                isInteractive,
            })}
            {...props}
            alt={props.alt || "Product image"}
          />
        </div>
      ) : null}
      
      {/* Shine effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 shine-effect"></div>
      
      {/* Product badge - top right */}
      {/* <div className="absolute top-3 right-3 z-20 transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1">
        <div className="bg-black/80 backdrop-blur-md text-accent-secondary text-xs font-medium px-3 py-1 rounded-full border border-accent-secondary/30 shadow-glow-sm">
          Premium
        </div>
      </div> */}
      
      {label ? (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent py-4 px-4 z-20 transform transition-transform duration-500 translate-y-0">
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
            availableForSale={label.availableForSale}
          />
        </div>
      ) : null}
    </div>
  );
}
