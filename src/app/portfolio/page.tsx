import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import PhoneFrame from "@/components/ui/PhoneFrame";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { breadcrumbSchema, pageMetadata, portfolioSchema } from "@/lib/seo";
import { projectMedia } from "@/lib/project-media";
import { projects } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Work: UI/UX, Website & App Development Projects",
  description:
    "Selected Trikona projects: a logistics billing platform, the Eventra event management MVP, Deconest Interiors and Snippet2Sketch. See how design, engineering and strategy come together.",
  path: "/portfolio",
});

// Esports Tournament Dashboard leads with the strongest hook for this page's
// audience, so it's bumped to second — the shared `projects` order (used on
// the homepage and elsewhere) is left as-is.
const portfolioOrder = [
  projects[0],
  projects.find((p) => p.slug === "esports-dashboard")!,
  ...projects.filter(
    (p) => p.slug !== projects[0].slug && p.slug !== "esports-dashboard",
  ),
];

export default function PortfolioPage() {
  return (
    <main>
      <JsonLd
        schema={[
          portfolioSchema,
          breadcrumbSchema([{ name: "Work", path: "/portfolio" }]),
        ]}
      />

      <PageHero
        title={
          <>
            Products built to be{" "}
            <span className="text-gradient">used every day</span>
          </>
        }
        description="Billing systems, event platforms and marketing sites, designed, engineered and launched for businesses in Bengaluru and beyond."
        actions={
          <Button asChild variant="gradient" size="lg">
            <Link href="/contactus">
              Start your project
              <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        }
      />

      <Section compact aria-labelledby="projects-heading">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            Project case studies
          </h2>

          <div className="flex flex-col gap-16 sm:gap-20">
            {portfolioOrder.map((project, i) => {
              const media = projectMedia[project.slug];
              const Wrapper = project.external ? "a" : Link;
              const linkProps = project.external
                ? {
                    href: project.href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                  }
                : { href: project.href };

              return (
                <Reveal
                  key={project.slug}
                  className={cn(
                    "group relative isolate flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
                    i % 2 === 1 && "lg:flex-row-reverse",
                    i > 0 && "border-t border-line pt-16 sm:pt-20",
                  )}
                >
                  {/* Media */}
                  <div className="lg:w-1/2">
                    {media?.frame === "phone" ? (
                      <div
                        className="flex items-end justify-center gap-4 rounded-2xl border border-line p-8 shadow-sm sm:gap-6"
                        style={{ backgroundColor: project.accent }}
                      >
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
                              priority={i === 0}
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
                          priority={i === 0}
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
                      {project.category}
                    </span>

                    <h3 className="text-h3 text-ink">
                      <Wrapper
                        {...linkProps}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.name}
                        {project.external ? (
                          <span className="sr-only"> (opens in a new tab)</span>
                        ) : null}
                      </Wrapper>
                    </h3>

                    <p className="max-w-[48ch] leading-relaxed text-ink-3">
                      {project.summary}
                    </p>

                    {project.metrics ? (
                      <dl className="grid grid-cols-3 gap-6 border-t border-line pt-5">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <dt className="text-xs leading-snug text-ink-4">
                              {metric.label}
                            </dt>
                            <dd className="mt-1.5 font-display text-xl font-semibold tracking-tight text-gradient sm:text-2xl">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 shadow-xs"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <span className="group/link mt-2 inline-flex w-fit items-center gap-2 font-medium text-ink transition-colors group-hover:text-brand">
                      {project.external ? "Visit site" : "View case study"}
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <FaqSection />
      <CtaSection
        title="Your project could be next"
        description="Tell us where you are: an idea, a rough spec, or an existing product that needs rebuilding. We'll tell you honestly what it takes."
      />
    </main>
  );
}
