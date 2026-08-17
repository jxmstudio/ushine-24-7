import Image from "next/image";

import { cn } from "@/lib/utils";
import { blurProps, type SiteImage } from "@/data/images";

/**
 * Full-bleed band of working photographs — sharp rectangles butted together
 * with hairline gutters, running edge to edge of the viewport. Proof of work
 * as a layout element: four frames of hands, rooms and equipment say "we
 * actually do this" faster than any paragraph.
 *
 * Deliberately outside any Container. Two-up on mobile, all four across on
 * desktop.
 */
export function PhotoBand({
  photos,
  className,
}: {
  photos: SiteImage[];
  className?: string;
}) {
  if (photos.length === 0) return null;

  return (
    <div className={cn("grid grid-cols-2 gap-0.5 lg:grid-cols-4", className)}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="bg-ink relative aspect-4/5 overflow-hidden"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            {...blurProps(photo)}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
