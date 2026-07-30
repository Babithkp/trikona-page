import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Aurora from "@/components/ui/Aurora";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative isolate -mt-16 flex min-h-[70vh] items-center overflow-hidden pt-28 pb-20 sm:-mt-18 sm:pt-32">
      <Aurora variant="soft" />
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <p className="font-mono text-sm tracking-[0.2em] text-brand uppercase">
            404
          </p>
          <h1 className="text-h1 text-ink">
            We can&apos;t find that <span className="text-gradient">page</span>
          </h1>
          <p className="text-lead text-ink-3">
            The link may be out of date, or the page may have moved. Here&apos;s
            where to go instead.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="lg">
              <Link href="/">
                Back to home
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contactus">Talk to us</Link>
            </Button>
          </div>

          {/* Keeps every page on the site one hop from a dead end — useful for
              visitors and for crawl depth. */}
          <nav aria-label="Site sections" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-2 shadow-xs transition-colors hover:border-brand-200 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </main>
  );
}
