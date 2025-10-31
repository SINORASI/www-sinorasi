export function useIntersectionObserver(
  elementRef: Ref<HTMLElement | null>,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.3 }
) {
  const observer = ref<IntersectionObserver | null>(null);

  onMounted(() => {
    if (!elementRef.value) return;

    observer.value = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      callback(entry.isIntersecting, entry);
    }, options);

    observer.value.observe(elementRef.value);
  });

  onUnmounted(() => {
    observer.value?.disconnect();
  });

  return {
    observer,
    disconnect: () => observer.value?.disconnect(),
  };
}
