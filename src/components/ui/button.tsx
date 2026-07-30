import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 select-none items-center justify-center gap-2",
    "whitespace-nowrap font-medium leading-none",
    "transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Highest-intent action. Solid ink — reads as the default choice. */
        primary:
          "bg-ink text-white shadow-sm hover:-translate-y-px hover:bg-ink-2 hover:shadow-md",
        /** Reserved for the single strongest conversion CTA on a view. */
        gradient:
          "bg-gradient-brand text-white shadow-brand hover:-translate-y-px hover:brightness-[1.07] hover:shadow-lg",
        /** Secondary action sitting beside a primary. */
        outline:
          "border border-line-2 bg-surface text-ink shadow-xs hover:-translate-y-px hover:border-ink/20 hover:shadow-sm",
        /** Tertiary — toolbars, dismissals, low-emphasis navigation. */
        ghost: "text-ink-2 hover:bg-surface-3 hover:text-ink",
        /** Inline text action. */
        link: "h-auto px-0 text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-sm",
        md: "h-11 rounded-lg px-5 text-[0.9375rem]",
        lg: "h-13 rounded-xl px-7 text-base",
      },
    },
    compoundVariants: [
      { variant: "link", size: ["sm", "md", "lg"], class: "h-auto px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
