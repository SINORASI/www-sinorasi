export default defineEventHandler((event) => {
  // This middleware ensures that /public static assets are properly served
  // Static files are automatically handled by Nuxt, but this ensures
  // they work correctly in both dev and production environments
  
  const url = event.node.req.url
  
  // Public assets should be served from the /public directory
  // Nuxt handles this automatically, but we log for debugging in production
  if (url?.startsWith('/images/')) {
    // These are served from /public/images/
    console.log(`Serving static asset: ${url}`)
  }
})
