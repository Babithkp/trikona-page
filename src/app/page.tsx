import CtaSection from "@/components/shared/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import About from "@/components/home/About";
import Capabilities from "@/components/home/Capabilities";
import Hero from "@/components/home/Hero";
import ProcessPreview from "@/components/home/ProcessPreview";
import WorkShowcase from "@/components/home/WorkShowcase";
import JsonLd from "@/components/ui/JsonLd";
import { servicesSchema } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <JsonLd schema={servicesSchema} />
      <WhatsAppButton message="Hi, I'd like to talk about building a product with Trikona." />
      <Hero />
      <About />
      <Capabilities />
      <ProcessPreview />
      <WorkShowcase />
      <FaqSection />
      <CtaSection showForm />
    </main>
  );
}
