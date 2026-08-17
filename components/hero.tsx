"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { AlwaysOnBadge, TwentyFourSevenMark } from "@/components/twenty-four-seven";
import { blurProps, heroVideo, images } from "@/data/images";
import { site } from "@/data/site";

/**
 * Full-bleed hero.
 *
 * The photograph is the layout: it runs the whole viewport, the header floats
 * over it, and the type sits on the image rather than in a box beside it.
 *
 * The photo is the poster and the LCP element; the video mounts client-side
 * and fades in over it once it can play, so nothing is ever waiting on a 9MB
 * download to paint. Under prefers-reduced-motion the video is never mounted
 * at all — the still frame is the reduced experience, not a paused player.
 *
 * The scrim is deep teal rather than black so the bright, sunlit half of the
 * frame survives — the site has to look spotless, and a heavy black wash makes
 * any interior look grey.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = React.useState(false);

  // False on the server so the video is in the first HTML; visitors with
  // reduced motion drop it at hydration and keep the still photograph.
  const reduced = React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  // The element is in the server HTML, so the browser can fire `canplay`
  // before React hydrates and attaches the handler below — in which case the
  // video would sit fully loaded at opacity 0 forever. Catch up here, and give
  // playback a nudge in case the browser paused the pre-hydration autoplay.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) setVideoReady(true);
    video.play().catch(() => {
      // Autoplay refused — the poster photograph simply stays up.
    });
  }, [reduced]);

  return (
    <section className="bg-deep-teal relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        {...blurProps(images.hero)}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {!reduced ? (
        <video
          ref={videoRef}
          className={
            "absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 " +
            (videoReady ? "opacity-100" : "opacity-0")
          }
          src={heroVideo.src}
          poster={heroVideo.poster.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
        />
      ) : null}

      {/* Three scrims: one weighting the bottom-left where the type sits, one
          lifting the bottom edge, one taking the top so the floating header
          stays legible. Deliberately heavier than it looks like it needs to be
          — these frames are placeholders, and the client's own footage has to
          drop in behind this type without anyone re-tuning a gradient. */}
      <div
        aria-hidden
        className="from-deep-teal via-deep-teal/70 absolute inset-0 -z-10 bg-gradient-to-tr to-transparent"
      />
      <div
        aria-hidden
        className="from-deep-teal/85 absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t to-transparent"
      />
      <div
        aria-hidden
        className="from-deep-teal/80 absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b to-transparent"
      />

      <TwentyFourSevenMark className="absolute -right-6 bottom-24 -z-10 hidden lg:block" />

      <Container className="w-full pt-32 pb-16 sm:pb-20 lg:pt-40 lg:pb-28">
        <div className="flex max-w-4xl flex-col items-start gap-7 sm:gap-8">
          <AlwaysOnBadge />

          <h1 className="text-mist text-display font-semibold">
            Clean, <span className="text-lime">whenever</span> you need it.
          </h1>

          <p className="text-mist/85 max-w-xl text-lg leading-relaxed sm:text-xl">
            Homes, offices, Airbnbs and end-of-lease cleans across Sydney. Based
            in {site.baseRegion}, working the hours that suit you — nights,
            weekends and public holidays included.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="xl" variant="lime">
              <Link href="/quote">
                Get a free quote <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline-inverse">
              <a href={site.phoneHref}>
                <Phone /> {site.phone}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
