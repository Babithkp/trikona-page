"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import ProjectCard from "./ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site";

/**
 * A horizontally scrolling strip of project cards with explicit prev/next
 * controls, since the hidden scrollbar + edge fade alone weren't discoverable
 * enough for mouse-only desktop visitors.
 */
export default function ProjectRow({
  projects,
  /** Matches the section background behind the edge fade. */
  fadeFrom = "canvas",
  viewAllHref = "/portfolio",
}: {
  projects: Project[];
  fadeFrom?: "canvas" | "surface";
  viewAllHref?: string;
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = React.useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 16; // gap-4 = 16px
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateAtEnd = () => {
      const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
      setAtEnd(remaining < 8);
    };

    updateAtEnd();
    el.addEventListener("scroll", updateAtEnd, { passive: true });
    window.addEventListener("resize", updateAtEnd);
    return () => {
      el.removeEventListener("scroll", updateAtEnd);
      window.removeEventListener("resize", updateAtEnd);
    };
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByCard(-1)}
          className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors duration-200 hover:border-line-2 hover:bg-surface-2"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByCard(1)}
          className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors duration-200 hover:border-line-2 hover:bg-surface-2"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 80}
              className="w-[82vw] shrink-0 snap-start sm:w-[24.5rem]"
            >
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}

          <Link
            href={viewAllHref}
            className="group/viewall flex w-16 shrink-0 snap-start flex-col items-center justify-between gap-4 self-stretch rounded-2xl border border-line bg-surface p-4 text-ink-3 shadow-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white sm:w-20"
          >
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover/viewall:translate-x-0.5 group-hover/viewall:-translate-y-0.5" />
            <span className="rotate-180 text-sm font-medium tracking-wide [writing-mode:vertical-rl]">
              View all projects
            </span>
            <span aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l to-transparent opacity-100 transition-opacity duration-300 sm:block",
            fadeFrom === "surface" ? "from-surface" : "from-canvas",
            atEnd && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
