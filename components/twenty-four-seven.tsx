import { cn } from "@/lib/utils";

/**
 * The "24/7" graphic device.
 *
 * Availability is the whole proposition, so rather than saying it once in the
 * hero and trusting people to remember, the numerals recur as a mark: oversized,
 * lime, tilted off-axis. It is what stops the site reading as a generic cleaning
 * template, and it is why there is no icon anywhere near it.
 *
 * All three variants are decorative and hidden from assistive tech — the
 * availability claim is stated in real prose in the availability bar, the hero
 * and the footer.
 */

/** Single tilted numeral pair. Alternates solid and outlined down a run. */
function Numerals({
  outlined = false,
  className,
}: {
  outlined?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-heading inline-block shrink-0 rotate-[-4deg] leading-none font-extrabold tracking-tight",
        outlined ? "text-stroke-lime" : "text-lime",
        className,
      )}
    >
      24/7
    </span>
  );
}

/**
 * Full-bleed divider band. Sits between sections to reset the eye and carry the
 * brand through the scroll. The row scrolls continuously and pauses on hover;
 * it is duplicated so the -50% translate loops seamlessly.
 */
export function TwentyFourSevenDivider({
  className,
  label = "Available 24 hours a day, 7 days a week",
}: {
  className?: string;
  /** Screen-reader text, since the numerals themselves are decorative. */
  label?: string;
}) {
  const run = Array.from({ length: 6 });

  return (
    <div
      className={cn(
        "bg-deep-teal pause-on-hover relative overflow-hidden py-7 sm:py-9",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <div
        aria-hidden
        className="animate-marquee flex w-max items-center gap-10 sm:gap-16"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
          >
            {run.map((_, index) => (
              <span key={index} className="flex items-center gap-10 sm:gap-16">
                <Numerals
                  outlined={index % 2 === 1}
                  className="text-[2.75rem] sm:text-6xl lg:text-7xl"
                />
                <span className="bg-aqua size-2 shrink-0 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Oversized watermark, positioned by the caller. Used to weight the corner of a
 * band without adding another block of copy.
 */
export function TwentyFourSevenMark({
  className,
  outlined = true,
}: {
  className?: string;
  outlined?: boolean;
}) {
  return (
    <span aria-hidden className={cn("pointer-events-none select-none", className)}>
      <Numerals
        outlined={outlined}
        className="text-[7rem] opacity-70 sm:text-[11rem] lg:text-[15rem]"
      />
    </span>
  );
}

/**
 * The small live badge. Reads as a status light rather than a label — the point
 * is that someone is awake right now, not that the business has hours.
 */
export function AlwaysOnBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "bg-lime text-ink inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] uppercase",
        className,
      )}
    >
      <span className="relative flex size-2">
        <span className="bg-ink absolute inline-flex size-full animate-ping rounded-full opacity-50" />
        <span className="bg-ink relative inline-flex size-2 rounded-full" />
      </span>
      Open now · 24/7
    </span>
  );
}
