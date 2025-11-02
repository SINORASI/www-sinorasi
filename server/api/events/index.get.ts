import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Event } from "~/models/Event";

const eventData: Event[] = [];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { upcoming, past, limit, offset } = query;

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

  return {
    data: paginatedEvents,
    total: filteredEvents.length,
    offset: startIndex,
    limit: endIndex - startIndex,
  };
});
