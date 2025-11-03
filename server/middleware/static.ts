export default defineEventHandler((event) => {
  // This middleware ensures that /public static assets are properly served
  // Static files are automatically handled by Nuxt, but we need to ensure
  // correct caching headers for non-webp formats in production

  const url = event.node.req.url;

  // Public assets should be served from the /public directory
  if (url?.startsWith("/images/")) {
    // Ensure proper cache headers for images
    const res = event.node.res;

    // Check file extension
    const ext = url.split(".").pop()?.toLowerCase();

    // For non-webp images, ensure they're served with proper headers
    if (ext && ["jpg", "jpeg", "png", "gif", "svg", "avif"].includes(ext)) {
      // Set cache headers for images
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      // Ensure proper content-type
      const contentTypes: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        svg: "image/svg+xml",
        avif: "image/avif",
        webp: "image/webp",
      };
      if (contentTypes[ext]) {
        res.setHeader("Content-Type", contentTypes[ext]);
      }
    }
  }

  // Cache static assets aggressively
  if (event.node.req.url?.includes("/images/") || event.node.req.url?.includes("/audio/")) {
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
    setHeader(event, "Content-Encoding", "gzip");
  }
});
