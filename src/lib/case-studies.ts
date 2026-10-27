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
    metaTitle: "Logistics Billing Software: Case Study",
    metaDescription:
      "How Trikona replaced a spreadsheet-based logistics workflow with a custom billing platform: lorry receipts, freight memos, invoicing, POD uploads and multi-branch reporting.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The client, a logistics and freight forwarding company, faced inefficiencies and inaccuracies in managing operational data such as LR creation, freight memos, customer billing, vendor payments and branch-level cash flow. Manual record-keeping and an outdated Excel-based system caused delays, a lack of centralised visibility and human error, leading to poor financial tracking and low operational efficiency.",
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
            text: "We built a comprehensive, modular logistics billing platform that simplifies complex workflows and stays reliable at every stage, addressing both billing and day-to-day operational pain points.",
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
      "A modern event management platform we designed and developed from scratch, simplifying how organisers create, manage and promote events, while giving attendees a seamless registration experience.",
    metaTitle: "Eventra Event Management Platform: Case Study",
    metaDescription:
      "How Trikona took Eventra from a raw idea to a complete MVP: event discovery, QR ticketing, organiser dashboards, role-based access and automated certificates.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Eventra approached us with a raw idea: they wanted to simplify how people discover, register for and manage local and college-level events. There was no existing product, only a vision: to make event hosting and participation effortless, mobile-friendly and centralised.",
          },
          { type: "lead", text: "Key challenges" },
          {
            type: "list",
            items: [
              { text: "No reference product: everything needed building from the ground up" },
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
            text: "We designed and developed Eventra from scratch, starting with branding, wireframes and architecture, and evolving it into a fully functional web app that handles everything from event creation to real-time user engagement.",
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
              { text: "Thoughtful UX for every user type: admin, organiser and attendee" },
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
      "A real-time tournament management dashboard that generates JSON outputs for vMix broadcast integration, enabling live stats, leaderboards and seamless esports broadcast automation.",
    metaTitle: "Esports Tournament Dashboard: Case Study",
    metaDescription:
      "How Trikona built a real-time esports tournament dashboard with vMix integration, automated JSON export, and live broadcast statistics.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "A tournament organiser needed a system to manage esports events at scale, handling teams, players, match results and live statistics. The critical requirement was seamless integration with vMix broadcast software, enabling real-time display of tournament data during live streams without manual intervention.",
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
              { emphasis: "100%", text: "automated JSON export with zero manual intervention needed" },
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
              { text: "Instant JSON export that removes manual data entry into vMix" },
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
  {
    slug: "billsoft-frontend",
    intro:
      "A Tauri desktop billing suite that replaces spreadsheet-based GST billing with GSTIN-validated invoices and quotes, auto-generated PDFs, and centralised inventory and expense tracking.",
    metaTitle: "Billsoft GST Billing Suite: Case Study",
    metaDescription:
      "How Trikona built a Tauri desktop billing suite with GSTIN-validated invoices and quotes, automated PDF generation, and inventory and expense tracking for a retail client.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "A retail client was tracking GST invoices, quotes, inventory and expenses across spreadsheets, with no audit trail and no clean PDF output. GSTIN numbers were entered by hand on every invoice, and a single typo could make a bill non-compliant without anyone noticing until a customer or auditor flagged it.",
          },
          {
            type: "list",
            items: [
              { text: "Manual GSTIN entry with no validation, risking non-compliant invoices" },
              { text: "No standard, professional PDF format for invoices or quotes" },
              { text: "Inventory and expenses tracked separately from billing, with no single source of truth" },
              { text: "Sending an invoice to a customer meant exporting, attaching and emailing it by hand" },
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
            text: "We set out to replace the spreadsheet workflow with a single desktop application that makes GST compliance the default, not an extra step, while keeping it fast enough for daily, high-volume billing.",
          },
          { type: "lead", text: "Key objectives" },
          {
            type: "list",
            items: [
              { text: "Validate GSTIN numbers at the point of entry, not after the fact" },
              { text: "Generate consistent, audit-ready invoice and quote PDFs automatically" },
              { text: "Bring inventory and expense tracking into the same system as billing" },
              { text: "Keep the app lightweight and fast as a native desktop install, not a browser tab" },
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
            text: "We built a Tauri desktop billing suite that keeps GST compliance, inventory and expenses in one place, with every invoice and quote backed by a validated GSTIN and a clean, auto-generated PDF.",
          },
          { type: "lead", text: "Key modules developed" },
          {
            type: "list",
            items: [
              { emphasis: "GSTIN-validated invoicing", text: "Real-time GSTIN format and checksum validation before an invoice can be saved" },
              { emphasis: "Quotes", text: "Create and convert quotes into invoices without re-entering line items" },
              { emphasis: "PDF generation", text: "Auto-generated, professionally formatted invoice and quote PDFs via React-PDF" },
              { emphasis: "One-click emailing", text: "Send a finished invoice or quote straight to the customer from inside the app" },
              { emphasis: "Inventory tracking", text: "Stock levels update automatically as items are billed" },
              { emphasis: "Expense tracking", text: "Record and categorise operational expenses alongside billing data" },
              { emphasis: "Audit trail", text: "Every invoice, quote and edit is logged and retrievable later" },
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
              { emphasis: "70%", text: "reduction in invoicing time" },
              { emphasis: "100%", text: "GST compliance" },
              { text: "A single desktop app replacing spreadsheets for billing, inventory and expenses" },
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
              { text: "GSTIN validation that catches mistakes before an invoice goes out" },
              { text: "Clean, consistent PDF invoices and quotes with no manual formatting" },
              { text: "Sending an invoice straight to a customer without leaving the app" },
              { text: "Inventory and expenses finally tracked in the same place as billing" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "rmr-frontend",
    intro:
      "A React web app that gives multi-outlet retail and F&B operators one dashboard to reconcile daily stock, track BOM-based recipes, and manage orders and returns across every location.",
    metaTitle: "Multi-Outlet Retail & Inventory Platform: Case Study",
    metaDescription:
      "How Trikona built a React web app for multi-store retail and F&B operators to reconcile daily stock, track BOM-based recipes, and manage orders and returns from one dashboard.",
    sections: [
      {
        id: "challenge",
        heading: "Client challenge",
        blocks: [
          {
            type: "paragraph",
            text: "A multi-store retail and F&B operator had no single system to reconcile daily opening and closing stock, track BOM-based recipes, or manage orders and returns across outlets. Every location kept its own spreadsheet, so head office had no live picture of stock or sales until someone manually collated numbers at the end of the week.",
          },
          {
            type: "list",
            items: [
              { text: "Opening and closing stock reconciled by hand, separately, at every outlet" },
              { text: "No shared view of recipes or bill-of-materials, so item costing drifted between locations" },
              { text: "Orders and returns logged inconsistently, making stock counts unreliable" },
              { text: "Sales reporting meant exporting and merging spreadsheets from every outlet by hand" },
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
            text: "We set out to replace per-outlet spreadsheets with one dashboard that any location could use the same way, giving head office a live, store-by-store view without extra manual reporting.",
          },
          { type: "lead", text: "Key objectives" },
          {
            type: "list",
            items: [
              { text: "Standardise daily stock reconciliation across every outlet" },
              { text: "Centralise BOM-based recipes and item data so costing stays consistent store to store" },
              { text: "Track orders and returns per outlet without duplicate data entry" },
              { text: "Let head office switch between outlets and pull sales reports without chasing spreadsheets" },
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
            text: "We built a React web app with per-store stock reconciliation, BOM and item tracking, order and return management, and Excel-exportable sales reports, all driven from one dashboard with a location switcher.",
          },
          { type: "lead", text: "Key modules developed" },
          {
            type: "list",
            items: [
              { emphasis: "Location switcher", text: "Head office views sales, stock and invoices for any outlet from a single dashboard" },
              { emphasis: "Stock reconciliation", text: "Daily opening and closing stock recorded and reconciled per outlet" },
              { emphasis: "BOM & item tracking", text: "Recipes and bills of materials kept consistent across every location" },
              { emphasis: "Orders & returns", text: "Dispatches, invoices and product returns logged and tracked per outlet" },
              { emphasis: "Sales overview", text: "Gross sales, cases dispatched and average invoice value at a glance, with day-over-day comparisons" },
              { emphasis: "Excel-exportable reports", text: "Sales and stock reports exported directly, with no manual spreadsheet assembly" },
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
              { emphasis: "65% faster", text: "stock reconciliation time" },
              { emphasis: "30+", text: "outlets managed from one dashboard" },
              { text: "One dashboard replacing per-outlet spreadsheets for stock, orders, returns and sales reporting" },
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
              { text: "Switching between outlets without logging into a different system for each one" },
              { text: "Daily stock reconciliation that no longer depends on someone's spreadsheet discipline" },
              { text: "Recipes and item data staying consistent across every location" },
              { text: "Sales reports that export straight to Excel, with no manual collation" },
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
