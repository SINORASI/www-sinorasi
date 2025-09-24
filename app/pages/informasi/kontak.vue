<template>
  <div class="py-30">
    <ImageCarousel />
  </div>
  <div class="bg-neutral-100 font-serif py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="text-center mb-10">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h2 class="text-3xl font-bold">Kontak Sekolah</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <Icon name="lucide:map-pin" size="32" class="text-blue-600 mb-4" />
          <h3 class="text-xl font-semibold mb-2">Alamat</h3>
          <p>SMK Negeri 2 Singosari<br>Jl. Raya Singosari No. 123<br>Singosari, Malang, Jawa Timur 65153</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <Icon name="lucide:phone" size="32" class="text-blue-600 mb-4" />
          <h3 class="text-xl font-semibold mb-2">Telepon</h3>
          <p>(0341) 123-4567</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <Icon name="lucide:mail" size="32" class="text-blue-600 mb-4" />
          <h3 class="text-xl font-semibold mb-2">Email</h3>
          <p>info@smkn2singosari.sch.id</p>
        </div>
      </div>
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-4">Lokasi Sekolah</h3>
        <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p>Embedded Google Map here</p>
        </div>
      </div>
    </div>
  </div>
</template>