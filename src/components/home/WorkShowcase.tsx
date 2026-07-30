import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProjectCard from "@/components/shared/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { projects } from "@/lib/site";

export default function WorkShowcase() {
  const [featured, ...rest] = projects;

  return (
    <Section id="work" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          align="left"
          title={<span id="work-heading">Products we&apos;ve shipped</span>}
          description="Real systems in daily use — billing platforms, event products and marketing sites built end to end."
          action={
            <Button asChild variant="outline">
              <Link href="/portfolio">
                View all work
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 flex flex-col gap-6">
          <Reveal>
            <ProjectCard project={featured} featured />
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
  );
}
