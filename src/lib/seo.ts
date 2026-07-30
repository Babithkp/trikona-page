import type { Metadata } from "next";
import { faqs as defaultFaqs, projects, services, site, siteUrl } from "./site";
import type { Faq } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical and OG URL. */
  path: string;
  /** Set on pages that should not be indexed. */
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Builds a complete, consistent metadata block for a page: canonical,
 * Open Graph and Twitter card in one place so no page can be missing them.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex,
  type = "website",
}: PageMetaInput): Metadata {
  const url = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/*  Schema.org                                                                 */
/* -------------------------------------------------------------------------- */

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: site.name,
  legalName: site.legalName,
  url: siteUrl,
  // Note: the "-white" file is the dark-wordmark logo, for light backgrounds.
  logo: `${siteUrl}/fullLogo-white.png`,
  image: `${siteUrl}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: site.phones[0],
  priceRange: "$$",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    telephone: site.phones[0],
    areaServed: "IN",
    availableLanguage: ["en", "hi", "kn"],
  },
  sameAs: site.socials.map((s) => s.href),
  knowsAbout: [
    "UI/UX design",
    "Web development",
    "Mobile app development",
    "MVP development",
    "Brand identity",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: site.name,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": organizationId },
};

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
      }),
    ),
  };
}

export function faqSchema(items: Faq[] = defaultFaqs): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services offered by Trikona",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@id": organizationId },
      serviceType: service.title,
      areaServed: { "@type": "Country", name: "India" },
    },
  })),
};

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Trikona portfolio",
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      description: project.summary,
      url: project.external ? project.href : `${siteUrl}${project.href}`,
      creator: { "@id": organizationId },
    },
  })),
};

export function caseStudySchema(input: {
  name: string;
  description: string;
  path: string;
  stack: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    headline: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    creator: { "@id": organizationId },
    keywords: input.stack.join(", "),
    inLanguage: "en",
  };
}
