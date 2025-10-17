import { db } from '~/lib/db';
import { news } from '~/db/schema';
import { desc, sql, like, or, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Get query parameters for filtering
  const query = getQuery(event);
  const { tag, tags, search, limit = 10, offset = 0 } = query;

  try {
    // Build where conditions
    const whereConditions = [];

    // Filter by tag (search in JSON array)
    if (tag && typeof tag === 'string') {
      whereConditions.push(sql`${news.tags}::text ILIKE ${`%${tag}%`}`);
    }

    // Filter by multiple tags (comma-separated)
    if (tags && typeof tags === 'string') {
      const tagArray = tags.split(',').filter(t => t.trim());
      if (tagArray.length > 0) {
        const tagConditions = tagArray.map(tag =>
          sql`EXISTS (SELECT 1 FROM jsonb_array_elements_text(${news.tags}) AS tag WHERE tag ILIKE ${`%${tag.trim()}%`})`
        );
        whereConditions.push(and(...tagConditions));
      }
    }

    // Search in title and content
    if (search && typeof search === 'string') {
      whereConditions.push(
        or(
          sql`${news.title} ILIKE ${`%${search}%`}`,
          sql`${news.content} ILIKE ${`%${search}%`}`
        )
      );
    }

    // Build the query
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(news)
      .where(whereClause);

    const total = totalResult[0]?.count || 0;

    // Get paginated results
    const newsData = await db
      .select()
      .from(news)
      .where(whereClause)
      .orderBy(sql`${news.publishedAt} DESC`)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    // Transform data to match News interface
    const transformedData = newsData.map(item => ({
      id: item.id.toString(),
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      thumbnail: item.thumbnail || "/images/placeholder.jpg",
      tags: Array.isArray(item.tags) ? item.tags : [],
      content: item.content,
      publishedAt: item.publishedAt || "",
      author: item.author || "SMKN 2 Singosari"
    }));

    return {
      data: transformedData,
      total,
      offset: parseInt(offset as string),
      limit: parseInt(limit as string)
    };

  } catch (error) {
    console.error('Error fetching news:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
});
