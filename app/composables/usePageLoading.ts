import { ref, watch } from 'vue';
import { useNuxtApp, useRoute } from '#app';

/**
 * Composable to manage page loading state during navigation
 * Handles loading overlay display and prevents layout shift
 */
export const usePageLoading = () => {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const isLoading = ref(true);

  // Listen for page loading start/end
  nuxtApp.hook("page:loading:start", () => {
    isLoading.value = true;
  });

  nuxtApp.hook("page:loading:end", () => {
    // Delay hiding loading to allow all content to render
    setTimeout(() => {
      isLoading.value = false;
    }, 100);
  });

  // Watch route changes for debugging
  watch(
    () => route.path,
    (newPath, oldPath) => {
      if (oldPath && newPath !== oldPath) {
        // Route changed, loading should be managed by page hooks
      }
    }
  );

  // Manage document body overflow
  watch(isLoading, (loading) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = loading ? 'hidden' : '';
    }
  });

  return {
    isLoading,
  };
};
