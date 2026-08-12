"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { mainNav, site } from "@/data/site";
import { services } from "@/data/services";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close on tap, before the route change unmounts anything. Relying on the
  // sheet's own close-on-navigate left the overlay (and Radix's
  // pointer-events lock on <body>) in place if navigation won the race,
  // which made the next page look frozen.
  const close = () => setOpen(false);

  // Belt and braces: if a navigation ever outruns the close animation, Radix
  // can leave `pointer-events: none` on <body> and the whole next page stops
  // responding to taps. Clear it on every route change.
  React.useEffect(() => {
    document.body.style.pointerEvents = "";
  }, [pathname]);

  return (
    // Keyed on the route: Radix keeps the panel mounted until its exit
    // animation fires `animationend`, and a frozen or interrupted animation
    // leaves a full-screen, still-clickable overlay sitting over the next
    // page. Remounting on navigation throws that away regardless.
    <Sheet key={pathname} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className="sr-only">
          Site navigation and contact options
        </SheetDescription>

        <nav className="flex flex-col gap-1 overflow-y-auto px-4">
          {mainNav.map((item) => (
            <SheetClose key={item.href} asChild>
              <Link
                href={item.href}
                onClick={close}
                className="hover:bg-muted rounded-lg px-3 py-3 text-base font-medium"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}

          <span className="text-muted-foreground mt-4 px-3 text-xs font-semibold tracking-widest uppercase">
            Services
          </span>
          {services.map((service) => (
            <SheetClose key={service.slug} asChild>
              <Link
                href={`/services/${service.slug}`}
                onClick={close}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2.5 text-sm"
              >
                {service.title}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t p-4">
          <Button asChild size="xl" variant="brand">
            <Link href="/quote" onClick={close}>
              Get a free quote
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <a href={site.phoneHref}>
              <Phone /> {site.phone}
            </a>
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            {site.callWindow}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
