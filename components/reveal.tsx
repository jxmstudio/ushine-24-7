"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll reveal: opacity 0 -> 1 with a 24px rise, fired once when the element
 * crosses 15% into the viewport.
 *
 * Three things worth knowing:
 *  - The transition lives in globals.css (`.reveal` / `.reveal-in`), and the
 *    reduced-motion query there disables it. This component only adds a class,
 *    so there is no second place to forget the opt-out.
 *  - It toggles the class on the node directly rather than through state.
 *    Reveal wraps most sections on the page, and a setState per element as the
 *    user scrolls is a render cascade for something CSS can do alone.
 *  - If IntersectionObserver is missing the element is revealed on mount, and
 *    globals.css reveals it outright when scripting is unavailable. A missing
 *    animation is a nuisance; missing content is a broken page.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms, for siblings revealed together. */
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
