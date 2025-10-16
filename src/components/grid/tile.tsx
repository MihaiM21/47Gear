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
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-xl border bg-gaming-700 relative",
        {
          relative: label,
          "border-2 border-accent-primary shadow-neon": active,
          "border-gaming-600 hover:border-accent-primary hover:shadow-neon": !active,
        }
      )}
    >
      {/* Add an angled gradient overlay for products */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-80 z-0"></div>
      
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-contain z-10", {
            "transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1":
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      
      {/* Product badge - top right */}
      <div className="absolute top-2 right-2 z-20">
        <div className="bg-black/80 backdrop-blur-sm text-accent-secondary text-xs font-medium px-2 py-1 rounded-md border border-accent-secondary/20">
          Gaming
        </div>
      </div>
      
      {label ? (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gaming-900 to-transparent py-4 px-4 z-20">
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        </div>
      ) : null}
    </div>
  );
}
