import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you book cleaning work with ${site.name}.`,
  alternates: { canonical: "/terms" },
};

/**
 * DRAFT — sensible defaults for a cleaning business. The client must confirm
 * cancellation windows, payment terms and the re-clean guarantee before launch,
 * and should have these reviewed.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        image="about"
        title="Terms of Service"
        description={`The terms that apply when you book cleaning work with ${site.legalName}.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms", href: "/terms" },
        ]}
      />

      <Section>
        <div className="text-muted-foreground mx-auto flex max-w-3xl flex-col gap-6 leading-relaxed">
          <p className="text-sm">Last updated: {new Date().getFullYear()}</p>

          <h2 className="text-foreground text-xl font-semibold">
            Quotes and pricing
          </h2>
          <p>
            Quotes are based on the information you give us about the property
            and the work required. If the job turns out to be substantially
            different from what was described, we will contact you and agree a
            revised price before continuing — we will not add charges without
            telling you first.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Bookings and access
          </h2>
          <p>
            You are responsible for providing access to the property at the
            agreed time, along with running water and electricity. If our
            cleaners cannot access the property at the booked time, a call-out
            fee may apply.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Cancellations and changes
          </h2>
          <p>
            Please give us at least 24 hours notice to cancel or reschedule a
            booking. Cancellations inside that window may be charged. Regular
            cleaning arrangements have no lock-in period and can be paused or
            ended with reasonable notice.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Our re-clean guarantee
          </h2>
          <p>
            If you are not satisfied with any part of a clean, contact us within
            48 hours and we will return and re-clean the affected areas at no
            charge.
          </p>

          <h2 className="text-foreground text-xl font-semibold">Payment</h2>
          <p>
            Payment is due on completion unless other terms have been agreed in
            writing. Regular and commercial clients are invoiced on an agreed
            cycle.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Liability and insurance
          </h2>
          <p>
            Our cleaners are insured. Please tell us in advance about delicate,
            valuable or antique items, and about surfaces that need particular
            products, so we can treat them appropriately. Nothing in these terms
            excludes rights you have under the Australian Consumer Law.
          </p>

          <h2 className="text-foreground text-xl font-semibold">Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-primary font-medium hover:underline"
            >
              {site.email}
            </a>{" "}
            or {site.phone}.
          </p>
        </div>
      </Section>
    </>
  );
}
