import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProcessTimeline from "@/components/process/ProcessTimeline";
import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { processSteps, siteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Design & Development Process",
  description:
    "How Trikona delivers: discovery, strategy, design, development, quality assurance and launch support — a clear six-stage process built around clarity and collaboration.",
  path: "/process",
});

/** HowTo markup makes the stages eligible for step-based rich results. */
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Trikona designs and builds digital products",
  description:
    "Trikona's six-stage delivery process, from discovery through launch and ongoing support.",
  step: processSteps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.detail,
    url: `${siteUrl}/process#stage-${i + 1}`,
  })),
};

export default function ProcessPage() {
  return (
    <main>
      <JsonLd
        schema={[
          howToSchema,
          breadcrumbSchema([{ name: "Process", path: "/process" }]),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Process", path: "/process" }]}
        title={
          <>
            A process built on{" "}
            <span className="text-gradient">clarity</span>, not surprises
          </>
        }
        description="Six stages, agreed up front. You always know what is being worked on, what we need from you, and what lands next."
        actions={
          <>
            <Button asChild variant="gradient" size="lg">
              <Link href="/contactus">
                Book a kickoff call
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">See the results</Link>
            </Button>
          </>
        }
      />

      <ProcessTimeline />
      <FaqSection />
      <CtaSection
        title="Ready to start at stage one?"
        description="Discovery is where every good project begins. Tell us about the problem and we'll take it from there."
      />
    </main>
  );
}
