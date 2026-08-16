import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ServiceTile } from "@/components/service-tile";
import { CtaBand } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { serviceImages } from "@/data/images";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.title} Sydney`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} in Sydney | ${site.name}`,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const photo = serviceImages[service.slug];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        image={photo}
        eyebrow={service.tagline}
        title={`${service.title} in Sydney`}
        description={service.summary}
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="lime">
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
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="flex flex-col gap-10">
            {photo ? (
              <div className="relative aspect-16/9 overflow-hidden rounded-2xl border">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                What you get
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {service.intro}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Included in every clean</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="bg-brand-soft text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Who this suits</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.suitedTo.map((item) => (
                  <li
                    key={item}
                    className="bg-muted text-muted-foreground rounded-full px-3.5 py-1.5 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.faqs.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold">
                  {service.title} questions
                </h3>
                <Accordion type="single" collapsible className="mt-3 w-full">
                  {service.faqs.map((faq) => (
                    <AccordionItem key={faq.q} value={faq.q}>
                      <AccordionTrigger className="text-left text-base">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : null}
          </div>

          {/* Sticky quote rail */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="bg-card rounded-2xl border p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold">
                Get a price for {service.title.toLowerCase()}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Tell us your suburb and the size of the property. You will get a
                fixed price with no obligation — and we answer the phone 24/7.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild size="xl" variant="lime">
                  <Link href={`/quote?service=${service.slug}`}>
                    Request a quote <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <a href={site.phoneHref}>
                    <Phone /> {site.phone}
                  </a>
                </Button>
              </div>
              <dl className="text-muted-foreground mt-7 space-y-3 border-t pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt>Availability</dt>
                  <dd className="text-foreground font-medium">{site.hours}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Service area</dt>
                  <dd className="text-foreground font-medium">All Sydney</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Quotes</dt>
                  <dd className="text-foreground font-medium">
                    Free, fixed price
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Also available"
          title="Other things we clean"
          description="Most clients start with one service and add another once they know how we work."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, i) => (
            <ServiceTile key={item.slug} service={item} index={i} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Book ${service.title.toLowerCase()} in Sydney`}
        body="Call for a straight answer on price and availability, or send an enquiry — we reply fast, day or night."
      />

      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {service.faqs.length > 0 ? (
        <JsonLd data={faqSchema(service.faqs)} />
      ) : null}
    </>
  );
}
