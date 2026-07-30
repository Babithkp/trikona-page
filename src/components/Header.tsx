"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./layout/Logo";
import MobileNav from "./layout/MobileNav";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = React.useState(false);

  // The header is transparent over the hero and gains a surface once the page
  // moves, so the fold stays open while navigation remains legible over content.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line bg-canvas/80 shadow-xs backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-18">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                      active
                        ? "text-ink"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {link.label}
                    {/* Active indicator: a short gradient rule, not a colour
                        change alone, so the state survives colour-blind and
                        forced-colors viewing. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand transition-transform duration-300 ease-out",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="max-md:hidden">
            <Link href="/contactus">Start a project</Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
