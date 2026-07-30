import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

/**
 * The closing conversion block. Every page ends here, so the primary action
 * is always one scroll away regardless of where a visitor lands.
 */
export default function CtaSection({
  title = "Let's build something worth shipping",
  description = "Tell us what you're working on. We'll come back within two working days with initial thoughts and a suggested next step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section aria-labelledby="cta-heading">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
            {/* Depth: a soft brand bloom and dot grid, both decorative. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-dots opacity-70" />
              <div
                className="absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full blur-[120px] opacity-55"
                style={{
                  background:
                    "radial-gradient(circle, rgba(166,50,242,0.35), rgba(251,163,37,0.22) 55%, transparent 72%)",
                }}
              />
            </div>

            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 id="cta-heading" className="text-h2 text-ink">
                {title}
              </h2>
              <p className="text-lead text-ink-3">{description}</p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="gradient" size="lg">
                  <Link href="/contactus">
                    Start a project
                    <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${site.email}`}>
                    <Mail />
                    {site.email}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
