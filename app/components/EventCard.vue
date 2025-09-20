<template>
  <div>
    <div class="flex items-center justify-between py-8">
      <!-- Event Details -->
      <div class="flex flex-col h-full justify-between pr-12">
        <div>
          <p class="text-lg font-semibold text-gray-700">{{ date }}</p>
        </div>
        <div class="my-5">
          <h3 class="text-4xl font-bold text-gray-900 leading-tight">
            {{ title }}
          </h3>
        </div>
        <div>
          <p class="text-base text-gray-600">{{ details }}</p>
        </div>
      </div>

      <!-- Event Image -->
      <div class="flex-shrink-0">
        <img
          :src="imageUrl"
          alt="Event Image"
          class="w-64 h-64 object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
    <!-- Bottom Separator -->
    <div class="border-t border-gray-400"></div>
  </div>
</template>

<script setup>
defineProps({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>