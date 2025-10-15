import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border border-accent-primary bg-gaming-800 animate-pulse rounded-md transition-all duration-300 hover:shadow-neon",
        {
          "h-[48px] w-[48px] rounded-xl": !size,
          "h-[36px] w-[36px] rounded-lg": size === "sm",
        }
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[32px] w-[32px]": !size,
          "h-[24px] w-[24px]": size === "sm",
        })}
      />
    </div>
  );
}
