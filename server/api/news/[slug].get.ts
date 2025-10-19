export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug parameter is required",
    });
  }

  try {
    const newsData = await import("~/news_data.json").then((m) => m.default);

    const item = newsData.find((article) => article.slug === slug);

    if (!item) {
      throw createError({
        statusCode: 404,
        statusMessage: "News not found",
      });
    }

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
