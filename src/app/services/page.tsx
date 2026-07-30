import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata, servicesSchema } from "@/lib/seo";
import { capabilities, services } from "@/lib/site";

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
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        title={
          <>
            Everything it takes to ship a{" "}
            <span className="text-gradient">real product</span>
          </>
        }
        description="Branding, design, engineering and launch support — delivered by one team, so nothing falls through the gap between disciplines."
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

      {/* Service catalogue */}
      <Section compact aria-labelledby="catalogue-heading">
        <Container>
          <h2 id="catalogue-heading" className="sr-only">
            Services we offer
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 80}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Engagement scope */}
      <Section
        aria-labelledby="scope-heading"
        className="relative isolate border-y border-line bg-surface"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-60 mask-fade-edges"
        />
        <Container>
          <SectionHeading
            eyebrow="Scope of work"
            title={
              <span id="scope-heading">Three phases, one accountable team</span>
            }
            description="Engage us for the full arc, or step in at the phase where you need the most help."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {capabilities.map((capability, i) => (
              <Reveal
                key={capability.id}
                delay={i * 90}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-7"
              >
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
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
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
        description="Describe the problem rather than the solution. We'll tell you what we'd actually recommend — even when that means a smaller engagement."
      />
    </main>
  );
}
