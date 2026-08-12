export type Suburb = {
  slug: string;
  name: string;
  region: string;
  /** One or two lines of genuinely local context — no spun filler. */
  blurb: string;
  nearby: string[];
};

export const suburbs: Suburb[] = [
  {
    slug: "penrith",
    name: "Penrith",
    region: "Western Sydney",
    blurb:
      "Penrith is our home base, so it is the suburb we reach fastest — often within the hour for urgent jobs. We cover everything from family homes off High Street to end-of-lease cleans in the newer estates.",
    nearby: ["Kingswood", "St Marys", "Emu Plains", "Jordan Springs"],
  },
  {
    slug: "kingswood",
    name: "Kingswood",
    region: "Western Sydney",
    blurb:
      "A short run from our Penrith base. We do a lot of student and share-house work around the university and hospital precinct, including bond cleans timed to the end of semester.",
    nearby: ["Penrith", "Werrington", "Cambridge Park", "St Marys"],
  },
  {
    slug: "st-marys",
    name: "St Marys",
    region: "Western Sydney",
    blurb:
      "Regular weekly cleans and vacate cleans across St Marys and the surrounding streets, plus after-hours commercial work along the Great Western Highway strip.",
    nearby: ["Penrith", "Mount Druitt", "Werrington", "Erskine Park"],
  },
  {
    slug: "mount-druitt",
    name: "Mount Druitt",
    region: "Western Sydney",
    blurb:
      "We service Mount Druitt and the surrounding suburbs seven days a week, with weekend slots for households that would rather not take time off work.",
    nearby: ["St Marys", "Rooty Hill", "Blacktown", "Doonside"],
  },
  {
    slug: "blacktown",
    name: "Blacktown",
    region: "Western Sydney",
    blurb:
      "One of our busiest areas for regular residential contracts, along with office and shopfront cleaning in the town centre outside trading hours.",
    nearby: ["Mount Druitt", "Seven Hills", "Marayong", "Prospect"],
  },
  {
    slug: "parramatta",
    name: "Parramatta",
    region: "Western Sydney",
    blurb:
      "Apartment cleaning and short-stay turnovers across the Parramatta CBD towers, plus after-hours commercial cleaning for offices around Church Street.",
    nearby: ["Harris Park", "Westmead", "Rydalmere", "Granville"],
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "South Western Sydney",
    blurb:
      "Residential and commercial cleaning throughout Liverpool, including bond cleans for the growing rental market near the hospital and CBD.",
    nearby: ["Casula", "Moorebank", "Prestons", "Warwick Farm"],
  },
  {
    slug: "campbelltown",
    name: "Campbelltown",
    region: "Macarthur",
    blurb:
      "We travel to Campbelltown and the Macarthur region for regular contracts and full vacate cleans, with fixed pricing quoted before we start.",
    nearby: ["Ingleburn", "Minto", "Leumeah", "Narellan"],
  },
  {
    slug: "castle-hill",
    name: "Castle Hill",
    region: "The Hills",
    blurb:
      "Larger family homes across The Hills, where weekly and fortnightly contracts make the most sense. We quote on bedroom and bathroom count rather than guessing by hour.",
    nearby: ["Baulkham Hills", "Kellyville", "Bella Vista", "Rouse Hill"],
  },
  {
    slug: "rouse-hill",
    name: "Rouse Hill",
    region: "The Hills",
    blurb:
      "New-build homes and townhouses across the North West growth corridor, including handover cleans for owners moving into a freshly completed property.",
    nearby: ["Kellyville", "Box Hill", "Schofields", "The Ponds"],
  },
  {
    slug: "sydney-cbd",
    name: "Sydney CBD",
    region: "Inner Sydney",
    blurb:
      "Short-stay apartment turnovers and overnight office cleaning in the city. Because we run 24/7, we can work in the hours the building actually allows.",
    nearby: ["Surry Hills", "Pyrmont", "Ultimo", "Darlinghurst"],
  },
  {
    slug: "inner-west",
    name: "Inner West",
    region: "Inner Sydney",
    blurb:
      "Terraces, semis and apartments across Newtown, Marrickville, Leichhardt and the surrounding streets — a lot of end-of-lease work and Airbnb changeovers.",
    nearby: ["Newtown", "Marrickville", "Leichhardt", "Ashfield"],
  },
  {
    slug: "north-shore",
    name: "North Shore",
    region: "Northern Sydney",
    blurb:
      "Regular household cleaning across the North Shore, with the same cleaner each visit so you are not re-explaining the house every week.",
    nearby: ["Chatswood", "Lane Cove", "St Leonards", "Willoughby"],
  },
  {
    slug: "eastern-suburbs",
    name: "Eastern Suburbs",
    region: "Eastern Sydney",
    blurb:
      "Apartment and short-stay cleaning through Bondi, Randwick and Coogee, including same-day guest turnovers over summer.",
    nearby: ["Bondi", "Randwick", "Coogee", "Maroubra"],
  },
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    region: "Southern Sydney",
    blurb:
      "Residential contracts and vacate cleans across the Shire, from Sutherland through to the coastal suburbs.",
    nearby: ["Cronulla", "Miranda", "Caringbah", "Engadine"],
  },
];

export function getSuburb(slug: string) {
  return suburbs.find((s) => s.slug === slug);
}

/** Region groupings used on the /areas index. */
export const suburbsByRegion = suburbs.reduce<Record<string, Suburb[]>>(
  (acc, suburb) => {
    (acc[suburb.region] ??= []).push(suburb);
    return acc;
  },
  {},
);
