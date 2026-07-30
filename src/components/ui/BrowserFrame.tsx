import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A restrained browser chrome used to present product screenshots.
 *
 * Gives flat screenshots physical context and elevation without resorting to
 * absolutely-positioned image stacks, which is what previously caused artwork
 * to escape its container at intermediate viewport widths.
 */
export default function BrowserFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  /** Shown in the address bar. Decorative — hidden from screen readers. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-xl sm:rounded-2xl",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2.5 sm:px-4"
      >
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-2" />
          <span className="size-2.5 rounded-full bg-line-2" />
          <span className="size-2.5 rounded-full bg-line-2" />
        </div>
        {label ? (
          <div className="mx-auto hidden max-w-[16rem] flex-1 truncate rounded-md bg-surface-3 px-3 py-1 text-center text-[0.6875rem] text-ink-4 sm:block">
            {label}
          </div>
        ) : null}
        <div className="w-10 shrink-0" />
      </div>
      <div className="bg-surface-2">{children}</div>
    </div>
  );
}
