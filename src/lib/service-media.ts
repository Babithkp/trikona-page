import type { StaticImageData } from "next/image";

import brand from "@/assets/brand.png";
import design from "@/assets/design.png";
import website from "@/assets/website.png";
import mobile from "@/assets/mobile.png";
import desktop from "@/assets/desktop.png";
import custom from "@/assets/custom.png";

/** Keyed by Service.image in src/lib/site.ts. */
export const serviceImages: Record<
  string,
  { src: StaticImageData; alt: string }
> = {
  brand: {
    src: brand,
    alt: "Brand identity deliverables: logo marks, colour palette and typography specimens laid out on a guideline sheet.",
  },
  design: {
    src: design,
    alt: "High-fidelity user interface screens arranged as part of a design system.",
  },
  website: {
    src: website,
    alt: "A responsive marketing website shown across desktop and mobile breakpoints.",
  },
  mobile: {
    src: mobile,
    alt: "Mobile application screens showing navigation, content and account views.",
  },
  desktop: {
    src: desktop,
    alt: "A desktop application interface with a data-dense operational dashboard.",
  },
  custom: {
    src: custom,
    alt: "A custom internal tool connecting several business systems in one interface.",
  },
};
