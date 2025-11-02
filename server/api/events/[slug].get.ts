import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Event } from "~/models/Event";

const eventData: Event[] = [];

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const eventItem = eventData.find((e) => e.slug === slug);

  if (!eventItem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event not found",
    });
  }

  return eventItem;
});
