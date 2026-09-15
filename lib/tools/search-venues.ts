import { tool } from "ai";
import { z } from "zod";
import { searchVenuesData } from "@/lib/data/venues";

export const searchVenuesTool = tool({
  description:
    "Search venue catalog by city with optional minimum capacity and vibe filters.",
  inputSchema: z.object({
    city: z.string().min(1).describe("City name to search, e.g. Austin"),
    capacityMin: z
      .number()
      .int()
      .min(0)
      .optional()
      .describe("Minimum guest capacity when filtering"),
    vibe: z
      .string()
      .min(1)
      .optional()
      .describe("Venue vibe keyword, e.g. rooftop or loft"),
  }),
  execute: async ({ city, capacityMin, vibe }) =>
    searchVenuesData(city, capacityMin, vibe),
});
