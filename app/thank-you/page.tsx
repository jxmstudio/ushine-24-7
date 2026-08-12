import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thanks — we have your enquiry",
  description: "Your enquiry has been sent to Ushine 24/7.",
  // Conversion page: useful for analytics goals, not for search results.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="bg-brand-soft text-primary flex size-16 items-center justify-center rounded-full">
        <CheckCircle2 className="size-8" />
      </span>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Thanks — we have your enquiry
      </h1>
      <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
        We will be in touch shortly with a fixed price. If you gave us an email
        address, a confirmation is on its way there too.
      </p>
      <p className="text-muted-foreground">
        In a hurry? Call us now — we answer 24 hours a day.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="xl" variant="brand">
          <a href={site.phoneHref}>
            <Phone /> {site.phone}
          </a>
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  );
}
