import CareersForm from "@/components/shared/CareersForm";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers — Join Our Design & Development Team",
  description:
    "Join Trikona and work on meaningful digital products across UI/UX design, website development and web applications. We're always looking for curious, driven people.",
  path: "/careers",
});

const reasons = [
  {
    title: "Real ownership",
    description:
      "Small team, real responsibility. You'll own features end to end, not tickets handed down a chain.",
  },
  {
    title: "Craft over volume",
    description:
      "We'd rather ship one considered product than five rushed ones. Quality is the point, not the constraint.",
  },
  {
    title: "Design and engineering together",
    description:
      "Designers and developers sit in the same conversations from day one — no throwing work over a wall.",
  },
  {
    title: "Work that ships",
    description:
      "Everything we build goes live and gets used. You'll have a portfolio of real products, not concepts.",
  },
];

export default function CareersPage() {
  return (
    <main>
      <JsonLd
        schema={breadcrumbSchema([{ name: "Careers", path: "/careers" }])}
      />

      <PageHero
        breadcrumbs={[{ name: "Careers", path: "/careers" }]}
        title={
          <>
            Build things people{" "}
            <span className="text-gradient">actually use</span>
          </>
        }
        description="We're always looking for curious, driven people who want to design, build and scale products that matter. Tell us what you're good at."
      />

      <Section compact aria-labelledby="why-heading">
        <Container>
          <h2 id="why-heading" className="sr-only">
            Why join Trikona
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, i) => (
              <Reveal
                as="li"
                key={reason.title}
                delay={i * 70}
                className="h-full rounded-xl border border-line bg-surface p-6 shadow-xs"
              >
                <h3 className="text-base font-semibold text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">
                  {reason.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section compact aria-labelledby="apply-heading" className="pt-0">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-10">
              <h2 id="apply-heading" className="text-h3 text-ink">
                Apply
              </h2>
              <p className="mt-2 mb-8 text-sm text-ink-3">
                No open role that fits? Apply anyway — we keep good applications
                on file. You can also email us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
              <CareersForm />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
