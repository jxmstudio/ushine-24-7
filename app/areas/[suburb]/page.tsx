import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ServiceTile } from "@/components/service-tile";
import { CtaBand, FaqSection } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { getSuburb, suburbs } from "@/data/suburbs";
import { services } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return suburbs.map((suburb) => ({ suburb: suburb.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/areas/[suburb]">): Promise<Metadata> {
  const { suburb: slug } = await params;
  const suburb = getSuburb(slug);
  if (!suburb) return {};

  const title = `Cleaners in ${suburb.name} — Available 24/7`;
  const description = `Residential, end of lease, Airbnb and commercial cleaning in ${suburb.name}, ${suburb.region}. Fixed quotes, no lock-in contracts, available 24 hours a day.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${suburb.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/areas/${suburb.slug}`,
    },
  };
}

export default async function SuburbPage({
  params,
}: PageProps<"/areas/[suburb]">) {
  const { suburb: slug } = await params;
  const suburb = getSuburb(slug);
  if (!suburb) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Areas", href: "/areas" },
    { name: suburb.name, href: `/areas/${suburb.slug}` },
  ];

  return (
    <>
      <PageHero
        image="areas"
        eyebrow={suburb.region}
        title={`Cleaners in ${suburb.name}`}
        description={suburb.blurb}
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="lime">
            <Link href={`/quote?suburb=${encodeURIComponent(suburb.name)}`}>
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
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Cleaning services in {suburb.name}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything we do in the rest of Sydney, we do in {suburb.name} —
              weekly household cleans, bond cleans for tenants moving out,
              same-day Airbnb turnovers and after-hours commercial work. Because
              we run 24 hours a day, we can work around your schedule rather
              than asking you to work around ours.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every job is quoted as a fixed price before we start, so there are
              no surprise hours added at the end. Regular cleans run on a rolling
              arrangement with no lock-in period — pause for a holiday, or stop
              whenever you like.
            </p>

            <div className="bg-muted/50 rounded-2xl border p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <MapPin className="text-brand-strong size-4" />
                Nearby suburbs we also cover
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {suburb.nearby.join(", ")} — and everywhere in between. If your
                street is not on the list, call and ask.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="bg-card rounded-2xl border p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold">
                Book a cleaner in {suburb.name}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Call any hour, or send an enquiry and we will come straight back
                to you with a price.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild size="xl" variant="lime">
                  <a href={site.phoneHref}>
                    <Phone /> {site.phone}
                  </a>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link
                    href={`/quote?suburb=${encodeURIComponent(suburb.name)}`}
                  >
                    Request a quote
                  </Link>
                </Button>
              </div>
              <p className="text-muted-foreground mt-6 flex items-center gap-2 border-t pt-6 text-sm">
                <Clock className="text-brand-strong size-4" /> {site.hours}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow={`In ${suburb.name}`}
          title="What we can clean for you"
        />
        <div className="mt-12 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceTile key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Section>

      <FaqSection
        faqs={generalFaqs.slice(0, 5)}
        title={`Cleaning in ${suburb.name} — common questions`}
      />

      <CtaBand
        title={`Need a cleaner in ${suburb.name}?`}
        body="We answer the phone 24 hours a day, seven days a week. Call for a fixed price and the next available slot."
      />

      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
