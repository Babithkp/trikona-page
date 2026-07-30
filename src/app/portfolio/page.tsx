import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProjectCard from "@/components/shared/ProjectCard";
import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata, portfolioSchema } from "@/lib/seo";
import { projects } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Work — UI/UX, Website & App Development Projects",
  description:
    "Selected Trikona projects: a logistics billing platform, the Eventra event management MVP, Deconest Interiors and Snippet2Sketch. See how design, engineering and strategy come together.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const [featured, ...rest] = projects;

  return (
    <main>
      <JsonLd
        schema={[
          portfolioSchema,
          breadcrumbSchema([{ name: "Work", path: "/portfolio" }]),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Work", path: "/portfolio" }]}
        title={
          <>
            Products built to be{" "}
            <span className="text-gradient">used every day</span>
          </>
        }
        description="Billing systems, event platforms and marketing sites — designed, engineered and launched for businesses in Bengaluru and beyond."
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

          <div className="flex flex-col gap-6">
            <Reveal>
              <ProjectCard project={featured} featured priority />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80} className="flex">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection />
      <CtaSection
        title="Your project could be next"
        description="Tell us where you are — an idea, a rough spec, or an existing product that needs rebuilding. We'll tell you honestly what it takes."
      />
    </main>
  );
}
