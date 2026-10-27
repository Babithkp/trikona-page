import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import HeroLeadForm from "@/components/shared/HeroLeadForm";
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * The closing conversion block. Every page ends here, so the primary action
 * is always one scroll away regardless of where a visitor lands.
 *
 * `showForm` swaps the centered button pair for an inline lead form beside
 * the heading, matching the landing pages' final-CTA treatment — used on the
 * homepage, where a visitor is already warmed up and a form reduces drop-off
 * more than a link to another page would.
 */
export default function CtaSection({
  title = "Let's build something worth shipping",
  description = "Tell us what you're working on. We'll come back with initial thoughts and a suggested next step.",
  showForm = false,
}: {
  title?: string;
  description?: string;
  showForm?: boolean;
}) {
  return (
    <Section aria-labelledby="cta-heading">
      <Container>
        <Reveal>
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-3xl border border-line bg-surface shadow-lg",
              showForm
                ? "px-6 py-14 sm:px-10 sm:py-16 lg:px-14"
                : "px-6 py-16 text-center sm:px-12 sm:py-20",
            )}
          >
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

            {showForm ? (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
                <div className="flex flex-col gap-4">
                  <h2 id="cta-heading" className="text-h2 text-ink">
                    {title}
                  </h2>
                  <p className="text-lead text-ink-3">{description}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    <Mail className="size-4" />
                    {site.email}
                  </a>
                  <a
                    href={whatsappHref(
                      "Hi, I'd like to talk about building a product with Trikona.",
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp us
                  </a>
                </div>

                <HeroLeadForm source="homepage-cta" />
              </div>
            ) : (
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
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
