import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import PhoneFrame from "@/components/ui/PhoneFrame";
import { cn } from "@/lib/utils";
import { projectMedia } from "@/lib/project-media";
import type { Project } from "@/lib/site";

/**
 * One project, presented consistently everywhere it appears.
 *
 * Image-led: the photo does the talking, with a minimal caption underneath
 * rather than a dense info panel. The whole card is a single link with a
 * stretched hit area, so the target is large on touch devices while screen
 * readers still announce one clear destination rather than three competing
 * ones.
 */
export default function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  /** Featured cards span the full grid width and show larger copy. */
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
        "group relative isolate flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-[transform,box-shadow,border-color] duration-400 ease-out",
        "hover:-translate-y-1 hover:border-line-2 hover:shadow-lg",
        "focus-within:-translate-y-1 focus-within:shadow-lg",
        featured && "lg:flex-row-reverse lg:items-stretch",
      )}
    >
      {/* Media */}
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[4/3] lg:aspect-auto lg:w-[56%]" : "aspect-[1/1]",
        )}
        style={{ backgroundColor: project.accent }}
      >
        {media?.frame === "phone" ? (
          <div className="flex size-full items-end justify-center gap-3 pt-8 sm:gap-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"
            />
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
          <Image
            src={media.images[0]}
            alt={media.alt}
            priority={priority}
            placeholder="blur"
            sizes="(max-width: 768px) 85vw, 400px"
            style={{ objectPosition: media.focus ?? "top" }}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : null}

        <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.category}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-surface text-ink shadow-md transition-[transform,background-color,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-surface"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* Copy */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-1 p-4 sm:p-5",
          featured && "lg:justify-center lg:gap-3 lg:p-10",
        )}
      >
        <h3
          className={cn(
            "font-display font-semibold tracking-tight text-ink",
            featured ? "text-h3" : "text-lg",
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
            featured ? "max-w-[52ch] sm:text-base" : "line-clamp-2",
          )}
        >
          {project.summary}
        </p>

        {project.metrics ? (
          <dl
            className={cn(
              "border-t border-line",
              featured
                ? "mt-2 grid grid-cols-2 gap-x-6 gap-y-5 pt-6 sm:grid-cols-3"
                : "mt-2 grid grid-cols-3 gap-x-3 gap-y-3 pt-3",
            )}
          >
            {(featured ? project.metrics : project.metrics.slice(0, 3)).map(
              (metric) => (
                <div key={metric.label}>
                  <dt className="text-[0.6875rem] leading-snug text-ink-4">
                    {metric.label}
                  </dt>
                  <dd
                    className={cn(
                      "mt-0.5 font-display font-semibold tracking-tight text-gradient",
                      featured ? "text-2xl" : "text-base",
                    )}
                  >
                    {metric.value}
                  </dd>
                </div>
              ),
            )}
          </dl>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.6875rem] font-medium text-ink-3"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
