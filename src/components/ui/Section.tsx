import * as React from "react";

import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/* -------------------------------------------------------------------------- */
/*  Container                                                                  */
/* -------------------------------------------------------------------------- */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow                                                                    */
/* -------------------------------------------------------------------------- */

/** Small capitalised label that introduces a section. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-brand-50 px-3.5 py-1.5",
        "text-xs font-semibold tracking-[0.14em] text-brand uppercase",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-gradient-brand"
      />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

type SectionProps = React.ComponentProps<"section"> & {
  /** Tightens the vertical rhythm for secondary sections. */
  compact?: boolean;
};

export function Section({
  className,
  compact,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(compact ? "section-y-sm" : "section-y", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  SectionHeading                                                             */
/* -------------------------------------------------------------------------- */

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Heading level. Defaults to h2 — the correct level under a page h1. */
  as?: "h2" | "h3";
  align?: "center" | "left";
  className?: string;
  /** Optional actions rendered beside the heading on wide screens. */
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered
          ? "items-center text-center"
          : "items-start text-left md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          centered ? "items-center" : "items-start",
        )}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Tag
          className={cn(
            "text-h2 text-ink",
            centered && "max-w-[22ch]",
            !centered && "max-w-[20ch]",
          )}
        >
          {title}
        </Tag>
        {description ? (
          <p
            className={cn(
              "text-lead text-ink-3",
              centered ? "max-w-[58ch]" : "max-w-[54ch]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
