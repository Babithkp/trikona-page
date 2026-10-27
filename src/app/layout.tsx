import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

// Previously missing, which left every toast unstyled.
import "react-toastify/ReactToastify.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site, siteUrl } from "@/lib/site";

/* Self-hosted by next/font: no render-blocking request to Google, no layout
   shift from a late-swapping face, and only the latin subset is shipped. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-sora",
});

const title = "Trikona: UI/UX Design, Web & App Development Studio, Bengaluru";
const description =
  "Trikona is a Bengaluru-based product studio specialising in custom software, mobile app and web development, backed by UI/UX design and clear strategy for startups and growing businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    // Interior pages supply their own title; this keeps the brand suffix
    // consistent without every page repeating it.
    template: "%s | Trikona",
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.legalName,
  keywords: [
    "UI UX design agency Bengaluru",
    "web development company Bangalore",
    "app development agency",
    "MVP development for startups",
    "product design studio India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f6fb",
  colorScheme: "light",
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Without JavaScript the scroll-reveal system would leave content
            permanently invisible. This guarantees it is always readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col bg-canvas text-ink antialiased">
        <JsonLd schema={[organizationSchema, websiteSchema]} />

        <a
          href="#main"
          className="sr-only rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>

        <Header />
        {/* flow-root establishes a block formatting context, so the hero's
            negative top margin (which lets its backdrop run behind the
            transparent sticky header) cannot collapse through this wrapper. */}
        <div id="main" className="flow-root flex-1">
          {children}
        </div>
        <Footer />

        <ToastContainer
          position="bottom-right"
          hideProgressBar
          newestOnTop
          theme="light"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D2CEW60P40"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-D2CEW60P40');`}
        </Script>
      </body>
    </html>
  );
}
