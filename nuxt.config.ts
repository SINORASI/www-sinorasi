import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxtjs/mdc",
    "@nuxt/image",
    "motion-v/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
  ],
  fonts: {
    families: [
      { name: "Oswald", provider: "google", weights: [700] },
      { name: "Nunito", provider: "google", weights: [400, 600] },
    ],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "SMK Negeri 2 Singosari",
      htmlAttrs: { lang: "id" },
      link: [
        { rel: "icon", type: "image/png", href: "/images/logo-smk.webp" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://www.youtube.com" },
        {
          rel: "preload",
          href: "/images/guru/foto-guru-bersama.webp",
          as: "image",
          type: "image/webp",
          fetchpriority: "high",
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "Website resmi SMK Negeri 2 Singosari - Menyediakan informasi lengkap tentang profil sekolah, program keahlian, kegiatan siswa, prestasi, dan pendaftaran siswa baru.",
        },
        {
          name: "keywords",
          content:
            "SMK Negeri 2 Singosari, SMK Singosari, Sekolah Menengah Kejuruan, Pendidikan Kejuruan, Program Keahlian, Kegiatan Siswa, Prestasi Sekolah, Pendaftaran Siswa Baru",
        },
        { name: "author", content: "SMK Negeri 2 Singosari" },
        { name: "robots", content: "index, follow" },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-motion": ["motion-v"],
            "vendor-icons": ["@nuxt/icon"],
            "home-components": [
              "~/components/home/HomeHero.vue",
              "~/components/home/HomeProfile.vue",
              "~/components/home/HomeMajors.vue",
              "~/components/home/HomeNews.vue",
            ],
          },
        },
      },
      chunkSizeWarningLimit: 600,
      sourcemap: false,
      reportCompressedSize: true,
    },
  },
  i18n: {
    defaultLocale: "id",
    locales: [
      { code: "id", name: "Bahasa Indonesia", file: "id.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
  },
  image: {
    quality: 80,
    format: ["webp", "avif", "png", "jpg", "jpeg"],
    sizes: "xs:320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    provider: "ipx",
  },
  experimental: {
    viteEnvironmentApi: true,
  },
  nitro: {
    minify: true,
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  routeRules: {
    "/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    "/api/**": {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  },
});
