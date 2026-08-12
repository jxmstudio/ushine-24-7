import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { images } from "@/data/images";
import { site, trustPoints } from "@/data/site";

export function Hero() {
  return (
    <section className="bg-ink text-ink-foreground bg-brand-glow relative overflow-hidden">
      <Container className="relative py-12 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col items-start gap-6 sm:gap-7">
            <span className="border-brand/30 bg-brand/10 text-brand inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide">
              <span className="relative flex size-2">
                <span className="bg-brand absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-brand relative inline-flex size-2 rounded-full" />
              </span>
              Answering calls right now — 24 hours, 7 days
            </span>

            <h1 className="text-[2.1rem] leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
              Sydney cleaners,{" "}
              <span className="text-brand">on call 24/7</span>
            </h1>

            <p className="text-ink-foreground/75 max-w-xl text-base leading-relaxed sm:text-lg">
              Homes, offices, Airbnbs and end-of-lease cleans across Sydney.
              Based in {site.baseRegion}, working the hours that suit you —
              including nights, weekends and public holidays.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="xl" variant="brand">
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

            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="text-ink-foreground/80 flex items-start gap-2 text-sm"
                >
                  <CheckCircle2 className="text-brand mt-0.5 size-4 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Photo, with the availability promise floated over it. */}
          <div className="relative">
            <div className="bg-brand/10 absolute -inset-4 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/12 sm:aspect-3/2 lg:aspect-4/5">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="from-ink/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>

            <div className="bg-ink/85 relative -mt-16 mr-4 ml-4 rounded-2xl border border-white/12 p-6 backdrop-blur-md sm:mr-8 sm:ml-8">
              <div className="flex items-center gap-3">
                <span className="bg-brand/15 text-brand flex size-10 items-center justify-center rounded-xl">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Always open</p>
                  <p className="text-ink-foreground/60 text-xs">
                    No answering machine, no waiting until Monday
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-5">
                {[
                  { k: "24/7", v: "Phone answered, any hour" },
                  { k: "Same day", v: "Urgent cleans, where we can" },
                  { k: "All Sydney", v: "Metro and Western Sydney" },
                  { k: "Fixed price", v: "Quoted before we start" },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="text-brand text-xl font-semibold">
                      {item.k}
                    </dt>
                    <dd className="text-ink-foreground/60 mt-1 text-sm leading-snug">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
