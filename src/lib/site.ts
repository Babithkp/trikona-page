/**
 * Single source of truth for site-wide content.
 *
 * Navigation, contact details, service copy, process steps, project data and
 * FAQs all live here so that pages, the footer, the sitemap and the
 * Schema.org structured data can never drift out of sync.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "Trikona",
  legalName: "Trikona Tech",
  tagline: "Design. Build. Scale.",
  description:
    "Trikona is a Bengaluru-based product studio building websites, web apps and MVPs — combining UI/UX design, scalable engineering and clear product strategy.",
  locality: "Bengaluru",
  region: "Karnataka",
  country: "IN",
  email: "buildwithus@trikonatech.com",
  phones: ["+91 96204 23719", "+91 81970 59845"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/trikonatech/" },
    { label: "Instagram", href: "https://www.instagram.com/trikona.tech/" },
    { label: "X", href: "https://x.com/trikona_tech" },
  ],
} as const;

/** Primary navigation. Order is deliberate: what we do → proof → who we are. */
export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Capabilities — the three-phase engagement shown on the home page           */
/* -------------------------------------------------------------------------- */

export type Capability = {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    id: "design",
    index: "01",
    title: "Branding & UI/UX Design",
    summary:
      "We resolve the problem before we style the pixels — research, structure, then interface.",
    items: [
      "UX research & wireframing",
      "High-fidelity UI design",
      "Interactive prototyping",
      "Design systems & style guides",
      "Logo design & visual identity",
      "Mobile-responsive layouts",
    ],
  },
  {
    id: "build",
    index: "02",
    title: "Web & App Development",
    summary:
      "Component-driven front ends and dependable back ends, built to be extended rather than rewritten.",
    items: [
      "Custom website development (static & dynamic)",
      "Responsive web app interfaces",
      "Component-based frontend architecture",
      "Version control (Git / GitHub)",
      "QA testing & bug fixes",
      "Mobile optimisation",
    ],
  },
  {
    id: "launch",
    index: "03",
    title: "Launch & Support",
    summary:
      "Shipping is a milestone, not the finish line. We stay on after go-live.",
    items: [
      "Hosting & domain setup",
      "Server & environment setup",
      "Cross-browser & device verification",
      "Security & backup setup",
      "Post-launch monitoring & support",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Services — the full catalogue on /services                                */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Imported from src/assets at the point of use. */
  image: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "brand-identity-strategy",
    title: "Brand Identity & Strategy",
    description:
      "Craft a memorable brand identity — logo, colour palette and guidelines — that lines up with where the business is actually going.",
    image: "brand",
    deliverables: ["Logo & marks", "Colour & type system", "Brand guidelines"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Design seamless, user-friendly digital experiences that hold attention and move people towards the action that matters.",
    image: "design",
    deliverables: ["User flows", "Wireframes & prototypes", "Design system"],
  },
  {
    slug: "website-development",
    title: "Website Design & Development",
    description:
      "From a focused landing page to a full custom site — responsive, fast, and built to rank.",
    image: "website",
    deliverables: ["Responsive build", "CMS integration", "SEO foundations"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "End-to-end app design and development that delivers intuitive, scalable mobile products on both platforms.",
    image: "mobile",
    deliverables: ["Native-feel UI", "API integration", "Store deployment"],
  },
  {
    slug: "desktop-application-development",
    title: "Desktop Application Development",
    description:
      "Powerful desktop applications built around real workflows, with the performance and reliability that day-to-day operations demand.",
    image: "desktop",
    deliverables: ["Cross-platform builds", "Offline support", "Auto-updates"],
  },
  {
    slug: "custom-digital-solutions",
    title: "Custom Digital Solutions",
    description:
      "Tailored software and integrations that fit the way the business already runs, and take the manual work out of it.",
    image: "custom",
    deliverables: [
      "Internal tools",
      "Third-party integrations",
      "Automation",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Process                                                                    */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  detail: string;
  media: { src: string; type: "video" | "image" };
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery & Onboarding",
    description: "Lead intake, proposal, contract, and kickoff meeting.",
    detail:
      "We start by understanding the business, not the brief. What the product needs to prove, who it serves, and what success looks like six months out.",
    media: { src: "/Scene-2.mp4", type: "video" },
  },
  {
    index: "02",
    title: "Strategy & Planning",
    description: "Clarifying goals, setting timelines, and defining scope.",
    detail:
      "Scope gets written down before anything gets designed. Milestones, dependencies and the decisions we need from you, mapped against a realistic timeline.",
    media: { src: "/Scene-3.gif", type: "image" },
  },
  {
    index: "03",
    title: "Design",
    description: "Crafting UI/UX aligned with brand vision and user needs.",
    detail:
      "Wireframes first, then high-fidelity interfaces built on a reusable design system — so the tenth screen costs less to make than the first.",
    media: { src: "/Scene-4.gif", type: "image" },
  },
  {
    index: "04",
    title: "Development",
    description: "Turning designs into functional websites, apps, or systems.",
    detail:
      "Component-driven builds with version control, code review and preview deployments, so you can see progress rather than wait for it.",
    media: { src: "/Scene-5.gif", type: "image" },
  },
  {
    index: "05",
    title: "Quality Assurance",
    description: "Cross-device testing, accessibility checks, and bug fixes.",
    detail:
      "Every build is verified across browsers and screen sizes, checked against accessibility basics, and hardened before it goes anywhere near production.",
    media: { src: "/Scene-6.gif", type: "image" },
  },
  {
    index: "06",
    title: "Launch & Support",
    description: "Deployment, monitoring, and continuous improvement.",
    detail:
      "Hosting, domains, backups and monitoring configured properly at launch — followed by the support that keeps the product healthy as it grows.",
    media: { src: "/Scene-7.gif", type: "image" },
  },
];

/* -------------------------------------------------------------------------- */
/*  Work                                                                       */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Internal case study route, or an external live site. */
  href: string;
  external?: boolean;
  stack: string[];
  metrics?: { label: string; value: string }[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "logistics-billing-software",
    name: "Logistics Billing Software",
    category: "Custom software",
    summary:
      "A custom billing platform that manages lorry receipts, freight memos, customer invoices and payments in one place — replacing an error-prone spreadsheet workflow across multiple branches.",
    href: "/portfolio/logistics-billing-software",
    stack: ["React", "Tauri", "Node.js", "MongoDB"],
    metrics: [
      { label: "Payment tracking accuracy", value: "99.8%" },
      { label: "Fewer manual data errors", value: "85%" },
      { label: "Reduction in billing time", value: "60%" },
    ],
    accent: "#B2D5F2",
  },
  {
    slug: "eventra",
    name: "Eventra",
    category: "Product MVP",
    summary:
      "An event management platform designed and built from scratch — event discovery, QR ticketing, organiser dashboards and certificate generation, taken from raw idea to complete MVP.",
    href: "/portfolio/eventra",
    stack: ["React", "Node.js", "MongoDB"],
    metrics: [
      { label: "Core features shipped", value: "15+" },
      { label: "Admin controlled", value: "100%" },
      { label: "Concept to MVP", value: "2 weeks" },
    ],
    accent: "#CFF3E6",
  },
  {
    slug: "ens-productions",
    name: "ENS Productions",
    category: "Website",
    summary:
      "Award-winning production and broadcast services platform connecting brands, agencies, and visionary creators with comprehensive media and broadcasting solutions.",
    href: "https://ensproductions.com",
    external: true,
    stack: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#7C3AED",
  },
  {
    slug: "esports-dashboard",
    name: "Esports Tournament Dashboard",
    category: "Web Application",
    summary:
      "Real-time esports dashboard generating JSON outputs for vMix broadcast integration — managing teams, players, matches and live statistics with seamless broadcast automation.",
    href: "/portfolio/esports-dashboard",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    metrics: [
      { label: "Real-time data sync", value: "Sub-100ms" },
      { label: "Broadcast integration", value: "vMix-ready" },
      { label: "JSON export", value: "Automated" },
    ],
    accent: "#00D9FF",
  },
];

/* -------------------------------------------------------------------------- */
/*  Differentiators                                                            */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    title: "Design that thinks",
    description: "Ideas before interfaces. We solve before we style.",
  },
  {
    title: "Tech that feels",
    description: "Interfaces that understand users, not just instruct them.",
  },
  {
    title: "Code that clicks",
    description: "Structured, scalable, and clean — every line matters.",
  },
  {
    title: "Strategy that sticks",
    description:
      "Clear paths. We map every step from first click to conversion.",
  },
] as const;

export const serviceMarqueeItems = [
  "AI Voice Agents",
  "AI Automation Solutions",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Brand Identity & Design",
] as const;

/* -------------------------------------------------------------------------- */
/*  FAQs                                                                       */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What services do you provide?",
    answer:
      "We specialise in branding, UI/UX design, website and app development, and MVP building for startups and businesses. Most engagements combine design and engineering, but you can take either on its own.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary with scope. A focused marketing site is usually 3–4 weeks, while a complex application or MVP runs 6–12 weeks. We agree the timeline in writing during planning, before design begins.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We provide maintenance and post-launch support — monitoring, fixes and iterative improvements — to keep the product running smoothly as the business grows.",
  },
  {
    question: "Can I hire you for just design or just development?",
    answer:
      "Absolutely. You can engage us for design only, development only, or end-to-end delivery. If you already have designs, we will review them and build against your system.",
  },
  {
    question: "How do we start working together?",
    answer:
      "Send us a note through the contact form with a short description of what you are building. We will come back within two working days with initial thoughts and a suggested next step.",
  },
];
