import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { blurProps, pageImages, type SiteImage } from "@/data/images";

/**
 * Inner-page hero.
 *
 * Always backed by a photograph. A heading on a flat colour band is the exact
 * "office-type" pattern this rebuild exists to get away from, and it is just as
 * wrong at page level as it is on the homepage — so the image is not optional
 * here, only which image.
 *
 * Two scrims, not one: a vertical wash to anchor the bottom edge where the
 * type sits, and a horizontal one to keep the text column legible over a
 * bright frame. Both in deep teal — a black wash makes any interior look grey.
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
    <section className="bg-deep-teal relative isolate flex min-h-[62svh] items-end overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        {...blurProps(photo)}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "linear-gradient(to top, rgba(6,55,60,0.88), rgba(6,55,60,0.34) 52%, rgba(6,55,60,0.12))",
            "linear-gradient(to right, rgba(6,55,60,0.82), rgba(6,55,60,0.42) 42%, rgba(6,55,60,0) 72%)",
          ].join(", "),
        }}
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
              <span aria-hidden className="bg-lime h-px w-8 opacity-80" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-mist text-display-sm font-semibold">{title}</h1>
          {description ? (
            <p className="text-mist/80 max-w-[52ch] text-lg leading-relaxed">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
