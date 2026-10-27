import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata, servicesSchema } from "@/lib/seo";
import { capabilities } from "@/lib/site";

export const metadata = pageMetadata({
  title: "UI/UX Design, Website & App Development Services",
  description:
    "Trikona's services: brand identity, UI/UX design, website and web app development, mobile and desktop applications, and custom digital solutions for startups and growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        schema={[
          servicesSchema,
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
        ]}
      />

      <PageHero
        title={
          <>
            Everything it takes to ship a{" "}
            <span className="text-gradient">real product</span>
          </>
        }
        description="Branding, design, engineering and launch support, delivered by one team, so nothing falls through the gap between disciplines."
        actions={
          <>
            <Button asChild variant="gradient" size="lg">
              <Link href="/contactus">
                Start a project
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/process">How we work</Link>
            </Button>
          </>
        }
      />

      {/* Engagement scope */}
      <Section
        aria-label="Scope of work"
        className="relative isolate border-y border-line bg-surface"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-60 mask-fade-edges"
        />
        <Container>
          <div className="flex flex-col gap-6">
            {capabilities.map((capability, i) => (
              <Reveal
                key={capability.id}
                delay={i * 90}
                className="flex flex-col gap-6 rounded-2xl border border-line bg-surface-2 p-7 lg:flex-row lg:items-start lg:gap-10 lg:p-10"
              >
                <div className="lg:w-1/3 lg:shrink-0">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-brand tabular-nums"
                  >
                    {capability.index}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">
                    {capability.summary}
                  </p>
                </div>
                <ul className="grid flex-1 grid-cols-1 gap-2.5 border-t border-line pt-6 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  {capability.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-ink-2"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection />
      <CtaSection
        title="Not sure which service you need?"
        description="Describe the problem rather than the solution. We'll tell you what we'd actually recommend, even when that means a smaller engagement."
      />
    </main>
  );
}
