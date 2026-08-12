import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink text-ink-foreground bg-brand-glow">
      <Container className="py-10 sm:py-16 lg:py-20">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="text-ink-foreground/60 flex flex-wrap items-center gap-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 opacity-50" />
                  ) : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-foreground/90">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-brand transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex max-w-3xl flex-col gap-4 sm:gap-5">
          {eyebrow ? (
            <span className="text-brand text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-[1.85rem] leading-[1.12] font-semibold sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-ink-foreground/75 text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
