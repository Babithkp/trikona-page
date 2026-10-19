"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import BrowserFrame from "@/components/ui/BrowserFrame";
import PhoneFrame from "@/components/ui/PhoneFrame";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { LandingCaseStudy } from "@/lib/custom-software-landing";
import { projectMedia } from "@/lib/project-media";

/**
 * Case studies as a horizontal, arrow-navigated row on desktop (every card
 * stretched to the same height via flex) and a plain vertical stack on
 * mobile, where there's no room or input method for horizontal scroll.
 */
export default function CaseStudiesCarousel({
  studies,
}: {
  studies: LandingCaseStudy[];
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".case-study-card");
    const amount = (card?.offsetWidth ?? 420) + 24;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="mt-14">
      <div className="hidden justify-end gap-2 pb-4 lg:flex">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous case study"
          className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-2"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next case study"
          className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-2"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6 lg:overflow-x-auto lg:scroll-smooth lg:pb-2 lg:[scrollbar-width:none]"
      >
        {studies.map((study, i) => {
          const media = projectMedia[study.slug];
          return (
            <Reveal
              key={study.industry}
              delay={(i % 2) * 90}
              className="case-study-card group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm lg:w-[420px]"
            >
              {media ? (
                <div
                  className={cn(
                    media.frame === "full"
                      ? ""
                      : "flex items-end justify-center bg-brand-50 px-6 pt-6",
                  )}
                >
                  {media.frame === "full" ? (
                    <Image
                      src={media.images[0]}
                      alt={media.alt}
                      placeholder="blur"
                      sizes="(max-width: 768px) 88vw, 420px"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : media.frame === "phone" ? (
                    <div className="flex items-end justify-center gap-3">
                      {media.images.slice(0, 2).map((image, idx) => (
                        <PhoneFrame
                          key={idx}
                          className={
                            idx === 0
                              ? "translate-y-4 rotate-[-4deg]"
                              : "translate-y-4 rotate-[4deg]"
                          }
                        >
                          <Image
                            src={image}
                            alt={idx === 0 ? media.alt : ""}
                            aria-hidden={idx !== 0}
                            placeholder="blur"
                            sizes="140px"
                            className="size-full object-cover object-top"
                          />
                        </PhoneFrame>
                      ))}
                    </div>
                  ) : (
                    <BrowserFrame
                      className="w-full translate-y-4"
                      label={study.industry}
                    >
                      <Image
                        src={media.images[0]}
                        alt={media.alt}
                        placeholder="blur"
                        sizes="(max-width: 768px) 88vw, 420px"
                        className="aspect-[16/10] w-full object-cover object-top"
                      />
                    </BrowserFrame>
                  )}
                </div>
              ) : null}

              <div className="flex flex-1 flex-col p-7">
                <span className="rounded-full bg-surface-3 px-3 py-1 text-xs font-medium text-ink-3 w-fit">
                  {study.industry}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-ink-4 uppercase tracking-wide">
                  Challenge
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">
                  {study.challenge}
                </p>
                <h3 className="mt-4 text-sm font-semibold text-ink-4 uppercase tracking-wide">
                  What we built
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">
                  {study.solution}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
                  {study.results.map((result) => (
                    <div key={result.label}>
                      <dt className="text-xs leading-snug text-ink-4">
                        {result.label}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-semibold tracking-tight text-gradient">
                        {result.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <li
                      key={tech}
                      className={cn(
                        "rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.6875rem] font-medium text-ink-3",
                      )}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
