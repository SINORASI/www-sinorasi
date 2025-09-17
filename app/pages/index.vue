<script lang="ts" setup>
    definePageMeta({
        layout: 'default'
    })
</script>

<template>

<main class="flex flex-col gap-20">
    <section class="h-screen flex items-center justify-center">
        <div class="absolute bg-blend-darken bg-[url(/images/background-aula.jpg)] w-full h-full bg-cover bg-top top-0 left-0 right-0 bottom-0">
            <div class="bg-gradient-to-t from-black/65 to-transparent w-full h-full"> </div>
        </div>
        <div class="z-50 flex md:flex-row flex-col items-center md:gap-100 gap-20">
            <div class="flex flex-col gap-3 text-white">
                <h1 class="text-4xl font-bold">INORASI</h1>
                <p>Inovasi Raih Prestasi</p>
                
                <a href="#" class="text-lg gap-2 flex items-center justify-center hover:text-blue-600 transition">
                    Pelajari Lebih Dalam
                    <Icon name="lucide:chevron-right" size="24" />
                </a>
            </div>
            <div class="flex items-center justify-center">
                <img
                    src="/images/logo.webp" 
                    width="300"
                    height="300" />
            </div>
        </div>
    </section>
    <section class="h-fit">
        <div class="text-center md:text-left flex flex-col md:flex-row gap-10 container mx-auto">
            <div class="flex items-center flex-col gap-10">
                <img src="/images/kepsek.webp" width="auto" height="auto" alt="Foto Kepsek" />
                <div class="w-fit bg-neutral-200 rounded-lg p-2">
                    <p class="font-bold">Sumijah S. Pd M.Si</p>
                </div>
            </div>
            <div class="flex justify-center flex-col gap-5">
                <h2 class="text-3xl font-bold">Selamat datang di SMK Negeri 2 Singosari</h2>
                <p>
                    Assalamu'alaikum wr.wb.
Puji syukur kepada Alloh SWT atas terbitnya website SMK Negeri 2 Singosari untuk menjawab kebutuhan informasi melalui teknologi informasi. Dalam memajukan pendidikan di era teknologi yang pesat, diperlukan sarana prasarana kondusif dan informasi bagi siswa, guru, orangtua maupun masyarakat.
Semoga website ini bermanfaat untuk informasi pendidikan, ilmu pengetahuan dan seputar SMK Negeri 2 Singosari. Besar harapan kami sarana ini memberi manfaat bagi semua pihak di lingkup pendidikan 
khususnya SMK Negeri 2 Singosari.
                </p>
                <p>
                    Kami mengharapkan masukan dari berbagai pihak agar terus belajar dan meng-update sehingga tampilan, isi dan mutu website berkembang lebih baik. Terima kasih atas kerjasamanya, maju terus SMK Negeri 2 Singosari.
Wassalamu'alaikum wr.wb.
                </p>
            </div>
        </div>
    </section>
    <section class="h-min-screen">
        <div class="container mx-auto flex text-center flex-col items-center gap-5">
            <h2 class="text-3xl font-bold">Video Profil Sekolah</h2>
            <p>Video profil ini memperlihatkan perjalanan dan komitmen sekolah dalam membentuk peserta didik yang unggul dalam berprestasi, berkarakter, serta siap menghadapi tantangan di masa depan.</p>
            <div>
                <ScriptYouTubePlayer video-id="45j-vqtLMzE"/>
            </div>
        </div>
    </section>
    <section class="h-min-screen">
        <div class="text-center md:text-left container mx-auto flex flex-col items-center gap-5">
            <h2 class="text-3xl font-bold">Jejak Sejarah Kami</h2>
            <p>Perjalanan SMK Negeri 2 Singosari dalam mengembangkan pendidikan kejuruan berkualitas di Kabupaten Malang.</p>
            <div class="flex flex-col">
                <div class="w-100 shadow-sm gap-5 flex flex-col p-5 rounded-lg bg-neutral-200">
                    <div class="flex flex-col">
                        <div class="bg-neutral-100 p-2 w-fit rounded-lg">
                            <p class="text-blue-600 font-bold">2007</p>
                        </div>
                        <h3 class="text-2xl text-right font-bold">Awal Berdiri</h3>
                    </div>
                    <p class="text-sm text-right">
                        SMK Negeri 2 Singosari didirikan secara resmi pada tanggal 25 Mei 2007 berdasarkan surat Perjanjian Kerjasama No. 0570ax/C5.4/Kep/KU/2007 antara Bupati Malang dengan Direktur Pendidikan Sekolah Menengah Kejuruan.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section class="h-fit">
        <div class="container mx-auto">
            <div>

            </div>
        </div>
    </section>
    <section class="h-min-screen">
        <div class="container mx-auto flex flex-col items-center gap-5">
            <h2 class="text-3xl font-bold">Prestasi</h2>
            <div class="w-auto md:w-200 flex flex-col bg-neutral-100 gap-5 rounded-lg shadow-sm p-8">
                <div class="flex flex-col md:flex-row items-center gap-10">
                    <img src="/images/placeholder.jpg" width="350" />
                    <div class="flex flex-col gap-5">
                        <h3 class="text-2xl font-bold">
                            LKS 2023 Kab. Malang : Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi
                        </h3>
                        <p>
                            SMKN 2 Singosari sukses menggelar Lomba Kompetensi Siswa (LKS) SMK tingkat Kabupaten Malang selama dua hari sejak Senin (6/3). Hasilnya, 13 siswa berhasil meraih prestasi dengan 6 bidang lomba lolos ke tingkat Provinsi Jawa Timur.
                        </p>
                    </div>
                </div>
                <div>
                    <div class="bg-neutral-600 h-1 w-full">

                    </div>
                </div>
                <div class="flex justify-between">
                    <div class="flex gap-5">
                        <button class="border-neutral-400 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-110">
                            <Icon name="lucide:chevron-left" size="24" />
                        </button>
                        <button class="border-neutral-400 border-1 cursor-pointer bg-neutral-300 p-2 flex items-center justify-center rounded-full shadow-lg transition hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110">
                            <Icon name="lucide:chevron-right" size="24" />
                        </button>
                    </div>
                    <div class="flex items-center justify-center">
                        <h3 class="text-2xl font-bold">1/5</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="h-min-screen">
        <div class="container mx-auto flex flex-col items-center gap-5">
            <h2 class="text-3xl font-bold">Berita Terbaru</h2>
            <p>SMK Negeri 2 Singosari</p>
            <div class="flex flex-col gap-10 md:gap-0 md:flex-row w-full items-center justify-around">
                <div class="flex flex-col gap-10">
                    <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
                    <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
                </div>
                <div class="flex flex-col items-center justify-center text-center gap-5">
                    <h3 class="text-2xl font-bold">Kategori Berita</h3>
                    <div class="flex flex-col gap-3">
                        <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
                        <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
                        <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
                        <p class="font-bold p-2 rounded-full bg-neutral-100 pl-4 pr-4">Kategori Berita</p>
                    </div>
                </div>
                <div class="flex flex-col gap-10">
                    <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
                    <CardNews title="Kami Lolos Enam Bidang Lomba untuk Menuju Tingkat Provinsi" />
                </div>
            </div>
        </div>
    </section>
</main>

</template>