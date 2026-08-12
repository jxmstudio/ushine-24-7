import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarCheck,
  House,
  KeyRound,
  Sparkles,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  /** Short label used in the enquiry form dropdown. */
  formLabel: string;
  tagline: string;
  summary: string;
  icon: LucideIcon;
  /** Featured services get the larger cards on the home page. */
  featured: boolean;
  intro: string;
  includes: string[];
  suitedTo: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    formLabel: "Residential cleaning",
    tagline: "Houses, units and apartments",
    summary:
      "Regular or one-off house cleaning done properly — kitchens, bathrooms, floors and living spaces, by cleaners who turn up when they say they will.",
    icon: House,
    featured: true,
    intro:
      "Our core service. Whether you want a weekly tidy that keeps on top of things or a single deep clean before guests arrive, we bring our own equipment and work to a written checklist so nothing gets skipped. You can book a one-off, or set up a regular slot that suits your week.",
    includes: [
      "Kitchens — benches, splashbacks, sinks, cooktop and appliance exteriors",
      "Bathrooms — showers, tiles, toilets, basins, mirrors and fittings",
      "Bedrooms and living areas — dusting, surfaces, skirtings and cobwebs",
      "Floors — vacuumed and mopped throughout",
      "Bins emptied and liners replaced",
      "Optional extras: inside oven, inside fridge, windows, balcony",
    ],
    suitedTo: [
      "Busy families and working households",
      "Anyone wanting a weekly or fortnightly clean",
      "Pre- and post-event deep cleans",
      "Rental properties between inspections",
    ],
    faqs: [
      {
        q: "Do I need to be home during the clean?",
        a: "No. Plenty of our clients give us access instructions and come home to a finished house. If you would rather be there for the first clean to walk us through the place, that works too.",
      },
      {
        q: "Do you bring your own products and equipment?",
        a: "Yes — vacuum, mop, cloths and cleaning products are all included. If you prefer we use your own products, for allergies or surfaces, just leave them out and let us know.",
      },
    ],
  },
  {
    slug: "weekly-cleaning-contracts",
    title: "Weekly Cleaning Contracts",
    formLabel: "Weekly / regular cleaning contract",
    tagline: "Same cleaner, same day, every week",
    summary:
      "A regular clean at a fixed weekly rate, with the same cleaner each visit and no lock-in contract. Weekly, fortnightly or monthly.",
    icon: CalendarCheck,
    featured: true,
    intro:
      "Regular cleaning is cheaper per visit than one-off work, because we are maintaining a home rather than rescuing one. You get a set day and time, the same cleaner wherever possible, and a fixed price agreed up front. Pause or cancel whenever you need — there is no lock-in period and no exit fee.",
    includes: [
      "A fixed weekly, fortnightly or monthly slot",
      "The same cleaner each visit wherever possible",
      "A price agreed in writing before the first clean",
      "A checklist tailored to your home or site",
      "Priority booking for extra or emergency cleans",
      "Pause any time — holidays, renovations, whenever",
    ],
    suitedTo: [
      "Households wanting one less thing to think about",
      "Offices, clinics and shopfronts needing a set schedule",
      "Landlords and property managers with several properties",
      "Anyone tired of chasing a cleaner who does not show up",
    ],
    faqs: [
      {
        q: "Is there a minimum contract length?",
        a: "No. We work on a rolling arrangement — keep it going as long as it is useful and give us reasonable notice if you want to stop.",
      },
      {
        q: "What does a regular clean cost?",
        a: "It depends on the size of the property and how often we come. Call or send an enquiry with your suburb and the number of bedrooms and bathrooms, and we will give you a fixed weekly figure.",
      },
    ],
  },
  {
    slug: "end-of-lease-cleaning",
    title: "End of Lease Cleaning",
    formLabel: "End of lease / bond clean",
    tagline: "Bond cleans and vacate cleans",
    summary:
      "A full vacate clean to the standard agents actually inspect against — oven, tracks, skirtings, marks and all.",
    icon: KeyRound,
    featured: true,
    intro:
      "Moving out is stressful enough. We clean the whole property against a real estate exit checklist, including the parts agents always check first: the oven, the shower screen, window tracks, skirting boards and inside cupboards. Book us for the day after your furniture leaves and hand back the keys with confidence.",
    includes: [
      "Full interior clean, top to bottom, every room",
      "Oven, cooktop, rangehood and inside all cupboards",
      "Bathrooms detailed — screens, grout, tiles, exhaust fans",
      "Window tracks, sills, skirting boards and light switches",
      "Walls spot-cleaned for marks",
      "Garage, balcony and laundry sweep-out",
    ],
    suitedTo: [
      "Tenants moving out and chasing their bond back",
      "Landlords preparing a property for the next tenant",
      "Property managers turning over a vacancy quickly",
    ],
    faqs: [
      {
        q: "Can you clean carpets as well?",
        a: "Yes — carpet steam cleaning is quoted as an add-on, and most leases require it if carpets were professionally cleaned at the start. Mention it when you enquire and we will include it in the quote.",
      },
      {
        q: "How long does a bond clean take?",
        a: "A two-bedroom unit is usually half a day; a large house can take a full day with a team of two or three. We will tell you the expected window when we quote.",
      },
    ],
  },
  {
    slug: "airbnb-short-stay-cleaning",
    title: "Airbnb & Short-Stay Cleaning",
    formLabel: "Airbnb / short-stay turnover",
    tagline: "Same-day turnovers between guests",
    summary:
      "Fast, reliable changeovers with linen, restocking and a photo check before the next guest arrives — including late nights and weekends.",
    icon: Sparkles,
    featured: false,
    intro:
      "Short-stay hosting lives and dies on the changeover. Because we run 24/7, we can clean a same-day turnover in the window between checkout and check-in — including Sundays, public holidays and last-minute bookings. Every clean finishes with a quick photo set so you can see the property is guest-ready without driving over.",
    includes: [
      "Full clean between guests, to a repeatable standard",
      "Linen change and bed making (your linen or ours)",
      "Restocking consumables — paper, soap, coffee, tea",
      "Reset of furniture and styling to your reference photos",
      "Photo confirmation sent after every turnover",
      "Damage and missing-item reports flagged straight away",
    ],
    suitedTo: [
      "Airbnb and Stayz hosts",
      "Serviced apartments and short-stay operators",
      "Property managers running multiple listings",
    ],
    faqs: [
      {
        q: "Can you handle a same-day checkout and check-in?",
        a: "Yes — that is the main reason hosts call us. Give us the checkout and check-in times and we will schedule the turnover in between.",
      },
      {
        q: "Do you supply linen?",
        a: "We can work with your linen on site, or arrange fresh linen as part of the turnover. Tell us which you prefer when we set up the schedule.",
      },
    ],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    formLabel: "Commercial / office cleaning",
    tagline: "Offices, shops, warehouses and strata",
    summary:
      "After-hours and overnight commercial cleaning on a set schedule, so your team walks into a clean site every morning.",
    icon: Building2,
    featured: false,
    intro:
      "We clean commercial sites outside business hours — evenings, overnight or early mornings — so your staff and customers are never working around a mop bucket. Scope, frequency and price are agreed in writing, and the same crew works your site so standards stay consistent.",
    includes: [
      "Offices, meeting rooms and reception areas",
      "Amenities and washrooms, restocked and sanitised",
      "Kitchens and staff break-out areas",
      "Hard floors and commercial carpet care",
      "Waste and recycling handling",
      "Consumables supply on request",
    ],
    suitedTo: [
      "Offices and co-working spaces",
      "Retail shopfronts and showrooms",
      "Warehouses, gyms and clinics",
      "Strata common areas and builders' cleans",
    ],
    faqs: [
      {
        q: "Can you clean outside business hours?",
        a: "Yes. Most of our commercial work runs after close or overnight. We will fit the schedule around your trading hours.",
      },
      {
        q: "Are your cleaners insured?",
        a: "Yes, our cleaners are insured. We are happy to provide our certificate of currency before work begins.",
      },
    ],
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Options for the enquiry form dropdown. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.formLabel })),
  { value: "other", label: "Something else / not sure" },
];
