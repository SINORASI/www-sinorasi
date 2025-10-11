<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 py-8 mx-auto sm:px-6">
      <div v-if="news" class="max-w-5xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-600">
            <li><NuxtLink to="/" class="font-medium hover:text-blue-600">Beranda</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li><NuxtLink to="/berita" class="font-medium hover:text-blue-600">Berita</NuxtLink></li>
            <li><Icon name="lucide:chevron-right" size="16" /></li>
            <li class="max-w-xs font-semibold text-gray-900 truncate" :title="news.title">{{ news.title }}</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-10">
          <div class="mb-6">
            <img
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
                class="px-4 py-2 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
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
        </header>

        <!-- Article Content -->
        <article class="p-8 mb-12 bg-white border-2 border-blue-100 shadow-xl rounded-2xl md:p-12">
          <div class="prose prose-lg max-w-none" v-html="renderedContent"></div>
        </article>

        <!-- Related News -->
        <section id="berita-lainnya" class="mt-12">
          <div
            class="p-6 mb-8 border border-blue-200 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-2xl rounded-2xl"
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
                <img
                  :src="relatedNews.thumbnail"
                  class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  :alt="relatedNews.title"
                />
              </div>
              <div class="flex flex-col flex-grow p-4">
                <span class="px-3 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full w-fit">
                  {{ relatedNews.tags[0] }}
                </span>
                <h3
                  class="flex-grow mb-2 font-bold text-gray-800 transition-colors group-hover:text-blue-600 line-clamp-2"
                >
                  {{ relatedNews.title }}
                </h3>
                <p class="text-xs text-gray-500">{{ formatDate(relatedNews.publishedAt) }}</p>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>

      <!-- Not Found State -->
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

// Fetch single news from API
const { data: news } = await useFetch<News>(`/api/news/${slug}`);

// Fetch all news for related items
const { data: allNewsResponse } = await useFetch<{ data: News[]; total: number }>("/api/news", {
  query: {
    limit: 5,
  },
});

const relatedNews = computed(() => {
  if (!news.value || !allNewsResponse.value?.data) return [];
  return allNewsResponse.value.data.filter((n: News) => n.id !== news.value!.id).slice(0, 4);
});

const renderedContent = computed(() => {
  if (!news.value) return "";

  let content = news.value.content;

  content = content.replace(/^### (.*$)/gim, '<h3 class="mt-6 mb-3 text-xl font-semibold text-gray-800">$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-800">$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1 class="mt-8 mb-4 text-3xl font-bold text-gray-800">$1</h1>');

  content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");

  content = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>'
  );

  content = content.replace(/^\d+\. (.*$)/gim, '<li class="mb-2 ml-4">$1</li>');
  content = content.replace(/(<li.*<\/li>\n?)+/g, (match) => {
    if (match.includes("list-decimal")) return match;
    return '<ol class="mb-4 text-gray-600 list-decimal list-inside">' + match + "</ol>";
  });

  content = content.replace(/^\- (.*$)/gim, '<li class="mb-2 ml-4">$1</li>');
  content = content.replace(/(<li.*<\/li>\n?)+/g, (match) => {
    if (match.includes("list-disc") || match.includes("list-decimal")) return match;
    return '<ul class="mb-4 text-gray-600 list-disc list-inside">' + match + "</ul>";
  });

  content = content.replace(
    /```([\s\S]*?)```/g,
    '<pre class="p-4 mb-4 overflow-x-auto bg-gray-100 rounded-lg"><code>$1</code></pre>'
  );

  content = content.replace(/`([^`]+)`/g, '<code class="px-2 py-1 text-sm bg-gray-100 rounded">$1</code>');

  content = content
    .split("\n\n")
    .map((paragraph) => {
      if (paragraph.trim() === "") return "";
      if (
        paragraph.includes("<h") ||
        paragraph.includes("<ul") ||
        paragraph.includes("<ol") ||
        paragraph.includes("<pre")
      ) {
        return paragraph;
      }
      return '<p class="mb-4 text-gray-600 leading-[1.7]">' + paragraph.replace(/\n/g, "<br>") + "</p>";
    })
    .join("");

  content = content.replace(/<p class="mb-4"><\/p>/g, "");
  content = content.replace(/<p class="mb-4"><br><\/p>/g, "");

  return content;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

