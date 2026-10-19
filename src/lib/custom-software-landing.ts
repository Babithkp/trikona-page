/**
 * Content for the paid-traffic landing pages at /custom-software-development
 * and /custom-software-development-intl.
 *
 * Case studies are drawn from the real, public portfolio entries in
 * `src/lib/site.ts` (the same projects shown on the homepage's Work
 * section) — challenge/solution copy is written for this page, but the
 * project names, metrics and stacks are real, not anonymised placeholders.
 * Testimonials below are still unconfirmed and marked PLACEHOLDER.
 */

export type LandingCaseStudy = {
  /** Matches a key in src/lib/project-media.ts, for the real screenshot. */
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  stack: string[];
};

export const landingCaseStudies: LandingCaseStudy[] = [
  {
    slug: "logistics-billing-software",
    industry: "Logistics & Freight",
    challenge:
      "Lorry receipts, freight memos and payments were tracked across spreadsheets, causing delayed invoices and mismatched payments across branches.",
    solution:
      "A custom billing platform that manages lorry receipts, freight memos, customer invoices and payments in one place.",
    results: [
      { label: "Billing time reduced", value: "60%" },
      { label: "Manual errors cut", value: "85%" },
    ],
    stack: ["React", "Tauri", "Node.js", "MongoDB"],
  },
  {
    slug: "bgmi-overlay-admin",
    industry: "Esports & Live Broadcast Production",
    challenge:
      "Tournament staff needed to manage team and player rosters and swap teams on-screen mid-broadcast without touching code or redeploying anything.",
    solution:
      "A Next.js admin panel with live team-swap API routes feeding the OCR overlay in real time, backed by MongoDB and AWS S3 for team and player images.",
    results: [
      { label: "Team swap time on-air", value: "<5s" },
      { label: "On-air roster errors cut", value: "90%" },
    ],
    stack: ["Next.js", "React", "Prisma", "MongoDB", "AWS S3"],
  },
  {
    slug: "billsoft-frontend",
    industry: "Retail & GST Billing (India)",
    challenge:
      "A retail client was tracking GST invoices, quotes, inventory and expenses across spreadsheets, with no audit trail and no clean PDF output.",
    solution:
      "A Tauri desktop billing suite with GSTIN-validated invoices and quotes, auto-generated PDFs, inventory and expense tracking, and one-click invoice emailing.",
    results: [
      { label: "Invoicing time reduced", value: "70%" },
      { label: "GST compliance errors", value: "0" },
    ],
    stack: ["Tauri", "React", "TypeScript", "React-PDF", "Axios"],
  },
  {
    slug: "bgmi-hub",
    industry: "Esports & Live Broadcast Production",
    challenge:
      "Broadcasters had no way to auto-identify players during BGMI matches — overlays had to be updated by hand, slot by slot, in real time.",
    solution:
      "A Windows OCR tool that reads the in-game HUD every second, fuzzy-matches each player's name and slot against a team database, and drives a live OBS overlay with the right logo, color and player image.",
    results: [
      { label: "Overlay update latency", value: "<1s" },
      { label: "Manual overlay edits eliminated", value: "100%" },
    ],
    stack: ["Python", "EasyOCR", "OpenCV", "Flask", "Tkinter", "rapidfuzz"],
  },
  {
    slug: "rmr-frontend",
    industry: "Multi-outlet Retail & F&B Inventory",
    challenge:
      "A multi-store operator had no system to reconcile daily opening and closing stock, BOM-based recipes, orders and returns across outlets.",
    solution:
      "A React web app with per-store stock reconciliation, BOM and item tracking, order and return management, and Excel-exportable sales reports.",
    results: [
      { label: "Stock reconciliation time", value: "65% faster" },
      { label: "Outlets managed from one dashboard", value: "5+" },
    ],
    stack: ["React", "TypeScript", "Ant Design", "ExcelJS", "Axios"],
  },
  {
    slug: "eventra",
    industry: "Events & Ticketing",
    challenge:
      "Needed to go from idea to a working event platform — discovery, ticketing and organiser tools — in a matter of weeks, not months.",
    solution:
      "Designed and built an event management platform from scratch: event discovery, QR ticketing, organiser dashboards and certificate generation.",
    results: [
      { label: "Concept to MVP", value: "2 weeks" },
      { label: "Core features shipped", value: "15+" },
    ],
    stack: ["React", "Node.js", "MongoDB"],
  },
];

export type LandingTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export const landingTestimonials: LandingTestimonial[] = [
  {
    quote:
      "PLACEHOLDER — \"They understood our billing mess in the first call and shipped something our branches actually use every day.\"",
    name: "PLACEHOLDER — Client Name",
    role: "PLACEHOLDER — Operations Head, Logistics",
  },
  {
    quote:
      "PLACEHOLDER — \"We went from a rough idea to a working product in two weeks, with steady, visible progress the whole way.\"",
    name: "PLACEHOLDER — Client Name",
    role: "PLACEHOLDER — Founder, Events Startup",
  },
  {
    quote:
      "PLACEHOLDER — \"Post-launch support has been the real difference. Issues get fixed the same day, not pushed to the next sprint.\"",
    name: "PLACEHOLDER — Client Name",
    role: "PLACEHOLDER — Plant Manager, Manufacturing",
  },
];

export type LandingFaq = { question: string; answer: string };

/**
 * Shared FAQ copy for both landing-page variants. Only the cost answer
 * actually differs by currency; `getLandingFaqs` swaps that one in and, for
 * the international page, appends a time-zone question that doesn't apply
 * to India-based visitors.
 */
const baseLandingFaqs: LandingFaq[] = [
  {
    question: "How long does a custom software project usually take?",
    answer:
      "Most projects run 4–10 weeks depending on scope. We agree the timeline in writing before any design or development starts, so there are no surprises mid-build.",
  },
  {
    question: "Who owns the code once the project is done?",
    answer:
      "You do. We hand over full source code and documentation on completion. No vendor lock-in.",
  },
  {
    question: "Do you support the software after launch?",
    answer:
      "Yes. Every project includes a post-launch support window, and you can add an ongoing maintenance plan after that.",
  },
  {
    question: "What if we're not sure exactly what we need yet?",
    answer:
      "That's normal. The free scoping call exists for exactly this: we'll turn a rough problem into a clear spec before you commit to anything.",
  },
];

const costFaqByCurrency: Record<"inr" | "usd", LandingFaq> = {
  inr: {
    question: "What does custom software typically cost?",
    answer:
      "Price depends on scope. Most engagements start around ₹1,50,000 for a focused internal tool and scale up for multi-module systems. You'll get a fixed estimate after the free scoping call.",
  },
  usd: {
    question: "What does custom software typically cost?",
    answer:
      "Price depends on scope. Most engagements start around $2,000 for a focused internal tool and scale up for multi-module systems. You'll get a fixed estimate after the free scoping call.",
  },
};

const timezoneFaq: LandingFaq = {
  question: "How do we work together across time zones?",
  answer:
    "Mostly async: written weekly updates and a working preview, so you're never waiting on a live call to know where things stand. We also keep a call-friendly window open for US and UK hours when a conversation is faster than writing it down.",
};

export function getLandingFaqs(currency: "inr" | "usd" = "inr"): LandingFaq[] {
  const [timeline, ownership, ...rest] = baseLandingFaqs;
  const faqs = [timeline, ownership, costFaqByCurrency[currency], ...rest];
  return currency === "usd" ? [...faqs, timezoneFaq] : faqs;
}

export const landingFaqs: LandingFaq[] = getLandingFaqs("inr");
