import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { CtaBand, FaqSection } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cleaning Services in Sydney",
  description:
    "Residential, weekly contract, end of lease, Airbnb and commercial cleaning across Sydney. Available 24/7, fixed quotes, no lock-in contracts.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Cleaning services across Sydney"
        description="Five things we do properly, at any hour of the day. Every job is quoted as a fixed price before we start."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="brand">
            <Link href="/quote">
              Get a free quote <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline-inverse">
            <a href={site.phoneHref}>
              <Phone /> {site.phone}
            </a>
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Pick the service you need"
          description="Not sure which one fits? Call us and describe the place — we will tell you what it needs and what it costs."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <FaqSection faqs={generalFaqs.slice(0, 5)} />
      <CtaBand />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
    </>
  );
}
