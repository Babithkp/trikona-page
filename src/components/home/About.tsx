import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

/** A single-sentence statement — just enough context before the scope-of-work and work sections below. */
export default function About() {
  return (
    <Section aria-label="About us">
      <Container>
        <Reveal>
          <p className="max-w-[36ch] font-display text-h2 font-semibold tracking-tight text-ink sm:text-h1">
            {site.description}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
