import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Handshake, MapPin, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Ushine 24/7",
  description:
    "A Western Sydney cleaning business built around one idea: be available when people actually need a cleaner. Residential, commercial, Airbnb and end-of-lease cleaning, 24 hours a day.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Clock,
    title: "Available when you need us",
    body: "Cleaning emergencies do not keep business hours. A guest checks out at 11pm, an agent inspects at 8am, an office needs a deep clean over the weekend. We built the roster around those hours rather than pretending they do not exist.",
  },
  {
    icon: Handshake,
    title: "Say the price, then hold it",
    body: "We quote the job, not the hour. The price you are given before we start is the price you pay — no extra hours added at the end, no vague estimates that creep upward.",
  },
  {
    icon: ShieldCheck,
    title: "Do it properly or do it again",
    body: "Every clean follows a written checklist so the standard does not drift between visits. If something is missed, tell us within 48 hours and we come back and fix it.",
  },
  {
    icon: MapPin,
    title: "Local, and staying that way",
    body: `We are based in ${site.baseSuburb} and most of our work is across ${site.baseRegion}. We travel across Sydney, but this is where we live — which is a decent guarantee that we will turn up.`,
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <PageHero
        image="about"
        eyebrow="About us"
        title="A cleaning business that answers the phone"
        description={`Ushine 24/7 is a ${site.baseRegion} cleaning company serving households and businesses across Sydney — at whatever hour the job actually needs doing.`}
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div className="relative aspect-16/9 overflow-hidden rounded-2xl border">
            <Image
              src={images.trust.src}
              alt={images.trust.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl font-semibold sm:text-3xl">
            Why we started
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ask anyone who has hired a cleaner and you will hear the same three
            complaints: they did not turn up, the price changed, and nobody
            answered the phone when it mattered. Those complaints are the whole
            reason this business exists.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are a new business, and we are not going to pretend otherwise —
            what we bring is availability, a fixed price, and a standard we are
            willing to be held to. We run around the clock, so the overnight
            office clean, the 6am start before a hospital shift, and the Sunday
            night Airbnb turnover are all normal jobs for us rather than
            favours.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Most of our work is residential — weekly and fortnightly cleans for
            households across {site.baseRegion} — alongside end-of-lease cleans,
            short-stay turnovers and after-hours commercial contracts. We bring
            our own equipment, we work to a checklist, and we quote before we
            start.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How we work"
          title="Four things we hold ourselves to"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-3">
              <span className="bg-brand-soft text-primary flex size-11 items-center justify-center rounded-xl">
                <value.icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Give us a job and judge us on it"
        body="Start with a single clean. If we get it right, set up a regular slot — and if we do not, you have lost nothing."
      />

      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
