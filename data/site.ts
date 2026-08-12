/**
 * Single source of truth for business details (NAP), hours and navigation.
 * Every mention of a phone number, email or address on the site reads from here,
 * so a contact change is a one-line edit.
 *
 * TODO (client to confirm before launch):
 *  - Email + domain: the questionnaire said "same as above", which is the Yireh
 *    address. Assumed a dedicated Ushine mailbox below.
 *  - ABN, public liability insurance, police-checked staff — only publish what is true.
 */
export const site = {
  name: "Ushine 24/7",
  legalName: "Ushine 24/7 Cleaning Services",
  tagline: "Sydney cleaners, on call 24/7",
  description:
    "Residential, commercial, Airbnb and end-of-lease cleaning across Sydney. Based in Western Sydney, available around the clock, seven days a week.",
  url: "https://www.ushine247.com.au", // TODO confirm registered domain
  phone: "0410 288 829", // TODO confirm number for Ushine
  phoneHref: "tel:+61410288829",
  whatsappHref: "https://wa.me/61410288829",
  email: "info@ushine247.com.au", // TODO create mailbox
  baseSuburb: "Penrith",
  baseRegion: "Western Sydney",
  serviceArea: "Sydney and Greater Western Sydney",
  addressLocality: "Penrith",
  addressRegion: "NSW",
  postalCode: "2750",
  country: "AU",
  geo: { lat: -33.7507, lng: 150.6877 }, // Penrith
  hours: "Open 24 hours, 7 days",
  callWindow: "Call any time — we answer 24/7",
  abn: "", // TODO client to supply; hidden in footer until provided
  socials: {
    facebook: "",
    instagram: "",
  },
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Short claims shown under the hero and in the footer. */
export const trustPoints = [
  "Available 24/7 — including weekends and public holidays",
  "Fully insured cleaners",
  "No lock-in contracts",
  "Free, no-obligation quotes",
] as const;
