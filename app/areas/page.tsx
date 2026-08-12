import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { suburbsByRegion } from "@/data/suburbs";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Areas We Service — Cleaners Across Sydney",
  description:
    "Ushine 24/7 is based in Western Sydney and cleans across the whole Sydney metro area — Penrith, Blacktown, Parramatta, Liverpool, the Hills, the Inner West and beyond.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Areas", href: "/areas" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Cleaners across Sydney"
        description={`We are based in ${site.baseSuburb}, ${site.baseRegion}, and travel across the Sydney metropolitan area. Western Sydney is our home ground — but we work everywhere from the Blue Mountains side to the eastern beaches.`}
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="brand">
            <Link href="/quote">
              Check my suburb <ArrowRight />
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
        <div className="flex flex-col gap-14">
          {Object.entries(suburbsByRegion).map(([region, list]) => (
            <div key={region}>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <MapPin className="text-brand-strong size-5" />
                {region}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/areas/${suburb.slug}`}
                    className="group bg-card hover:border-brand/50 flex flex-col gap-2 rounded-2xl border p-5 transition-all hover:shadow-md sm:p-6"
                  >
                    <h3 className="font-semibold">
                      Cleaners in {suburb.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                      {suburb.blurb}
                    </p>
                    <span className="text-primary mt-2 inline-flex items-center gap-1.5 text-sm font-medium">
                      View {suburb.name}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-14 text-center text-sm">
          Do not see your suburb? We almost certainly cover it. Call{" "}
          <a
            href={site.phoneHref}
            className="text-primary font-medium hover:underline"
          >
            {site.phone}
          </a>{" "}
          and ask.
        </p>
      </Section>

      <CtaBand
        title="Wherever you are in Sydney, we will get there"
        body="Tell us your suburb and what needs cleaning. We will confirm availability and price on the spot."
      />

      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
