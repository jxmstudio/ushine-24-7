import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { serviceImages } from "@/data/images";
import type { Service } from "@/data/services";

export function ServiceCard({
  service,
  featured = false,
  className,
}: {
  service: Service;
  featured?: boolean;
  className?: string;
}) {
  const Icon = service.icon;
  const photo = serviceImages[service.slug];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group bg-card hover:border-brand/50 focus-visible:ring-ring/50 relative flex flex-col overflow-hidden rounded-2xl border transition-all hover:shadow-lg focus-visible:ring-3 focus-visible:outline-none",
        className,
      )}
    >
      {photo ? (
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "aspect-3/2 lg:aspect-4/3" : "aspect-16/9",
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Icon badge sits on the photo so the service still reads at a glance */}
          <span className="bg-background/90 text-primary absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-xl backdrop-blur-sm">
            <Icon className="size-5" />
          </span>
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col gap-2 p-5 sm:p-6",
          featured && "sm:p-8",
        )}
      >
        <h3
          className={cn(
            "text-base font-semibold sm:text-lg",
            featured && "sm:text-xl lg:text-2xl",
          )}
        >
          {service.title}
        </h3>
        <p className="text-brand-strong text-xs font-semibold tracking-wide uppercase">
          {service.tagline}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.summary}
        </p>

        <span className="text-primary mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium">
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
