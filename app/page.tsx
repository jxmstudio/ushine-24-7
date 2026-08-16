import type { Metadata } from "next";

import { Hero } from "@/components/hero";
import {
  AreasSection,
  AvailabilityBar,
  BeforeAfterSection,
  ContractBand,
  CtaBand,
  EnquirySection,
  FaqSection,
  ServicesSection,
  StepsSection,
  TrustSection,
} from "@/components/home-sections";
import { TwentyFourSevenDivider } from "@/components/twenty-four-seven";
import { JsonLd } from "@/components/json-ld";
import { generalFaqs } from "@/data/faqs";
import { faqSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Cleaning Services Sydney, Available 24/7`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Homepage section order follows the "Always On" brief: prove availability
 * immediately, show the work, then ask. The 24/7 divider recurs between the
 * major movements so the one thing that differentiates this business from every
 * other Sydney cleaner is never more than a screen away.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityBar />
      <ServicesSection />
      <ContractBand />
      <BeforeAfterSection />
      <TwentyFourSevenDivider />
      <StepsSection />
      <TrustSection />
      <AreasSection />
      <FaqSection
        faqs={generalFaqs}
        description="If yours is not here, call us — we would rather answer it now than have you guess."
      />
      <EnquirySection />
      <CtaBand />
      <JsonLd data={faqSchema(generalFaqs)} />
    </>
  );
}
