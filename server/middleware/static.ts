export default defineEventHandler((event) => {
  // Optimize static asset serving with compression and caching
  const url = event.node.req.url;
  const res = event.node.res;

  if (!url) return;

  // Handle image assets
  if (url.startsWith("/images/") || url.startsWith("/_ipx/")) {
    // Check file extension
    const ext = url.split(".").pop()?.toLowerCase();

    // Long-term cache for versioned/hashed assets
    if (ext && ["jpg", "jpeg", "png", "gif", "svg", "avif", "webp"].includes(ext)) {
      // Set aggressive cache headers for images
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

      // Enable compression for SVG
      if (ext === "svg") {
        res.setHeader("Content-Encoding", "gzip");
      }
    }
  }

  // Handle text-based assets (JS, CSS, fonts)
  if (url.startsWith("/_nuxt/") || url.endsWith(".js") || url.endsWith(".css") || url.endsWith(".woff2")) {
    // Cache JS and CSS chunks for 1 year
    if (url.includes(".") && /\.[a-f0-9]{8}\./.test(url)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // Cache with short TTL for non-hashed files
      res.setHeader("Cache-Control", "public, max-age=3600");
    }

    // Enable compression for text files (already handled by Nitro compressPublicAssets)
    const ext = url.split(".").pop()?.toLowerCase();
    if (ext && ["js", "css", "woff2"].includes(ext)) {
      res.setHeader("Vary", "Accept-Encoding");
    }
  }
});
