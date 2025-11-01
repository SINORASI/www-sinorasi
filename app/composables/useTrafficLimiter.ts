// composables/useTrafficLimiter.ts
import { ref, computed } from "vue";

interface UsageLimitData {
  monthKey: string; // "YYYY-MM" format to track monthly resets
  requestCount: number;
  lastUpdated: string;
}

const STORAGE_KEY = "traffic-tracker-limit";
const REQUEST_LIMIT_PER_MONTH = 5;

/**
 * Get the current month key in YYYY-MM format
 */
const getCurrentMonthKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

/**
 * Initialize or retrieve usage limit data from localStorage
 */
const getUsageLimitData = (): UsageLimitData => {
  if (typeof window === "undefined") {
    return {
      monthKey: getCurrentMonthKey(),
      requestCount: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        monthKey: getCurrentMonthKey(),
        requestCount: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    const data: UsageLimitData = JSON.parse(stored);

    // Check if the month has changed - if so, reset the counter
    const currentMonthKey = getCurrentMonthKey();
    if (data.monthKey !== currentMonthKey) {
      return {
        monthKey: currentMonthKey,
        requestCount: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    return data;
  } catch (error) {
    console.error("Error reading usage limit data:", error);
    return {
      monthKey: getCurrentMonthKey(),
      requestCount: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
};

/**
 * Save usage limit data to localStorage
 */
const saveUsageLimitData = (data: UsageLimitData): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving usage limit data:", error);
  }
};

export const useTrafficLimiter = () => {
  const usageData = ref<UsageLimitData>(getUsageLimitData());

  /**
   * Get the current request count
   */
  const getCurrentCount = (): number => {
    const data = getUsageLimitData();
    usageData.value = data;
    return data.requestCount;
  };

  /**
   * Check if the user has remaining requests
   */
  const hasRemainingRequests = (): boolean => {
    const count = getCurrentCount();
    return count < REQUEST_LIMIT_PER_MONTH;
  };

  /**
   * Get remaining requests count
   */
  const getRemainingRequests = (): number => {
    const count = getCurrentCount();
    return Math.max(0, REQUEST_LIMIT_PER_MONTH - count);
  };

  /**
   * Get progress percentage (0-100)
   */
  const getProgressPercentage = (): number => {
    const count = getCurrentCount();
    return Math.min(100, (count / REQUEST_LIMIT_PER_MONTH) * 100);
  };

  /**
   * Increment the request count after a successful API call
   */
  const incrementRequestCount = (): void => {
    const data = getUsageLimitData();
    data.requestCount += 1;
    data.lastUpdated = new Date().toISOString();
    usageData.value = data;
    saveUsageLimitData(data);
  };

  /**
   * Check if limit is exceeded and throw error if needed
   */
  const checkAndEnforceLimit = (): void => {
    if (!hasRemainingRequests()) {
      throw new Error(
        `Anda telah mencapai batas penggunaan bulanan (${REQUEST_LIMIT_PER_MONTH} permintaan). Silakan coba lagi bulan depan.`
      );
    }
  };

  /**
   * Get formatted usage message
   */
  const getUsageMessage = (): string => {
    const remaining = getRemainingRequests();
    const used = getCurrentCount();
    return `${used}/${REQUEST_LIMIT_PER_MONTH} permintaan digunakan. ${remaining} tersisa bulan ini.`;
  };

  /**
   * Reset usage (for testing purposes only)
   */
  const resetUsage = (): void => {
    const data: UsageLimitData = {
      monthKey: getCurrentMonthKey(),
      requestCount: 0,
      lastUpdated: new Date().toISOString(),
    };
    usageData.value = data;
    saveUsageLimitData(data);
  };

  return {
    usageData: computed(() => usageData.value),
    getCurrentCount,
    hasRemainingRequests,
    getRemainingRequests,
    getProgressPercentage,
    incrementRequestCount,
    checkAndEnforceLimit,
    getUsageMessage,
    resetUsage,
  };
};
