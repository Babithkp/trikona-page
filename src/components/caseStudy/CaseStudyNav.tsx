"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky table of contents with scroll-spy.
 *
 * The previous implementation derived the "active" section from overall page
 * scroll percentage against hardcoded thresholds, so the highlight drifted out
 * of sync as soon as section lengths changed. This observes the sections
 * themselves, which stays correct regardless of content length.
 */
export default function CaseStudyNav({
  sections,
}: {
  sections: { id: string; heading: string }[];
}) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");

  React.useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry closest to the top of the reading area.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible) setActiveId(visible.target.id);
      },
      // Bias the detection band towards the upper third of the viewport so the
      // highlight matches what the reader is actually looking at.
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  );
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <nav aria-label="Case study sections" className="flex gap-5">
      <div
        aria-hidden="true"
        className="relative w-0.5 shrink-0 overflow-hidden rounded-full bg-line-2"
      >
        <div
          className="w-full rounded-full bg-gradient-brand transition-[height] duration-500 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      <ol className="flex flex-col gap-4">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "text-sm transition-colors duration-200",
                  active
                    ? "font-medium text-ink"
                    : "text-ink-4 hover:text-ink-2",
                )}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
