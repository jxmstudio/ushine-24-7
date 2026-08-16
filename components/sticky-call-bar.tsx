import Link from "next/link";
import { Phone } from "lucide-react";

import { site } from "@/data/site";

/**
 * Mobile-only sticky bottom bar: Call | Get a quote.
 *
 * Most cleaning enquiries come from a phone, mid-scroll, and the decision is
 * made on availability. Keeping both actions permanently in the thumb zone is
 * worth more than any section on the page.
 *
 * Layout clears the bar via `max-lg:pb-*` on <body> in app/layout.tsx, and the
 * bar itself pads for the iOS home indicator.
 */
export function StickyCallBar() {
  return (
    <div className="border-deep-teal/15 bg-mist/95 fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={site.phoneHref}
          className="bg-deep-teal text-mist focus-visible:ring-ring/50 flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold focus-visible:ring-3 focus-visible:outline-none"
        >
          <Phone className="size-4" />
          Call now
        </a>
        <Link
          href="/quote"
          className="bg-lime text-ink focus-visible:ring-ring/50 flex h-12 items-center justify-center rounded-xl text-sm font-bold focus-visible:ring-3 focus-visible:outline-none"
        >
          Get a free quote
        </Link>
      </div>
    </div>
  );
}
