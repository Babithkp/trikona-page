import type { StaticImageData } from "next/image";

import logisticsDashboard from "@/assets/logistics9_16.png";
import logisticsFull from "@/assets/logistics.png";
import eventraMockup from "@/assets/eventramockup.png";
import ensProductionsShot from "@/assets/ens-productions.webp";
import ghCareHomeShot from "@/assets/ghcarehomes.png";
import itsShot from "@/assets/internationaltranslationservice.png";
import primeGrowerFarmsShot from "@/assets/primegrowerfarms.png";
import jsonDashboardShot from "@/assets/json-dashboard.png";
import gstBillingShot from "@/assets/GST_billing.png";
import rmrDashboardShot from "@/assets/FB.png";

export type ProjectMedia = {
  /**
   * Chooses the frame treatment: wide captures in a browser chrome,
   * portrait app screens in a phone shell, or "full" for an image shown
   * edge-to-edge with no mockup wrapped around it.
   */
  frame: "browser" | "phone" | "full";
  images: StaticImageData[];
  /** Written for screen readers and image search — never a filename. */
  alt: string;
  /**
   * CSS object-position for the cropped card preview. Defaults to "top".
   * Override when the subject (e.g. a laptop mockup) sits lower in the frame
   * and would otherwise be cropped off.
   */
  focus?: string;
  /**
   * Uncropped variant used where the full image is shown edge-to-edge with
   * no fixed aspect ratio (the /portfolio index page) — distinct from
   * `images[0]`, which is framed for the fixed-aspect card crop elsewhere.
   */
  fullImage?: StaticImageData;
};

/**
 * Screenshot assets, kept apart from src/lib/site.ts so that modules which
 * only need project text (the sitemap, structured data) do not pull static
 * image imports into their graph.
 */
export const projectMedia: Record<string, ProjectMedia> = {
  "logistics-billing-software": {
    frame: "full",
    images: [logisticsDashboard],
    alt: "Logistics billing platform dashboard showing lorry receipts, freight memos and outstanding payment summaries.",
    focus: "center 55%",
    fullImage: logisticsFull,
  },
  eventra: {
    frame: "full",
    images: [eventraMockup],
    alt: "Eventra mobile app login and sign-in screens shown on two phones.",
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
  "ghcarehome": {
    frame: "browser",
    images: [ghCareHomeShot],
    alt: "Grand Host Care Home website homepage showing the residential and dementia care home in Rotterdam.",
  },
  "international-translation-service": {
    frame: "browser",
    images: [itsShot],
    alt: "International Translation Service website homepage showing fast document translation and flat-rate pricing.",
  },
  "prime-grower-farms": {
    frame: "browser",
    images: [primeGrowerFarmsShot],
    alt: "Prime Grower Farms website homepage showing fresh strawberries, tomatoes and greens from their Quebec farm.",
  },
  "billsoft-frontend": {
    frame: "browser",
    images: [gstBillingShot],
    alt: "GST billing desktop application showing GSTIN-validated invoices, quotes and inventory tracking.",
  },
  "rmr-frontend": {
    frame: "full",
    images: [rmrDashboardShot],
    alt: "StockPilot sales dashboard on a laptop, showing gross sales, cases dispatched and recent invoices across multiple outlets.",
  },
};
