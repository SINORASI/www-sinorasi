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
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "SMK Negeri 2 Singosari",
      htmlAttrs: { lang: "id" },
      link: [{ rel: "icon", type: "image/png", href: "/images/logo-smk.webp" }],
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
    format: ["webp", "avif", "png", "jpg"],
    sizes: "320,640,768,1024,1280,1536",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});
