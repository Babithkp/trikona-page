import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A continuous, CSS-only marquee.
 *
 * The track holds two identical copies of the content and translates by
 * exactly -50%, so the loop is seamless without measuring anything at
 * runtime. The duplicate is hidden from assistive technology and the
 * animation stops entirely under prefers-reduced-motion (handled globally).
 */
export default function Marquee({
  items,
  className,
  durationSeconds = 44,
}: {
  items: readonly string[];
  className?: string;
  durationSeconds?: number;
}) {
  const renderRun = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border border-line bg-surface px-5 py-2.5 shadow-xs",
            "text-sm font-medium whitespace-nowrap text-ink-2",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={
          { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
        }
      >
        {renderRun(false)}
        {renderRun(true)}
      </div>
    </div>
  );
}
