# Ushine 24/7 — Website Build Plan

**Source:** Client questionnaire (`Website questionair.docx`), Section 2 + Section 3.
**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · shadcn/ui · Vercel

## Status — phases 0–7 built

All 37 routes build and prerender statically; lint and typecheck are clean. The
enquiry form has been tested end to end (validation → server action → redirect).
See [README.md](README.md) for the file map and the pre-launch checklist.

Deviations from the plan below, all deliberate:

- **Next 16**, not 15 — that is what `create-next-app` installs now.
- shadcn's `form` component no longer exists in this registry; the form is built
  on `field` + react-hook-form + zod, which is the current idiom.
- Resend is called over `fetch` rather than adding the SDK — one less dependency.
- Testimonials are **not** built as a placeholder section. Inventing reviews for
  a business with none is a legal and trust risk; the section goes in when real
  reviews exist.
- Email delivery is wired but **not configured** — no API key or mailbox yet.
  Enquiries validate and log server-side. This is the one true launch blocker.

---

## 1. Brief (extracted from questionnaire)

| Item | Detail |
|---|---|
| Business name | Ushine 24/7 |
| Type | Cleaning services, brand new business |
| Ideal customers | Residential (primary), commercial, Airbnb / short-stay, end-of-tenancy |
| Key selling point | Around the clock — genuinely available 24/7 |
| Push hardest | Residential cleaning + **weekly cleaning contracts** |
| Service area | Based Western Sydney, services all of Sydney |
| Brand | No logo, no colour scheme — "design something according to the trend" |
| Photos | None supplied — placeholder/stock until client sends real ones |
| Contact preference | Phone, email, and enquiry form (all three) |
| Best time to call | 24/7 |
| Enquiry form fields | Name, phone, suburb, which cleaning service they need |
| Domain ideas | ushine247 / shine247 / vshine247 |
| References | None given — free design hand |

### Open items (assumed, flag for client)
1. **Contact details** — questionnaire says "same as above", which is the Yireh phone/email (`0410 288 829`, `info@yirehstitchtech.com`). Assumption: reuse the phone number, but register a Ushine domain + `info@ushine247.com.au`. Needs confirmation before launch.
2. **Pricing** — assumption: quote-only, no rates published ("From $X" band optional later).
3. **Trust signals** — ABN, public liability insurance, police-checked cleaners, bond-back guarantee. All are conversion-critical for cleaning sites; ask client which are true and only publish those.
4. **Photos** — licensed stock (Unsplash/Pexels) with a clear swap path once client's real photos arrive.

---

## 2. Brand direction (proposed)

Modern service-brand look, not the dated "blue bubbles + sparkle clipart" cleaning aesthetic.

- **Palette:** deep midnight navy (`--primary`) + a bright cyan/teal accent (`--accent`) for the "24/7 / always on" feel, warm off-white surfaces, single high-contrast CTA colour. Dark section bands for the 24/7 messaging.
- **Type:** Geist or Inter for UI, a tighter display weight for hero headings (via `next/font`, self-hosted).
- **Logo:** wordmark "Ushine" + "24/7" lockup; the U doubles as a shine/arc mark. Deliver as SVG in 3 lockups (horizontal, stacked, favicon mark) — I can draft 3 options for the client to pick.
- **Motion:** restrained — fade/slide on scroll, no parallax circus.
- Encoded as CSS variables in `globals.css` using shadcn's token names so every component inherits the brand automatically.

---

## 3. Site map

```
/                        Home
/services                Services overview
/services/[slug]         residential · commercial · airbnb-short-stay ·
                         end-of-tenancy-bond · weekly-contracts
/areas                   Areas we service (Sydney)
/areas/[suburb]          Programmatic suburb pages (local SEO)
/about                   Who we are / why 24/7
/contact                 Phone, email, enquiry form, hours
/quote                   Get a free quote (form-first landing page)
/privacy  /terms         Legal
```

Suburb pages generated from a data file (`data/suburbs.ts`) — start with ~15 Western Sydney suburbs (Penrith, Blacktown, Parramatta, St Marys, Kingswood, Mount Druitt, Castle Hill, Liverpool …) plus Sydney-wide. Static-generated, unique intro copy per suburb, no thin-content spam.

---

## 4. Page composition

