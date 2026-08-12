import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { mainNav, site } from "@/data/site";
import { services } from "@/data/services";
import { suburbs } from "@/data/suburbs";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground mt-auto">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-ink-foreground/70 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-ink-foreground/70 hover:text-brand transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Areas we service
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {suburbs.slice(0, 6).map((suburb) => (
                <li key={suburb.slug}>
                  <Link
                    href={`/areas/${suburb.slug}`}
                    className="text-ink-foreground/70 hover:text-brand transition-colors"
                  >
                    Cleaners in {suburb.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-brand font-medium transition-colors hover:underline"
                >
                  All Sydney areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Contact
            </h3>
            {/* NAP block — kept consistent with Google Business Profile */}
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="hover:text-brand flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Phone className="text-brand size-4 shrink-0" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-brand flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="text-brand size-4 shrink-0" /> {site.email}
                </a>
              </li>
              <li className="text-ink-foreground/70 flex items-center gap-2.5">
                <MapPin className="text-brand size-4 shrink-0" />
                {site.baseSuburb}, {site.addressRegion} — servicing all Sydney
              </li>
              <li className="text-ink-foreground/70 flex items-center gap-2.5">
                <Clock className="text-brand size-4 shrink-0" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-foreground/60">
            © {new Date().getFullYear()} {site.legalName}
            {site.abn ? ` · ABN ${site.abn}` : ""}. All rights reserved.
          </p>
          <nav className="text-ink-foreground/60 flex flex-wrap gap-x-5 gap-y-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="hover:text-brand transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
