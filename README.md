# Ushine 24/7

Marketing site for Ushine 24/7, a Sydney cleaning business. Next.js 16 (App
Router) · Tailwind v4 · shadcn/ui · TypeScript.

```bash
npm run dev     # dev server
npm run build   # production build (all pages prerender statically)
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `data/site.ts` | Phone, email, address, hours, nav. **Every** mention on the site reads from here. |
| `data/services.ts` | The five services — copy, checklists, per-service FAQs, form labels. |
| `data/suburbs.ts` | Suburb pages. Adding an entry generates a new page, sitemap row and footer link. |
| `data/faqs.ts` | Home-page FAQ (also emitted as FAQPage structured data). |
| `data/images.ts` | Every photo on the site, in one map. Swap a `src` and the page updates. |
| `app/globals.css` | Brand colour tokens. Changing `--primary` / `--brand` re-themes the whole site. |
| `components/logo.tsx` | Live logo. Alternatives in `components/logo-concepts.tsx`. |
| `actions/submit-enquiry.ts` | Enquiry server action — validation, honeypot, rate limit. |
| `lib/email.ts` | Resend delivery + customer auto-reply. |
| `lib/schema.ts` | JSON-LD builders (LocalBusiness, Service, FAQPage, Breadcrumb). |

Copy edits should not require touching JSX — if you find yourself editing a
component to change wording, the string probably belongs in `data/`.

## Editing content

- **Change the phone number** → `data/site.ts`. It updates the header, footer,
  every CTA, structured data and the email templates.
- **Add a service** → append to `data/services.ts`. You get a page, a home-page
  card, a footer link, a sitemap entry and a new option in the enquiry form.
- **Add a suburb** → append to `data/suburbs.ts`. Write a genuinely specific
  `blurb`; near-duplicate suburb pages hurt rankings rather than help them.
- **Re-theme** → edit the `--primary`, `--brand` and `--ink` variables in
  `app/globals.css`. Both light and dark are defined.
- **Change a photo** → `data/images.ts`. Service photos are keyed by service slug.
- **Change the fonts** → `app/layout.tsx`. Headings are Bricolage Grotesque,
  body is Plus Jakarta Sans, both wired through `--font-heading` / `--font-sans`.

## Before launch

1. **Register the domain and mailbox.** `data/site.ts` currently assumes
   `ushine247.com.au` and `info@ushine247.com.au`. The questionnaire said "same
   as above", which was the Yireh address — confirm with the client.
2. **Confirm the phone number** for Ushine (currently the Yireh number).
3. **Set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`** (see `.env.example`) and
   verify the sending domain in Resend. Until then, enquiries are logged to the
   server console but **no email is sent** — this is the one true launch blocker.
4. **Submit a real test enquiry** in production and confirm both the business
   notification and the customer auto-reply arrive.
5. **Confirm the trust claims.** The site currently says cleaners are insured
   and offers a 48-hour re-clean guarantee. Only publish what is actually true;
   add the ABN to `data/site.ts` when supplied and it appears in the footer.
6. **Review `/privacy` and `/terms`** — sensible drafts, not legal advice.
7. **Pick a logo** at `/brand`, then update `components/logo.tsx`,
   `app/icon.tsx` and `app/opengraph-image.tsx`. Delete `app/brand` afterwards.
8. **Swap the photography.** Every image is currently free stock from Unsplash,
   listed in `data/images.ts` and served from their CDN via `next/image`
   (`images.remotePatterns` in `next.config.ts`). They are there to show the
   client the shape of the thing — replace them with photos of the actual team
   and finished jobs. To go local: drop files in `public/photos/`, change each
   `src` to `/photos/name.jpg`, then delete the `remotePatterns` block.
9. **Create the Google Business Profile.** For a local cleaning business this
   moves the needle more than anything on the site itself. Use the exact same
   name, address and phone as `data/site.ts` — inconsistent NAP costs rankings.
10. **Add analytics** (Vercel Analytics + GA4) and set `/thank-you` as the
    conversion goal.

## Deploying

Vercel: import the repo, set the two environment variables, add the domain.
Everything prerenders statically, so the only runtime work is the enquiry action.

## Notes

- Enquiry rate limiting is in-memory (5 per IP per 10 minutes), which resets on
  deploy. Fine for a marketing site; move to Vercel KV if it ever gets abused.
- `/thank-you` and `/brand` are excluded from search in `app/robots.ts`.
