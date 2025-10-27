<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div v-if="event" class="max-w-4xl mx-auto">
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="flex items-center text-gray-600 transition-colors hover:text-blue-600">
                <Icon name="lucide:home" size="16" class="mr-1" />
                Beranda
              </NuxtLink>
            </li>
            <li><Icon name="lucide:chevron-right" size="14" class="text-gray-400" /></li>
            <li>
              <NuxtLink to="/acara" class="text-gray-600 transition-colors hover:text-blue-600">Acara</NuxtLink>
            </li>
            <li><Icon name="lucide:chevron-right" size="14" class="text-gray-400" /></li>
            <li class="max-w-xs font-medium text-blue-600 truncate" :title="event.title">{{ event.title }}</li>
          </ol>
        </nav>

        <div class="mb-8 overflow-hidden bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <div class="h-64 overflow-hidden md:h-96">
            <NuxtImg :src="event.imageUrl" :alt="event.title" class="object-cover w-full h-full" />
          </div>

          <div class="p-8 md:p-10">
            <h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ event.title }}</h1>

            <div class="flex flex-wrap gap-4 pb-6 mb-6 border-b-2 border-blue-100">
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

            <p class="p-4 mb-8 text-lg leading-relaxed text-gray-700 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
              {{ event.details }}
            </p>

            <article class="prose prose-lg max-w-none">
              <div v-html="renderedContent"></div>
            </article>
          </div>
        </div>

        <section id="acara-lainnya" class="mt-12">
          <div
            class="inline-block px-10 py-6 mb-8 border border-orange-200 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-2xl rounded-2xl"
          >
            <h2 class="text-2xl font-bold text-white">Acara Lainnya</h2>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="otherEvent in otherEvents" :key="otherEvent.id">
              <EventCard :event="otherEvent" />
            </div>
          </div>
        </section>
      </div>

      <div v-else class="py-20 text-center">
        <div class="max-w-2xl p-12 mx-auto bg-white border-2 border-blue-100 shadow-xl rounded-2xl">
          <Icon name="lucide:calendar-x" size="64" class="mx-auto mb-6 text-gray-300" />
          <h1 class="mb-4 text-3xl font-bold text-gray-900">Acara Tidak Ditemukan</h1>
          <p class="mb-8 text-lg text-gray-600">Maaf, acara yang Anda cari tidak tersedia.</p>
          <NuxtLink
            to="/acara"
            class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
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
import type { Event } from "~/models/Event";

const route = useRoute();
const eventSlug = route.params.eventSlug as string;

const { data: event } = await useFetch<Event>(`/api/events/${eventSlug}`);

const { data: allEventsResponse } = await useFetch<{ data: Event[]; total: number }>("/api/events", {
  query: {
    limit: 5,
  },
});

const otherEvents = computed(() => {
  if (!event.value || !allEventsResponse.value?.data) return [];
  return allEventsResponse.value.data.filter((e: Event) => e.id !== event.value?.id).slice(0, 4);
});

const renderedContent = computed(() => {
  if (!event.value) return "";

  let content = event.value.content;

  content = content.replace(/^### (.*$)/gim, '<h3 class="mt-6 mb-3 text-xl font-semibold text-gray-900">$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1 class="mt-8 mb-4 text-3xl font-bold text-gray-900">$1</h1>');

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

  content = content.replace(/^- (.*$)/gim, '<li class="mb-2 ml-4">$1</li>');
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
      return '<p class="mb-4 leading-relaxed text-gray-600">' + paragraph.replace(/\n/g, "<br>") + "</p>";
    })
    .join("");

  content = content.replace(/<p class="mb-4 leading-relaxed text-gray-600"><\/p>/g, "");
  content = content.replace(/<p class="mb-4 leading-relaxed text-gray-600"><br><\/p>/g, "");

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
  title: event.value ? `${event.value.title} - SMKN 2 Singosari` : "Acara Tidak Ditemukan",
  meta: [
    {
      name: "description",
      content: event.value ? event.value.details : "Acara SMKN 2 Singosari",
    },
  ],
});
</script>
