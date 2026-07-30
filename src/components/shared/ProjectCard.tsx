import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import BrowserFrame from "@/components/ui/BrowserFrame";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { cn } from "@/lib/utils";
import { projectMedia } from "@/lib/project-media";
import type { Project } from "@/lib/site";

/**
 * One project, presented consistently everywhere it appears.
 *
 * The whole card is a single link with a stretched hit area, so the target is
 * large on touch devices while screen readers still announce one clear
 * destination rather than three competing ones.
 */
export default function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  /** Featured cards span the full grid width and show outcome metrics. */
  featured?: boolean;
  priority?: boolean;
}) {
  const media = projectMedia[project.slug];
  const Wrapper = project.external ? "a" : Link;
  const linkProps = project.external
    ? { href: project.href, target: "_blank", rel: "noreferrer noopener" }
    : { href: project.href };

  return (
    <article
      className={cn(
        "group relative isolate flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-400 ease-out",
        "hover:-translate-y-1 hover:border-line-2 hover:shadow-lg",
        "focus-within:-translate-y-1 focus-within:shadow-lg",
        featured && "lg:flex-row-reverse lg:items-stretch",
      )}
    >
      {/* Media */}
      <div
        className={cn(
          "relative flex items-end justify-center overflow-hidden px-6 pt-8 sm:px-10 sm:pt-10",
          featured ? "lg:w-[56%] lg:px-12 lg:pt-14" : "",
        )}
        style={{ backgroundColor: project.accent }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"
        />

        {media?.frame === "phone" ? (
          <div className="flex items-end justify-center gap-3 sm:gap-5">
            {media.images.slice(0, 2).map((image, i) => (
              <PhoneFrame
                key={i}
                className={cn(
                  "translate-y-6 transition-transform duration-500 ease-out",
                  i === 0
                    ? "rotate-[-4deg] group-hover:translate-y-3 group-hover:rotate-[-6deg]"
                    : "rotate-[4deg] group-hover:translate-y-3 group-hover:rotate-[6deg]",
                )}
              >
                <Image
                  src={image}
                  alt={i === 0 ? media.alt : ""}
                  aria-hidden={i !== 0}
                  placeholder="blur"
                  sizes="180px"
                  className="size-full object-cover object-top"
                />
              </PhoneFrame>
            ))}
          </div>
        ) : media ? (
          <BrowserFrame
            className="translate-y-6 transition-transform duration-500 ease-out group-hover:translate-y-3"
            label={project.name}
          >
            <Image
              src={media.images[0]}
              alt={media.alt}
              priority={priority}
              placeholder="blur"
              sizes={
                featured
                  ? "(max-width: 1024px) 88vw, 640px"
                  : "(max-width: 768px) 88vw, 520px"
              }
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </BrowserFrame>
        ) : null}
      </div>

      {/* Copy */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-6 sm:p-8",
          featured && "lg:justify-center lg:p-12",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface-3 px-3 py-1 text-xs font-medium text-ink-3">
            {project.category}
          </span>
          {project.external ? (
            <span className="text-xs text-ink-4">Live site</span>
          ) : null}
        </div>

        <h3
          className={cn(
            "font-display font-semibold tracking-tight text-ink",
            featured ? "text-h3" : "text-xl",
          )}
        >
          <Wrapper
            {...linkProps}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.name}
            {project.external ? (
              <span className="sr-only"> (opens in a new tab)</span>
            ) : null}
          </Wrapper>
        </h3>

        <p
          className={cn(
            "text-sm leading-relaxed text-ink-3",
            featured ? "max-w-[52ch] sm:text-base" : "line-clamp-4",
          )}
        >
          {project.summary}
        </p>

        {featured && project.metrics ? (
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs leading-snug text-ink-4">
                  {metric.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold tracking-tight text-gradient">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.6875rem] font-medium text-ink-3"
            >
              {tech}
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          {project.external ? "Visit site" : "Read case study"}
          {project.external ? (
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          )}
        </span>
      </div>
    </article>
  );
}
