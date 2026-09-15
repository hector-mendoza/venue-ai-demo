import type { VenueEvent, VenueSummary } from "@/lib/chat/types";

export const VENUES: VenueSummary[] = [
  {
    id: "ven-nyc-glasshouse",
    name: "The Glasshouse",
    city: "New York",
    capacity: 450,
    vibe: "industrial loft",
  },
  {
    id: "ven-nyc-riverlight",
    name: "Riverlight Hall",
    city: "New York",
    capacity: 220,
    vibe: "waterfront modern",
  },
  {
    id: "ven-nyc-velvet",
    name: "Velvet Room",
    city: "New York",
    capacity: 120,
    vibe: "intimate jazz lounge",
  },
  {
    id: "ven-austin-cedar",
    name: "Cedar & Sky Terrace",
    city: "Austin",
    capacity: 300,
    vibe: "outdoor rooftop",
  },
  {
    id: "ven-austin-lone-star",
    name: "Lone Star Assembly",
    city: "Austin",
    capacity: 800,
    vibe: "festival warehouse",
  },
  {
    id: "ven-austin-bloom",
    name: "Bloom Studio",
    city: "Austin",
    capacity: 90,
    vibe: "creative studio",
  },
  {
    id: "ven-chi-midnight",
    name: "Midnight Foundry",
    city: "Chicago",
    capacity: 520,
    vibe: "industrial loft",
  },
  {
    id: "ven-chi-lakeside",
    name: "Lakeside Pavilion",
    city: "Chicago",
    capacity: 350,
    vibe: "waterfront modern",
  },
  {
    id: "ven-la-sunset",
    name: "Sunset Atrium",
    city: "Los Angeles",
    capacity: 600,
    vibe: "outdoor rooftop",
  },
  {
    id: "ven-la-echo",
    name: "Echo Gallery",
    city: "Los Angeles",
    capacity: 180,
    vibe: "creative studio",
  },
];

export const EVENTS: VenueEvent[] = [
  {
    id: "evt-001",
    venueId: "ven-nyc-glasshouse",
    title: "Product Launch: Aurora Series",
    startsAt: "2026-10-14T18:30:00.000Z",
    openSlots: 42,
  },
  {
    id: "evt-002",
    venueId: "ven-nyc-glasshouse",
    title: "Design Leadership Summit",
    startsAt: "2026-10-22T09:00:00.000Z",
    openSlots: 18,
  },
  {
    id: "evt-003",
    venueId: "ven-nyc-riverlight",
    title: "Riverlight Investor Breakfast",
    startsAt: "2026-10-18T13:00:00.000Z",
    openSlots: 35,
  },
  {
    id: "evt-004",
    venueId: "ven-nyc-velvet",
    title: "Velvet Sessions: Live Jazz",
    startsAt: "2026-10-19T23:00:00.000Z",
    openSlots: 12,
  },
  {
    id: "evt-005",
    venueId: "ven-austin-cedar",
    title: "SXSW Warm-Up Showcase",
    startsAt: "2026-10-11T20:00:00.000Z",
    openSlots: 75,
  },
  {
    id: "evt-006",
    venueId: "ven-austin-cedar",
    title: "Cedar Rooftop Mixer",
    startsAt: "2026-10-25T19:30:00.000Z",
    openSlots: 55,
  },
  {
    id: "evt-007",
    venueId: "ven-austin-lone-star",
    title: "Austin Tech Fest Main Stage",
    startsAt: "2026-10-16T16:00:00.000Z",
    openSlots: 210,
  },
  {
    id: "evt-008",
    venueId: "ven-austin-bloom",
    title: "Bloom Creator Workshop",
    startsAt: "2026-10-20T14:00:00.000Z",
    openSlots: 8,
  },
  {
    id: "evt-009",
    venueId: "ven-chi-midnight",
    title: "Midnight Foundry Gala",
    startsAt: "2026-10-17T19:00:00.000Z",
    openSlots: 64,
  },
  {
    id: "evt-010",
    venueId: "ven-chi-lakeside",
    title: "Lakeside Innovation Forum",
    startsAt: "2026-10-21T10:30:00.000Z",
    openSlots: 28,
  },
  {
    id: "evt-011",
    venueId: "ven-la-sunset",
    title: "Sunset Atrium Premiere Night",
    startsAt: "2026-10-15T21:00:00.000Z",
    openSlots: 90,
  },
  {
    id: "evt-012",
    venueId: "ven-la-echo",
    title: "Echo Gallery Opening",
    startsAt: "2026-10-23T18:00:00.000Z",
    openSlots: 22,
  },
];

export function searchVenuesData(
  city: string,
  capacityMin?: number,
  vibe?: string,
): VenueSummary[] {
  const normalizedCity = city.trim().toLowerCase();

  return VENUES.filter((venue) => {
    const cityMatch = venue.city.toLowerCase().includes(normalizedCity);
    const capacityMatch =
      capacityMin === undefined || venue.capacity >= capacityMin;
    const vibeMatch =
      vibe === undefined ||
      venue.vibe.toLowerCase().includes(vibe.trim().toLowerCase());

    return cityMatch && capacityMatch && vibeMatch;
  });
}

export function getVenueEventsData(
  venueId: string,
  dateISO?: string,
): VenueEvent[] {
  const venueExists = VENUES.some((venue) => venue.id === venueId);
  if (!venueExists) {
    throw new Error(`Unknown venue id: ${venueId}`);
  }

  return EVENTS.filter((event) => {
    if (event.venueId !== venueId) {
      return false;
    }

    if (dateISO === undefined) {
      return true;
    }

    return event.startsAt.startsWith(dateISO);
  });
}
