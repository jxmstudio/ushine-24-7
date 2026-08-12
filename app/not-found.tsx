import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-brand-strong text-sm font-semibold tracking-[0.14em] uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        That page has been cleaned away
      </h1>
      <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
        The link is broken or the page has moved. Try our services, or just call
        us — we answer 24/7.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="xl" variant="brand">
          <Link href="/services">See our services</Link>
        </Button>
        <Button asChild size="xl" variant="outline">
          <a href={site.phoneHref}>
            <Phone /> {site.phone}
          </a>
        </Button>
      </div>
    </Container>
  );
}
