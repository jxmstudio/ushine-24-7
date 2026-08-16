"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { mainNav, site } from "@/data/site";

/**
 * Header. On the homepage it floats transparent over the full-bleed hero and
 * turns solid after 80px of scroll; everywhere else it is solid from the start,
 * because the inner-page heroes are shorter and a floating bar over them reads
 * as a rendering bug rather than a choice.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const floating = overHero && !scrolled;

  return (
    <header
      className={cn(
        "top-0 z-40 transition-colors duration-300",
        // Fixed on the homepage so the hero photograph runs under it rather
        // than starting below it; sticky elsewhere, where it should take space.
        overHero ? "fixed inset-x-0" : "sticky",
      )}
    >
      {/* Availability strip — the 24/7 promise, on every page. Hidden while the
          header floats so the hero photograph starts at the very top. */}
      <div
        className={cn(
          "bg-deep-teal text-mist hidden text-xs md:block",
          floating && "md:hidden",
        )}
      >
        <Container className="flex h-10 items-center justify-between">
          <p className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <Clock className="text-lime size-3.5" /> {site.hours}
            </span>
            <span className="flex items-center gap-2 opacity-75">
              <MapPin className="size-3.5" /> {site.serviceArea}
            </span>
          </p>
          <a
            href={site.phoneHref}
            className="hover:text-lime flex items-center gap-2 font-semibold transition-colors"
          >
            <Phone className="size-3.5" /> {site.phone}
          </a>
        </Container>
      </div>

      <div
        className={cn(
          "transition-colors duration-300",
          floating
            ? "text-mist bg-transparent"
            : "text-foreground bg-mist/90 border-border border-b backdrop-blur-md",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="focus-visible:ring-ring/50 rounded-lg focus-visible:ring-3 focus-visible:outline-none"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  floating
                    ? "text-mist/85 hover:bg-white/12 hover:text-mist"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={floating ? "outline-inverse" : "outline"}
              size="lg"
              className="max-lg:hidden"
            >
              <a href={site.phoneHref}>
                <Phone /> {site.phone}
              </a>
            </Button>
            <Button asChild variant="lime" size="lg" className="max-sm:hidden">
              <Link href="/quote">Get a free quote</Link>
            </Button>
            <MobileNav floating={floating} />
          </div>
        </Container>
      </div>
    </header>
  );
}
