import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/lib/site";

/**
 * A compact view of the six-stage delivery process, linking through to the
 * full breakdown. Static markup — no client JavaScript on the home page for
 * what is essentially a numbered list.
 */
export default function ProcessPreview() {
  return (
    <Section
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden border-y border-line bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.5] mask-fade-edges"
      />

      <Container>
        <SectionHeading
          title={<span id="process-heading">The Trikona way</span>}
          description="A proven end-to-end process, from onboarding through design, development and QA, that turns an idea into a product your business can actually stand on."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.index}
              delay={i * 60}
              className="group relative bg-surface p-7 transition-colors duration-300 hover:bg-brand-50/50 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-brand tabular-nums"
              >
                {step.index}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                {step.description}
              </p>
              {/* Gradient rule that draws in on hover — a small, quiet reward
                  for scanning, and a hint that the row is a coherent unit. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-brand transition-transform duration-500 ease-out group-hover:scale-x-100 sm:inset-x-8"
              />
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/process">
              See the full process
              <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
