export function useThrottledScroll(callback: () => void, delay = 100) {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttledFn = () => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback();
    } else {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        callback();
      }, delay - (now - lastCall));
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", throttledFn, { passive: true });

    onUnmounted(() => {
      window.removeEventListener("scroll", throttledFn);
      if (timeoutId) clearTimeout(timeoutId);
    });
  });
}

export function useDebouncedResize(callback: () => void, delay = 200) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFn = () => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  };

  onMounted(() => {
    window.addEventListener("resize", debouncedFn, { passive: true });

    onUnmounted(() => {
      window.removeEventListener("resize", debouncedFn);
      if (timeoutId) clearTimeout(timeoutId);
    });
  });
}

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.3 }
) {
  const observer = ref<IntersectionObserver | null>(null);

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        callback(entry.isIntersecting);
      }
    }, options);

    if (target.value) {
      observer.value.observe(target.value);
    }

    onUnmounted(() => {
      observer.value?.disconnect();
    });
  });

  return observer;
}
