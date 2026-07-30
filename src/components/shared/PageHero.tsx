import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";

type Crumb = { name: string; path: string };

/**
 * The shared hero for every interior page.
 *
 * Guarantees exactly one <h1> per page, a consistent breadcrumb trail for
 * orientation and internal linking, and identical vertical rhythm across the
 * site so pages feel like one product rather than six templates.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    // Pulled up by the header's height so the backdrop runs behind the
    // transparent sticky header — no seam at the top of the fold.
    <section className="relative isolate -mt-16 overflow-hidden pt-28 pb-16 sm:-mt-18 sm:pt-32 sm:pb-20 lg:pb-24">
      <Aurora variant="soft" />
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          {breadcrumbs.length > 0 ? (
            <nav aria-label="Breadcrumb" className="w-full">
              <ol className="flex flex-wrap items-center justify-center gap-1 text-sm text-ink-4">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-ink-2"
                  >
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.path} className="flex items-center gap-1">
                      <ChevronRight aria-hidden="true" className="size-3.5" />
                      {isLast ? (
                        <span aria-current="page" className="text-ink-2">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          href={crumb.path}
                          className="transition-colors hover:text-ink-2"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}

          <Reveal className="flex flex-col items-center gap-6">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-h1 max-w-[18ch] text-ink">{title}</h1>
            {description ? (
              <p className="text-lead max-w-[58ch] text-ink-3">{description}</p>
            ) : null}
            {actions ? (
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
          </Reveal>

          {children}
        </div>
      </Container>
    </section>
  );
}
