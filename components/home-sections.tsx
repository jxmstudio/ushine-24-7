import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  Clock,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/container";
import { Section, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { suburbs } from "@/data/suburbs";
import { site } from "@/data/site";
import type { Faq } from "@/data/faqs";

/* ------------------------------------------------------------------ services */

export function ServicesSection() {
  const [lead, ...rest] = services;

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we clean"
        title="Cleaning services across Sydney"
        description="One team for the house, the office and everything in between — booked around your schedule, not ours."
      />

      <div className="mt-8 grid gap-5 sm:mt-12 lg:grid-cols-3">
        <ServiceCard service={lead} featured className="lg:row-span-2" />
        {rest.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="xl" variant="outline">
          <Link href="/services">
            See all services <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

/* --------------------------------------------------- weekly contract band */

export function ContractBand() {
  const points = [
    {
      icon: CalendarCheck,
      title: "A set day, every week",
      body: "Weekly, fortnightly or monthly — pick the rhythm and we hold the slot.",
    },
    {
      icon: BadgeCheck,
      title: "The same cleaner",
      body: "Wherever possible you get the same person, so you are not re-explaining the house.",
    },
    {
      icon: Wallet,
      title: "A fixed weekly rate",
      body: "Agreed in writing before the first clean. Regular visits cost less per visit.",
    },
    {
      icon: Clock,
      title: "No lock-in contract",
      body: "Pause for holidays, or stop altogether with reasonable notice. No exit fees.",
    },
  ];

  return (
    <section className="bg-ink text-ink-foreground bg-brand-glow">
      <Container className="py-12 sm:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <span className="border-brand/30 text-brand rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
              Most popular
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
              Weekly cleaning contracts,{" "}
              <span className="text-brand">without the lock-in</span>
            </h2>
            <p className="text-ink-foreground/75 text-base leading-relaxed sm:text-lg">
              Stop rebooking a cleaner every fortnight. Set a regular slot, agree
              a fixed price, and the same cleaner keeps your place on top of
              itself — home or workplace.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="brand">
                <Link href="/quote">
                  Price my weekly clean <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-inverse">
                <Link href="/services/weekly-cleaning-contracts">
                  How it works
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-3/2 overflow-hidden rounded-2xl border border-white/12 sm:col-span-2 sm:aspect-21/9">
              <Image
                src={images.contract.src}
                alt={images.contract.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            {points.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:p-6"
              >
                <point.icon className="text-brand size-6" />
                <h3 className="mt-4 font-semibold">{point.title}</h3>
                <p className="text-ink-foreground/65 mt-2 text-sm leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- steps */

export function StepsSection() {
  const steps = [
    {
      icon: PhoneCall,
      title: "Call or send an enquiry",
      body: "Any hour of the day. Tell us your suburb and what needs cleaning — that is all we need to start.",
    },
    {
      icon: ClipboardList,
      title: "Get a fixed quote",
      body: "A clear price for the job, not a vague hourly estimate. No obligation, no pressure.",
    },
    {
      icon: Sparkles,
      title: "We clean, you check",
      body: "We arrive on time with our own equipment and work to a checklist. Not happy with something? Tell us and we come back.",
    },
  ];

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, no runaround"
        description="Booking a cleaner should take five minutes, not five phone calls."
      />

      <ol className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="bg-card relative flex flex-col gap-4 rounded-2xl border p-6 sm:p-7"
          >
            <span className="text-muted-foreground/25 absolute top-5 right-6 text-5xl font-bold">
              {index + 1}
            </span>
            <span className="bg-brand-soft text-primary flex size-12 items-center justify-center rounded-2xl">
              <step.icon className="size-6" />
            </span>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ why us */

export function WhyUsSection() {
  const reasons = [
    {
      icon: Clock,
      title: "Genuinely 24/7",
      body: "Overnight offices, 6am starts, Sunday turnovers, public holidays. The hours other cleaners will not work are the hours we built the business around.",
    },
    {
      icon: MapPin,
      title: "Western Sydney based, all-Sydney service",
      body: `We are based in ${site.baseSuburb} and travel across the metro area — from the Blue Mountains side through to the eastern beaches.`,
    },
    {
      icon: ShieldCheck,
      title: "Insured and accountable",
      body: "Our cleaners are insured and work to a written checklist, so the standard does not drift from visit to visit.",
    },
    {
      icon: Wallet,
      title: "Fixed prices, quoted up front",
      body: "You get a price for the job before we start. No surprise hours added at the end.",
    },
    {
      icon: BadgeCheck,
      title: "Re-clean if it is not right",
      body: "If something has been missed, call us within 48 hours and we will come back and fix it.",
    },
    {
      icon: CalendarCheck,
      title: "No lock-in contracts",
      body: "Regular cleans run on a rolling arrangement. Pause or stop whenever you need to.",
    },
  ];

  return (
    <Section>
      <SectionHeading
        eyebrow="Why Ushine"
        title="Cleaning you do not have to chase"
        description="The complaints we hear about other cleaners are the things we built the business to avoid."
      />

      <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title} className="flex flex-col gap-3">
            <span className="bg-brand-soft text-primary flex size-11 items-center justify-center rounded-xl">
              <reason.icon className="size-5" />
            </span>
            <h3 className="font-semibold">{reason.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {reason.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- areas */

export function AreasSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Where we work"
        title="Cleaners across Sydney"
        description={`Based in ${site.baseRegion}, servicing the whole Sydney metropolitan area. If your suburb is not listed, call and ask — the answer is usually yes.`}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-2.5">
        {suburbs.map((suburb) => (
          <Link
            key={suburb.slug}
            href={`/areas/${suburb.slug}`}
            className="bg-card hover:border-brand hover:text-primary rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          >
            {suburb.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="xl">
          <Link href="/areas">
            All areas we service <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
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
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title={title}
          description={description}
          align="left"
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
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
    </Section>
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
    <section className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center gap-6 py-12 text-center sm:gap-7 sm:py-20">
        <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h2>
        <p className="text-primary-foreground/75 max-w-xl text-base leading-relaxed sm:text-lg">
          {body}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="brand">
            <a href={site.phoneHref}>
              <PhoneCall /> {site.phone}
            </a>
          </Button>
          <Button asChild size="xl" variant="outline-inverse">
            <Link href="/quote">
              Get a free quote <ArrowRight />
            </Link>
          </Button>
        </div>
        <p className="text-primary-foreground/60 text-sm">{site.callWindow}</p>
      </Container>
    </section>
  );
}
