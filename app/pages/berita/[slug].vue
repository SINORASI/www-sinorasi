<template>
  <div class="container mx-auto px-6 py-12">
    <div v-if="news" class="max-w-4xl mx-auto">
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><NuxtLink to="/" class="hover:text-blue-600">Beranda</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/berita" class="hover:text-blue-600">Berita</NuxtLink></li>
          <li>/</li>
          <li class="text-gray-900">{{ news.title }}</li>
        </ol>
      </nav>

      <header class="mb-8">
        <div class="mb-4">
          <img :src="news.thumbnail" :alt="news.title" class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
        </div>

        <div class="mb-6">
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in news.tags" :key="tag"
                  class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ tag }}
            </span>
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ news.title }}</h1>
          <p class="text-lg text-gray-600 mb-4">{{ news.subtitle }}</p>

          <div class="flex items-center text-sm text-gray-500 space-x-4">
            <span v-if="news.author">Oleh: {{ news.author }}</span>
            <span>Diterbitkan: {{ formatDate(news.publishedAt) }}</span>
          </div>
        </div>
      </header>

      <article class="prose prose-lg max-w-none">
        <div v-html="renderedContent"></div>
      </article>

      <section class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Berita Lainnya</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard v-for="relatedNews in relatedNews" :key="relatedNews.id" :news="relatedNews" />
        </div>
      </section>
    </div>

    <div v-else class="text-center py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
      <p class="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak tersedia.</p>
      <NuxtLink to="/berita" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Kembali ke Berita
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newsData } from '~/datas/data'
import type { News } from '~/models/News'

const route = useRoute()
const slug = route.params.slug as string

const news = computed(() => {
  return newsData.find(n => n.slug === slug)
})

const relatedNews = computed(() => {
  if (!news.value) return []
  return newsData.filter(n => n.id !== news.value!.id).slice(0, 3)
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
  title: news.value ? `${news.value.title} - SMKN 1 Sinorasi` : 'Berita Tidak Ditemukan',
  meta: [
    {
      name: 'description',
      content: news.value ? news.value.subtitle : 'Berita SMKN 1 Sinorasi'
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
</style>