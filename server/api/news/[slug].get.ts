import { defineEventHandler, getRouterParam, createError } from "h3";
import { getCached, setCached, CACHE_DEFAULTS, setCacheHeaders } from "../../utils/cache";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug parameter is required",
    });
  }

  try {
    // Generate cache key for this specific news article
    const cacheKey = `news:slug:${slug}`;

    // Try to get from cache first
    const cached = getCached<any>(cacheKey);
    if (cached) {
      // Set cache headers for cached response
      setCacheHeaders(event, CACHE_DEFAULTS.LONG, { public: true });
      return cached;
    }

    const newsData = await import("~/news_data.json").then((m) => m.default);

    const item = newsData.find((article) => article.slug === slug);

    if (!item) {
      throw createError({
        statusCode: 404,
        statusMessage: "News not found",
      });
    }

    // Cache the result for 1 hour
    setCached(cacheKey, item, CACHE_DEFAULTS.LONG);

    // Set cache headers for fresh response
    setCacheHeaders(event, CACHE_DEFAULTS.LONG, { public: true });

    return item;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
