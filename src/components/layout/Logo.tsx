import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/fullLogo-white.png";
import { cn } from "@/lib/utils";

/**
 * The Trikona wordmark, linked home.
 *
 * Note: despite the filename, fullLogo-white.png is the dark-wordmark version
 * intended for light backgrounds — which is what the site uses throughout.
 */
export default function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Trikona — home"
      className={cn(
        "inline-flex shrink-0 items-center rounded-md transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src={logo}
        alt="Trikona"
        priority
        // Intrinsic ratio is preserved; width is driven by the class below so
        // the header never shifts while the image decodes.
        className="h-8 w-auto sm:h-9"
        sizes="180px"
      />
    </Link>
  );
}
