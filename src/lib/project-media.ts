import type { StaticImageData } from "next/image";

import slnDashboard from "@/assets/sln-dashboard.png";
import eventraScreen from "@/assets/eventra-leftmost.jpg";
import eventraScreenAlt from "@/assets/eventra-rightmost.jpg";
import ensProductionsShot from "@/assets/ens-productions.webp";
import jsonDashboardShot from "@/assets/json-dashboard.png";

export type ProjectMedia = {
  /** Chooses the frame treatment: wide captures vs. portrait app screens. */
  frame: "browser" | "phone";
  images: StaticImageData[];
  /** Written for screen readers and image search — never a filename. */
  alt: string;
};

/**
 * Screenshot assets, kept apart from src/lib/site.ts so that modules which
 * only need project text (the sitemap, structured data) do not pull static
 * image imports into their graph.
 */
export const projectMedia: Record<string, ProjectMedia> = {
  "logistics-billing-software": {
    frame: "browser",
    images: [slnDashboard],
    alt: "Logistics billing platform dashboard showing lorry receipts, freight memos and outstanding payment summaries.",
  },
  eventra: {
    frame: "phone",
    images: [eventraScreen, eventraScreenAlt],
    alt: "Eventra mobile app screens showing event discovery and event detail views.",
  },
  "ens-productions": {
    frame: "browser",
    images: [ensProductionsShot],
    alt: "ENS Productions website homepage showcasing award-winning production and broadcast services.",
  },
  "esports-dashboard": {
    frame: "browser",
    images: [jsonDashboardShot],
    alt: "BGMI Tournament Dashboard showing team editor, player management, and real-time broadcast statistics interface.",
  },
};
