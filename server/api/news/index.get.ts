import { defineEventHandler, getQuery, createError } from "h3";
import { getCached, setCached, generateCacheKey, CACHE_DEFAULTS } from "../../utils/cache";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { tag, tags, search, limit = 10, offset = 0 } = query;

  try {
    // Generate cache key based on query parameters
    const cacheKey = generateCacheKey("news", { tag, tags, search, limit, offset });

    // Try to get from cache first
    const cached = getCached<any>(cacheKey);
    if (cached) {
      return cached;
    }

    const newsData = await import("~/news_data.json").then((m) => m.default);

    let filteredData = [...newsData];

    if (tag && typeof tag === "string" && tag.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())),
      );
    }

    if (tags && typeof tags === "string" && tags.trim() !== "") {
      const tagArray = tags.split(",").map((t) => t.trim().toLowerCase()).filter(t => t !== "");
      if (tagArray.length > 0) {
        filteredData = filteredData.filter((item) =>
          tagArray.every((searchTag) =>
            item.tags.some((itemTag) => itemTag.toLowerCase().includes(searchTag)),
          ),
        );
      }
    }

    if (search && typeof search === "string" && search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.content.toLowerCase().includes(searchLower),
      );
    }

    const total = filteredData.length;
    const limitNum = parseInt(limit as string, 10);
    const offsetNum = parseInt(offset as string, 10);

    const paginatedData = filteredData.slice(offsetNum, offsetNum + limitNum);

    const result = {
      data: paginatedData,
      total,
      offset: offsetNum,
      limit: limitNum,
    };

    // Cache the result for 15 minutes
    setCached(cacheKey, result, CACHE_DEFAULTS.MEDIUM);

    return result;
  } catch (error) {
    console.error("Error reading news data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
