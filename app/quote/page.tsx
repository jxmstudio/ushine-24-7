import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { QuoteForm } from "@/components/quote-form";
import { JsonLd } from "@/components/json-ld";
import { site, trustPoints } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Free Cleaning Quote",
  description:
    "Tell us your suburb and what needs cleaning and we will come back with a fixed price. No obligation. We answer the phone 24 hours a day.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Get a quote", href: "/quote" },
  ];

  return (
    <>
      <PageHero
        image="quote"
        eyebrow="Free quote"
        title="Get a fixed price for your clean"
        description="Two minutes to fill in, no obligation. We will come back to you with a price for the job — not a vague hourly rate."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-9">
            <Suspense fallback={<QuoteFormFallback />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="bg-muted/50 rounded-2xl border p-6 sm:p-7">
              <h2 className="text-lg font-semibold">
                Would rather just talk to someone?
              </h2>
              <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                Call us. A person answers, at any hour — including nights,
                weekends and public holidays.
              </p>
              <Button asChild size="xl" variant="lime" className="mt-5 w-full">
                <a href={site.phoneHref}>
                  <Phone /> {site.phone}
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="mt-3 w-full">
                <a href={`mailto:${site.email}`}>Email us</a>
              </Button>
            </div>

            <ul className="flex flex-col gap-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="text-brand-strong mt-0.5 size-4 shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <div className="text-muted-foreground flex flex-col gap-3 border-t pt-6 text-sm">
              <p className="flex items-center gap-2.5">
                <Clock className="text-brand-strong size-4" /> {site.hours}
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="text-brand-strong size-4" /> {site.baseSuburb},{" "}
                {site.addressRegion} — servicing all Sydney
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}

function QuoteFormFallback() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
