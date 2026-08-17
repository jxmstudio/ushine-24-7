import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { blurProps, serviceImages } from "@/data/images";
import type { Service } from "@/data/services";

/**
 * A service, shown as a photograph.
 *
 * Sharp-cornered and full-bleed within its grid cell — the tiles sit against
 * each other with hairline gutters, so any radius reads as a rendering error.
 * The whole tile is the image, the whole tile is the link, and there is no
 * icon — a picture of a finished kitchen tells someone what "residential
 * cleaning" means faster than a house glyph in a rounded square ever will.
 */
export function ServiceTile({
  service,
  index,
  featured = false,
  className,
}: {
  service: Service;
  /** Position in the grid, rendered as the 01–05 eyebrow. */
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const photo = serviceImages[service.slug];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group focus-visible:ring-lime bg-ink relative flex min-h-[22rem] flex-col justify-end overflow-hidden focus-visible:ring-4 focus-visible:outline-none lg:min-h-0",
        featured && "min-h-[28rem]",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          {...blurProps(photo)}
          fill
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,32,31,0.92),rgba(8,32,31,0.35)_48%,transparent_72%)]"
      />

      <div className="relative flex flex-col gap-2.5 p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 sm:p-8">
        <span className="text-lime inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em]">
          <span aria-hidden className="bg-lime h-px w-6 opacity-80" />
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className={cn(
            "text-mist font-semibold",
            featured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl",
          )}
        >
          {service.title}
        </h3>

        <p
          className={cn(
            "text-mist/75 leading-relaxed",
            featured ? "max-w-md text-base sm:text-lg" : "max-w-[34ch] text-sm",
          )}
        >
          {featured ? service.summary : service.tagline}
        </p>

        <span className="text-lime mt-1 inline-flex items-center gap-1.5 text-sm font-semibold">
          See what is included
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
