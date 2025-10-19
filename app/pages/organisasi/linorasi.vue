<script setup lang="ts">
import type { Organization } from "~/models/Organization";

const { data: organizationsResponse } = await useFetch("/api/organizations");
const organizations = computed(() => organizationsResponse.value?.data || []);
const organization = computed(
  () => organizations.value.find((org) => org.slug === "linorasi") || ({} as Organization),
);

const activeTab = ref("overview");

useHead({
  title: `${organization.value.name} - Organisasi - SMKN 2 Singosari`,
  meta: [
    {
      name: "description",
      content: organization.value.description,
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-6xl mx-auto">
        
        <div class="mb-8">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <img
              :src="organization.logo"
              :alt="organization.name"
              class="object-cover w-24 h-24 rounded-2xl border-4 border-blue-200 shadow-lg md:w-32 md:h-32 bg-transparent"
            />
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{{ organization.name }}</h1>
              <p class="text-lg font-semibold text-blue-600">{{ organization.nickname }}</p>
              <p class="mt-2 text-lg text-gray-600">{{ organization.description }}</p>
              <div class="flex flex-wrap items-center gap-4 mt-4">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:calendar" size="18" class="text-blue-600" />
                  <span class="text-sm text-gray-600">Didirikan {{ organization.established }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:users" size="18" class="text-blue-600" />
                  <span class="text-sm text-gray-600">{{ organization.statistics.members }} Anggota</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:target" size="18" class="text-blue-600" />
                  <span class="text-sm text-gray-600">{{ organization.statistics.programs }} Program</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <div class="flex border-b border-gray-200">
            <button
              v-for="tab in [
                { id: 'overview', label: 'Ringkasan', icon: 'lucide:home' },
                { id: 'photos', label: 'Galeri', icon: 'lucide:image' },
                { id: 'leadership', label: 'Pengurus', icon: 'lucide:crown' },
                { id: 'sections', label: 'Bidang', icon: 'lucide:grid-3x3' },
                { id: 'activities', label: 'Kegiatan', icon: 'lucide:activity' },
                { id: 'contact', label: 'Kontak', icon: 'lucide:phone' }
              ]"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center gap-2 px-6 py-3 font-semibold transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              <Icon :name="tab.icon" size="18" />
              {{ tab.label }}
            </button>
          </div>
        </div>

        
        <div v-if="activeTab === 'overview'" class="space-y-8">
          
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
            <h2 class="mb-4 text-2xl font-bold text-gray-800">Deskripsi Logo</h2>
            <p class="text-gray-600 leading-relaxed">{{ organization.logoDescription }}</p>
          </div>

          
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
            <h2 class="mb-4 text-2xl font-bold text-gray-800">Sejarah</h2>
            <p class="text-gray-600 leading-relaxed">{{ organization.history }}</p>
          </div>

          
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div class="p-6 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
              <Icon name="lucide:users" size="32" class="mx-auto mb-3 text-blue-600" />
              <p class="text-3xl font-bold text-blue-600">{{ organization.statistics.members }}</p>
              <p class="text-sm text-gray-600">Anggota Aktif</p>
            </div>
            <div class="p-6 text-center bg-white border-2 border-green-100 shadow-xl rounded-2xl">
              <Icon name="lucide:target" size="32" class="mx-auto mb-3 text-green-600" />
              <p class="text-3xl font-bold text-green-600">{{ organization.statistics.programs }}</p>
              <p class="text-sm text-gray-600">Program</p>
            </div>
            <div class="p-6 text-center bg-white border-2 border-purple-100 shadow-xl rounded-2xl">
              <Icon name="lucide:clock" size="32" class="mx-auto mb-3 text-purple-600" />
              <p class="text-3xl font-bold text-purple-600">{{ organization.statistics.years }}</p>
              <p class="text-sm text-gray-600">Tahun Beroperasi</p>
            </div>
            <div class="p-6 text-center bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
              <Icon name="lucide:calendar" size="32" class="mx-auto mb-3 text-orange-600" />
              <p class="text-3xl font-bold text-orange-600">{{ organization.statistics.meetings }}</p>
              <p class="text-sm text-gray-600">Rapat Rutin</p>
            </div>
          </div>

          
          <div class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-8">
            <h2 class="mb-4 text-2xl font-bold text-gray-800">Poster Pendaftaran</h2>
            <div class="text-center">
              <img
                :src="organization.recruitmentPoster"
                :alt="`Poster Pendaftaran ${organization.name}`"
                class="max-w-md mx-auto rounded-xl shadow-lg"
              />
              <p class="mt-4 text-gray-600">Periode Pendaftaran: {{ organization.recruitmentPeriod }}</p>
            </div>
          </div>
        </div>

        
        <div v-if="activeTab === 'photos'" class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(photo, index) in organization.photos"
              :key="index"
              class="overflow-hidden bg-white border-2 border-gray-100 shadow-xl rounded-2xl"
            >
              <img
                :src="photo"
                :alt="`Foto ${organization.name} ${index + 1}`"
                class="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        
        <div v-if="activeTab === 'leadership'" class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            
            <div
              v-for="leader in organization.leadership.ketua"
              :key="leader.id"
              class="p-6 bg-white border-2 border-yellow-100 shadow-xl rounded-2xl"
            >
              <div class="flex items-center gap-4 mb-4">
                <img
                  :src="leader.image"
                  :alt="leader.name"
                  class="object-cover w-16 h-16 rounded-full border-4 border-yellow-200"
                />
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ leader.name }}</h3>
                  <p class="text-yellow-600 font-semibold">{{ leader.position }}</p>
                </div>
              </div>
            </div>

            
            <div
              v-for="leader in organization.leadership.wakil"
              :key="leader.id"
              class="p-6 bg-white border-2 border-blue-100 shadow-xl rounded-2xl"
            >
              <div class="flex items-center gap-4 mb-4">
                <img
                  :src="leader.image"
                  :alt="leader.name"
                  class="object-cover w-16 h-16 rounded-full border-4 border-blue-200"
                />
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ leader.name }}</h3>
                  <p class="text-blue-600 font-semibold">{{ leader.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div v-if="activeTab === 'sections'" class="space-y-6">
          <div
            v-for="section in organization.sections"
            :key="section.id"
            class="p-6 bg-white border-2 border-gray-100 shadow-xl rounded-2xl md:p-8"
          >
            <div class="flex flex-col gap-6 md:flex-row">
              <img
                :src="section.image"
                :alt="section.name"
                class="object-cover w-full h-48 rounded-xl md:w-48 md:h-48 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="mb-3 text-xl font-bold text-gray-800">{{ section.name }}</h3>

                <div class="mb-4">
                  <h4 class="font-semibold text-gray-700 mb-2">Visi:</h4>
                  <p class="text-gray-600">{{ section.visi }}</p>
                </div>

                <div class="mb-4">
                  <h4 class="font-semibold text-gray-700 mb-2">Misi:</h4>
                  <p class="text-gray-600">{{ section.misi }}</p>
                </div>

                <div class="mb-4">
                  <h4 class="font-semibold text-gray-700 mb-2">Tugas:</h4>
                  <p class="text-gray-600">{{ section.tasks }}</p>
                </div>

                <div class="mb-4">
                  <h4 class="font-semibold text-gray-700 mb-2">Program Unggulan:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="program in section.programs"
                      :key="program"
                      class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {{ program }}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 class="font-semibold text-gray-700 mb-3">Anggota:</h4>
                  <div class="grid gap-3 md:grid-cols-2">
                    <div
                      v-for="member in section.members"
                      :key="member.id"
                      class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        :src="member.image"
                        :alt="member.name"
                        class="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <p class="font-semibold text-gray-800">{{ member.name }}</p>
                        <p class="text-sm text-gray-600">{{ member.position }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div v-if="activeTab === 'activities'" class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="activity in organization.activities"
              :key="activity.id"
              class="overflow-hidden bg-white border-2 border-gray-100 shadow-xl rounded-2xl"
            >
              <img
                :src="activity.image"
                :alt="activity.title"
                class="object-cover w-full h-48"
              />
              <div class="p-6">
                <h3 class="mb-2 text-xl font-bold text-gray-800">{{ activity.title }}</h3>
                <p class="mb-4 text-gray-600">{{ activity.description }}</p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <Icon name="lucide:calendar" size="16" />
                  <span>{{ activity.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div v-if="activeTab === 'contact'" class="space-y-6">
          <div class="p-12 text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <Icon name="lucide:phone" size="64" class="mx-auto mb-4 text-gray-300" />
            <h3 class="mb-2 text-xl font-bold text-gray-700">Kontak Belum Tersedia</h3>
            <p class="text-gray-500">Informasi kontak akan segera ditambahkan.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
