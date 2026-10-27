import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/site";

/**
 * The six delivery stages as an editorial, alternating index — the same
 * numbered-row treatment used on /portfolio, applied to process stages
 * instead of projects.
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

        <ol className="flex flex-col gap-16 sm:gap-20">
          {processSteps.map((step, i) => (
            <li
              key={step.index}
              // Anchor target referenced by the HowTo structured data.
              id={`stage-${i + 1}`}
              className="scroll-mt-28"
            >
              <Reveal
                className={cn(
                  "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
                  i % 2 === 1 && "lg:flex-row-reverse",
                  i > 0 && "border-t border-line pt-16 sm:pt-20",
                )}
              >
                {/* Media */}
                <div className="lg:w-1/2">
                  <div className="overflow-hidden rounded-lg border border-line bg-surface-2 shadow-xl sm:rounded-xl">
                    {step.media.type === "video" ? (
                      <video
                        className="aspect-[16/10] w-full object-contain"
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="none"
                        aria-label={`${step.title}: illustrative animation`}
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

                {/* Copy */}
                <div className="flex flex-col gap-5 lg:w-1/2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm tabular-nums text-ink-4">
                      {step.index}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  </div>

                  <span className="w-fit rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-ink-3 uppercase">
                    Stage {i + 1} of {processSteps.length}
                  </span>

                  <h3 className="text-h3 text-ink">{step.title}</h3>
                  <p className="text-lead text-ink-2">{step.description}</p>
                  <p className="max-w-[48ch] leading-relaxed text-ink-3">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
