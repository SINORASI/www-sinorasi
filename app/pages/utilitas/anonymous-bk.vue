<script setup lang="ts">
const story = ref('')
const tags = ref('')
const isSubmitting = ref(false)
const showGuidelines = ref(false)

const submitStory = async () => {
  if (!story.value.trim()) {
    alert('Silakan masukkan cerita Anda')
    return
  }
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert('Cerita berhasil dikirim secara anonim!')
  story.value = ''
  tags.value = ''
  isSubmitting.value = false
}

</script>

<template>
  <div class="min-h-screen py-30 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="bg-neutral-200/50 backdrop-blur-2xl p-4 rounded-lg border border-neutral-300">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">BK Anonim</h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Bagikan cerita Anda secara anonim. Suara Anda penting dan membantu kami menciptakan lingkungan yang lebih baik.
          </p>
        </div>
      </div>

      <!-- Guidelines Button -->
      <div class="text-center mb-6">
        <button
          @click="showGuidelines = true"
          class="bg-neutral-200/50 backdrop-blur-2xl px-6 py-3 rounded-lg border border-neutral-300 hover:bg-neutral-300/50 transition-all duration-200 flex items-center gap-2 mx-auto"
        >
          <Icon name="lucide:book-open" size="18" />
          <span>Panduan Penggunaan</span>
        </button>
      </div>

      <!-- Guidelines Modal -->
      <div v-if="showGuidelines" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="showGuidelines = false">
        <div class="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto" @click.stop>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Panduan Pengiriman Cerita Anonim</h3>
              <button @click="showGuidelines = false" class="text-gray-500 hover:text-gray-700">
                <Icon name="lucide:x" size="24" />
              </button>
            </div>
            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Jaga kerahasiaan identitas Anda - jangan sebutkan nama atau detail pribadi</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Tuliskan cerita dengan jelas dan lengkap</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Gunakan tag untuk membantu mengkategorikan cerita Anda</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="lucide:check-circle" size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Pengiriman sepenuhnya anonim dan rahasia</span>
              </li>
            </ul>
            <div class="mt-6 text-center">
              <button
                @click="showGuidelines = false"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-neutral-200/50 backdrop-blur-2xl p-6 sm:p-8 rounded-lg border border-neutral-300">
        <form @submit.prevent="submitStory" class="space-y-6">
          <div>
            <label for="story" class="block text-sm font-semibold text-gray-700 mb-3">
              Cerita Anda
            </label>
            <textarea
              id="story"
              v-model="story"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Ceritakan apa yang ada di pikiran Anda..."
              required
            ></textarea>
          </div>

          <div>
            <label for="tags" class="block text-sm font-semibold text-gray-700 mb-3">
              Tag (Opsional)
            </label>
            <input
              id="tags"
              v-model="tags"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="contoh: bullying, stres, persahabatan, nasihat"
            />
            <p class="text-xs text-gray-500 mt-2">
              Pisahkan beberapa tag dengan koma untuk membantu mengkategorikan cerita Anda
            </p>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
            <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Secara Anonim' }}</span>
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          Pengiriman Anda sepenuhnya anonim dan rahasia
        </div>
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-500 text-sm">
          Butuh bantuan segera? Hubungi tim konseling kami langsung.
        </p>
      </div>
    </div>
  </div>
</template>