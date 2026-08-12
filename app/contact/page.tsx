import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { QuoteForm } from "@/components/quote-form";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";
import { suburbs } from "@/data/suburbs";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Ushine 24/7",
  description: `Call ${site.phone} any time — we answer 24 hours a day, seven days a week. Or send an enquiry and we will come back to you with a fixed price.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
    note: "Answered 24 hours a day, 7 days a week",
    primary: true,
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Replies usually within a couple of hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: site.whatsappHref,
    note: "Send photos of the job for a faster quote",
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us any hour of the day"
        description="There is no answering machine and no waiting until Monday. Call, email, or send the form and we will get straight back to you."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="group bg-card hover:border-brand/50 flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            >
              <span className="bg-brand-soft text-primary flex size-11 items-center justify-center rounded-xl">
                <channel.icon className="size-5" />
              </span>
              <h2 className="font-semibold">{channel.label}</h2>
              <p className="group-hover:text-primary text-lg font-medium break-words transition-colors">
                {channel.value}
              </p>
              <p className="text-muted-foreground text-sm">{channel.note}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">Send an enquiry</h2>
            <p className="text-muted-foreground mt-2 mb-8 leading-relaxed">
              Tell us where you are and what needs cleaning. We will come back
              with a fixed price and the next available slot.
            </p>
            <Suspense
              fallback={<Skeleton className="h-[520px] w-full rounded-xl" />}
            >
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold">Business details</h2>
              {/* NAP block — must match Google Business Profile exactly */}
              <dl className="mt-4 flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="text-brand-strong mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="font-medium">Based in</dt>
                    <dd className="text-muted-foreground">
                      {site.baseSuburb}, {site.addressRegion} {site.postalCode}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-brand-strong mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="font-medium">Hours</dt>
                    <dd className="text-muted-foreground">{site.hours}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-brand-strong mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="font-medium">Phone</dt>
                    <dd>
                      <a
                        href={site.phoneHref}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Where we work</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Based in {site.baseRegion} and servicing the entire Sydney metro
                area, including {suburbs.slice(0, 5).map((s) => s.name).join(", ")}{" "}
                and everywhere in between.
              </p>
              <Button asChild variant="outline" className="mt-5" size="lg">
                <Link href="/areas">See all areas</Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
