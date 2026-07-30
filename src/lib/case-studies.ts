/**
 * Long-form case study content.
 *
 * Kept as structured data rather than JSX so both case studies render through
 * one layout — previously they were two near-identical 300-line page
 * components that had already drifted apart.
 */

export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "lead"; text: string }
  | { type: "list"; items: { text: string; emphasis?: string }[] };

export type CaseStudySection = {
  id: string;
  heading: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudy = {
  slug: string;
  /** Matches a Project in src/lib/site.ts. */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-billing-software",
    intro:
      "A custom-built logistics billing platform that streamlines operations by managing lorry receipts, freight memos, customer invoices and payments in one place.",
    metaTitle: "Logistics Billing Software — Case Study",
    metaDescription:
      "How Trikona replaced a spreadsheet-based logistics workflow with a custom billing platform: lorry receipts, freight memos, invoicing, POD uploads and multi-branch reporting.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The client, a logistics and freight forwarding company, faced inefficiencies and inaccuracies in managing operational data such as LR creation, freight memos, customer billing, vendor payments and branch-level cash flow. Manual record-keeping and an outdated Excel-based system caused delays, a lack of centralised visibility and human error — leading to poor financial tracking and low operational efficiency.",
          },
          {
            type: "list",
            items: [
              { text: "Manual paperwork for lorry receipts, freight memos and PODs" },
              { text: "No visibility into outstanding payments" },
              { text: "Difficulty managing branches, clients and vendors efficiently" },
              { text: "Disconnected records for billing, payments and expenses" },
            ],
          },
        ],
      },
      {
        id: "approach",
        heading: "Our approach",
        blocks: [
          {
            type: "paragraph",
            text: "We set out to design and develop a custom logistics billing system tailored to the real-world challenges transport companies face. The goal was to streamline billing operations, centralise records and give the client proper control over multi-branch workflows.",
          },
          { type: "lead", text: "Key objectives" },
          {
            type: "list",
            items: [
              { text: "Digitise and centralise all billing and operational processes" },
              { text: "Track and manage LRs, freight memos, bills and payments in one place" },
              { text: "Minimise manual errors and save time through automated workflows" },
              { text: "Support multi-branch operations with branch-level access and control" },
            ],
          },
        ],
      },
      {
        id: "solution",
        heading: "Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We built a comprehensive, modular logistics billing platform that simplifies complex workflows and stays reliable at every stage — addressing both billing and day-to-day operational pain points.",
          },
          { type: "lead", text: "Key modules developed" },
          {
            type: "list",
            items: [
              { emphasis: "Dashboard", text: "A single operational overview across branches, billing and cash flow" },
              { emphasis: "Lorry Receipt (LR) module", text: "Create, manage and print LRs with linked data tracking" },
              { emphasis: "Freight Memo (FM)", text: "Generate memos linked to LRs and calculate freight charges accurately" },
              { emphasis: "Customer billing", text: "Create and send bills, edit past records and view billing history" },
              { emphasis: "Payment management", text: "Log payments, track outstanding balances and filter by customer or date" },
              { emphasis: "Client & vendor management", text: "Maintain profiles, credit limits and associated vehicles" },
              { emphasis: "Branch management", text: "Separate logins and access control per branch" },
              { emphasis: "POD upload & linking", text: "Upload proof of delivery for each LR and access it instantly via AWS S3" },
              { emphasis: "Expense module", text: "Record operational expenses under customisable categories" },
              { emphasis: "Cash & outstanding reports", text: "Generate client and vendor-wise outstanding reports and summaries" },
              { emphasis: "Settings panel", text: "Configure company profile, vehicle types, bank details and user roles" },
            ],
          },
        ],
      },
      {
        id: "results",
        heading: "Results",
        blocks: [
          {
            type: "list",
            items: [
              { emphasis: "50%", text: "faster document processing and dispatch" },
              { emphasis: "100%", text: "accuracy in outstanding payment tracking" },
              { emphasis: "60%", text: "reduction in branch coordination time" },
              { text: "Centralised, secure and scalable billing operations" },
            ],
          },
        ],
      },
      {
        id: "loved",
        heading: "What the client loved",
        blocks: [
          {
            type: "list",
            items: [
              { text: "A centralised dashboard giving a complete overview at a glance" },
              { text: "Auto-linked documents across LRs, freight memos and bills" },
              { text: "An interface that non-technical staff could use without training" },
              { text: "POD upload and instant access from anywhere" },
              { text: "Role-based access for each branch and department" },
              { text: "On-demand generation of outstanding and cash statements" },
              { text: "Seamless tracking of vendor payments and vehicle information" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "eventra",
    intro:
      "A modern event management platform we designed and developed from scratch — simplifying how organisers create, manage and promote events, while giving attendees a seamless registration experience.",
    metaTitle: "Eventra Event Management Platform — Case Study",
    metaDescription:
      "How Trikona took Eventra from a raw idea to a complete MVP: event discovery, QR ticketing, organiser dashboards, role-based access and automated certificates.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Eventra approached us with a raw idea — they wanted to simplify how people discover, register for and manage local and college-level events. There was no existing product, only a vision: to make event hosting and participation effortless, mobile-friendly and centralised.",
          },
          { type: "lead", text: "Key challenges" },
          {
            type: "list",
            items: [
              { text: "No reference product — everything needed building from the ground up" },
              { text: "Events scattered across multiple platforms, or handled offline" },
              { text: "Manual registration and poor engagement tracking" },
              { text: "No platform for organisers to manage submissions, attendees or data" },
            ],
          },
        ],
      },
      {
        id: "approach",
        heading: "Our approach",
        blocks: [
          {
            type: "paragraph",
            text: "Our mission was to take Eventra's concept and turn it into a full-fledged event management and discovery platform, built to support both organisers and attendees with an intuitive, scalable solution.",
          },
          { type: "lead", text: "What we aimed to deliver" },
          {
            type: "list",
            items: [
              { text: "A sleek, mobile-first user experience" },
              { text: "Easy event discovery and seamless registration" },
              { text: "A dashboard for organisers to manage listings, registrations and analytics" },
              { text: "A flexible system supporting both public and private events" },
            ],
          },
        ],
      },
      {
        id: "solution",
        heading: "Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We designed and developed Eventra from scratch — starting with branding, wireframes and architecture, and evolving it into a fully functional web app that handles everything from event creation to real-time user engagement.",
          },
          { type: "lead", text: "Core features developed" },
          {
            type: "list",
            items: [
              { emphasis: "Event discovery", text: "Browse by category, location or popularity" },
              { emphasis: "Event listing & creation", text: "Organisers add detailed event info, cover images and registration limits" },
              { emphasis: "Registration system", text: "Attendees sign up instantly through a clean, mobile-first flow" },
              { emphasis: "Organiser dashboard", text: "View and manage registrations, filter by date or event, and export data" },
              { emphasis: "Ticket / QR generator", text: "Automatic QR-based ticketing for on-the-spot verification" },
              { emphasis: "Role-based access", text: "Distinct permissions for admins, organisers and participants" },
              { emphasis: "Email notifications", text: "Automatic confirmation and reminder emails for attendees" },
              { emphasis: "Certificate generator", text: "One-click downloadable certificates for event participants" },
              { emphasis: "Admin panel", text: "Full control over event categories, featured listings and platform users" },
            ],
          },
        ],
      },
      {
        id: "results",
        heading: "Results",
        blocks: [
          {
            type: "paragraph",
            text: "The platform has not launched publicly yet. What we delivered:",
          },
          {
            type: "list",
            items: [
              { text: "Took the product from idea to a complete MVP" },
              { text: "Built a full-featured, ready-to-deploy platform" },
              { text: "Designed a clean, scalable UI serving multiple user roles" },
              { text: "Created documentation and workflows ready for future deployment" },
            ],
          },
        ],
      },
      {
        id: "loved",
        heading: "What the client loved",
        blocks: [
          {
            type: "list",
            items: [
              { text: "A clean, intuitive experience designed for both mobile and desktop" },
              { text: "A fully integrated dashboard for events, attendees and communication" },
              { text: "Automated QR-based tickets and certificate generation" },
              { text: "Thoughtful UX for every user type — admin, organiser and attendee" },
              { text: "Fast execution and close collaboration throughout the build" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "esports-dashboard",
    intro:
      "A real-time tournament management dashboard that generates JSON outputs for vMix broadcast integration — enabling live stats, leaderboards and seamless esports broadcast automation.",
    metaTitle: "Esports Tournament Dashboard — Case Study",
    metaDescription:
      "How Trikona built a real-time esports tournament dashboard with vMix integration, automated JSON export, and live broadcast statistics.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "A tournament organiser needed a system to manage esports events at scale — handling teams, players, match results and live statistics. The critical requirement was seamless integration with vMix broadcast software, enabling real-time display of tournament data during live streams without manual intervention.",
          },
          { type: "lead", text: "Key requirements" },
          {
            type: "list",
            items: [
              { text: "Centralised team and player management with roster configuration" },
              { text: "Real-time match tracking with automated result input" },
              { text: "Automated JSON export compatible with vMix broadcast system" },
              { text: "Live leaderboards, team rankings and player statistics" },
              { text: "Administrator interface for tournament setup and configuration" },
              { text: "Dynamic data updates reflected immediately during broadcast" },
            ],
          },
        ],
      },
      {
        id: "approach",
        heading: "Our approach",
        blocks: [
          {
            type: "paragraph",
            text: "We designed a comprehensive tournament management system that acts as a data hub between tournament administrators and the broadcast layer. The architecture prioritises real-time synchronisation, structured data export, and a clean admin interface.",
          },
          { type: "lead", text: "Core strategic decisions" },
          {
            type: "list",
            items: [
              { text: "MERN stack for scalability and real-time capabilities using WebSockets" },
              { text: "Automated JSON generation that updates instantly with data changes" },
              { text: "Drag-and-drop roster management for quick team configuration" },
              { text: "Modular architecture supporting multiple tournament formats" },
              { text: "Role-based access control for tournament admins and broadcasters" },
            ],
          },
        ],
      },
      {
        id: "solution",
        heading: "Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We built a full-featured tournament dashboard that handles every aspect of tournament management and broadcast integration, with particular focus on real-time data synchronisation and automated broadcast readiness.",
          },
          { type: "lead", text: "Core features developed" },
          {
            type: "list",
            items: [
              { emphasis: "Team Management", text: "Create teams with logos, banners and player rosters; drag-and-select active players for each match" },
              { emphasis: "Player Management", text: "Add players with profiles, IGNs and photos; track individual statistics and performance metrics" },
              { emphasis: "Tournament Setup", text: "Configure tournament details, dates, times and formats; manage multiple concurrent tournaments" },
              { emphasis: "Match Management", text: "Create and update match data including results, points and placements in real-time" },
              { emphasis: "Leaderboards", text: "Auto-generated team rankings and player statistics updated instantly" },
              { emphasis: "JSON Export", text: "Automated generation of structured JSON files for vMix consumption" },
              { emphasis: "Live Broadcast Integration", text: "vMix reads JSON files to dynamically display match info, standings and player stats" },
              { emphasis: "Admin Dashboard", text: "Centralised control for all tournament operations and broadcast configuration" },
            ],
          },
        ],
      },
      {
        id: "results",
        heading: "Results",
        blocks: [
          {
            type: "list",
            items: [
              { emphasis: "Sub-100ms", text: "real-time data synchronisation between dashboard and broadcast" },
              { emphasis: "100%", text: "automated JSON export — zero manual intervention needed" },
              { emphasis: "15+", text: "core features shipped and production-ready" },
              { text: "Seamless broadcast experience with no downtime or data loss" },
              { text: "Scalable architecture supporting tournaments of any size" },
            ],
          },
        ],
      },
      {
        id: "loved",
        heading: "What the client loved",
        blocks: [
          {
            type: "list",
            items: [
              { text: "Intuitive team and player management workflow" },
              { text: "Instant JSON export — no need for manual data entry into vMix" },
              { text: "Drag-and-drop roster selection for fast match setup" },
              { text: "Real-time leaderboards and statistics during live broadcast" },
              { text: "Automated data updates eliminating manual broadcaster errors" },
              { text: "Professional broadcast integration ready out of the box" },
            ],
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
