import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/data/site";

// Display face for headings — has some character, so the site does not read as
// a default template. Body face is warmer and rounder than a stock grotesque.
const heading = Bricolage_Grotesque({
  variable: "--font-heading-family",
  subsets: ["latin"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cleaning Services Sydney, Available 24/7`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaners Sydney",
    "cleaning services Western Sydney",
    "end of lease cleaning Sydney",
    "Airbnb cleaning Sydney",
    "commercial cleaning Sydney",
    "24/7 cleaners",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Cleaning Services Sydney, Available 24/7`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Cleaning Services Sydney`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="focus:bg-background sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:border focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="top-center" richColors />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
