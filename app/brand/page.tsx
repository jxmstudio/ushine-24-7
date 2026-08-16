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
  {
    name: "Deep teal — anchor",
    token: "--deep-teal",
    hex: "#06373C",
    className: "bg-deep-teal",
    use: "Dark bands, the availability bar, the contract pitch.",
  },
  {
    name: "Aqua — primary brand",
    token: "--aqua",
    hex: "#17C3B2",
    className: "bg-aqua",
    use: "Fills and marks only. At 2.2:1 on white it is not a text colour.",
  },
  {
    name: "Aqua ink — the readable aqua",
    token: "--aqua-ink",
    hex: "#0F7A72",
    className: "bg-aqua-ink",
    use: "Links, eyebrows and icons on light surfaces. 4.9:1 on mist.",
  },
  {
    name: "Lime — the 24/7 accent",
    token: "--lime",
    hex: "#C6F24E",
    className: "bg-lime",
    use: "Primary CTAs and the 24/7 device. Sparingly — it only works loud.",
  },
  {
    name: "Mist — canvas",
    token: "--mist",
    hex: "#F2FBF9",
    className: "bg-mist",
    use: "The page background. This is the 'bright'.",
  },
  {
    name: "Ink — deepest dark",
    token: "--ink",
    hex: "#08201F",
    className: "bg-ink",
    use: "Body text, the footer, scrims over photography.",
  },
];

/**
 * Client review page. Not linked from the site and excluded in robots.ts —
 * share the URL directly, then delete this route once a direction is locked.
 *
 * Each concept is shown the four ways that actually decide a logo: on light, on
 * dark, at favicon size, and in one colour. A mark that only looks good large
 * and in full colour will fail the first time it goes on a van or an invoice.
 */
export default function BrandPage() {
  return (
    <>
      <PageHero
        image="brand"
        eyebrow="Internal"
        title="Brand review"
        description="Three logo directions in three different territories — a symbol, a letterform and a numeral. Pick one and we will roll it through the header, footer, favicon and social image."
      />

      <Section>
        <SectionHeading
          eyebrow="Logo"
          title="Three directions, not three variations"
          description="The point of showing three is to make a choice, so these deliberately do not blend into each other. Each is shown on light, on dark, at the sizes a favicon actually renders at, and in one colour for signage and print."
        />

        <div className="mt-12 flex flex-col gap-6">
          {logoConcepts.map((concept) => (
            <div
              key={concept.id}
              className="border-border grid gap-8 rounded-3xl border bg-white p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-aqua-ink text-xs font-bold tracking-[0.18em] uppercase">
                    Concept {concept.id}
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    {concept.name}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {concept.note}
                </p>

                {/* The honest half. A concept without a stated weakness is a
                    pitch, not a recommendation. */}
                <p className="border-border text-muted-foreground border-l-2 pl-4 text-sm leading-relaxed">
                  <span className="text-foreground font-semibold">
                    The case against:{" "}
                  </span>
                  {concept.against}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-mist border-border flex items-center justify-center gap-4 rounded-2xl border p-10">
                    <concept.Component className="size-16" />
                    <span className="font-heading text-xl font-extrabold tracking-tight">
                      Ushine
                    </span>
                  </div>
                  <div className="bg-ink flex items-center justify-center gap-4 rounded-2xl p-10">
                    <concept.Component className="size-16" />
                    <span className="text-ink-foreground font-heading text-xl font-extrabold tracking-tight">
                      Ushine
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Favicon legibility: 32, 24 and 16px, the real sizes. */}
                  <div className="bg-mist border-border flex items-center justify-center gap-5 rounded-2xl border p-6">
                    <concept.Component className="size-8" />
                    <concept.Component className="size-6" />
                    <concept.Component className="size-4" />
                    <span className="text-muted-foreground text-xs">
                      32 / 24 / 16px
                    </span>
                  </div>
                  {/* One colour: van decals, invoices, embroidery. */}
                  <div className="text-deep-teal border-border flex items-center justify-center gap-5 rounded-2xl border bg-white p-6">
                    <concept.Component className="size-10" mono />
                    <concept.Component className="size-6" mono />
                    <span className="text-muted-foreground text-xs">
                      One colour
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Lockup"
          title="The full lockup, as it appears in the header"
          description="Concept A, running in adaptive tone: the large sparkle inherits whatever colour is legible on the surface behind it, and the lime accent stays constant. Aqua measures 2.2:1 on the mist canvas, so a fixed-aqua mark would read washed out in the light header. Changing direction is a one-line edit in components/logo.tsx."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="bg-mist border-border flex items-center justify-center rounded-3xl border p-14">
            <Logo />
          </div>
          <div className="bg-ink text-ink-foreground flex items-center justify-center rounded-3xl p-14">
            <Logo />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Colour"
          title="The palette, as CSS tokens"
          description="Every component reads these variables, so changing a brand colour is a one-line edit in app/globals.css. Contrast ratios below are measured, not estimated."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((swatch) => (
            <div
              key={swatch.token}
              className="border-border overflow-hidden rounded-2xl border"
            >
              <div className={`${swatch.className} h-28`} />
              <div className="flex flex-col gap-2 bg-white p-5">
                <p className="font-semibold">{swatch.name}</p>
                <code className="text-muted-foreground font-mono text-xs">
                  {swatch.token} · {swatch.hex}
                </code>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {swatch.use}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
