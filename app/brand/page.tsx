import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { logoConcepts } from "@/components/logo-concepts";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Brand review",
  description: "Internal review page — logo concepts and colour tokens.",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "Primary — midnight navy", token: "--primary", className: "bg-primary" },
  { name: "Brand — cyan CTA", token: "--brand", className: "bg-brand" },
  { name: "Brand soft — tint", token: "--brand-soft", className: "bg-brand-soft" },
  { name: "Ink — dark bands", token: "--ink", className: "bg-ink" },
  { name: "Muted — surfaces", token: "--muted", className: "bg-muted" },
  { name: "Border", token: "--border", className: "bg-border" },
];

/**
 * Client review page. Not linked from the site and excluded in robots.ts —
 * share the URL directly, then delete this route once a direction is locked.
 */
export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Brand review"
        description="Three logo directions and the colour system driving the site. Pick a logo and we will roll it through the header, footer, favicon and social image."
      />

      <Section>
        <SectionHeading
          eyebrow="Logo"
          title="Three directions"
          description="All three are vector, so they scale from favicon to van signage. Each is shown on light and dark."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {logoConcepts.map((concept) => (
            <div
              key={concept.id}
              className="bg-card flex flex-col gap-5 rounded-2xl border p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-brand-strong text-sm font-bold">
                  Concept {concept.id}
                </span>
                <h3 className="text-lg font-semibold">{concept.name}</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="bg-background flex items-center justify-center gap-4 rounded-xl border p-8">
                  <concept.Component className="size-16" />
                  <span className="text-xl font-semibold tracking-tight">
                    Ushine
                  </span>
                </div>
                <div className="bg-ink flex items-center justify-center gap-4 rounded-xl p-8">
                  <concept.Component className="size-16" />
                  <span className="text-ink-foreground text-xl font-semibold tracking-tight">
                    Ushine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Favicon legibility check */}
                <concept.Component className="size-8" />
                <concept.Component className="size-6" />
                <concept.Component className="size-4" />
                <span className="text-muted-foreground text-xs">
                  Small sizes
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {concept.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Lockup"
          title="Full lockup, as it appears in the header"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="bg-background flex items-center justify-center rounded-2xl border p-14">
            <Logo />
          </div>
          <div className="bg-ink text-ink-foreground flex items-center justify-center rounded-2xl p-14">
            <Logo />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Colour"
          title="The palette, as CSS tokens"
          description="Every component reads these variables, so changing a brand colour is a one-line edit in app/globals.css."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((swatch) => (
            <div
              key={swatch.token}
              className="overflow-hidden rounded-2xl border"
            >
              <div className={`${swatch.className} h-24`} />
              <div className="bg-card p-4">
                <p className="text-sm font-medium">{swatch.name}</p>
                <code className="text-muted-foreground font-mono text-xs">
                  {swatch.token}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
