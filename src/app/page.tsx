import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import Capabilities from "@/components/home/Capabilities";
import Hero from "@/components/home/Hero";
import Principles from "@/components/home/Principles";
import ProcessPreview from "@/components/home/ProcessPreview";
import WorkShowcase from "@/components/home/WorkShowcase";
import JsonLd from "@/components/ui/JsonLd";
import { servicesSchema } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <JsonLd schema={servicesSchema} />
      <Hero />
      <Principles />
      <Capabilities />
      <ProcessPreview />
      <WorkShowcase />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
