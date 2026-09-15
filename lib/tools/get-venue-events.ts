import { tool } from "ai";
import { z } from "zod";
import { getVenueEventsData } from "@/lib/data/venues";

export const getVenueEventsTool = tool({
  description:
    "List upcoming events for a venue id returned from searchVenues. Optionally filter by date (YYYY-MM-DD).",
  inputSchema: z.object({
    venueId: z
      .string()
      .min(1)
      .describe("Venue id from a prior searchVenues result"),
    dateISO: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Optional event date filter in YYYY-MM-DD format"),
  }),
  execute: async ({ venueId, dateISO }) =>
    getVenueEventsData(venueId, dateISO),
});
