import { cn } from "@/lib/utils";
import { ConceptGleam } from "@/components/logo-concepts";

/**
 * The live mark: Concept A, "The Gleam" — see components/logo-concepts.tsx for
 * the other two directions and the argument against each.
 *
 * Runs in `adaptive` tone rather than the fixed aqua of the reviewed artwork.
 * The lockup has to sit on the light header, on the dark footer, and on the
 * hero photography while the header floats, and aqua measures 2.2:1 against the
 * mist canvas — soft enough to look washed out at 44px. Adaptive draws the
 * large sparkle in `currentColor` so it inherits whatever is legible, and keeps
 * the lime accent constant. Pass `tone="brand"` for the fixed-aqua version.
 *
 * Swapping direction is a one-line change here. The concepts themselves live in
 * logo-concepts.tsx so the /brand review page and the site never drift apart.
 *
 * Sized at 44px in the nav rather than the usual ~28px utility size: the client
 * asked specifically for a larger, more prominent name and mark, and a logo
 * scaled like a favicon is what made the last build feel anonymous.
 */
export function LogoMark({
  className,
  mono,
}: {
  className?: string;
  mono?: boolean;
}) {
  return (
    <ConceptGleam
      className={cn("size-11", className)}
      mono={mono}
      tone="adaptive"
    />
  );
}

export function Logo({
  className,
  showBadge = true,
}: {
  className?: string;
  showBadge?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex items-baseline gap-2">
        <span className="font-heading text-2xl font-semibold tracking-tight">
          Ushine
        </span>
        {/* The badge uses currentColor for its border so the lockup works on the
            light header and the dark footer without a second variant. */}
        {showBadge ? (
          <span className="rounded-md border border-current/35 px-1.5 py-1 text-[0.7rem] leading-none font-semibold tracking-wide">
            24/7
          </span>
        ) : null}
      </span>
    </span>
  );
}
