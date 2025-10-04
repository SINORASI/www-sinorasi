import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/scripts'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "SMK Negeri 2 Singosari",
      htmlAttrs: { lang: 'id' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Website resmi SMK Negeri 2 Singosari - Menyediakan informasi lengkap tentang profil sekolah, program keahlian, kegiatan siswa, prestasi, dan pendaftaran siswa baru.' },
        { name: 'keywords', content: 'SMK Negeri 2 Singosari, SMK Singosari, Sekolah Menengah Kejuruan, Pendidikan Kejuruan, Program Keahlian, Kegiatan Siswa, Prestasi Sekolah, Pendaftaran Siswa Baru' },
        { name: 'author', content: 'SMK Negeri 2 Singosari' },
        { name: 'robots', content: 'index, follow' },
        // { property: 'og:title', content: 'SMK Negeri 2 Singosari' },
        // { property: 'og:description', content: 'Website resmi SMK Negeri 2 Singosari - Menyediakan informasi lengkap tentang profil sekolah, program keahlian, kegiatan siswa, prestasi, dan pendaftaran siswa baru.' },
        // { property: 'og:type', content: 'website' },
        // { property: 'og:url', content: 'https://www.smk2singosari.sch.id' },
        // { property: 'og:image', content: 'https://www.smk2singosari.sch.id/og-image.jpg' },
        // { name: 'twitter:card', content: 'summary_large_image' },
        // { name: 'twitter:title', content: 'SMK Negeri 2 Singosari' },
        // { name: 'twitter:description', content: 'Website resmi SMK Negeri 2 Singosari - Menyediakan informasi lengkap tentang profil sekolah, program keahlian, kegiatan siswa, prestasi, dan pendaftaran siswa baru.' },
        // { name: 'twitter:image', content: 'https://www.smk2singosari.sch.id/twitter-image.jpg' }
      ]
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    plugins: [
      tailwindcss()
    ]
  },
})