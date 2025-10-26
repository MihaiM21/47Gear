import clsx from "clsx";
import LogoIcon from "./icons/logo";
import Image from "next/image";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo/logo_purple.png"
        alt="Logo"
        width={size === "sm" ? 48 : 64}
        height={size === "sm" ? 48 : 64}
      />
    </div>
  );
}
