<template>
  <div class="px-4 py-40 font-serif bg-primary sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="mb-10 text-center">
        <div class="p-4 border rounded-lg bg-neutral-200/50 backdrop-blur-2xl border-neutral-300">
          <h2 class="text-3xl font-bold">{{ event.title }}</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <img src="/images/placeholder.jpg" alt="Event Image" class="w-full rounded-lg shadow-md" />
        </div>
        <div class="space-y-6">
          <div>
            <h3 class="mb-2 text-xl font-semibold">Tanggal & Waktu</h3>
            <p class="text-gray-700">{{ event.date }} - {{ event.time }}</p>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Lokasi</h3>
            <p class="text-gray-700">{{ event.location }}</p>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Deskripsi</h3>
            <p class="text-gray-700">{{ event.description }}</p>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Kontak</h3>
            <p class="text-gray-700">Untuk informasi lebih lanjut, hubungi panitia acara di {{ event.contact }}</p>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h3 class="mb-4 text-2xl font-bold">Galeri Acara</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
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