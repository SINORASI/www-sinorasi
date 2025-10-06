<script setup lang="ts">
useHead({
  title: 'Profil Sekolah - Informasi - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Profil lengkap SMK Negeri 2 Singosari. Sejarah, visi misi, dan sambutan kepala sekolah.'
    }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-300">
        <!-- Hero Image Background -->
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/70"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">Profil Sekolah</h1>
        <p class="text-xl md:text-2xl">SMK Negeri 2 Singosari</p>
      </div>
    </section>

    <!-- Welcome Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Sambutan Kepala Sekolah</h2>
          </div>
          <p class="text-gray-600 text-lg">SMK Negeri 2 Singosari</p>
        </div>

        <div class="max-w-5xl mx-auto">
          <!-- Principal Photo -->
          <div class="flex justify-center mb-10">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 w-fit">
              <img src="/images/kepsek.webp" alt="Kepala Sekolah" class="rounded-xl w-64 md:w-80" />
            </div>
          </div>

          <!-- Welcome Message -->
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12 space-y-6 text-gray-700 leading-relaxed">
            <p class="font-bold text-xl text-blue-800">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            
            <p class="text-justify">
              Puji syukur kepada Alloh SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerahNya sehingga website SMK Negeri 2 Singosari ini dapat terbit. Salah satu tujuan dari website ini adalah untuk menjawab akan setiap kebutuhan informasi dengan memanfaatkan sarana teknologi informasi yang ada. Kami sadar sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya Teknologi Informasi yang begitu pesat, sangat diperlukan berbagai sarana prasarana yang kondusif, kebutuhan berbagai informasi siswa, guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan hal tersebut semaksimal mungkin. Semoga dengan adanya website ini dapat membantu dan bermanfaat, terutama informasi yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMK Negeri 2 Singosari.
            </p>
            
            <p class="text-justify">
              Besar harapan kami, sarana ini dapat memberi manfaat bagi semua pihak yang ada dilingkup pendidikan dan pemerhati pendidikan secara khusus bagi SMK Negeri 2 Singosari.
            </p>
            
            <p class="text-justify">
              Akhirnya kami mengharapkan masukan dari berbagai pihak untuk website ini agar kami terus belajar dan meng-update diri, sehingga tampilan, isi dan mutu website akan terus berkembang dan lebih baik nantinya. Terima kasih atas kerjasamanya, maju terus untuk mencapai SMK Negeri 2 Singosari yang lebih baik lagi.
            </p>
            
            <p class="font-bold text-xl text-blue-800">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Profile Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Video Profil Sekolah</h2>
          </div>
          <p class="text-gray-600 max-w-3xl mx-auto text-lg">
            Mengenal lebih dekat SMK Negeri 2 Singosari - sekolah yang membangun generasi terampil dan berkarakter untuk masa depan yang lebih cerah.
          </p>
        </div>

        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden group">
              <div class="relative h-64 bg-gray-300">
                <img src="/images/placeholder.jpg" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div class="text-white">
                    <h3 class="text-xl font-bold mb-2">Video Profil</h3>
                    <p class="text-sm">SMK Negeri 02 Singosari</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden group">
              <div class="relative h-64 bg-gray-300">
                <img src="/images/placeholder.jpg" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div class="text-white">
                    <h3 class="text-xl font-bold mb-2">Fasilitas Sekolah</h3>
                    <p class="text-sm">SMK Negeri 02 Singosari</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden group">
              <div class="relative h-64 bg-gray-300">
                <img src="/images/placeholder.jpg" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div class="text-white">
                    <h3 class="text-xl font-bold mb-2">Kegiatan Siswa</h3>
                    <p class="text-sm">SMK Negeri 02 Singosari</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden group">
              <div class="relative h-64 bg-gray-300">
                <img src="/images/placeholder.jpg" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div class="text-white">
                    <h3 class="text-xl font-bold mb-2">Prestasi</h3>
                    <p class="text-sm">SMK Negeri 02 Singosari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- History Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white">Sejarah Sekolah</h2>
          </div>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div class="grid lg:grid-cols-2 gap-0">
              <div class="h-80 lg:h-auto bg-gray-300">
                <img src="/images/placeholder.jpg" alt="Sejarah" class="object-cover w-full h-full" />
              </div>
              <div class="p-8 md:p-10 flex flex-col justify-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Sejarah SMK Negeri 2 Singosari</h3>
                <p class="text-gray-700 leading-relaxed mb-6 text-justify">
                  Didirikan berdasarkan surat Perjanjian Kerjasama antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan No.0570ax/C5.4/Kep/KU/2007 Tanggal 25 Mei 2007. Sebagai Pengembangan dari Program Keahlian Teknik Audio Video, Teknik Elektronika Industri, dan Teknik Informatika (Rekayasa Perangkat Lunak) yang berasal dari SMK Negeri 1 Singosari yang telah meraih prestasi sebagai Juara Lomba Kompetensi Siswa baik tingkat Propinsi Jawa Timur maupun Tingkat Nasional.
                </p>
                <button class="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center w-fit group">
                  Baca Selengkapnya 
                  <Icon name="lucide:arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Mission Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 md:p-10 mb-8">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Visi Dan Misi</h2>
                <p class="text-gray-600">SMK Negeri 02 Singosari</p>
              </div>
              <button class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors">
                <Icon name="lucide:plus" size="24" />
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
              <div class="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Icon name="lucide:eye" size="32" class="text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
              <p class="text-gray-700 leading-relaxed">
                Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan berdaya saing global.
              </p>
            </div>

            <div class="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8">
              <div class="inline-block p-4 bg-orange-100 rounded-full mb-4">
                <Icon name="lucide:target" size="32" class="text-orange-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Misi</h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Menyelenggarakan pendidikan berkualitas</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mengembangkan kompetensi siswa</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:check-circle" size="20" class="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Membentuk karakter unggul</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
