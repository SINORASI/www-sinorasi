<template>
  <div class="min-h-screen py-24 bg-linear-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <div v-if="news" class="max-w-5xl mx-auto">
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-600">
            <li><NuxtLink to="/" class="font-medium hover:text-blue-600">Beranda</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li><NuxtLink to="/berita" class="font-medium hover:text-blue-600">Berita</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li class="max-w-xs font-semibold text-gray-900 truncate" :title="news.title">{{ news.title }}</li>
          </ol>
        </nav>

        <div class="mb-10">
          <div class="mb-6">
            <SmartImage
              :src="news.thumbnail"
              :alt="news.title"
              class="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>

          <div class="p-8 bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in news.tags"
                :key="tag"
                class="px-4 py-2 text-xs font-semibold text-white rounded-full bg-linear-to-r from-blue-500 to-blue-600"
              >
                {{ tag }}
              </span>
            </div>

            <h1 class="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">{{ news.title }}</h1>
            <p class="mb-6 text-xl leading-relaxed text-gray-600">{{ news.subtitle }}</p>

            <div class="flex items-center gap-6 pt-4 text-sm text-gray-500 border-t border-gray-200">
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
        </div>

        <article class="mb-12 bg-white border-2 border-blue-100 shadow-xl rounded-2xl prose-article">
          <div class="prose-content" v-html="news.content"></div>
        </article>

        <section id="berita-lainnya" class="mt-12">
          <div
            class="p-6 mb-8 border border-blue-200 shadow-xl bg-linear-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-2xl font-bold text-white md:text-3xl">Berita Lainnya</h2>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
              v-for="relatedNews in relatedNews"
              :key="relatedNews.id"
              :to="`/berita/${relatedNews.slug}`"
              class="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl group hover:shadow-2xl hover:border-blue-200"
            >
              <div class="h-40 overflow-hidden">
                <SmartImage
                  :src="relatedNews.thumbnail"
                  class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  :alt="relatedNews.title"
                />
              </div>
              <div class="flex flex-col grow p-4">
                <span class="px-3 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full w-fit">
                  {{ relatedNews.tags[0] }}
                </span>
                <h3
                  class="grow mb-2 font-bold text-gray-800 transition-colors group-hover:text-blue-600 line-clamp-2"
                >
                  {{ relatedNews.title }}
                </h3>
                <p class="text-xs text-gray-500">{{ formatDate(relatedNews.publishedAt) }}</p>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>

      <div v-else class="max-w-2xl p-12 mx-auto text-center bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
        <Icon name="lucide:file-x" size="64" class="mx-auto mb-4 text-gray-300" />
        <h1 class="mb-4 text-3xl font-bold text-gray-900">Berita Tidak Ditemukan</h1>
        <p class="mb-8 text-gray-600">Maaf, berita yang Anda cari tidak tersedia.</p>
        <NuxtLink
          to="/berita"
          class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          <Icon name="lucide:arrow-left" size="18" />
          Kembali ke Berita
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { News } from "~/models/News";

const route = useRoute();
const slug = route.params.slug as string;

const { data: news } = await useFetch<News>(`/api/news/${slug}`);

const { data: allNewsResponse } = await useFetch<{ data: News[]; total: number }>("/api/news", {
  query: {
    limit: 5,
  },
});

const relatedNews = computed(() => {
  if (!news.value || !allNewsResponse.value?.data) return [];
  return allNewsResponse.value.data.filter((n: News) => n.id !== news.value?.id).slice(0, 4);
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

useHead({
  title: news.value ? `${news.value.title} - SMKN 2 Singosari` : "Berita Tidak Ditemukan",
  meta: [
    {
      name: "description",
      content: news.value ? news.value.subtitle : "Berita SMKN 2 Singosari",
    },
  ],
});
</script>

<style scoped>
.prose-article {
  padding: 2rem;
}

@media (min-width: 768px) {
  .prose-article {
    padding: 3rem;
  }
}

.prose-content :deep(*) {
  max-width: 100%;
}

/* Paragraph Styles */
.prose-content :deep(p) {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

/* Heading Styles */
.prose-content :deep(h1) {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #3b82f6;
  padding-bottom: 0.5rem;
}

.prose-content :deep(h2) {
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 1.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #60a5fa;
  padding-bottom: 0.5rem;
}

.prose-content :deep(h3) {
  color: #374151;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.35;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2563eb;
}

.prose-content :deep(h4) {
  color: #374151;
  font-size: 1.15rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
}

.prose-content :deep(h5) {
  color: #4b5563;
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

/* Text Formatting */
.prose-content :deep(em),
.prose-content :deep(i) {
  color: inherit;
  font-style: italic;
  font-weight: 500;
  color: #2563eb;
}

.prose-content :deep(strong),
.prose-content :deep(b) {
  color: #1f2937;
  font-weight: 700;
}

/* Lists */
.prose-content :deep(ul),
.prose-content :deep(ol) {
  color: #4b5563;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
}

.prose-content :deep(ul) {
  list-style-type: disc;
}

.prose-content :deep(ol) {
  list-style-type: decimal;
}

.prose-content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.7;
  color: #4b5563;
}

.prose-content :deep(li > p) {
  margin-bottom: 0.5rem;
}

.prose-content :deep(li > ul),
.prose-content :deep(li > ol) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Blockquotes */
.prose-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
  background-color: #f0f9ff;
  padding: 1rem;
  padding-left: 1.5rem;
  border-radius: 0.5rem;
}

.prose-content :deep(blockquote p) {
  margin-bottom: 0;
  color: #1f2937;
}

/* Links */
.prose-content :deep(a) {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #93c5fd;
  transition: all 0.3s ease;
}

.prose-content :deep(a:hover) {
  color: #1d4ed8;
  background-color: #eff6ff;
  border-bottom-color: #3b82f6;
  padding: 0.125rem 0.25rem;
}

/* Code */
.prose-content :deep(code) {
  background-color: #f3f4f6;
  color: #d97706;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.prose-content :deep(pre) {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  line-height: 1.5;
}

.prose-content :deep(pre code) {
  background-color: transparent;
  color: #f3f4f6;
  padding: 0;
  border-radius: 0;
}

/* Images & Figures */
.prose-content :deep(figure) {
  margin: 2rem 0;
  text-align: center;
}

.prose-content :deep(figure img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: block;
  margin: 0 auto 1rem;
}

.prose-content :deep(figcaption) {
  color: #6b7280;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.75rem;
}

.prose-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
}

/* Horizontal Rules */
.prose-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #3b82f6, transparent);
  margin: 2rem 0;
}

/* Table Styles */
.prose-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose-content :deep(th) {
  background-color: #dbeafe;
  color: #1e40af;
  font-weight: 600;
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #3b82f6;
}

.prose-content :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
}

.prose-content :deep(tbody tr:hover) {
  background-color: #f0f9ff;
}

/* Entry Content Wrapper */
.prose-content :deep(.entry-content) {
  width: 100%;
}

.prose-content :deep(.entry-content > *:first-child) {
  margin-top: 0;
}

/* Images in Figure Elements */
.prose-content :deep(.wp-block-image) {
  margin: 2rem 0;
  text-align: center;
}

.prose-content :deep(.wp-block-image img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prose-content :deep(.wp-block-image.size-large) {
  max-width: 100%;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
