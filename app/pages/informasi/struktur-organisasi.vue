<template>
  <div class="flex items-center justify-center h-min-screen container mx-auto px-6 py-34">
    <div class="flex flex-col items-center justify-center gap-5">
      <h1 class="text-center font-bold text-4xl">Struktur Organisasi</h1>
      <p>SMKN 2 Singosari</p>

      <div class="flex flex-col gap-20">
        <div class="flex flex-col items-center gap-5">
          <div class="flex flex-col gap-5">
            <StaffCard v-for="staff in staffData.kepsek" :key="staff.name" :staff="staff" />
          </div>
          <div class="flex gap-10">
            <StaffCard v-for="staff in staffData.wakasek" :key="staff.name" :staff="staff" />
          </div>
        </div>

        <div class="flex flex-col items-center gap-10">
          <h2 class="text-3xl font-bold">Kurikulum</h2>
          <div class="flex gap-10">
            <StaffCard v-for="staff in staffData.kurikulum" :key="staff.name" :staff="staff" />
          </div>
        </div>

        <div class="flex flex-col items-center gap-10">
          <h2 class="text-3xl font-bold">Kesiswaan</h2>
          <div class="grid grid-cols-3 grid-rows-2 gap-10">
            <StaffCard v-for="staff in staffData.kesiswaan" :key="staff.name" :staff="staff" />
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-10">
        <h2 class="text-3xl font-bold">Sapras</h2>
        <div class="flex gap-10">
          <StaffCard v-for="staff in staffData.sapras" :key="staff.name" :staff="staff" />
        </div>

        <div class="flex flex-col items-center gap-10">
          <h2 class="text-3xl font-bold">Humas</h2>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10">
              <StaffCard v-for="staff in staffData.humas.slice(0, 3)" :key="staff.name" :staff="staff" />
            </div>
            <div class="flex gap-10 items-center justify-center">
              <StaffCard v-for="staff in staffData.humas.slice(3)" :key="staff.name" :staff="staff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StaffCard from '~/components/StaffCard.vue';
import { staffData } from '~/datas/data';
</script>