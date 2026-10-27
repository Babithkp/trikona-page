import { Mail, MapPin, Phone } from "lucide-react";

import HeroLeadForm from "@/components/shared/HeroLeadForm";
import PageHero from "@/components/shared/PageHero";
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  // The layout's title template already appends "| Trikona".
  title: "Contact Us: Let's Build Your Website or Product",
  description:
    "Get in touch with Trikona to discuss your website, app or digital product. Tell us what you're building and we'll reply.",
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
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with us",
    href: whatsappHref(
      "Hi, I'd like to talk about building a product with Trikona.",
    ),
    external: true,
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
        title={
          <>
            Let&apos;s talk about{" "}
            <span className="text-gradient">what you&apos;re building</span>
          </>
        }
        description="Fill in the form and we'll come back with initial thoughts and a suggested next step."
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
                    Prefer email or a call? Reach us directly. We read every
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
                              target={detail.external ? "_blank" : undefined}
                              rel={detail.external ? "noreferrer noopener" : undefined}
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
                <HeroLeadForm source="contactus" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
