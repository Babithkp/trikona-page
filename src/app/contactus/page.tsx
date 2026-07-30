import { Clock, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/shared/ContactForm";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  // The layout's title template already appends "| Trikona".
  title: "Contact Us — Let's Build Your Website or Product",
  description:
    "Get in touch with Trikona to discuss your website, app or digital product. Tell us what you're building and we'll reply within two working days.",
  path: "/contactus",
});

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phones[0],
    href: `tel:${site.phones[0].replace(/\s/g, "")}`,
  },
  {
    icon: Phone,
    label: "Alternate",
    value: site.phones[1],
    href: `tel:${site.phones[1].replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: `${site.locality}, ${site.region}, India`,
  },
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        schema={breadcrumbSchema([{ name: "Contact", path: "/contactus" }])}
      />

      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ name: "Contact", path: "/contactus" }]}
        title={
          <>
            Let&apos;s talk about{" "}
            <span className="text-gradient">what you&apos;re building</span>
          </>
        }
        description="Fill in the form and we'll come back within two working days with initial thoughts and a suggested next step."
      />

      <Section compact aria-labelledby="contact-form-heading">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
            {/* Details panel */}
            <Reveal>
              <div className="relative isolate flex h-full flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-sm">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10"
                >
                  <div className="absolute inset-0 bg-dots opacity-70" />
                  <div
                    className="absolute -top-28 -right-20 size-72 rounded-full blur-[90px] opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(166,50,242,0.32), transparent 70%)",
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-h3 text-ink">Talk to the team</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">
                    Prefer email or a call? Reach us directly — we read every
                    message ourselves.
                  </p>
                </div>

                <dl className="flex flex-col gap-5">
                  {contactDetails.map((detail) => (
                    <div key={detail.label} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3"
                      >
                        <detail.icon className="size-4" />
                      </span>
                      <div>
                        <dt className="text-xs tracking-wide text-ink-4 uppercase">
                          {detail.label}
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium text-ink">
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="transition-colors hover:text-brand"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            detail.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <p className="flex items-center gap-2 border-t border-line pt-6 text-sm text-ink-3">
                  <Clock aria-hidden="true" className="size-4 text-ink-4" />
                  Typical reply time: two working days
                </p>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={80}>
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-10">
                <h2 id="contact-form-heading" className="text-h3 text-ink">
                  Start a project
                </h2>
                <p className="mt-2 mb-8 text-sm text-ink-3">
                  Fields marked with{" "}
                  <span className="text-brand" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">an asterisk</span> are required.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
