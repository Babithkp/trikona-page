import { ArrowRight } from "lucide-react";
import Link from "next/link";

import HeroAurora from "./HeroAurora";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Section";
import { serviceMarqueeItems } from "@/lib/site";

const stats = [
  { value: "15+", label: "Projects delivered" },
  { value: "5+", label: "Industries served" },
  { value: "₹20 Cr+", label: "Worth of transactions recorded" },
  { value: "60%", label: "Faster operational workflows" },
];

export default function Hero() {
  return (
    // Pulled up by the header's height so the backdrop runs behind the
    // transparent sticky header — no seam at the top of the fold.
    <section className="relative isolate -mt-16 overflow-hidden pt-28 pb-20 sm:-mt-18 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28">
      <HeroAurora />

      <Container>
        <div className="flex flex-col items-center gap-7 text-center">
          <Reveal delay={60}>
            {/* Two sentences, each its own block, so the break between them
                never moves.

                From sm up they are locked to one line each — exactly two
                lines — and the type scales with the viewport to suit.

                Below sm, holding two lines would force the headline down to
                ~21px, which is far too quiet for a hero. There the sentences
                are allowed to wrap and the type is set much larger instead;
                `text-balance` keeps the break at a natural phrase boundary
                ("Custom software / that works.") rather than an awkward one,
                and evens out the line lengths. */}
            <h1 className="text-[length:min(8.6vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-hero sm:text-wrap">
              <span className="block sm:whitespace-nowrap">
                Design. Build. <span className="text-gradient">Scale.</span>
              </span>
              <span className="block sm:whitespace-nowrap">
                Custom software that works.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-lead max-w-[56ch] text-ink-3">
              We build custom software, mobile apps and websites around how
              your business actually works, backed by clean UI/UX and
              engineering built to scale.
            </p>
          </Reveal>

          <Reveal
            delay={180}
            className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/contactus">
                Start a project
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/portfolio">See our work</Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-10 sm:mt-20 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse text-center">
                <dt className="mt-1.5 flex min-h-10 items-start justify-center text-sm leading-snug text-ink-3">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      <div className="mt-16 sm:mt-20">
        <Container>
          <p className="mb-6 text-center text-xs font-semibold tracking-[0.14em] text-ink-4 uppercase">
            Services we provide
          </p>
        </Container>
        <Marquee items={serviceMarqueeItems} />
      </div>
    </section>
  );
}
