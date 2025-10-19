export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { tag, tags, search, limit = 10, offset = 0 } = query;

  try {
    const newsData = await import("~/news_data.json").then((m) => m.default);

    let filteredData = [...newsData];

    if (tag && typeof tag === "string") {
      filteredData = filteredData.filter((item) =>
        item.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())),
      );
    }

    if (tags && typeof tags === "string") {
      const tagArray = tags.split(",").map((t) => t.trim().toLowerCase());
      filteredData = filteredData.filter((item) =>
        tagArray.every((searchTag) =>
          item.tags.some((itemTag) => itemTag.toLowerCase().includes(searchTag)),
        ),
      );
    }

    if (search && typeof search === "string") {
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

    return {
      data: paginatedData,
      total,
      offset: offsetNum,
      limit: limitNum,
    };
  } catch (error) {
    console.error("Error reading news data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
