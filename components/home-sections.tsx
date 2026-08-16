import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QuoteForm } from "@/components/quote-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/container";
import { Section, SectionHeading } from "@/components/section";
import { ServiceTile } from "@/components/service-tile";
import { BeforeAfter } from "@/components/before-after";
import { Reveal } from "@/components/reveal";
import { TwentyFourSevenMark } from "@/components/twenty-four-seven";
import { comparisons, images, stepImages } from "@/data/images";
import { services } from "@/data/services";
import { suburbs } from "@/data/suburbs";
import { site } from "@/data/site";
import type { Faq } from "@/data/faqs";

/* ------------------------------------------------------- availability bar */

/**
 * The differentiator, stated immediately below the fold. Three facts, no
 * decoration — this is the one place on the page where a bare strip of text is
 * the right answer, because the whole point is that it is read in one second.
 */
export function AvailabilityBar() {
  const facts = [
    { value: "24/7", label: "Answered any hour, any day" },
    { value: "Weekly", label: "Regular contracts, no lock-in" },
    { value: "All Sydney", label: `Based in ${site.baseRegion}` },
  ];

  return (
    <section className="bg-deep-teal text-mist">
      <Container className="grid divide-y divide-white/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {facts.map((fact) => (
          <div
            key={fact.value}
            className="flex flex-col gap-1 py-7 sm:items-center sm:py-9 sm:text-center"
          >
            <span className="font-heading text-lime text-2xl font-extrabold tracking-tight sm:text-3xl">
              {fact.value}
            </span>
            <span className="text-mist/70 text-sm">{fact.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ services */

export function ServicesSection() {
  const [lead, ...rest] = services;

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we clean"
        title="Five things we do properly"
        description="One team for the house, the office and everything in between — booked around your schedule, not ours."
      />

      {/* Residential leads and takes the largest tile: it is the service the
          client wants pushed hardest, so it gets the most pixels. */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[19rem]">
        <Reveal className="sm:col-span-2 lg:row-span-2 lg:h-full">
          <ServiceTile
            service={lead}
            index={0}
            featured
            className="h-full lg:min-h-full"
          />
        </Reveal>
        {rest.map((service, index) => (
          <Reveal key={service.slug} delay={(index + 1) * 70} className="lg:h-full">
            <ServiceTile
              service={service}
              index={index + 1}
              className="h-full lg:min-h-full"
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <Button asChild size="xl" variant="outline">
          <Link href="/services">
            See all services <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}

/* --------------------------------------------------- weekly contract band */

/**
 * The recurring-revenue pitch. Deep teal band, lime CTA, one photograph doing
 * the work that four icon boxes used to do badly.
 */
export function ContractBand() {
  const points = [
    "A set day, every week — weekly, fortnightly or monthly",
    "The same cleaner each visit wherever possible",
    "A fixed rate agreed in writing before the first clean",
    "No lock-in contract. Pause for holidays, stop any time",
  ];

  return (
    <section className="bg-teal-glow text-mist relative overflow-hidden">
      <TwentyFourSevenMark className="absolute -top-8 -right-10 hidden lg:block" />

      <Container className="py-section lg:py-section-lg relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-4/5 overflow-hidden rounded-3xl sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src={images.contract.src}
              alt={images.contract.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col items-start gap-7">
            <SectionHeading
              tone="dark"
              eyebrow="Most popular"
              title={
                <>
                  Weekly cleaning,{" "}
                  <span className="text-lime">without the lock-in</span>
                </>
              }
              description="Stop rebooking a cleaner every fortnight. Set a regular slot, agree a fixed price, and the same cleaner keeps your place on top of itself — home or workplace."
            />

            <Reveal as="ul" className="flex flex-col gap-3.5" delay={80}>
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3.5 text-base">
                  <span
                    aria-hidden
                    className="bg-lime mt-2.5 h-px w-6 shrink-0"
                  />
                  <span className="text-mist/85">{point}</span>
                </li>
              ))}
            </Reveal>

            <Reveal className="flex flex-col gap-3 sm:flex-row" delay={140}>
              <Button asChild size="xl" variant="lime">
                <Link href="/quote">
                  Price my weekly clean <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-inverse">
                <Link href="/services/weekly-cleaning-contracts">
                  How it works
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ before/after */

/**
 * The highest-converting element in the cleaning category: proof, not claims.
 *
 * The comparison photographs are currently stock stand-ins, not genuine matched
 * pairs — see the note in data/images.ts. This section should not go live until
 * real before/after shots replace them.
 */
export function BeforeAfterSection() {
  return (
    <Section tone="paper" id="results">
      <SectionHeading
        eyebrow="The difference"
        title="Drag to see the difference"
        description="Every job is photographed before and after, so you can see exactly what changed — and so can we."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((comparison, index) => (
          <Reveal key={comparison.caption} delay={index * 90}>
            <BeforeAfter
              before={comparison.before}
              after={comparison.after}
              caption={comparison.caption}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- steps */

/**
 * Three steps, each with a photograph. The previous version used a numbered
 * icon in a rounded square, which is the pattern that made the whole site look
 * like an accounting firm.
 */
export function StepsSection() {
  const steps = [
    {
      title: "Book",
      body: "Call any hour, or send an enquiry. Tell us your suburb and what needs cleaning — that is all we need to quote.",
    },
    {
      title: "We clean",
      body: "We arrive on time with our own equipment and work to a written checklist, so nothing gets skipped.",
    },
    {
      title: "You check",
      body: "Walk through it. If something has been missed, tell us within 48 hours and we come back and fix it.",
    },
  ];

  return (
    <Section>
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, no runaround"
        description="Booking a cleaner should take five minutes, not five phone calls."
      />

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 90}>
            <div className="relative aspect-3/2 overflow-hidden rounded-2xl">
              <Image
                src={stepImages[index].src}
                alt={stepImages[index].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="font-heading bg-lime text-ink absolute top-4 left-4 flex size-11 items-center justify-center rounded-full text-base font-extrabold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight">
              {step.title}
            </h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------- trust */

/**
 * Trust signals, as an editorial split rather than a six-up grid of shields and
 * ticks.
 *
 * NOTE FOR LAUNCH: every claim below must be confirmed true and in writing
 * before it is published. "Fully insured" and "police-checked" are legal
 * statements, not marketing copy.
 */
export function TrustSection() {
  const claims = [
    {
      title: "Genuinely 24/7",
      body: "Overnight offices, 6am starts, Sunday turnovers, public holidays. The hours other cleaners will not work are the hours we built the business around.",
    },
    {
      title: "Insured and accountable",
      body: "Our cleaners are insured and work to a written checklist, so the standard does not drift from visit to visit.",
    },
    {
      title: "Fixed prices, quoted up front",
      body: "You get a price for the job before we start. No surprise hours added at the end.",
    },
    {
      title: "Re-clean if it is not right",
      body: "Miss something? Call within 48 hours and we come back and fix it. No argument, no invoice.",
    },
  ];

  return (
    <Section tone="paper">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-4/5 overflow-hidden rounded-3xl lg:sticky lg:top-28 lg:self-start">
          <Image
            src={images.trust.src}
            alt={images.trust.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Why Ushine"
            title="Cleaning you do not have to chase"
            description="The complaints we hear about other cleaners are the things we built the business to avoid."
          />

          <dl className="flex flex-col">
            {claims.map((claim, index) => (
              <Reveal
                key={claim.title}
                className="border-border border-t py-7 first:border-t-0 first:pt-0"
                delay={index * 70}
              >
                <dt className="text-xl font-extrabold tracking-tight">
                  {claim.title}
                </dt>
                <dd className="text-muted-foreground mt-2 leading-relaxed">
                  {claim.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- areas */

export function AreasSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={images.areas.src}
        alt={images.areas.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="bg-deep-teal/92 absolute inset-0 -z-10" />

      <Container className="py-section lg:py-section-lg relative">
        <SectionHeading
          tone="dark"
          eyebrow="Where we work"
          title="Cleaners right across Sydney"
          description={`Based in ${site.baseRegion}, servicing the whole metropolitan area. If your suburb is not listed, call and ask — the answer is usually yes.`}
        />

        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {suburbs.map((suburb) => (
            <Link
              key={suburb.slug}
              href={`/areas/${suburb.slug}`}
              className="text-mist/85 hover:border-lime hover:text-lime rounded-full border border-white/25 px-4 py-2 text-sm font-medium transition-colors"
            >
              {suburb.name}
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-10" delay={80}>
          <Button asChild variant="outline-inverse" size="xl">
            <Link href="/areas">
              All areas we service <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- faq */

export function FaqSection({
  faqs,
  title = "Questions people ask before booking",
  description,
}: {
  faqs: Faq[];
  title?: string;
  description?: string;
}) {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title={title}
          description={description}
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="py-5 text-left text-base font-semibold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- enquiry */

/**
 * Enquiry form, in place on the homepage. Sending someone to a separate page to
 * convert loses a slice of them at the click; /quote still exists for deep
 * links from the service and suburb pages.
 */
export function EnquirySection() {
  return (
    <Section tone="paper" id="quote">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Get a price"
            title="Tell us what needs cleaning"
            description="Two minutes to fill in, no obligation. We come back with a fixed price for the job — not a vague hourly rate."
          />

          <Reveal
            className="border-border rounded-3xl border bg-white p-5 sm:p-8"
            delay={80}
          >
            <Suspense fallback={<QuoteFormFallback />}>
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>

        <Reveal
          className="bg-deep-teal text-mist flex flex-col gap-7 rounded-3xl p-7 sm:p-9 lg:sticky lg:top-28 lg:self-start"
          delay={140}
        >
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Would rather just talk to someone?
            </h3>
            <p className="text-mist/75 mt-3 leading-relaxed">
              Call us. A person answers, at any hour — including nights,
              weekends and public holidays.
            </p>
          </div>

          <Button asChild size="xl" variant="lime" className="w-full">
            <a href={site.phoneHref}>
              <Phone /> {site.phone}
            </a>
          </Button>

          <ul className="flex flex-col gap-4 border-t border-white/15 pt-7 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-lime flex items-center gap-3 transition-colors"
              >
                <Mail className="text-lime size-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li className="text-mist/75 flex items-center gap-3">
              <MapPin className="text-lime size-4 shrink-0" />
              {site.baseSuburb}, {site.addressRegion} — servicing all Sydney
            </li>
            <li className="text-mist/75 flex items-center gap-3">
              <Clock className="text-lime size-4 shrink-0" />
              {site.hours}
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export function QuoteFormFallback() {
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

/* ---------------------------------------------------------------- cta band */

export function CtaBand({
  title = "Need a cleaner? We are awake.",
  body = "Call now for a straight answer on price and availability, or send an enquiry and we will come back to you fast — day or night.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={images.cta.src}
        alt={images.cta.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="from-ink/95 to-deep-teal/85 absolute inset-0 -z-10 bg-gradient-to-r"
      />

      <Container className="py-section lg:py-section-lg relative">
        <Reveal className="flex max-w-3xl flex-col items-start gap-7">
          <h2 className="text-mist text-display-sm font-extrabold">{title}</h2>
          <p className="text-mist/80 max-w-xl text-lg leading-relaxed">{body}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" variant="lime">
              <a href={site.phoneHref}>
                <Phone /> {site.phone}
              </a>
            </Button>
            <Button asChild size="xl" variant="outline-inverse">
              <Link href="/quote">
                Get a free quote <ArrowRight />
              </Link>
            </Button>
          </div>
          <p className="text-lime text-sm font-semibold">{site.callWindow}</p>
        </Reveal>
      </Container>
    </section>
  );
}
