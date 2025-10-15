<script setup lang="ts">
import { anonymousBKSchema, validateAnonymousBK, type AnonymousBKForm } from '~/utils/schema'

const formData = ref<AnonymousBKForm>({
  story: '',
  category: '',
  contactMethod: 'none',
  contactInfo: ''
})
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showGuidelines = ref(false)

useHead({
  title: "Anonymous BK - Utilitas - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Sampaikan cerita atau keluhan Anda secara anonim kepada BK SMK Negeri 2 Singosari.",
    },
  ],
});

const validateForm = () => {
  const result = validateAnonymousBK(formData.value)
  if (!result.success) {
    errors.value = {}
    result.error.issues.forEach((error) => {
      errors.value[error.path[0] as string] = error.message
    })
    return false
  }
  errors.value = {}
  return true
}

// Enhanced error handling for Zod validation errors
const handleValidationErrors = (issues: any[]) => {
  errors.value = {}
  issues.forEach((issue) => {
    const field = issue.path[0] as string
    errors.value[field] = issue.message
  })
}

const submitStory = async () => {
  if (!validateForm()) {
    return
  }
  isSubmitting.value = true
  try {
    const response = await $fetch('/api/anonymous-bk', {
      method: 'POST',
      body: formData.value
    })

    if (response.success) {
      alert("Cerita berhasil dikirim secara anonim!")
      formData.value = {
        story: '',
        category: '',
        contactMethod: 'none',
        contactInfo: ''
      }
      errors.value = {}
    } else {
      throw new Error('Submission failed')
    }
  } catch (error: any) {
    if (error.statusCode === 400 && error.data) {
      // Handle Zod validation errors
      handleValidationErrors(error.data)
    } else {
      alert("Terjadi kesalahan saat mengirim cerita. Silakan coba lagi.")
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-2xl mx-auto">
        <!-- Header Section -->
        <div class="mb-12 text-center">
          <div
            class="inline-block px-10 py-6 mb-4 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h1 class="text-3xl font-bold text-white md:text-4xl">BK Anonim</h1>
          </div>
          <p class="max-w-xl mx-auto text-lg text-gray-600">
            Bagikan cerita Anda secara anonim. Suara Anda penting dan membantu kami menciptakan lingkungan yang lebih
            baik.
          </p>
        </div>

        <!-- Guidelines Button -->
        <div class="mb-8 text-center">
          <button
            @click="showGuidelines = true"
            class="flex items-center gap-2 px-6 py-3 mx-auto font-semibold transition-all bg-white border-2 border-blue-100 shadow-md hover:border-blue-600 hover:text-blue-600 rounded-xl hover:shadow-lg"
          >
            <Icon name="lucide:book-open" size="20" />
            <span>Panduan Penggunaan</span>
          </button>
        </div>

        <!-- Guidelines Modal -->
        <Teleport to="body">
          <Transition name="dialog">
            <div
              v-if="showGuidelines"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              @click="showGuidelines = false"
            >
              <div
                class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-blue-100"
                @click.stop
              >
                <div class="p-8">
                  <div class="flex items-center justify-between mb-6">
                    <div class="px-6 py-3 border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl">
                      <h3 class="text-lg font-bold text-white">Panduan Penggunaan</h3>
                    </div>
                    <button
                      @click="showGuidelines = false"
                      class="p-2 text-gray-500 transition-colors bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200"
                    >
                      <Icon name="lucide:x" size="24" />
                    </button>
                  </div>
                  <ul class="space-y-4 text-gray-700">
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Jaga kerahasiaan identitas Anda - jangan sebutkan nama atau detail pribadi</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Tuliskan cerita dengan jelas dan lengkap</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Gunakan tag untuk membantu mengkategorikan cerita Anda</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="lucide:check-circle" size="20" class="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Pengiriman sepenuhnya anonim dan rahasia</span>
                    </li>
                  </ul>
                  <div class="mt-8 text-center">
                    <button
                      @click="showGuidelines = false"
                      class="px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
                    >
                      Mengerti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Form Section -->
        <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-10">
          <form @submit.prevent="submitStory" class="space-y-6">
            <div>
              <label for="story" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:message-square" size="18" class="mr-2 text-blue-600" />
                Cerita Anda
              </label>
              <textarea
                id="story"
                v-model="formData.story"
                rows="6"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Ceritakan apa yang ada di pikiran Anda..."
              ></textarea>
              <p v-if="errors.story" class="mt-1 text-sm text-red-600">{{ errors.story }}</p>
            </div>

            <div>
              <label for="category" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:list" size="18" class="mr-2 text-orange-600" />
                Kategori
              </label>
              <select
                id="category"
                v-model="formData.category"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih kategori</option>
                <option value="bullying">Bullying</option>
                <option value="stress">Stres</option>
                <option value="friendship">Persahabatan</option>
                <option value="advice">Nasihat</option>
                <option value="other">Lainnya</option>
              </select>
              <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
            </div>


            <div>
              <label for="contactMethod" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:phone" size="18" class="mr-2 text-purple-600" />
                Metode Kontak (Opsional)
              </label>
              <select
                id="contactMethod"
                v-model="formData.contactMethod"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">Tidak ada</option>
                <option value="email">Email</option>
                <option value="phone">Telepon</option>
              </select>
            </div>

            <div v-if="formData.contactMethod !== 'none'">
              <label for="contactInfo" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                <Icon name="lucide:mail" size="18" class="mr-2 text-purple-600" />
                Informasi Kontak
              </label>
              <input
                id="contactInfo"
                v-model="formData.contactInfo"
                type="text"
                class="w-full px-4 py-3 transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="formData.contactMethod === 'email' ? 'Masukkan email Anda' : 'Masukkan nomor telepon Anda'"
              />
              <p v-if="errors.contactInfo" class="mt-1 text-sm text-red-600">{{ errors.contactInfo }}</p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center justify-center w-full gap-2 px-4 py-4 font-bold text-white transition duration-200 bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-xl hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:send" size="20" />
              <span>{{ isSubmitting ? "Mengirim..." : "Kirim Secara Anonim" }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <div class="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-xl">
              <p class="flex items-center justify-center gap-2 text-sm text-gray-700">
                <Icon name="lucide:shield-check" size="18" class="text-blue-600" />
                Pengiriman Anda sepenuhnya anonim dan rahasia
              </p>
            </div>
          </div>
        </div>

        <!-- Help Section -->
        <div class="p-6 mt-8 text-center bg-white border-2 border-orange-100 shadow-xl rounded-2xl">
          <Icon name="lucide:headphones" size="32" class="mx-auto mb-3 text-orange-600" />
          <p class="mb-2 font-semibold text-gray-700">Butuh bantuan segera?</p>
          <p class="text-gray-600">Hubungi tim konseling kami langsung.</p>
        </div>
      </div>
    </div>
  </div>
</template>
