export type SearchVenuesArgs = {
  city: string;
  capacityMin?: number;
  vibe?: string;
};

export type GetVenueEventsArgs = {
  venueId: string;
  dateISO?: string;
};

export type VenueSummary = {
  id: string;
  name: string;
  city: string;
  capacity: number;
  vibe: string;
};

export type VenueEvent = {
  id: string;
  venueId: string;
  title: string;
  startsAt: string;
  openSlots: number;
};

export type ToolStep =
  | {
      id: string;
      name: "searchVenues";
      args: SearchVenuesArgs;
      state: "pending";
    }
  | {
      id: string;
      name: "searchVenues";
      args: SearchVenuesArgs;
      state: "done";
      result: VenueSummary[];
    }
  | {
      id: string;
      name: "searchVenues";
      args: SearchVenuesArgs;
      state: "error";
      error: string;
    }
  | {
      id: string;
      name: "getVenueEvents";
      args: GetVenueEventsArgs;
      state: "pending";
    }
  | {
      id: string;
      name: "getVenueEvents";
      args: GetVenueEventsArgs;
      state: "done";
      result: VenueEvent[];
    }
  | {
      id: string;
      name: "getVenueEvents";
      args: GetVenueEventsArgs;
      state: "error";
      error: string;
    };

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type PostChatBody = { messages: ChatMessage[] };
