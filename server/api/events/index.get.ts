import { defineEventHandler, getQuery } from "h3";
import type { Event } from "~/models/Event";
import { getCached, setCached, generateCacheKey, CACHE_DEFAULTS, setCacheHeaders } from "../../utils/cache";

const eventData: Event[] = [];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { upcoming, past, limit, offset } = query;

  // Generate cache key based on query parameters
  const cacheKey = generateCacheKey("events", { upcoming, past, limit, offset });

  // Try to get from cache first
  const cached = getCached<any>(cacheKey);
  if (cached) {
    // Set cache headers for cached response
    setCacheHeaders(event, CACHE_DEFAULTS.MEDIUM, { public: true });
    return cached;
  }

  let filteredEvents = [...eventData];

  const currentDate = new Date();
  if (upcoming === "true") {
    filteredEvents = filteredEvents.filter((e) => new Date(e.publishedAt) >= currentDate);
  } else if (past === "true") {
    filteredEvents = filteredEvents.filter((e) => new Date(e.publishedAt) < currentDate);
  }

  const startIndex = offset ? parseInt(offset as string, 10) : 0;
  const endIndex = limit ? startIndex + parseInt(limit as string, 10) : filteredEvents.length;

  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  const result = {
    data: paginatedEvents,
    total: filteredEvents.length,
    offset: startIndex,
    limit: endIndex - startIndex,
  };

  // Cache the result for 15 minutes
  setCached(cacheKey, result, CACHE_DEFAULTS.MEDIUM);

  // Set cache headers for fresh response
  setCacheHeaders(event, CACHE_DEFAULTS.MEDIUM, { public: true });

  return result;
});
