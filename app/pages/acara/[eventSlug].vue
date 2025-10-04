<template>
  <div class="container mx-auto px-6 py-40">
    <div v-if="event" class="max-w-4xl mx-auto">
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><NuxtLink to="/" class="hover:text-blue-600">Beranda</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/acara" class="hover:text-blue-600">Acara</NuxtLink></li>
          <li>/</li>
          <li class="text-gray-900 truncate max-w-xs" :title="event.title">{{ event.title }}</li>
        </ol>
      </nav>

      <header class="mb-8">
        <div class="mb-4">
          <img :src="event.imageUrl" :alt="event.title" class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
        </div>

        <div class="mb-6">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
          <p class="text-lg text-gray-600 mb-4">{{ event.details }}</p>

          <div class="flex items-center text-sm text-gray-500 space-x-4">
            <span>{{ event.date }}</span>
            <span v-if="event.author">Oleh: {{ event.author }}</span>
            <span>Diterbitkan: {{ formatDate(event.publishedAt) }}</span>
          </div>
        </div>
      </header>

      <article class="prose prose-lg max-w-none">
        <div v-html="renderedContent"></div>
      </article>

      <section id="acara-lainnya" class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Acara Lainnya</h2>
        <div class="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          <div v-for="otherEvent in otherEvents" :key="otherEvent.id" class="flex-shrink-0 w-64">
            <EventCard :event="otherEvent" />
          </div>
        </div>
      </section>
    </div>

    <div v-else class="text-center py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Acara Tidak Ditemukan</h1>
      <p class="text-gray-600 mb-6">Maaf, acara yang Anda cari tidak tersedia.</p>
      <NuxtLink to="/acara" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Kembali ke Acara
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/models/Event'

const route = useRoute()
const eventSlug = route.params.eventSlug as string

// Fetch single event from API
const { data: event } = await useFetch<Event>(`/api/events/${eventSlug}`)

// Fetch all events for related items
const { data: allEventsResponse } = await useFetch<{ data: Event[], total: number }>('/api/events', {
  query: {
    limit: 5
  }
})

const otherEvents = computed(() => {
  if (!event.value || !allEventsResponse.value?.data) return []
  return allEventsResponse.value.data.filter((e: Event) => e.id !== event.value!.id).slice(0, 4)
})

const renderedContent = computed(() => {
  if (!event.value) return ''

  let content = event.value.content

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
  title: event.value ? `${event.value.title} - SMKN 2 Singosari` : 'Acara Tidak Ditemukan',
  meta: [
    {
      name: 'description',
      content: event.value ? event.value.details : 'Acara SMKN 2 Singosari'
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