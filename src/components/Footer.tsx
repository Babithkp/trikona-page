import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Logo from "./layout/Logo";
import { cn } from "@/lib/utils";
import { navLinks, projects, site } from "@/lib/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  X: XIcon,
} as const;

const footerNav = [
  {
    heading: "Company",
    links: navLinks.map((link) => ({ ...link, external: false })),
  },
  {
    heading: "Selected work",
    links: projects.map((project) => ({
      href: project.href,
      label: project.name,
      external: Boolean(project.external),
    })),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page">
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-20 lg:py-20">
          {/* Brand + contact */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-[38ch] text-sm leading-relaxed text-ink-3">
              {site.description}
            </p>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 font-medium text-ink transition-colors hover:text-brand"
                >
                  <Mail aria-hidden="true" className="size-4 text-ink-4" />
                  {site.email}
                </a>
              </li>
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2.5 text-ink-3 transition-colors hover:text-ink"
                  >
                    <Phone aria-hidden="true" className="size-4 text-ink-4" />
                    {phone}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-2.5 text-ink-3">
                <MapPin aria-hidden="true" className="size-4 text-ink-4" />
                {site.locality}, {site.region}, India
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((column) => (
              <nav
                key={column.heading}
                aria-labelledby={`footer-${column.heading}`}
              >
                <h2
                  id={`footer-${column.heading}`}
                  className="text-xs font-semibold tracking-[0.14em] text-ink-4 uppercase"
                >
                  {column.heading}
                </h2>
                <ul className="mt-5 flex flex-col gap-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href} external={link.external}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-labelledby="footer-connect">
              <h2
                id="footer-connect"
                className="text-xs font-semibold tracking-[0.14em] text-ink-4 uppercase"
              >
                Connect
              </h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                <li>
                  <FooterLink href="/contactus">Start a project</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">We&apos;re hiring</FooterLink>
                </li>
              </ul>

              <ul className="mt-6 flex items-center gap-2">
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Trikona on ${social.label}`}
                        className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink-3 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-sm text-ink-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Designed &amp; built in {site.locality}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center gap-1 text-ink-3 transition-colors hover:text-ink",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
        <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-50" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
