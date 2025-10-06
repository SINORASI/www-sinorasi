  <template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6 py-8">
      <div v-if="news" class="max-w-5xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-600">
            <li><NuxtLink to="/" class="hover:text-blue-600 font-medium">Beranda</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li><NuxtLink to="/berita" class="hover:text-blue-600 font-medium">Berita</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li class="text-gray-900 font-semibold truncate max-w-xs" :title="news.title">{{ news.title }}</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-10">
          <div class="mb-6">
            <img :src="news.thumbnail" :alt="news.title" class="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white" />
          </div>

          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8">
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in news.tags" :key="tag"
                    class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                {{ tag }}
              </span>
            </div>

            <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{{ news.title }}</h1>
            <p class="text-xl text-gray-600 mb-6 leading-relaxed">{{ news.subtitle }}</p>

            <div class="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-200">
              <div class="flex items-center gap-2">
                <Icon name="lucide:user" size="16" />
                <span v-if="news.author" class="font-medium">{{ news.author }}</span>
                <span v-else class="font-medium">Admin SMKN 2 Singosari</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:calendar" size="16" />
                <span class="font-medium">{{ formatDate(news.publishedAt) }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <article class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 md:p-12 mb-12">
          <div class="prose prose-lg max-w-none" v-html="renderedContent"></div>
        </article>

        <!-- Related News -->
        <section id="berita-lainnya" class="mt-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl p-6 shadow-xl rounded-2xl border border-blue-200 mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-white">Berita Lainnya</h2>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <NuxtLink
              v-for="relatedNews in relatedNews"
              :key="relatedNews.id"
              :to="`/berita/${relatedNews.slug}`"
              class="relative bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col"
            >
              <div class="h-40 overflow-hidden">
                <img :src="relatedNews.thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="relatedNews.title">
              </div>
              <div class="p-4 flex flex-col flex-grow">
                <span class="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full w-fit mb-2">
                  {{ relatedNews.tags[0] }}
                </span>
                <h3 class="font-bold text-gray-800 mb-2 flex-grow group-hover:text-blue-600 transition-colors line-clamp-2">{{ relatedNews.title }}</h3>
                <p class="text-xs text-gray-500">{{ formatDate(relatedNews.publishedAt) }}</p>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center max-w-2xl mx-auto">
        <Icon name="lucide:file-x" size="64" class="text-gray-300 mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
        <p class="text-gray-600 mb-8">Maaf, berita yang Anda cari tidak tersedia.</p>
        <NuxtLink to="/berita" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          <Icon name="lucide:arrow-left" size="18" />
          Kembali ke Berita
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~/models/News'

const route = useRoute()
const slug = route.params.slug as string

// Fetch single news from API
const { data: news } = await useFetch<News>(`/api/news/${slug}`)

// Fetch all news for related items
const { data: allNewsResponse } = await useFetch<{ data: News[], total: number }>('/api/news', {
  query: {
    limit: 5
  }
})

const relatedNews = computed(() => {
  if (!news.value || !allNewsResponse.value?.data) return []
  return allNewsResponse.value.data.filter((n: News) => n.id !== news.value!.id).slice(0, 4)
})

const renderedContent = computed(() => {
  if (!news.value) return ''

  let content = news.value.content

  content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
  content = content.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')

  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>')

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')

  content = content.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
  content = content.replace(/(<li.*<\/li>\n?)+/g, (match) => {
    if (match.includes('list-decimal')) return match
    return '<ol class="list-decimal list-inside mb-4">' + match + '</ol>'
  })

  content = content.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
  content = content.replace(/(<li.*<\/li>\n?)+/g, (match) => {
    if (match.includes('list-disc') || match.includes('list-decimal')) return match
    return '<ul class="list-disc list-inside mb-4">' + match + '</ul>'
  })

  content = content.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>')

  content = content.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')

  content = content.split('\n\n').map(paragraph => {
    if (paragraph.trim() === '') return ''
    if (paragraph.includes('<h') || paragraph.includes('<ul') || paragraph.includes('<ol') || paragraph.includes('<pre')) {
      return paragraph
    }
    return '<p class="mb-4">' + paragraph.replace(/\n/g, '<br>') + '</p>'
  }).join('')

  content = content.replace(/<p class="mb-4"><\/p>/g, '')
  content = content.replace(/<p class="mb-4"><br><\/p>/g, '')

  return content
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: news.value ? `${news.value.title} - SMKN 2 Singosari` : 'Berita Tidak Ditemukan',
  meta: [
    {
      name: 'description',
      content: news.value ? news.value.subtitle : 'Berita SMKN 2 Singosari'
    }
  ]
})
</script>

<style scoped>
.prose :deep(h1), .prose :deep(h2), .prose :deep(h3) {
  color: #1f2937;
}

.prose :deep(p) {
  color: #4b5563;
  line-height: 1.7;
}

.prose :deep(ul) {
  color: #4b5563;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>