**Home**
1. Sticky header — logo, nav, phone number always visible, "Get a Quote" button
2. Hero — headline (`Sydney cleaners, on call 24/7`), sub, dual CTA (Call / Get free quote), 24-7 badge, trust strip
3. Services grid — 5 cards, residential first and visually largest
4. **Weekly cleaning contracts** band — dedicated dark section, the second revenue push
5. How it works — 3 steps (Call or enquire → Free quote → We clean)
6. Why choose us — 24/7, insured, all Sydney, no lock-in, bond-back
7. Areas we service — suburb chips linking to suburb pages
8. Testimonials — placeholder shell, hidden until real reviews exist (no fake reviews)
9. FAQ — accordion, doubles as FAQPage schema
10. Final CTA + footer with NAP (name/address/phone) for local SEO

**Service pages** — hero, what's included checklist, who it suits, pricing/quote CTA, FAQ, related services.
**Contact/Quote** — form left, contact card + hours + service-area map right.

---

## 5. Components

shadcn/ui primitives to install:
`button card input textarea select label form accordion badge sheet navigation-menu separator sonner dialog checkbox radio-group tabs skeleton avatar`

Custom composed components (`components/`):
`site-header` `mobile-nav` `site-footer` `hero` `service-card` `services-grid` `contract-cta` `steps` `feature-grid` `suburb-chips` `testimonial-card` `faq-accordion` `cta-band` `quote-form` `section` `container`

---

## 6. Enquiry form

- `react-hook-form` + `zod` + shadcn `<Form>`.
- Fields: **Name*, Phone*, Email, Suburb*, Service needed* (select: Residential / Commercial / Airbnb / End of tenancy / Weekly contract / Other), Preferred date, Message**, plus honeypot.
- Submit → Next.js **Server Action** → validate server-side → send via **Resend** to `info@ushine247…` + auto-reply to customer → `sonner` toast + `/thank-you` for conversion tracking.
- Spam: honeypot + timing check + rate limit by IP. Cloudflare Turnstile if spam appears.
- Every enquiry also appended to a simple store (Vercel KV or a `submissions` table) so nothing is lost if email bounces.

---

## 7. SEO / local

- Metadata API per route, `generateMetadata` for dynamic service + suburb pages.
- JSON-LD: `LocalBusiness` (with `areaServed`, `openingHours 24/7`, geo, phone), `Service`, `FAQPage`, `BreadcrumbList`.
- `sitemap.ts`, `robots.ts`, canonical URLs, OG images via `opengraph-image.tsx`.
- Target queries: "cleaners Western Sydney", "end of lease cleaning Penrith", "24/7 cleaning Sydney", "Airbnb cleaning Sydney".
- Google Business Profile setup (client action) — the single biggest local-SEO lever, note in handover doc.
- Perf budget: LCP < 2.0s, `next/image` everywhere, static rendering for all marketing pages.

---

## 8. Build order

| Phase | Work | Output |
|---|---|---|
| 0 | `create-next-app` (TS, Tailwind v4, App Router), shadcn init, fonts, tokens, folder structure | Running skeleton |
| 1 | Logo drafts (3 SVG options) + colour tokens + header/footer/container primitives | Brand locked |
| 2 | Home page, all sections, responsive | Reviewable homepage |
| 3 | Services overview + 5 service pages from `data/services.ts` | Content complete |
| 4 | Quote/Contact pages + form + Resend wiring + thank-you | Leads flowing |
| 5 | Areas index + suburb pages, sitemap, schema, metadata | SEO complete |
| 6 | About, privacy, terms, 404, accessibility pass (keyboard, contrast, labels), Lighthouse | Polish |
| 7 | Deploy to Vercel, domain + email DNS, analytics (Vercel Analytics + GA4), form test | Live |

Content is authored in typed data files (`data/services.ts`, `data/suburbs.ts`, `data/faqs.ts`) so copy edits never require touching JSX — and it's a clean upgrade path to a CMS later if the client wants to self-edit.

---

## 9. Proposed structure

```
app/
  layout.tsx  page.tsx  globals.css
  services/page.tsx  services/[slug]/page.tsx
  areas/page.tsx  areas/[suburb]/page.tsx
  about/  contact/  quote/  thank-you/  privacy/  terms/
  sitemap.ts  robots.ts  opengraph-image.tsx
components/  ui/ (shadcn)  + custom components
data/        services.ts  suburbs.ts  faqs.ts  site.ts (NAP, hours, socials)
lib/         utils.ts  schema.ts (JSON-LD)  validations.ts  email.ts
public/      logo/  images/
actions/     submit-enquiry.ts
```

`data/site.ts` holds phone, email, ABN, address, hours in one place — every mention on the site reads from it, so a contact change is a one-line edit.

---

## 10. Deliverables

Live site on Vercel · 3 logo concepts + final SVG set · brand token sheet · handover doc (how to edit copy, where enquiries go, Google Business Profile steps) · photo swap checklist for when the client's real images arrive.
