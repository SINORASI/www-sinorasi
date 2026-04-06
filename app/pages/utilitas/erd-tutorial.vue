<script setup lang="ts">
useHead({
  title: "Tutorial ERD - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content:
        "Pelajari cara membuat ERD dari dasar hingga lanjutan: mengenal entitas, relasi, normalisasi, sampai optimasi desain database.",
    },
  ],
});

const levels = [
  {
    title: "Dasar",
    icon: "lucide:book-open",
    colorClass: "bg-blue-100",
    iconClass: "text-blue-600",
    goals: [
      "Memahami apa itu ERD (Entity Relationship Diagram).",
      "Membedakan entitas, atribut, dan relasi.",
      "Membuat ERD sederhana dari studi kasus kecil.",
    ],
    steps: [
      "Tentukan tujuan sistem (contoh: sistem perpustakaan).",
      "Daftar entitas utama (Buku, Anggota, Peminjaman).",
      "Tentukan atribut tiap entitas dan pilih primary key.",
      "Hubungkan entitas dengan relasi dasar (1:1, 1:N, N:M).",
    ],
  },
  {
    title: "Menengah",
    icon: "lucide:layers",
    colorClass: "bg-emerald-100",
    iconClass: "text-emerald-600",
    goals: [
      "Mengubah kebutuhan bisnis menjadi model data yang rapi.",
      "Menerapkan aturan kardinalitas dan optionality dengan benar.",
      "Memecah relasi N:M menggunakan tabel penghubung.",
    ],
    steps: [
      "Identifikasi aturan bisnis penting (contoh: satu siswa bisa ikut banyak kelas).",
      "Tentukan kardinalitas setiap relasi.",
      "Buat entitas penghubung untuk relasi many-to-many (misal: KRS).",
      "Lakukan normalisasi hingga minimal 3NF untuk mengurangi duplikasi data.",
    ],
  },
  {
    title: "Lanjutan",
    icon: "lucide:brain-circuit",
    colorClass: "bg-violet-100",
    iconClass: "text-violet-600",
    goals: [
      "Merancang ERD untuk sistem skala besar dengan data kompleks.",
      "Menangani histori data, soft delete, dan audit trail.",
      "Menyiapkan desain agar siap diimplementasikan ke SQL.",
    ],
    steps: [
      "Tambahkan entitas pendukung seperti log aktivitas dan histori perubahan.",
      "Rancang constraint penting (unique, foreign key, check) sejak fase ERD.",
      "Pisahkan domain inti dan domain pendukung agar model tetap modular.",
      "Validasi desain dengan query simulasi dan skenario performa.",
    ],
  },
];

const finalChecklist = [
  "Semua entitas punya primary key.",
  "Setiap relasi punya kardinalitas yang jelas.",
  "Relasi N:M sudah dipecah dengan tabel penghubung.",
  "Atribut tidak redundan berlebihan (normalisasi terpenuhi).",
  "ERD dapat diturunkan menjadi skema tabel SQL tanpa ambigu.",
];
</script>

<template>
  <div class="min-h-screen py-32 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="mb-10 text-center">
          <div
            class="inline-block px-8 py-5 mb-4 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">Tutorial ERD</h1>
          </div>
          <p class="max-w-3xl mx-auto text-lg text-gray-600">
            Belajar membuat <span class="font-semibold text-blue-700">Entity Relationship Diagram</span> dari dasar
            hingga tingkat lanjutan dengan alur praktis.
          </p>
        </div>

        <div class="grid gap-6 mb-10 md:grid-cols-3">
          <section
            v-for="level in levels"
            :key="level.title"
            class="p-6 bg-white border-2 border-gray-100 shadow-xl rounded-2xl"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg" :class="level.colorClass">
                <Icon :name="level.icon" size="20" :class="level.iconClass" />
              </div>
              <h2 class="text-xl font-bold text-gray-800">{{ level.title }}</h2>
            </div>

            <div class="mb-4">
              <h3 class="mb-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Tujuan</h3>
              <ul class="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li v-for="goal in level.goals" :key="goal">{{ goal }}</li>
              </ul>
            </div>

            <div>
              <h3 class="mb-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Langkah</h3>
              <ol class="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li v-for="step in level.steps" :key="step">{{ step }}</li>
              </ol>
            </div>
          </section>
        </div>

        <section class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <h2 class="mb-4 text-2xl font-bold text-gray-800">Checklist Evaluasi ERD</h2>
          <p class="mb-4 text-gray-600">
            Gunakan checklist ini untuk memastikan ERD kamu sudah siap dipakai pada tahap implementasi database.
          </p>
          <ul class="grid gap-3 md:grid-cols-2">
            <li
              v-for="item in finalChecklist"
              :key="item"
              class="flex items-start gap-2 p-3 text-sm text-gray-700 bg-blue-50 rounded-xl"
            >
              <Icon name="lucide:check-circle-2" size="18" class="mt-0.5 text-blue-600 shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
