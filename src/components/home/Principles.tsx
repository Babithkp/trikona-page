import Brain from "@/assets/Brain";
import Code from "@/assets/Code";
import Finger from "@/assets/Finger";
import Strategy from "@/assets/Strategy";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { principles } from "@/lib/site";

const icons = [Brain, Finger, Code, Strategy];

/**
 * The four things that shape how we work. Presented as a card row rather than
 * loose text so each idea gets equal weight and a scannable heading.
 */
export default function Principles() {
  return (
    <Section aria-labelledby="principles-heading" compact>
      <Container>
        <SectionHeading
          title={
            <span id="principles-heading">
              Four ideas behind everything we ship
            </span>
          }
          description="Craft is a process, not a finish. These are the commitments that decide what gets built and what gets cut."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={principle.title} delay={i * 70}>
                <article
                  className={[
                    "group h-full rounded-xl border border-line bg-surface p-6 shadow-xs",
                    "transition-[transform,box-shadow,border-color] duration-300",
                    "hover:-translate-y-1 hover:border-brand-200 hover:shadow-md",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-lg bg-brand-50 transition-colors duration-300 group-hover:bg-brand-100"
                  >
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
