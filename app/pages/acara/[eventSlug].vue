<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div v-if="event" class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                <Icon name="lucide:home" size="16" class="mr-1" />
                Beranda
              </NuxtLink>
            </li>
            <li><Icon name="lucide:chevron-right" size="14" class="text-gray-400" /></li>
            <li>
              <NuxtLink to="/acara" class="text-gray-600 hover:text-blue-600 transition-colors">Acara</NuxtLink>
            </li>
            <li><Icon name="lucide:chevron-right" size="14" class="text-gray-400" /></li>
            <li class="text-blue-600 font-medium truncate max-w-xs" :title="event.title">{{ event.title }}</li>
          </ol>
        </nav>

        <!-- Main Content Card -->
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden mb-8">
          <!-- Header Image -->
          <div class="h-64 md:h-96 overflow-hidden">
            <img :src="event.imageUrl" :alt="event.title" class="w-full h-full object-cover" />
          </div>

          <!-- Content -->
          <div class="p-8 md:p-10">
            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
            
            <!-- Meta Info -->
            <div class="flex flex-wrap gap-4 mb-6 pb-6 border-b-2 border-blue-100">
              <div class="flex items-center text-gray-600">
                <Icon name="lucide:calendar" size="18" class="mr-2 text-blue-600" />
                <span>{{ event.date }}</span>
              </div>
              <div v-if="event.author" class="flex items-center text-gray-600">
                <Icon name="lucide:user" size="18" class="mr-2 text-blue-600" />
                <span>{{ event.author }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <Icon name="lucide:clock" size="18" class="mr-2 text-blue-600" />
                <span>{{ formatDate(event.publishedAt) }}</span>
              </div>
            </div>

            <!-- Event Details -->
            <p class="text-lg text-gray-700 leading-relaxed mb-8 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
              {{ event.details }}
            </p>

            <!-- Article Content -->
            <article class="prose prose-lg max-w-none">
              <div v-html="renderedContent"></div>
            </article>
          </div>
        </div>

        <!-- Related Events Section -->
        <section id="acara-lainnya" class="mt-12">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl shadow-xl rounded-2xl px-10 py-6 border border-orange-200 inline-block mb-8">
            <h2 class="text-2xl font-bold text-white">Acara Lainnya</h2>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="otherEvent in otherEvents" :key="otherEvent.id">
              <EventCard :event="otherEvent" />
            </div>
          </div>
        </section>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-20">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-12 max-w-2xl mx-auto">
          <Icon name="lucide:calendar-x" size="64" class="text-gray-300 mx-auto mb-6" />
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Acara Tidak Ditemukan</h1>
          <p class="text-gray-600 mb-8 text-lg">Maaf, acara yang Anda cari tidak tersedia.</p>
          <NuxtLink 
            to="/acara" 
            class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Icon name="lucide:arrow-left" size="18" />
            Kembali ke Acara
          </NuxtLink>
        </div>
      </div>
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