import { db } from '~/lib/db';
import { news } from '~/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter is required'
    });
  }

  try {
    const newsData = await db
      .select()
      .from(news)
      .where(eq(news.slug, slug));

    if (newsData.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'News not found'
      });
    }

    const item = newsData[0];

    // Transform data to match News interface
    return {
      id: item.id.toString(),
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      thumbnail: item.thumbnail || "/images/placeholder.jpg",
      tags: Array.isArray(item.tags) ? item.tags : [],
      content: item.content,
      publishedAt: item.publishedAt || "",
      author: item.author || "SMKN 2 Singosari"
    };

  } catch (error) {
    console.error('Error fetching news by slug:', error);
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error; // Re-throw createError
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
});
