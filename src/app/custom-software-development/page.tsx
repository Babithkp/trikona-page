import Link from "next/link";
import {
  Check,
  Mail,
  ShieldCheck,
  Timer,
  Workflow,
} from "lucide-react";

import HeroLeadForm from "@/components/shared/HeroLeadForm";
import ProcessSteps from "@/components/shared/ProcessSteps";
import CaseStudiesCarousel from "@/components/shared/CaseStudiesCarousel";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import HeroAurora from "@/components/home/HeroAurora";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { landingCaseStudies, landingFaqs } from "@/lib/custom-software-landing";

/**
 * Dedicated, single-offer landing page for paid traffic (Google Search /
 * Meta retargeting) promoting custom software development specifically.
 *
 * Kept separate from /services and /portfolio on purpose: ad traffic needs
 * message match and a single CTA, not the full multi-service site. Case
 * studies are real projects from src/lib/site.ts — see
 * custom-software-landing.ts for the challenge/solution copy.
 */

export const metadata = pageMetadata({
  title: "Custom Software Development — Get a Free Scoping Call",
  description:
    "We build internal tools, billing systems and MVPs around how your team already works, then hand you the code. Book a free scoping call.",
  path: "/custom-software-development",
});

const differentiators = [
  {
    icon: Workflow,
    title: "Built around how your team already works",
    description:
      "We map your actual process first, then build only the features it needs. It fits from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Own every line of code",
    description:
      "We hand over full source and documentation on completion. No vendor lock-in.",
  },
  {
    icon: Timer,
    title: "Fixed timeline, agreed upfront",
    description:
      "We agree scope and timeline in writing before any work starts. No scope-creep surprises.",
  },
  {
    icon: Check,
    title: "Support doesn't stop at launch",
    description:
      "Every project includes a support window after launch, with maintenance plans available beyond that.",
  },
];

const approach = [
  {
    word: "First,",
    title: "a free scoping call.",
    description:
      "A 20-minute call to understand the problem, not pitch a solution. You leave with a clear next step either way.",
  },
  {
    word: "Then,",
    title: "a fixed-scope proposal.",
    description: "Scope, timeline and cost, agreed in writing before any work starts.",
  },
  {
    word: "Next,",
    title: "design and build.",
    description:
      "Weekly check-ins, with a working build you can click through as it's made.",
  },
  {
    word: "Finally,",
    title: "launch and support.",
    description: "Deployed, monitored, and backed by a support window after launch.",
  },
];

export default function CustomSoftwareLandingPage() {
  return (
    <main>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Custom Software Development", path: "/custom-software-development" },
          ]),
          faqSchema(landingFaqs),
        ]}
      />

      {/* 1. Hero — message on the left, lead form on the right */}
      <section className="relative isolate -mt-16 overflow-hidden pt-28 pb-16 sm:-mt-18 sm:pt-36 sm:pb-20">
        <HeroAurora />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center lg:gap-16">
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <Reveal>
                <h1 className="text-h1 max-w-[24ch] text-ink">
                  Software built around how your team{" "}
                  <span className="text-gradient">already works</span>
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-lead max-w-[52ch] text-ink-3">
                  We design and build internal tools, billing systems and
                  MVPs around your workflow. You own every line of code when
                  it ships.
                </p>
              </Reveal>
              <Reveal delay={120} className="text-sm text-ink-4">
                Fixed-scope timelines · Full source code on handover · Ships
                60–70% faster than building in-house
              </Reveal>
              <Reveal delay={140}>
                <Link
                  href="/custom-software-development-intl"
                  className="text-sm font-medium text-ink-4 underline-offset-4 hover:underline"
                >
                  Outside India? See pricing in $ →
                </Link>
              </Reveal>
            </div>

            <Reveal
              delay={160}
              className="w-full rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-semibold text-ink">
                Start fixing how your team works
              </h2>
              <p className="mt-1 text-sm text-ink-3">
                Fill out the form and let&apos;s find what&apos;s slowing
                your team down, then fix it.
              </p>
              <div className="mt-5">
                <HeroLeadForm />
              </div>
              <a
                href="#contact"
                className="mt-4 inline-block text-sm font-medium text-ink-3 underline-offset-4 hover:underline"
              >
                or see how the process works first
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Approach */}
      <Section aria-labelledby="approach-heading" className="border-y border-line bg-surface">
        <Container>
          <SectionHeading
            align="left"
            title={
              <span id="approach-heading">
                How We <span className="text-gradient">Work</span>
              </span>
            }
            description="Four deliberate steps, from first call to launch — and everything after."
          />

          <Reveal delay={80} className="mt-14">
            <ProcessSteps steps={approach} />
          </Reveal>

          <Reveal
            delay={140}
            className="mt-10 grid gap-8 rounded-2xl bg-brand-50 p-8 sm:grid-cols-2"
          >
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight text-ink">
                4–10 weeks
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-3">
                Typical time from scoping call to launch.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight text-ink">
                100%
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-3">
                Of the source code. Yours, on completion.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Case studies — real, public projects from src/lib/site.ts */}
      <Section aria-labelledby="case-studies-heading">
        <Container>
          <SectionHeading
            title="Six problems like yours, already solved"
            description="Real projects we've shipped — the problem, the build, and the result for each."
          />
          <CaseStudiesCarousel studies={landingCaseStudies} />
        </Container>
      </Section>

      {/* 4. Differentiators */}
      <Section
        aria-labelledby="why-heading"
        className="relative isolate border-y border-line bg-surface"
      >
        <Container>
          <SectionHeading
            title="Four things most agencies won't put in writing"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-2 p-6"
              >
                <item.icon aria-hidden="true" className="size-6 text-brand" />
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-3">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. FAQ — specific to custom software objections */}
      <Section aria-labelledby="faq-heading">
        <Container>
          <SectionHeading
            title="Before you book the call"
          />
          <Reveal delay={80} className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="border-t border-line">
              {landingFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`landing-faq-${i}`}>
                  <AccordionTrigger>
                    <span className="flex items-start gap-4 sm:gap-6">
                      <span
                        aria-hidden="true"
                        className="pt-0.5 font-mono text-sm text-ink-4 tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 sm:pl-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </Section>

      {/* 6. Final CTA — inline form to minimise ad-traffic drop-off */}
      <Section id="contact" aria-labelledby="contact-heading">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 shadow-lg sm:px-10 sm:py-16 lg:px-14">
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

              <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
                <div className="flex flex-col gap-4">
                  <h2 id="contact-heading" className="text-h2 text-ink">
                    Start fixing how your team works
                  </h2>
                  <p className="text-lead text-ink-3">
                    Tell us what&apos;s slowing your team down. Fill out
                    the form and let&apos;s fix it together. You&apos;ll
                    get a clear next step: a scope call, a fixed estimate,
                    or an honest &quot;this isn&apos;t a fit.&quot;
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    <Mail className="size-4" />
                    {site.email}
                  </a>
                </div>

                <HeroLeadForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
