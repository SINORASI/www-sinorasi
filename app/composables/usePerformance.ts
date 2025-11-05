// app/composables/usePerformance.ts
// Composable for managing performance-related concerns

import { ref, onMounted, onUnmounted } from "vue";

interface PerformanceMetrics {
  navigationTiming?: PerformanceTiming;
  resourceTiming?: PerformanceResourceTiming[];
  firstPaint?: number;
  firstContentfulPaint?: number;
}

export const usePerformance = () => {
  const metrics = ref<PerformanceMetrics>({});
  const isSlowConnection = ref(false);
  const isReducedMotion = ref(false);

  onMounted(() => {
    // Check for reduced motion preference
    isReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Detect slow connections
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      isSlowConnection.value =
        connection.effectiveType === "3g" || connection.effectiveType === "4g" || connection.saveData === true;
    }

    // Collect performance metrics
    if ("performance" in window) {
      const perfData = performance.getEntriesByType("navigation");
      if (perfData.length > 0) {
        metrics.value.navigationTiming = perfData[0] as unknown as PerformanceTiming;
      }

      // First Paint metrics
      const paintEntries = performance.getEntriesByType("paint");
      paintEntries.forEach((entry) => {
        if (entry.name === "first-paint") {
          metrics.value.firstPaint = entry.startTime;
        } else if (entry.name === "first-contentful-paint") {
          metrics.value.firstContentfulPaint = entry.startTime;
        }
      });
    }
  });

  const reportMetrics = () => {
    if ("performance" in window && "measure" in performance) {
      try {
        performance.measure("app-load-time", "navigationStart", "domContentLoaded");
        const measures = performance.getEntriesByName("app-load-time");
        if (measures.length > 0) {
          const measure = measures[0] as PerformanceMeasure;
          console.log(`App load time: ${measure.duration.toFixed(2)}ms`);
        }
      } catch (e) {
        console.log("Performance measurement not available");
      }
    }
  };

  return {
    metrics,
    isSlowConnection,
    isReducedMotion,
    reportMetrics,
  };
};
