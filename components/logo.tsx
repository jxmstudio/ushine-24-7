import { cn } from "@/lib/utils";

/**
 * Concept A (current): the "U" drawn as an open arc — a wipe stroke — with a
 * shine spark breaking off the top right. Tile gradient runs navy → cyan.
 * Two alternate concepts live in components/logo-concepts.tsx for client review.
 */
export function LogoMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Ushine 24/7"
      className={cn("size-9", className)}
      {...props}
    >
      <defs>
        <linearGradient id="ushine-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#ushine-mark)" />
      <path
        d="M15 14v11.5a9 9 0 0 0 18 0V14"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M33.5 10.5c.4 2.6 1.4 3.6 4 4-2.6.4-3.6 1.4-4 4-.4-2.6-1.4-3.6-4-4 2.6-.4 3.6-1.4 4-4Z"
        fill="white"
      />
    </svg>
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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight">Ushine</span>
        {/* The badge uses currentColor: the lockup sits on both the light
            header and the dark footer, so it inherits whatever is legible. */}
        {showBadge ? (
          <span className="rounded-md border border-current/35 px-1.5 py-0.5 text-[0.65rem] leading-none font-bold tracking-wide opacity-80">
            24/7
          </span>
        ) : null}
      </span>
    </span>
  );
}
