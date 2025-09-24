<template>
  <div class="bg-neutral-100 font-serif py-40 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="text-center mb-10">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">{{ event.title }}</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="/images/placeholder.jpg" alt="Event Image" class="rounded-lg shadow-md w-full" />
        </div>
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">Tanggal & Waktu</h3>
            <p class="text-gray-700">{{ event.date }} - {{ event.time }}</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Lokasi</h3>
            <p class="text-gray-700">{{ event.location }}</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Deskripsi</h3>
            <p class="text-gray-700">{{ event.description }}</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Kontak</h3>
            <p class="text-gray-700">Untuk informasi lebih lanjut, hubungi panitia acara di {{ event.contact }}</p>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-4">Galeri Acara</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src="/images/placeholder.jpg" alt="Gallery 1" class="rounded-lg shadow-md" />
          <img src="/images/placeholder.jpg" alt="Gallery 2" class="rounded-lg shadow-md" />
          <img src="/images/placeholder.jpg" alt="Gallery 3" class="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const event = {
  title: 'Lomba Keterampilan Siswa SMK Negeri 2 Singosari',
  date: '23 September 2025',
  time: '08:00 - 16:00 WIB',
  location: 'Aula Utama SMK Negeri 2 Singosari',
  description: 'Lomba keterampilan siswa merupakan ajang kompetisi tahunan yang diselenggarakan oleh SMK Negeri 2 Singosari untuk menampilkan kemampuan siswa di berbagai bidang kejuruan seperti RPL, TKJ, Multimedia, dan lainnya. Acara ini bertujuan untuk meningkatkan motivasi siswa dalam belajar dan berkompetisi secara sehat.',
  contact: '0812-3456-7890 atau email ke acara@smkn2singosari.sch.id'
}
</script>