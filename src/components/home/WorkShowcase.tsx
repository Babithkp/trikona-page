import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProjectRow from "@/components/shared/ProjectRow";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { projects } from "@/lib/site";

export default function WorkShowcase() {
  return (
    <Section id="work" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          align="left"
          title={<span id="work-heading">Products we&apos;ve shipped</span>}
          description="Real systems in daily use: billing platforms, event products and marketing sites built end to end."
          action={
            <Button asChild variant="outline">
              <Link href="/portfolio">
                View all work
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          }
        />

        <div className="mt-12">
          <ProjectRow projects={projects} fadeFrom="canvas" />
        </div>
      </Container>
    </Section>
  );
}
