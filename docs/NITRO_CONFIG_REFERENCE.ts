// nitro-config.ts - Add this to nuxt.config.ts as part of the nitro object
// This file documents additional Nitro server optimizations

export default {
  // Compression
  compressPublicAssets: true,

  // Prerendering
  prerender: {
    crawlLinks: false,
    routes: ["/sitemap.xml", "/robots.txt"],
    ignore: ["/api", "/admin"],
  },

  // Cache configuration
  routeRules: {
    "/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
      },
    },
    "/api/**": {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
    "/images/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  },

  // Performance
  rollupConfig: {
    output: {
      compact: true,
      manualChunks: {
        motion: ["motion-v"],
        icons: ["@nuxt/icon"],
      },
    },
  },
};
