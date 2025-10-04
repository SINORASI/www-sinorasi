<script lang="ts" setup>
interface ActivityProps {
    image: string,
    title: string,
    desc: string
}

const route = useRoute();
const extraName = route.params.extra as string;

const items = [
    { image: '/images/placeholder.jpg', title: 'Kejuaraan Antar Sekolah Se-Surabaya', desc: 'Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat'},
    { image: '/images/placeholder.jpg', title: 'Pelatihan Intensif Teknik Dasar', desc: 'Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler'},
    { image: '/images/placeholder.jpg', title: 'Turnamen Internal Antar Kelas', desc: 'Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas'},
    { image: '/images/placeholder.jpg', title: 'Workshop Strategi Permainan', desc: 'Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional'},
]

// Capitalize first letter for display
const displayName = extraName.charAt(0).toUpperCase() + extraName.slice(1);

useHead({
  title: `${displayName} - Ekstrakurikuler - SMKN 2 Singosari`,
  meta: [
    {
      name: 'description',
      content: `Informasi lengkap tentang ekstrakurikuler ${displayName} di SMK Negeri 2 Singosari`
    }
  ]
});
</script>

<template>
    <main class="bg-primary">
        <section class="flex flex-col items-center justify-center gap-16 py-20 h-fit md:py-40 md:gap-30 bg-slate-50">
            <h1 class="text-5xl font-bold tracking-wide text-center md:text-6xl lg:text-8xl text-slate-800">BASKET</h1>
            <div class="flex items-center justify-center p-8 shadow-lg bg-zinc-600 rounded-2xl w-fit">
                <div class="grid grid-cols-2 gap-8 text-white md:grid-cols-4 md:gap-12">
                    <div class="flex flex-col gap-3 text-center">
                        <p class="text-3xl font-bold md:text-4xl">50+</p>
                        <p class="text-lg font-medium md:text-xl">Anggota</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="text-3xl font-bold md:text-4xl">10+</p>
                        <p class="text-lg font-medium md:text-xl">Juara</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="text-3xl font-bold md:text-4xl">5</p>
                        <p class="text-lg font-medium md:text-xl">Tahun</p>
                    </div>
                    <div class="flex flex-col gap-3 text-center">
                        <p class="text-3xl font-bold md:text-4xl">3</p>
                        <p class="text-lg font-medium md:text-xl">Pertemuan</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="flex items-center justify-center py-16 h-fit md:py-24">
            <div class="flex flex-col items-center justify-center w-full max-w-6xl gap-12 px-6 lg:flex-row lg:gap-16">
                <div class="w-full lg:max-w-2xl">
                    <img src="/images/placeholder.jpg" alt="Kegiatan Ekstrakurikuler Basket" class="object-cover w-full rounded-lg shadow-md h-80 md:h-96">
                </div>
                <div class="w-full py-4">
                    <h1 class="py-2 text-3xl font-bold tracking-wide md:text-4xl text-slate-800">Ekstrakurikuler Basket</h1>
                    <hr class="w-24 mb-6 border-2 border-blue-600 md:w-32">
                    <div class="p-8 bg-white border rounded-lg shadow-sm border-slate-200">
                        <p class="text-lg leading-relaxed tracking-wide text-justify text-slate-700">
                            Ekstrakurikuler basket sekolah kami telah berdiri sejak tahun 2019 dan menjadi salah satu wadah pengembangan bakat siswa di bidang olahraga. Dengan fasilitas lapangan yang memadai dan bimbingan pelatih berpengalaman, kami berkomitmen membentuk karakter sportif dan jiwa kompetitif siswa. Kegiatan latihan rutin dilaksanakan tiga kali seminggu dengan fokus pada pengembangan teknik dasar, strategi permainan, dan pembentukan mental juara yang kuat untuk menghadapi berbagai kompetisi.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="h-fit">
            <div class=""></div>
        </section>

        <section class="flex items-center justify-center py-20 h-fit md:py-40 bg-slate-50">
            <div class="flex flex-col items-center justify-center">
                <h1 class="mb-4 text-4xl font-bold text-center md:text-5xl text-slate-800">Aktivitas Terkait</h1>
                <p class="max-w-2xl mb-16 text-lg text-center text-slate-600">Berbagai kegiatan dan prestasi yang telah dicapai oleh ekstrakurikuler basket</p>
                <div class="grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 md:gap-12 md:py-12">
                    <div v-for="(item, idx) in items" :key="idx" class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                        <img :src="item.image" alt="Aktivitas" class="object-cover w-full h-56 md:h-64">
                        <div class="p-6">
                            <h1 class="mb-4 text-xl font-bold md:text-2xl text-slate-800">{{ item.title }}</h1>
                            <p class="mb-4 leading-relaxed text-slate-600">{{ item.desc }}</p>
                            <h2 class="font-semibold tracking-wide text-right text-blue-600">15 Maret 2024</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="flex items-center justify-center py-20 h-fit md:py-40">
            <div class="flex flex-col items-center justify-center">
                <h1 class="mb-4 text-4xl font-bold text-center md:text-5xl text-slate-800">INFORMASI PENDAFTARAN BASKET</h1>
                <p class="max-w-3xl px-6 mb-12 text-lg text-center text-slate-600">Bergabunglah dengan ekstrakurikuler basket dan kembangkan potensi olahraga Anda</p>
                <div class="bg-slate-100 max-w-5xl w-full rounded-lg min-h-[500px] md:h-[640px] mt-8 md:mt-12 mx-6">
                    <div class="h-full p-8 bg-white border rounded-lg shadow-sm md:p-12 border-slate-200">
                        <h2 class="mb-8 text-2xl font-bold text-center md:text-3xl text-slate-800">Syarat dan Ketentuan Pendaftaran</h2>
                        
                        <div class="grid gap-8 md:grid-cols-2 md:gap-12">
                            <div>
                                <h3 class="flex items-center mb-6 text-xl font-bold text-blue-600">
                                    <span class="flex items-center justify-center w-8 h-8 mr-3 text-sm bg-blue-100 rounded-full">1</span>
                                    Persyaratan
                                </h3>
                                <ul class="space-y-3 text-slate-700">
                                    <li class="flex items-start">
                                        <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                                        <span>Siswa aktif kelas 7-11</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                                        <span>Mengisi formulir pendaftaran</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                                        <span>Surat persetujuan orang tua</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                                        <span>Sertifikat kesehatan</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                                        <span>Pas foto 3x4 (2 lembar)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 class="flex items-center mb-6 text-xl font-bold text-blue-600">
                                    <span class="flex items-center justify-center w-8 h-8 mr-3 text-sm bg-blue-100 rounded-full">2</span>
                                    Informasi Latihan
                                </h3>
                                <div class="space-y-4 text-slate-700">
                                    <div class="pl-4 border-l-4 border-blue-600">
                                        <p class="font-semibold">Jadwal Latihan</p>
                                        <p>Senin, Rabu, Jumat</p>
                                    </div>
                                    <div class="pl-4 border-l-4 border-blue-600">
                                        <p class="font-semibold">Waktu</p>
                                        <p>15.30 - 17.30 WIB</p>
                                    </div>
                                    <div class="pl-4 border-l-4 border-blue-600">
                                        <p class="font-semibold">Tempat</p>
                                        <p>Lapangan Basket Sekolah</p>
                                    </div>
                                    <div class="pl-4 border-l-4 border-blue-600">
                                        <p class="font-semibold">Biaya</p>
                                        <p>Rp 150.000/bulan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pt-8 mt-12 text-center border-t border-slate-200">
                            <div class="p-6 border border-blue-200 rounded-lg bg-blue-50">
                                <p class="mb-2 text-xl font-bold text-blue-800">Pendaftaran dibuka: 1-31 Juli 2024</p>
                                <p class="mb-4 text-slate-700">Untuk informasi lebih lanjut, hubungi:</p>
                                <div class="flex flex-col items-center justify-center gap-4 md:flex-row text-slate-600">
                                    <span class="font-semibold">Coach Budi: 0812-3456-7890</span>
                                    <span class="hidden md:inline">|</span>
                                    <span>Ruang Guru Olahraga</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>