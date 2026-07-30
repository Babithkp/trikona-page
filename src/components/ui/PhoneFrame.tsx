import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A minimal handset frame for portrait app screenshots.
 *
 * Keeps mobile captures in a fixed aspect ratio so they sit correctly in a
 * grid, instead of the previous approach of absolutely positioning tall
 * images and letting them overflow the card.
 */
export default function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-[7.25rem] overflow-hidden rounded-[1.5rem] border-[5px] border-ink/90 bg-ink shadow-xl sm:w-[8.5rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-1.5 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/25"
      />
      <div className="size-full overflow-hidden rounded-[1.35rem] bg-surface">
        {children}
      </div>
    </div>
  );
}
