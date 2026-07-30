import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/site";

/**
 * The six delivery stages as an alternating timeline.
 *
 * Media is lazy-loaded below the fold and given explicit dimensions so the
 * page never shifts as the animations stream in. Animated GIFs are marked
 * `unoptimized` because Next's optimiser would otherwise flatten them to a
 * single frame.
 */
export default function ProcessTimeline() {
  return (
    <Section aria-labelledby="timeline-heading">
      <Container>
        <h2 id="timeline-heading" className="sr-only">
          Our six-stage delivery process
        </h2>

        <ol className="relative flex flex-col gap-16 sm:gap-24">
          {/* Continuous spine, drawn behind the rows on large screens. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line-2 to-transparent lg:block"
          />

          {processSteps.map((step, i) => {
            const mediaFirst = i % 2 === 1;

            return (
              <li
                key={step.index}
                // Anchor target referenced by the HowTo structured data.
                id={`stage-${i + 1}`}
                className="relative grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Copy */}
                {/* Text stays left-aligned on both sides of the spine —
                    mirroring it produced ragged-left paragraphs that are
                    measurably harder to read. Only the media alternates. */}
                <Reveal
                  className={cn(
                    "flex flex-col gap-4",
                    mediaFirst ? "lg:order-2 lg:pl-8" : "lg:pr-8",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 place-items-center rounded-full bg-gradient-brand font-mono text-sm font-semibold text-white shadow-brand"
                    >
                      {step.index}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] text-ink-4 uppercase">
                      Stage {i + 1} of {processSteps.length}
                    </span>
                  </div>

                  <h3 className="text-h3 text-ink">{step.title}</h3>
                  <p className="text-lead text-ink-2">{step.description}</p>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-ink-3">
                    {step.detail}
                  </p>
                </Reveal>

                {/* Media */}
                <Reveal
                  delay={80}
                  className={cn(mediaFirst && "lg:order-1")}
                >
                  {/* object-contain: these scenes have varying native aspect
                      ratios, and cropping them to a uniform box cut the
                      subject out of half the frames. */}
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-md">
                    <div className="overflow-hidden rounded-xl bg-surface-2">
                      {step.media.type === "video" ? (
                        <video
                          className="aspect-[16/10] w-full object-contain"
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="none"
                          aria-label={`${step.title} — illustrative animation`}
                        >
                          <source src={step.media.src} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={step.media.src}
                          alt=""
                          aria-hidden="true"
                          width={800}
                          height={500}
                          unoptimized
                          loading="lazy"
                          className="aspect-[16/10] w-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
