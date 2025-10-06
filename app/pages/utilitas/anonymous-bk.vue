<script setup lang="ts">
const story = ref('')
const tags = ref('')
const isSubmitting = ref(false)
const showGuidelines = ref(false)

useHead({
  title: 'Anonymous BK - Utilitas - SMKN 2 Singosari',
  meta: [
    {
      name: 'description',
      content: 'Sampaikan cerita atau keluhan Anda secara anonim kepada BK SMK Negeri 2 Singosari.'
    }
  ]
});

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
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-2xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-blue-200 inline-block mb-4">
            <h1 class="text-3xl md:text-4xl font-bold text-white">BK Anonim</h1>
          </div>
          <p class="text-gray-600 text-lg max-w-xl mx-auto">
            Bagikan cerita Anda secara anonim. Suara Anda penting dan membantu kami menciptakan lingkungan yang lebih baik.
          </p>
        </div>

        <!-- Guidelines Button -->
        <div class="text-center mb-8">
          <button
            @click="showGuidelines = true"
            class="bg-white border-2 border-blue-100 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <Icon name="lucide:book-open" size="20" />
            <span>Panduan Penggunaan</span>
          </button>
        </div>

        <!-- Guidelines Modal -->
        <Teleport to="body">
          <Transition name="dialog">
            <div v-if="showGuidelines" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="showGuidelines = false">
              <div class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-blue-100" @click.stop>
                <div class="p-8">
                  <div class="flex justify-between items-center mb-6">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl px-6 py-3 border border-blue-200">
                      <h3 class="text-lg font-bold text-white">Panduan Penggunaan</h3>
                    </div>
                    <button @click="showGuidelines = false" class="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
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
                      class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg"
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
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-10">
          <form @submit.prevent="submitStory" class="space-y-6">
            <div>
              <label for="story" class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:message-square" size="18" class="mr-2 text-blue-600" />
                Cerita Anda
              </label>
              <textarea
                id="story"
                v-model="story"
                rows="6"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition"
                placeholder="Ceritakan apa yang ada di pikiran Anda..."
                required
              ></textarea>
            </div>

            <div>
              <label for="tags" class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="lucide:tag" size="18" class="mr-2 text-orange-600" />
                Tag (Opsional)
              </label>
              <input
                id="tags"
                v-model="tags"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="contoh: bullying, stres, persahabatan, nasihat"
              />
              <p class="text-xs text-gray-500 mt-2 ml-1">
                Pisahkan beberapa tag dengan koma untuk membantu mengkategorikan cerita Anda
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
              <Icon v-else name="lucide:send" size="20" />
              <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Secara Anonim' }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <div class="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
              <p class="text-sm text-gray-700 flex items-center justify-center gap-2">
                <Icon name="lucide:shield-check" size="18" class="text-blue-600" />
                Pengiriman Anda sepenuhnya anonim dan rahasia
              </p>
            </div>
          </div>
        </div>

        <!-- Help Section -->
        <div class="mt-8 text-center bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-6">
          <Icon name="lucide:headphones" size="32" class="text-orange-600 mx-auto mb-3" />
          <p class="text-gray-700 font-semibold mb-2">Butuh bantuan segera?</p>
          <p class="text-gray-600">Hubungi tim konseling kami langsung.</p>
        </div>
      </div>
    </div>
  </div>
</template>