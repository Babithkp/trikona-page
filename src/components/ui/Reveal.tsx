"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number;
  /** Travel distance before settling. Use 0 for a pure fade. */
  y?: number;
  /** Render as something other than a div (e.g. "li", "article"). */
  as?: React.ElementType;
};

/**
 * Fades and lifts its children into place the first time they scroll into
 * view, then stops observing.
 *
 * The hidden and revealed states live in globals.css against [data-reveal],
 * which keeps the reduced-motion and no-JavaScript fallbacks in one place and
 * avoids shipping an animation library for what is a four-line effect.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount is revealed immediately, so
    // above-the-fold content never waits on a scroll event.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
