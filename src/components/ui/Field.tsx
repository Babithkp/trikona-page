"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const controlClasses = [
  "w-full rounded-lg border border-line-2 bg-surface px-4 py-3 text-[0.9375rem] text-ink shadow-xs",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-line-2/80",
  "focus:border-brand-400 focus:ring-4 focus:ring-brand-100 focus:outline-none",
  "aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100",
].join(" ");

type FieldProps = {
  /** Used for the control id and the label's htmlFor. */
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: (controlProps: {
    id: string;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

/**
 * Wraps a form control with a real <label>, an optional hint, and an error
 * message wired up through aria-describedby and aria-invalid.
 *
 * Placeholders are never used as labels — they vanish on input and are
 * invisible to most screen reader configurations.
 */
export function Field({
  name,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink-2">
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-4">
            (optional)
          </span>
        )}
      </label>

      {children({
        id,
        className: controlClasses,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {hint ? (
        <p id={hintId} className="text-xs text-ink-4">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { controlClasses };
