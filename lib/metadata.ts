import type { Metadata } from "next";

import { site } from "@/data/site";

/**
 * Per-page metadata with the Open Graph and Twitter blocks filled in.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's block wholesale, including the file-based opengraph-image, and a
 * page that sets none inherits the homepage's `og:url` and titles. Either way
 * the link preview is wrong, so every page builds the full block from here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  /** Page title, without the site name — the layout's template appends it. */
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/services". */
  path: string;
  /** Use `title` verbatim, skipping the "| Ushine 24/7" suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} — Cleaning services across Sydney, available 24/7`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
