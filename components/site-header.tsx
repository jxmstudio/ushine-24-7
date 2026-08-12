import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { mainNav, site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {/* Availability strip — the 24/7 promise, visible on every page */}
      <div className="bg-ink text-ink-foreground hidden text-xs md:block">
        <Container className="flex h-9 items-center justify-between">
          <p className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="text-brand size-3.5" /> {site.hours}
            </span>
            <span className="flex items-center gap-1.5 opacity-80">
              <MapPin className="size-3.5" /> {site.serviceArea}
            </span>
          </p>
          <a
            href={site.phoneHref}
            className="hover:text-brand flex items-center gap-1.5 font-medium transition-colors"
          >
            <Phone className="size-3.5" /> {site.phone}
          </a>
        </Container>
      </div>

      <div className="bg-background/85 border-b backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="lg" className="max-lg:hidden">
              <a href={site.phoneHref}>
                <Phone /> {site.phone}
              </a>
            </Button>
            <Button asChild variant="brand" size="lg" className="max-sm:hidden">
              <Link href="/quote">Get a free quote</Link>
            </Button>
            <Button asChild variant="brand" size="icon-lg" className="sm:hidden" aria-label="Call now">
              <a href={site.phoneHref}>
                <Phone />
              </a>
            </Button>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
