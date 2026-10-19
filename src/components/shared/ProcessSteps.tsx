"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type ProcessStep = {
  word: string;
  title: string;
  description: string;
};

/**
 * A horizontal row of numbered steps. On desktop (`lg` and up), hovering a
 * column opens it along with every column before it — hover the 3rd step
 * and the 1st and 2nd stay expanded too, so the row reads as "how far along
 * the process this is" rather than a single isolated tooltip. Focus does
 * the same for keyboard users, and a click opens it too since touch devices
 * have no hover state.
 *
 * Below `lg` every step is shown fully expanded all the time — there's no
 * hover affordance on touch, and a vertical list has room for every
 * description at once.
 */
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <div className="grid grid-cols-1 border-t border-line lg:grid-cols-4 lg:border-t-0">
      {steps.map((step, i) => {
        const openDesktop = i <= openIndex;
        const number = String(i + 1).padStart(2, "0");

        return (
          <button
            key={step.word}
            type="button"
            aria-expanded={openDesktop}
            onMouseEnter={() => setOpenIndex(i)}
            onFocus={() => setOpenIndex(i)}
            onClick={() => setOpenIndex(i)}
            className={cn(
              "flex flex-col border-b border-line px-1 pt-6 pb-8 text-left transition-colors duration-300 lg:min-h-[22rem] lg:border-r lg:border-b-0 lg:px-6",
              "lg:border-t-2",
              openDesktop ? "lg:border-t-brand" : "lg:border-t-line",
              i === steps.length - 1 && "lg:border-r-0",
            )}
          >
            <span className="font-mono text-xs tracking-wide text-ink-4">
              N&ordm; {number}
            </span>

            <span
              className={cn(
                "mt-3 font-display text-6xl font-bold tracking-tight text-ink transition-colors duration-300 sm:text-7xl",
                !openDesktop && "lg:text-ink/15",
              )}
            >
              {number}
            </span>

            <div
              className={cn(
                "mt-5 flex flex-col gap-2",
                !openDesktop && "lg:hidden",
              )}
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                <span className="text-brand">{step.word}</span> {step.title}
              </h3>
              <p className="max-w-[32ch] text-sm leading-relaxed text-ink-3">
                {step.description}
              </p>
            </div>

            <span
              className={cn(
                "mt-auto hidden pt-10 text-base font-semibold text-ink-2 lg:pt-16",
                !openDesktop && "lg:block",
              )}
            >
              {step.word} {step.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
