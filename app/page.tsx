import type { Metadata } from "next";

import { Hero } from "@/components/hero";
import {
  AreasSection,
  ContractBand,
  CtaBand,
  FaqSection,
  ServicesSection,
  StepsSection,
  WhyUsSection,
} from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { generalFaqs } from "@/data/faqs";
import { faqSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Cleaning Services Sydney, Available 24/7`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ContractBand />
      <StepsSection />
      <WhyUsSection />
      <AreasSection />
      <FaqSection
        faqs={generalFaqs}
        description="If yours is not here, call us — we would rather answer it now than have you guess."
      />
      <CtaBand />
      <JsonLd data={faqSchema(generalFaqs)} />
    </>
  );
}
