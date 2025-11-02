<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { MajorData } from "~/models/MajorData";
import type { MajorName } from "~/models/MajorName";
import type { JobTitle } from "~/models/JobTitle";
import type { MajorTopic } from "~/models/MajorTopic";
import { useMinigameState } from "~/composables/useMinigameState";

const route = useRoute();
const major = (route.params.majorName as MajorName) || (route.path.split("/").pop() as MajorName);

// Helper function to shorten descriptions to first sentence or 50 chars
const shortenDescription = (desc: string | undefined): string => {
  if (!desc) return "";
  const firstSentence = desc.split(/[.!?]/)[0] || desc;
  return firstSentence.substring(0, 50).trim();
};

// Get minigame state from parent
const minigameState = useMinigameState();

const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");
const { data: majorMenus } = await useFetch("/api/majors/menus");
const { data: jobTitles } = await useFetch<Record<MajorName, JobTitle[]>>("/api/job-titles");
const { data: majorTopics } = await useFetch<Record<MajorName, MajorTopic[]>>("/api/major-topics");
const { data: toolsData } = await useFetch<Record<string, Array<{ name: string; icon: string; description: string }>>>(
  "/app/data/toolsData.json"
);

const headerClass = ref("bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10");
const sizeClass = ref("compact");
const isOpen = ref(false);

const menuItems = computed(() => majorMenus.value?.[major] || []);

// Karir section - dynamic from job titles
const karirSection = computed(() => {
  const jobs = jobTitles.value?.[major] || [];
  return {
    title: "Karir",
    submenu: jobs.map((job) => ({
      title: job.title,
      desc: shortenDescription(job.description),
      icon: `lucide:${job.icon}`,
      to: `#kesempatan-kerja`,
    })),
  };
});

// Kompetensi section - dynamic from major topics
const kompetensiSection = computed(() => {
  const topics = majorTopics.value?.[major] || [];
  return {
    title: "Kompetensi",
    submenu: topics.map((topic) => ({
      title: topic.title,
      desc: shortenDescription(topic.description),
      icon: "lucide:book-open",
      to: `#materi-pembelajaran`,
    })),
  };
});

// Tools section - dynamic from toolsData
const toolsSection = computed(() => {
  const tools = toolsData.value?.[major] || [];
  return {
    title: "Tools & Software",
    submenu: tools.map((tool: { name: string; icon: string; description: string }) => ({
      title: tool.name,
      desc: shortenDescription(tool.description),
      icon: tool.icon,
      to: "#tools-software",
    })),
  };
});

// Combined menu items with dynamic sections
const allMenuItems = computed(() => {
  const baseItems = menuItems.value || [];
  const dynamicSections = [];

  if (kompetensiSection.value?.submenu.length > 0) {
    dynamicSections.push(kompetensiSection.value);
  }
  if (karirSection.value?.submenu.length > 0) {
    dynamicSections.push(karirSection.value);
  }
  if (toolsSection.value?.submenu.length > 0) {
    dynamicSections.push(toolsSection.value);
  }

  return [...baseItems, ...dynamicSections];
});

onMounted(() => {
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      headerClass.value = "bg-white/30 backdrop-blur-[8px] border-b-white/30 shadow-lg shadow-orange-500/10";
      sizeClass.value = "compact";
    } else {
      headerClass.value = "bg-white/20 backdrop-blur-[8px] border-b-white/20 shadow-lg shadow-orange-500/10";
      sizeClass.value = "compact";
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});

if (!majorDatas.value?.[major]) {
  throw createError({ status: 404, statusMessage: "Jurusan yang Anda cari tidak ditemukan" });
}
</script>

<template>
  <header
    :class="[
      'z-100 border-b fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out',
      headerClass,
      minigameState.isRunning.value ? 'hidden' : '',
    ]"
  >
    <div
      :class="
        (sizeClass === 'full' ? 'p-4 gap-5' : 'p-3 gap-4') +
        ' flex justify-around items-center transition-all duration-500 ease-in-out'
      "
    >
      <div
        :class="
          (sizeClass === 'full' ? 'gap-5' : 'gap-3') +
          ' flex justify-center items-center transition-all duration-500 ease-in-out'
        "
      >
        <button
          @click="navigateTo('/')"
          class="flex items-center justify-center w-8 h-8 transition-colors duration-300 rounded-full hover:bg-white/20 cursor-pointer"
        >
          <Icon name="lucide:house" size="20" class="text-black" />
        </button>
        <NuxtImg
          :src="majorDatas?.[major]?.logo"
          :style="{ width: sizeClass === 'full' ? '60px' : '40px', transition: 'width 0.5s ease-in-out' }"
          alt="Logo Jurusan"
        />
        <div class="flex flex-col">
          <h2
            :style="{
              fontSize: sizeClass === 'full' ? '1.5rem' : '1.125rem',
              transition: 'font-size 0.5s ease-in-out',
            }"
            class="font-bold"
          >
            {{ majorDatas?.[major]?.short }}
          </h2>
          <p
            :style="{ fontSize: sizeClass === 'full' ? '1rem' : '0.875rem', transition: 'font-size 0.5s ease-in-out' }"
          >
            {{ majorDatas?.[major]?.nameMajor }}
          </p>
        </div>
      </div>

      <div
        :class="(sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'"
      >
        <div v-for="(item, index) in allMenuItems" :key="index" class="relative group">
          <div
            :class="
              (sizeClass === 'full' ? 'gap-3' : 'gap-2') +
              ' flex cursor-pointer items-center justify-center transition-all duration-500 ease-in-out'
            "
          >
            <p
              :style="{
                fontSize: sizeClass === 'full' ? '1rem' : '0.875rem',
                transition: 'font-size 0.5s ease-in-out',
              }"
              :class="`group-hover:${majorDatas?.[major]?.textColor || 'text-gray-900'} transition-colors duration-300`"
            >
              {{ item.title }}
            </p>
            <span class="inline-flex items-center transition-transform duration-500 ease-in-out group-hover:rotate-180">
              <Icon
                name="lucide:chevron-down"
                :size="sizeClass === 'full' ? 20 : 16"
                :style="{
                  transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform 0.5s ease-in-out',
                }"
              />
            </span>
          </div>
          <div
            class="absolute left-0 z-50 invisible w-64 mt-2 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 top-full group-hover:opacity-100 group-hover:visible"
          >
            <div class="py-2">
              <div
                v-for="(sub, subIndex) in item.submenu"
                :key="subIndex"
                class="px-4 py-3 transition-colors duration-200 cursor-pointer hover:bg-gray-50"
                @click="navigateTo(sub.to)"
              >
                <div class="flex items-center gap-3">
                  <Icon :name="sub.icon" size="20" :class="majorDatas?.[major]?.textColor || 'text-gray-900'" />
                  <div>
                    <p class="font-medium text-gray-900">{{ sub.title }}</p>
                    <p class="text-sm text-gray-600">{{ sub.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="transition-all duration-500 ease-in-out">
        <button class="cursor-pointer" @click="isOpen = !isOpen">
          <Icon
            name="lucide:align-justify"
            :size="sizeClass === 'full' ? 30 : 24"
            :style="{
              transform: sizeClass === 'full' ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.5s ease-in-out',
            }"
          />
        </button>
      </div>
    </div>
  </header>
  <MobileSidebar :is-open="isOpen" :menu-items="allMenuItems" @close="isOpen = false" />
</template>
