"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { capabilities } from "@/lib/site";

/**
 * Scope of work, as a single-open disclosure list.
 *
 * The expand animation uses a grid-template-rows 0fr → 1fr transition, which
 * animates to intrinsic height in pure CSS. This replaced a GSAP tween that
 * was the only reason the animation library was in the bundle at all.
 */
export default function Capabilities() {
  const [openId, setOpenId] = React.useState(capabilities[0].id);

  return (
    <Section id="capabilities" aria-labelledby="capabilities-heading">
      <Container>
        <SectionHeading
          align="left"
          title={<span id="capabilities-heading">Scope of work</span>}
          description="Five phases, one team. Take the whole arc or step in wherever you need us."
          action={
            <Button asChild variant="outline">
              <Link href="/services">All services</Link>
            </Button>
          }
        />

        <div className="mt-12 flex flex-col gap-3">
          {capabilities.map((capability, i) => {
            const isOpen = openId === capability.id;
            const panelId = `capability-panel-${capability.id}`;
            const buttonId = `capability-button-${capability.id}`;

            return (
              <Reveal key={capability.id} delay={i * 80}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-[border-color,box-shadow,background-color] duration-300",
                    isOpen
                      ? "border-brand-200 bg-surface shadow-md"
                      : "border-line bg-surface/70 shadow-xs hover:border-line-2 hover:bg-surface",
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(capability.id)}
                      className="flex w-full cursor-pointer items-start gap-5 p-6 text-left sm:gap-8 sm:p-8"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-mono text-sm tabular-nums transition-colors duration-300 sm:text-base",
                          isOpen ? "text-brand" : "text-ink-4",
                        )}
                      >
                        {capability.index}
                      </span>

                      <span className="flex flex-1 flex-col gap-2">
                        <span
                          className={cn(
                            "font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl",
                            isOpen ? "text-ink" : "text-ink-2",
                          )}
                        >
                          {capability.title}
                        </span>
                        <span className="max-w-[60ch] text-sm leading-relaxed text-ink-3">
                          {capability.summary}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-300",
                          isOpen
                            ? "rotate-45 border-transparent bg-gradient-brand text-white"
                            : "border-line-2 bg-surface text-ink-4",
                        )}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>

                  {/* 0fr → 1fr animates to the content's natural height. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    // `inert` rather than `hidden`: collapsed content stays
                    // out of the tab order and the accessibility tree while
                    // still being animatable.
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid gap-x-8 gap-y-3 border-t border-line px-6 py-6 sm:grid-cols-2 sm:px-8 sm:py-7 lg:pl-[4.5rem]">
                        {capability.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-ink-2"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-brand"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
