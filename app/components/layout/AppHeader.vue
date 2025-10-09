<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

const headerClass = ref("bg-transparent border-b-transparent");
const sizeClass = ref("full");
const isSidebarOpen = ref(false);
const route = useRoute();
const scrollItems = ref<Array<{ id: string; label: string }>>([]);

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const populateScrollItems = async () => {
  await nextTick();
  scrollItems.value = [];
  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => {
    const h2 = section.querySelector("h2");
    if (h2) {
      scrollItems.value.push({ id: section.id, label: h2.textContent?.trim() || section.id });
    }
  });
};

onMounted(() => {
  populateScrollItems();
});

watch(
  () => route.path,
  () => {
    // Wait for next tick and a bit more for the page to fully render
    nextTick(() => {
      setTimeout(() => {
        populateScrollItems();
      }, 150);
    });
  }
);

onMounted(() => {
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      headerClass.value = "bg-neutral-600/30 backdrop-blur-2xl border-b-neutral-400";
      sizeClass.value = "compact";
    } else {
      headerClass.value = "bg-transparent border-b-transparent";
      sizeClass.value = "full";
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<template>
  <header :class="['z-100 border-b-1 fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out', headerClass]">
    <div
      :class="
        (sizeClass === 'full' ? 'p-4 gap-6' : 'p-3 gap-4') +
        ' flex items-center justify-around transition-all duration-500 ease-in-out'
      "
    >
      <NuxtLink
        to="/"
        class="flex items-center justify-center transition-all duration-500 ease-in-out"
        :class="sizeClass === 'full' ? 'gap-5' : 'gap-3'"
      >
        <img
          :src="'/images/logo-smk.webp'"
          :style="{ width: sizeClass === 'full' ? '80px' : '50px', transition: 'width 0.5s ease-in-out' }"
          alt="Logo SMKN 2 Singosari"
        />
        <div class="flex flex-col">
          <h2
            :style="{
              fontSize: sizeClass === 'full' ? '1.3rem' : '1.125rem',
              transition: 'font-size 0.5s ease-in-out',
            }"
            class="font-bold"
          >
            SMKN 2 Singosari
          </h2>
          <p
            class="-mt-1"
            :style="{ fontSize: sizeClass === 'full' ? '1rem' : '0.875rem', transition: 'font-size 0.5s ease-in-out' }"
          >
            Inovasi Raih Prestasi
          </p>
        </div>
      </NuxtLink>
      <div
        v-if="scrollItems.length > 0"
        :class="(sizeClass === 'full' ? 'gap-5' : 'gap-4') + ' hidden md:flex transition-all duration-500 ease-in-out'"
      >
        <button
          v-for="item in scrollItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          :style="{
            fontSize: sizeClass === 'full' ? '1rem' : '0.875rem',
            transition: 'font-size 0.5s ease-in-out',
          }"
          class="transition-colors duration-300 cursor-pointer hover:text-blue-600"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="transition-all duration-500 ease-in-out">
        <button class="cursor-pointer" @click="isSidebarOpen = !isSidebarOpen">
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

  <MobileSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
</template>
