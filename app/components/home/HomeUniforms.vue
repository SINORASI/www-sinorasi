<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <motion.section
    id="seragam-sekolah"
    class="relative overflow-hidden"
    :initial="{ opacity: 0, y: 50 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8 }"
    :inViewOptions="{ once: true }"
  >
    <div class="container px-4 mx-auto md:px-10 relative z-10">
      <div class="flex flex-col items-center gap-12">
        <motion.div
          class="flex flex-col items-center gap-4 text-center"
          :initial="{ opacity: 0, y: -30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :inViewOptions="{ once: true }"
        >
          <span
            class="px-8 py-3 text-xl font-bold tracking-widest text-center uppercase rounded-full md:text-2xl bg-blue-50 text-blue-700"
          >
            Seragam Sekolah
          </span>
          <p class="max-w-2xl text-lg text-center text-gray-600">Koleksi seragam sekolah SMK Negeri 2 Singosari</p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-[1600px]">
          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04215.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04261.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04269.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-l/DSC04273.webp',
                ],
                P: [
                  '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04215.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04249.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04256.webp',
                  '/images/seragam/putih-putih/10-putih-putih-jas-p/DSC04256.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04320.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04340.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04341.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-l/DSC04349.webp',
                ],
                P: [
                  '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04320.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04354.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04356.webp',
                  '/images/seragam/putih-putih/11-putih-putih-jas-p/DSC04363.webp',
                ],
              },
            }"
            day="Almamater (Jas)"
            dayNumber=""
            uniformType="Almamater (Jas)"
            uniformDay="Senin"
            primaryColor="sky"
          />

          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/putih-putih/10-putih-putih-l/DSC04123.webp',
                  '/images/seragam/putih-putih/10-putih-putih-l/DSC04170.webp',
                  '/images/seragam/putih-putih/10-putih-putih-l/DSC04177.webp',
                  '/images/seragam/putih-putih/10-putih-putih-l/DSC04188.webp',
                ],
                P: [
                  '/images/seragam/putih-putih/10-putih-putih-p/10-putih-putih-p-1.webp',
                  '/images/seragam/putih-putih/10-putih-putih-p/DSC04123.webp',
                  '/images/seragam/putih-putih/10-putih-putih-p/DSC04200.webp',
                  '/images/seragam/putih-putih/10-putih-putih-p/DSC04209.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-1.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-2.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-3.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-m.webp',
                ],
                P: [
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-1.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-2.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-l-3.webp',
                  '/images/seragam/putih-putih/11-putih-putih-l/11-putih-putih-m.webp',
                ],
              },
            }"
            day="Putih Putih"
            dayNumber=""
            uniformType="Putih - Putih"
            uniformDay="Senin"
            primaryColor="gray"
          />

          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/putih-abu/10-putih-abu-l/DSC04368.webp',
                  '/images/seragam/putih-abu/10-putih-abu-l/DSC04388.webp',
                  '/images/seragam/putih-abu/10-putih-abu-l/DSC04393.webp',
                  '/images/seragam/putih-abu/10-putih-abu-l/DSC04396.webp',
                ],
                P: [
                  '/images/seragam/putih-abu/10-putih-abu-p/DSC04368.webp',
                  '/images/seragam/putih-abu/10-putih-abu-p/DSC04404.webp',
                  '/images/seragam/putih-abu/10-putih-abu-p/DSC04408.webp',
                  '/images/seragam/putih-abu/10-putih-abu-p/DSC04412.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/putih-abu/11-putih-abu-l/DSC03955.webp',
                  '/images/seragam/putih-abu/11-putih-abu-l/DSC04067.webp',
                  '/images/seragam/putih-abu/11-putih-abu-l/DSC04079.webp',
                  '/images/seragam/putih-abu/11-putih-abu-l/DSC04086.webp',
                ],
                P: [
                  '/images/seragam/putih-abu/11-putih-abu-p/DSC03955.webp',
                  '/images/seragam/putih-abu/11-putih-abu-p/DSC04033.webp',
                  '/images/seragam/putih-abu/11-putih-abu-p/DSC04051.webp',
                  '/images/seragam/putih-abu/11-putih-abu-p/DSC04100.webp',
                ],
              },
            }"
            day="Putih Abu"
            dayNumber=""
            uniformType="Putih - Abu"
            uniformDay="Selasa & Rabu"
            primaryColor="gray"
          />

          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/batik/10-batik-l/DSC04420.webp',
                  '/images/seragam/batik/10-batik-l/DSC04462.webp',
                  '/images/seragam/batik/10-batik-l/DSC04466.webp',
                  '/images/seragam/batik/10-batik-l/DSC04470.webp',
                ],
                P: [
                  '/images/seragam/batik/10-batik-p/DSC04420.webp',
                  '/images/seragam/batik/10-batik-p/DSC04446.webp',
                  '/images/seragam/batik/10-batik-p/DSC04448.webp',
                  '/images/seragam/batik/10-batik-p/DSC04455.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/batik/11-batik-l/DSC04477.webp',
                  '/images/seragam/batik/11-batik-l/DSC04508.webp',
                  '/images/seragam/batik/11-batik-l/DSC04512.webp',
                  '/images/seragam/batik/11-batik-l/DSC04515.webp',
                ],
                P: [
                  '/images/seragam/batik/11-batik-p/DSC04477.webp',
                  '/images/seragam/batik/11-batik-p/DSC04491.webp',
                  '/images/seragam/batik/11-batik-p/DSC04495.webp',
                  '/images/seragam/batik/11-batik-p/DSC04503.webp',
                ],
              },
            }"
            day="Batik"
            dayNumber=""
            uniformType="Batik"
            uniformDay="Kamis"
            primaryColor="blue"
          />

          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/pramuka/10-pramuka-l/DSC04526.webp',
                  '/images/seragam/pramuka/10-pramuka-l/DSC04547.webp',
                  '/images/seragam/pramuka/10-pramuka-l/DSC04550.webp',
                  '/images/seragam/pramuka/10-pramuka-l/DSC04555.webp',
                ],
                P: [
                  '/images/seragam/pramuka/10-pramuka-p/DSC04526.webp',
                  '/images/seragam/pramuka/10-pramuka-p/DSC04562.webp',
                  '/images/seragam/pramuka/10-pramuka-p/DSC04565.webp',
                  '/images/seragam/pramuka/10-pramuka-p/DSC04569.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/pramuka/11-pramuka-l/DSC04675.webp',
                  '/images/seragam/pramuka/11-pramuka-l/DSC04678.webp',
                  '/images/seragam/pramuka/11-pramuka-l/DSC04688.webp',
                  '/images/seragam/pramuka/11-pramuka-l/DSC04743.webp',
                ],
                P: [
                  '/images/seragam/pramuka/11-pramuka-p/DSC04743.webp',
                  '/images/seragam/pramuka/11-pramuka-p/DSC04775.webp',
                  '/images/seragam/pramuka/11-pramuka-p/DSC04782.webp',
                  '/images/seragam/pramuka/11-pramuka-p/DSC04791.webp',
                ],
              },
            }"
            day="Pramuka"
            dayNumber=""
            uniformType="Pramuka"
            uniformDay="Jum'at"
            primaryColor="brown"
          />

          <UniformCard
            :gradeImages="{
              X: {
                L: [
                  '/images/seragam/olahraga/10-olahraga-l/DSC04801.webp',
                  '/images/seragam/olahraga/10-olahraga-l/DSC04842.webp',
                  '/images/seragam/olahraga/10-olahraga-l/DSC04856.webp',
                  '/images/seragam/olahraga/10-olahraga-l/DSC04858.webp',
                ],
                P: [
                  '/images/seragam/olahraga/10-olahraga-p/DSC04801.webp',
                  '/images/seragam/olahraga/10-olahraga-p/DSC04829.webp',
                  '/images/seragam/olahraga/10-olahraga-p/DSC04867.webp',
                  '/images/seragam/olahraga/10-olahraga-p/DSC04871.webp',
                ],
              },
              XI: {
                L: [
                  '/images/seragam/olahraga/11-olahraga-l/DSC04578.webp',
                  '/images/seragam/olahraga/11-olahraga-l/DSC04599.webp',
                  '/images/seragam/olahraga/11-olahraga-l/DSC04608.webp',
                  '/images/seragam/olahraga/11-olahraga-l/DSC04614.webp',
                ],
                P: [
                  '/images/seragam/olahraga/11-olahraga-p/DSC04578.webp',
                  '/images/seragam/olahraga/11-olahraga-p/DSC04615.webp',
                  '/images/seragam/olahraga/11-olahraga-p/DSC04625.webp',
                  '/images/seragam/olahraga/11-olahraga-p/DSC04631.webp',
                ],
              },
            }"
            day="Olahraga"
            dayNumber=""
            uniformType="Olahraga"
            uniformDay="Sesuai Jadwal"
            primaryColor="sky"
          />
        </div>

        <div class="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
          <div class="flex gap-4">
            <Icon name="lucide:info" size="24" class="text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 class="mb-2 font-bold text-gray-800">Catatan Penting</h4>
              <ul class="space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li>Seragam harus dikenakan dengan rapi dan sesuai ketentuan</li>
                <li>Sepatu hitam dengan kaos kaki putih wajib digunakan setiap hari</li>
                <li>Atribut sekolah seperti name tag dan badge harus dipasang dengan benar</li>
                <li>Rambut harus dipotong rapi sesuai dengan peraturan sekolah</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
</template>
