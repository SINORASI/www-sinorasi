<template>
  <!-- ALWAYS use plain img tag for /images/* paths to avoid IPX processing -->
  <img 
    v-if="shouldUseDirectImg"
    :src="imageUrl"
    :alt="alt"
    :width="width"
    :height="height"
    :class="imgClass"
    :loading="loading"
    :decoding="decoding"
  />
  <!-- Use NuxtImg only for truly external images that need processing -->
  <NuxtImg
    v-else
    :src="imageUrl"
    :alt="alt"
    :width="width"
    :height="height"
    :class="imgClass"
    :loading="loading"
    :decoding="decoding"
    :provider="provider"
    :preload="preload"
    :fit="fit"
    :quality="quality"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Smart Image component that handles both local and external images
 * CRITICAL: /public/images/* files MUST use plain <img> tags
 * Do NOT use NuxtImg for static assets as it causes IPX 404 errors
 */

interface Props {
  src: string;
  srcset?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  class?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  provider?: string;
  preload?: boolean;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  quality?: number;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  loading: "lazy",
  decoding: "async",
  provider: "ipx",
  preload: false,
  fit: "cover",
  quality: 80,
});

// Decide whether to use direct img tag or NuxtImg
const shouldUseDirectImg = computed(() => {
  // Any absolute path is treated as a static asset and should use a plain <img> tag.
  // This is critical in production to avoid IPX errors for local files.
  if (props.src.startsWith('/')) {
    return true;
  }

  // External URLs always use direct img tag
  if (props.src.startsWith('http://') || props.src.startsWith('https://')) {
    return true;
  }

  // WordPress uploads always use direct img tag
  if (props.src.includes('/wp-content/uploads/')) {
    return true;
  }

  // Everything else: let NuxtImg handle it
  return false;
});

// Choose the best image URL
const imageUrl = computed(() => {
  // If srcset exists and we're using direct img, extract best quality
  if (shouldUseDirectImg.value && props.srcset) {
    const urls = props.srcset.split(",").map(item => item.trim());
    if (urls.length > 0) {
      const lastItem = urls[urls.length - 1];
      if (lastItem) {
        const urlPart = lastItem.split(/\s+/)[0];
        if (urlPart) return urlPart;
      }
    }
  }

  return props.src;
});

// Generate CSS class
const imgClass = computed(() => {
  const classes: string[] = [];
  if (props.class) {
    classes.push(props.class);
  }
  return classes.join(" ");
});
</script>

<style scoped>
img, :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
