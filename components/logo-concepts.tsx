/**
 * Three logo directions for the client to choose from.
 * Concept A is currently live in components/logo.tsx — swapping is a one-file
 * change once a direction is picked. All three are vector, so they scale from
 * favicon to van signage without redrawing.
 */

/** A — "The wipe": the U drawn as an open arc with a shine spark. */
export function ConceptA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Concept A">
      <defs>
        <linearGradient id="concept-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#concept-a)" />
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

/** B — "Always on": a 24-hour ring with a break, U held inside it. */
export function ConceptB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Concept B">
      <circle cx="24" cy="24" r="23" fill="var(--primary)" />
      <path
        d="M24 6a18 18 0 1 1-12.7 5.3"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17 17v8.5a7 7 0 0 0 14 0V17"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** C — "The shine": solid monogram with a diagonal light sweep across it. */
export function ConceptC({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Concept C">
      <defs>
        <linearGradient id="concept-c" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
        <clipPath id="concept-c-clip">
          <rect width="48" height="48" rx="24" />
        </clipPath>
      </defs>
      <g clipPath="url(#concept-c-clip)">
        <rect width="48" height="48" fill="url(#concept-c)" />
        <path d="M-6 34 42 -14l9 9L-6 46Z" fill="white" opacity="0.16" />
        <path
          d="M16 15v10a8 8 0 0 0 16 0V15"
          fill="none"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export const logoConcepts = [
  {
    id: "A",
    name: "The wipe",
    note: "Open arc reads as both a U and a single clean stroke. The spark keeps it friendly without being cartoonish. Currently live on the site.",
    Component: ConceptA,
  },
  {
    id: "B",
    name: "Always on",
    note: "The broken ring reads as a 24-hour cycle — the clearest nod to the 24/7 promise. Strongest as a small icon or van decal.",
    Component: ConceptB,
  },
  {
    id: "C",
    name: "The shine",
    note: "Circular badge with a light sweep across it. The softest and most premium of the three; works well on dark photography.",
    Component: ConceptC,
  },
];
