import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { faqSchema } from "@/lib/seo";
import { faqs } from "@/lib/site";

/**
 * FAQs, rendered once and reused across pages, with matching FAQPage
 * structured data so the answers are eligible for rich results.
 */
export default function FaqSection() {
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <JsonLd schema={faqSchema()} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col items-start gap-5">
              
              <h2 id="faq-heading" className="text-h2 text-ink">
                Questions, answered
              </h2>
              <p className="text-lead max-w-[42ch] text-ink-3">
                The things clients ask us most often, before we start working
                together.
              </p>
              <p className="text-sm text-ink-3">
                Still unsure?{" "}
                <Link
                  href="/contactus"
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  Talk to the team
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Accordion type="single" collapsible className="border-t border-line">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <span className="flex items-start gap-4 sm:gap-6">
                      <span
                        aria-hidden="true"
                        className="pt-0.5 font-mono text-sm text-ink-4 tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 sm:pl-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
