import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/scripts'],
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
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
})