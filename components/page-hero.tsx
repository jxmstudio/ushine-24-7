import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { pageImages, type SiteImage } from "@/data/images";

/**
 * Inner-page hero.
 *
 * Always backed by a photograph. A heading on a flat colour band is the exact
 * "office-type" pattern this rebuild exists to get away from, and it is just as
 * wrong at page level as it is on the homepage — so the image is not optional
 * here, only which image.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
  /** Explicit image, or a key into `pageImages`. Falls back to the services shot. */
  image?: SiteImage | string;
  children?: React.ReactNode;
}) {
  const photo =
    typeof image === "string"
      ? (pageImages[image] ?? pageImages.services)
      : (image ?? pageImages.services);

  return (
    <section className="relative isolate flex min-h-[58svh] items-end overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="from-deep-teal via-deep-teal/65 absolute inset-0 -z-10 bg-gradient-to-tr to-transparent"
      />

      <Container className="w-full pt-16 pb-14 sm:pb-20">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="text-mist/60 flex flex-wrap items-center gap-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 opacity-50" />
                  ) : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-mist/90">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-lime transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow ? (
            <span className="text-lime inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.18em] uppercase">
              <span className="bg-lime h-px w-8" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-mist text-display-sm font-extrabold">{title}</h1>
          {description ? (
            <p className="text-mist/80 text-lg leading-relaxed">{description}</p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
