import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { mainNav, site } from "@/data/site";
import { services } from "@/data/services";
import { suburbs } from "@/data/suburbs";

/**
 * Footer. The wordmark is set oversized across the bottom as a graphic element
 * rather than repeated at nav size — the client asked for the name to be more
 * prominent, and this is the cheapest place on the site to give him that.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground mt-auto overflow-hidden">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-ink-foreground/70 max-w-xs leading-relaxed">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="text-lime text-xs font-bold tracking-[0.18em] uppercase">
              Services
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-ink-foreground/70 hover:text-lime transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lime text-xs font-bold tracking-[0.18em] uppercase">
              Areas we service
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {suburbs.slice(0, 6).map((suburb) => (
                <li key={suburb.slug}>
                  <Link
                    href={`/areas/${suburb.slug}`}
                    className="text-ink-foreground/70 hover:text-lime transition-colors"
                  >
                    Cleaners in {suburb.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-lime font-semibold transition-colors hover:underline"
                >
                  All Sydney areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lime text-xs font-bold tracking-[0.18em] uppercase">
              Contact
            </h3>
            {/* NAP block — kept consistent with Google Business Profile */}
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="hover:text-lime flex items-center gap-3 text-lg font-semibold transition-colors"
                >
                  <Phone className="text-lime size-4 shrink-0" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-lime flex items-center gap-3 text-sm transition-colors"
                >
                  <Mail className="text-lime size-4 shrink-0" /> {site.email}
                </a>
              </li>
              <li className="text-ink-foreground/70 flex items-center gap-3 text-sm">
                <MapPin className="text-lime size-4 shrink-0" />
                {site.baseSuburb}, {site.addressRegion} — servicing all Sydney
              </li>
              <li className="text-ink-foreground/70 flex items-center gap-3 text-sm">
                <Clock className="text-lime size-4 shrink-0" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-foreground/60">
            © {new Date().getFullYear()} {site.legalName}
            {site.abn ? ` · ABN ${site.abn}` : ""}. All rights reserved.
          </p>
          <nav className="text-ink-foreground/60 flex flex-wrap gap-x-5 gap-y-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-lime transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="hover:text-lime transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-lime transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </Container>

      {/* Oversized wordmark. Decorative — the accessible name is in the lockup
          at the top of the footer, so this is hidden from assistive tech. */}
      <div aria-hidden className="select-none">
        <p className="font-heading text-ink-foreground/10 -mb-[0.18em] px-4 text-center text-[clamp(4rem,17vw,15rem)] leading-none font-extrabold tracking-tighter whitespace-nowrap">
          Ushine <span className="text-lime/20">24/7</span>
        </p>
      </div>
    </footer>
  );
}
