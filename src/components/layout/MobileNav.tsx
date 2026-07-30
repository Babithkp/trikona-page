"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";

/**
 * Accessible slide-over navigation for small screens.
 *
 * Replaces the previous Ant Design Drawer, which pulled an entire component
 * library into the bundle for one panel. Implements the same behaviour by
 * hand: focus is moved into the panel and trapped, Escape and backdrop clicks
 * dismiss it, background scrolling is locked, and the trigger regains focus on
 * close.
 */
export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close whenever the route changes, so tapping a link dismisses the panel.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Captured now, since the ref may point elsewhere by cleanup time.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? trigger)?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Open menu"
        className="grid size-10 place-items-center rounded-lg border border-line-2 bg-surface text-ink shadow-xs transition-colors hover:bg-surface-3 md:hidden"
      >
        <Menu className="size-5" />
      </button>

      {/* Kept mounted-on-demand: nothing renders (or listens) while closed. */}
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className={cn(
              "absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col",
              "border-l border-line bg-surface shadow-xl",
              "animate-reveal [--reveal-y:0px]",
            )}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-lg text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-5">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-brand-50 text-brand"
                            : "text-ink-2 hover:bg-surface-3 hover:text-ink",
                        )}
                      >
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 opacity-40"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
              <Button asChild variant="gradient" size="lg" className="w-full">
                <Link href="/contactus">Start a project</Link>
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="text-center text-sm text-ink-3 underline-offset-4 hover:text-ink hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
