import Image from "next/image";
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
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";
import { whatsappHref } from "@/lib/whatsapp";
import PhoneFrame from "@/components/ui/PhoneFrame";
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
import { cn } from "@/lib/utils";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { landingCaseStudies, landingFaqs } from "@/lib/custom-software-landing";
import { projectMedia } from "@/lib/project-media";

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
  title: "Custom Software Development: Get a Free Scoping Call",
  description:
    "We build internal tools, billing systems and MVPs around how your team already works, then hand you the code. Book a free scoping call.",
  path: "/custom-software-development",
});

const heroStats = [
  { value: "15+", label: "Projects delivered" },
  { value: "5+", label: "Industries served" },
  { value: "₹20 Cr+", label: "Worth of transactions recorded" },
  { value: "60%", label: "Faster operational workflows" },
];

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
            <div className="flex w-full flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <Reveal className="w-full">
                <h1 className="mx-auto max-w-[24ch] text-h1 text-ink lg:mx-0">
                  Software built around how your team{" "}
                  <span className="text-gradient">already works</span>
                </h1>
              </Reveal>
              <Reveal delay={80} className="w-full">
                <p className="mx-auto max-w-[52ch] text-lead text-ink-3 lg:mx-0">
                  We design and build internal tools, billing systems and
                  MVPs around your workflow. You own every line of code when
                  it ships.
                </p>
              </Reveal>
              <Reveal delay={120} className="w-full">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse text-center lg:text-left"
                    >
                      <dt className="mt-1 min-h-9 text-xs leading-snug text-ink-4">
                        {stat.label}
                      </dt>
                      <dd className="font-display text-2xl font-semibold tracking-tight text-brand">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
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
            description="Four deliberate steps, from first call to launch, and everything after."
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
            title="Four problems like yours, already solved"
            description="Real projects we've shipped: the problem, the build, and the result for each."
          />

          <div className="mt-14 flex flex-col gap-16 sm:gap-20">
            {landingCaseStudies.map((study, i) => {
              const media = projectMedia[study.slug];

              return (
                <Reveal
                  key={study.slug}
                  className={cn(
                    "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
                    i % 2 === 1 && "lg:flex-row-reverse",
                    i > 0 && "border-t border-line pt-16 sm:pt-20",
                  )}
                >
                  {/* Media */}
                  <div className="lg:w-1/2">
                    {media?.frame === "phone" ? (
                      <div className="flex items-end justify-center gap-4 rounded-2xl border border-line bg-surface-2 p-8 shadow-sm sm:gap-6">
                        {media.images.slice(0, 2).map((image, idx) => (
                          <PhoneFrame
                            key={idx}
                            className={
                              idx === 0 ? "rotate-[-4deg]" : "rotate-[4deg]"
                            }
                          >
                            <Image
                              src={image}
                              alt={idx === 0 ? media.alt : ""}
                              aria-hidden={idx !== 0}
                              placeholder="blur"
                              sizes="180px"
                              className="size-full object-cover object-top"
                            />
                          </PhoneFrame>
                        ))}
                      </div>
                    ) : media ? (
                      <div className="overflow-hidden rounded-lg border border-line shadow-xl sm:rounded-xl">
                        <Image
                          src={media.fullImage ?? media.images[0]}
                          alt={media.alt}
                          placeholder="blur"
                          sizes="(max-width: 1024px) 92vw, 640px"
                          className="h-auto w-full"
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col gap-5 lg:w-1/2">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm tabular-nums text-ink-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    </div>

                    <span className="w-fit rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-ink-3 uppercase">
                      {study.industry}
                    </span>

                    <p className="max-w-[48ch] leading-relaxed text-ink-3">
                      {study.challenge}
                    </p>
                    <p className="max-w-[48ch] leading-relaxed text-ink-3">
                      {study.solution}
                    </p>

                    <dl className="grid grid-cols-2 gap-6 border-t border-line pt-5">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <dt className="text-xs leading-snug text-ink-4">
                            {result.label}
                          </dt>
                          <dd className="mt-1.5 font-display text-xl font-semibold tracking-tight text-gradient sm:text-2xl">
                            {result.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 shadow-xs"
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
                    Let&apos;s fix it together
                  </h2>
                  <p className="text-lead text-ink-3">
                    Tell us what&apos;s slowing your team down. We&apos;ll
                    come back with a clear next step.
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    <Mail className="size-4" />
                    {site.email}
                  </a>
                  <a
                    href={whatsappHref(
                      "Hi, I'd like to talk about getting custom software built for my team.",
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp us
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
