export default defineEventHandler((event) => {
  const url = event.node.req.url || "";

  // Apply compression headers for text-based assets
  const compressibleExtensions = [".html", ".css", ".js", ".json", ".xml", ".svg", ".txt"];
  const shouldCompress = compressibleExtensions.some((ext) => url.includes(ext));

  if (shouldCompress) {
    // Set headers to indicate content can be compressed
    event.node.res.setHeader("Content-Encoding", "gzip");
  }
});
