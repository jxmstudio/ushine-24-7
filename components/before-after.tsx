"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { blurProps, type SiteImage } from "@/data/images";

/**
 * Before / after comparison slider.
 *
 * The control is a real `<input type="range">` stretched invisibly across the
 * frame rather than a div with pointer handlers. That buys keyboard operation,
 * screen-reader announcement and native touch dragging for free, and it is
 * genuinely hard to get all three right by hand.
 *
 * The "before" image is clipped from the right so the divider position and the
 * slider value are the same number, which keeps the maths readable.
 */
export function BeforeAfter({
  before,
  after,
  caption,
  className,
}: {
  before: SiteImage;
  after: SiteImage;
  /** What the job was — shown under the frame. */
  caption: string;
  className?: string;
}) {
  const [position, setPosition] = React.useState(50);

  return (
    <figure className={cn("flex flex-col gap-4", className)}>
      <div className="group bg-ink relative aspect-4/3 w-full overflow-hidden sm:aspect-3/2">
        {/* After (the result) is the base layer, so it is what remains if
            anything above it fails to paint. */}
        <Image
          src={after.src}
          alt={after.alt}
          {...blurProps(after)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
            className="object-cover"
          />
        </div>

        <span className="bg-ink/75 text-mist absolute top-3 left-3 rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
          Before
        </span>
        <span className="bg-lime text-ink absolute top-3 right-3 rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-[0.12em] uppercase">
          After
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Reveal the clean result: ${caption}`}
          aria-valuetext={`${position}% before, ${100 - position}% after`}
          className="peer absolute inset-0 z-20 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        {/* Divider and grab handle. Purely visual — the input above owns all
            interaction, so this is hidden from assistive tech. */}
        <div
          aria-hidden
          className="peer-focus-visible:ring-lime pointer-events-none absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white peer-focus-visible:ring-4"
          style={{ left: `${position}%` }}
        >
          <span className="bg-lime text-ink absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-bold shadow-lg">
            <ArrowsIcon />
          </span>
        </div>
      </div>

      <figcaption className="text-muted-foreground text-sm">
        <span className="text-foreground font-semibold">{caption}</span>
        <span className="sr-only">
          {" "}
          — drag the slider, or focus it and use the arrow keys, to compare
          before and after.
        </span>
      </figcaption>
    </figure>
  );
}

function ArrowsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M9 7 4 12l5 5M15 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
