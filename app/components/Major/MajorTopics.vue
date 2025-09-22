<script setup lang="ts">
import { ref } from "vue";
import { majorDatas } from "~/datas/data";
import type { MajorName } from "~/models/MajorName";

interface MajorTopic {
  id: string;
  title: string;
  description: string;
}

interface ExpandedItems {
  [key: string]: boolean;
}

const expandedLeftItems = ref<ExpandedItems>({});
const expandedRightItems = ref<ExpandedItems>({});

const route = useRoute();
const major = route.params.majorName as MajorName;

const leftColumnLanguages: MajorTopic[] = [
  {
    id: "visual-desktop",
    title: "Pemrograman Visual Berbasis Desktop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
  },
  {
    id: "python-1",
    title: "PYTHON",
    description:
      "Python adalah bahasa pemrograman tingkat tinggi yang mudah dipelajari dan sangat populer. Digunakan untuk pengembangan web, data science, machine learning, dan automasi. Python memiliki sintaks yang sederhana dan readable, membuatnya ideal untuk pemula maupun profesional.",
  },
  {
    id: "javascript",
    title: "JAVASCRIPT",
    description:
      "JavaScript adalah bahasa pemrograman yang paling populer untuk pengembangan web. Digunakan untuk membuat website interaktif, aplikasi mobile, dan bahkan aplikasi desktop. JavaScript berjalan di browser dan juga di server menggunakan Node.js.",
  },
  {
    id: "php",
    title: "PHP",
    description:
      "PHP adalah bahasa pemrograman server-side yang sangat populer untuk pengembangan web. Digunakan oleh platform besar seperti Facebook, WordPress, dan Wikipedia. PHP mudah dipelajari dan memiliki komunitas yang besar.",
  },
];

const rightColumnLanguages: MajorTopic[] = [
  {
    id: "python-2",
    title: "PYTHON",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
  },
  {
    id: "java",
    title: "JAVA",
    description:
      'Java adalah bahasa pemrograman yang kuat dan platform-independent. Digunakan untuk pengembangan aplikasi enterprise, aplikasi Android, dan sistem backend yang besar. Java mengikuti prinsip "Write Once, Run Anywhere".',
  },
  {
    id: "csharp",
    title: "C#",
    description:
      "C# adalah bahasa pemrograman yang dikembangkan oleh Microsoft. Sangat populer untuk pengembangan aplikasi Windows, web applications menggunakan .NET framework, dan game development menggunakan Unity.",
  },
  {
    id: "kotlin",
    title: "KOTLIN",
    description:
      "Kotlin adalah bahasa pemrograman modern yang dikembangkan oleh JetBrains. Sangat populer untuk pengembangan aplikasi Android dan dapat berjalan di JVM. Kotlin 100% interoperable dengan Java dan memiliki sintaks yang lebih concise.",
  },
];

const rightOpenOrder = ref<string[]>([]);
const leftOpenOrder = ref<string[]>([]);

const toggleLeftExpanded = (id: string): void => {
  if (expandedLeftItems.value[id]) {
    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: false,
    };
    leftOpenOrder.value = leftOpenOrder.value.filter((item) => item !== id);
  } else {
    if (leftOpenOrder.value.length >= 2) {
      const oldestId = leftOpenOrder.value[0] as string;
      expandedLeftItems.value = {
        ...expandedLeftItems.value,
        [oldestId]: false,
      };
      leftOpenOrder.value = leftOpenOrder.value.slice(1);
    }
    expandedLeftItems.value = {
      ...expandedLeftItems.value,
      [id]: true,
    };
    leftOpenOrder.value.push(id);
  }
};

const toggleRightExpanded = (id: string): void => {
  if (expandedRightItems.value[id]) {
    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: false,
    };
    rightOpenOrder.value = rightOpenOrder.value.filter((item) => item !== id);
  } else {
    if (rightOpenOrder.value.length >= 2) {
      const oldestId = rightOpenOrder.value[0] as string;
      expandedRightItems.value = {
        ...expandedRightItems.value,
        [oldestId]: false,
      };
      rightOpenOrder.value = rightOpenOrder.value.slice(1);
    }
    expandedRightItems.value = {
      ...expandedRightItems.value,
      [id]: true,
    };
    rightOpenOrder.value.push(id);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div class="space-y-4">
        <div v-for="lang in leftColumnLanguages" :key="lang.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            @click="toggleLeftExpanded(lang.id)"
            :class="[
              `w-full p-4 flex items-center justify-between transition-all duration-200 text-white font-semibold text-lg ${majorDatas[major]?.bgColor} ${majorDatas[major]?.hoverBgColor}`,
            ]"
          >
            <span>{{ lang.title }}</span>
            <svg
              v-if="expandedLeftItems[lang.id]"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <div
            :class="[
              'transition-all duration-300 ease-in-out overflow-hidden',
              expandedLeftItems[lang.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
            ]"
          >
            <div class="p-6 bg-white">
              <p class="text-gray-700 leading-relaxed">
                {{ lang.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="lang in rightColumnLanguages" :key="lang.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            @click="toggleRightExpanded(lang.id)"
            :class="[
              `w-full p-4 flex items-center justify-between transition-all duration-200 text-white font-semibold text-lg ${majorDatas[major]?.bgColor} ${majorDatas[major]?.hoverBgColor}`,
            ]"
          >
            <span>{{ lang.title }}</span>
            <svg
              v-if="expandedRightItems[lang.id]"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <div
            :class="[
              'transition-all duration-300 ease-in-out overflow-hidden',
              expandedRightItems[lang.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
            ]"
          >
            <div class="p-6 bg-white">
              <p class="text-gray-700 leading-relaxed">
                {{ lang.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
