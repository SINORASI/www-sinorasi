/**
 * Server route to handle image requests and proxying
 * Allows external images from whitelisted domains without optimization
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing 'url' query parameter",
    });
  }

  try {
    // Decode the URL
    const decodedUrl = decodeURIComponent(url);

    // Validate that the URL is from a whitelisted domain
    const allowedDomains = [
      "smkn2-singosari.sch.id",
    ];

    const isAllowed = allowedDomains.some(domain => decodedUrl.includes(domain));

    if (!isAllowed && !decodedUrl.startsWith("http://localhost") && !decodedUrl.startsWith("http://127.0.0.1")) {
      throw createError({
        statusCode: 403,
        statusMessage: "Domain not whitelisted",
      });
    }

    // For external images, just proxy them through
    // Don't try to optimize them - serve as-is
    const response = await $fetch.raw(decodedUrl, {
      headers: {
        "User-Agent": "SMK-Sinorasi/1.0",
      },
    });

    // Set the appropriate content type
    const contentType = response.headers.get("content-type") || "image/jpeg";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=86400"); // Cache for 24 hours

    return response.body;
  } catch (error) {
    console.error("Image proxy error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch image",
    });
  }
});
