import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import CaseStudyNav from "@/components/caseStudy/CaseStudyNav";
import CtaSection from "@/components/shared/CtaSection";
import ProjectCard from "@/components/shared/ProjectCard";
import Aurora from "@/components/ui/Aurora";
import PhoneFrame from "@/components/ui/PhoneFrame";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, caseStudySchema, pageMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { projectMedia } from "@/lib/project-media";
import { projects } from "@/lib/site";

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return pageMetadata({
      title: "Case study not found",
      description: "This case study could not be found.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: study.metaTitle,
    description: study.metaDescription,
    path: `/portfolio/${slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageParams) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);

  if (!study || !project) notFound();

  const media = projectMedia[slug];
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const tocSections = study.sections.map(({ id, heading }) => ({
    id,
    heading,
  }));

  return (
    <main>
      <JsonLd
        schema={[
          caseStudySchema({
            name: project.name,
            description: study.metaDescription,
            path: `/portfolio/${slug}`,
            stack: project.stack,
          }),
          breadcrumbSchema([
            { name: "Work", path: "/portfolio" },
            { name: project.name, path: `/portfolio/${slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate -mt-16 overflow-hidden pt-28 pb-14 sm:-mt-18 sm:pt-32">
        <Aurora variant="soft" />
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All work
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
            <Reveal className="flex flex-col gap-6">
              <span className="w-fit rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-ink-3 uppercase">
                {project.category}
              </span>

              <h1 className="text-h1 text-ink">{project.name}</h1>
              <p className="text-lead max-w-[56ch] text-ink-3">
                {study.intro}
              </p>

              <div>
                <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-4 uppercase">
                  Built with
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 shadow-xs"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {project.metrics ? (
                <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-line pt-6">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs leading-snug text-ink-4">
                        {metric.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </Reveal>

            <Reveal delay={100} y={24}>
              {media?.frame === "phone" ? (
                <div className="flex items-end justify-center gap-4 rounded-2xl border border-line p-8 shadow-sm sm:gap-6"
                  style={{ backgroundColor: project.accent }}
                >
                  {media.images.slice(0, 2).map((image, i) => (
                    <PhoneFrame
                      key={i}
                      className={i === 0 ? "rotate-[-4deg]" : "rotate-[4deg]"}
                    >
                      <Image
                        src={image}
                        alt={i === 0 ? media.alt : ""}
                        aria-hidden={i !== 0}
                        priority={i === 0}
                        placeholder="blur"
                        sizes="180px"
                        className="size-full object-cover object-top"
                      />
                    </PhoneFrame>
                  ))}
                </div>
              ) : media ? (
                <div className="w-full overflow-hidden rounded-lg border border-line shadow-xl sm:rounded-xl">
                  <Image
                    src={media.fullImage ?? media.images[0]}
                    alt={media.alt}
                    priority
                    placeholder="blur"
                    sizes="(max-width: 1024px) 92vw, 620px"
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Section compact aria-label="Case study detail">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-20">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <CaseStudyNav sections={tocSections} />
              </div>
            </aside>

            <div className="flex max-w-[70ch] flex-col gap-14">
              {study.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="text-h3 text-ink"
                  >
                    {section.heading}
                  </h2>

                  <div className="mt-5 flex flex-col gap-5">
                    {section.blocks.map((block, i) => {
                      if (block.type === "paragraph") {
                        return (
                          <p
                            key={i}
                            className="leading-relaxed text-ink-2"
                          >
                            {block.text}
                          </p>
                        );
                      }

                      if (block.type === "lead") {
                        return (
                          <p
                            key={i}
                            className="font-medium text-ink"
                          >
                            {block.text}
                          </p>
                        );
                      }

                      return (
                        <ul key={i} className="flex flex-col gap-3">
                          {block.items.map((item) => (
                            <li
                              key={item.text}
                              className="flex gap-3 text-ink-2"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-400"
                              />
                              <span className="leading-relaxed">
                                {item.emphasis ? (
                                  <strong className="font-semibold text-ink">
                                    {item.emphasis}
                                  </strong>
                                ) : null}
                                {item.emphasis ? ": " : null}
                                {item.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    })}
                  </div>
                </section>
              ))}

              <div className="border-t border-line pt-10">
                <Button asChild variant="gradient" size="lg">
                  <Link href="/contactus">
                    Build something like this
                    <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related work — internal linking between case studies */}
      <Section compact aria-labelledby="related-heading" className="border-t border-line bg-surface">
        <Container>
          <h2 id="related-heading" className="text-h3 text-ink">
            More of our work
          </h2>
          <div className="relative mt-8">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((item, i) => (
                <Reveal
                  key={item.slug}
                  delay={i * 80}
                  className="w-[82vw] shrink-0 snap-start sm:w-80"
                >
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-surface to-transparent sm:block"
            />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </main>
  );
}
