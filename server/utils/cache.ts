/**
 * In-memory caching utility for Nitro server
 * Provides cache management with TTL (Time-To-Live) support
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
}

interface CacheStore {
  [key: string]: CacheEntry<any>;
}

const cacheStore: CacheStore = {};

/**
 * Default cache TTL values (in milliseconds)
 */
export const CACHE_DEFAULTS = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Get the number of cached items
 */
export function getCacheSize(): number {
  return Object.keys(cacheStore).length;
}

/**
 * Get a value from cache
 * @param key - Cache key
 * @returns Cached value or null if not found or expired
 */
export function getCached<T>(key: string): T | null {
  const entry = cacheStore[key];

  if (!entry) {
    return null;
  }

  // Check if cache has expired
  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    delete cacheStore[key];
    return null;
  }

  return entry.data as T;
}

/**
 * Set a value in cache
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds (default: 15 minutes)
 */
export function setCached<T>(
  key: string,
  data: T,
  ttl: number = CACHE_DEFAULTS.MEDIUM,
): void {
  cacheStore[key] = {
    data,
    timestamp: Date.now(),
    ttl,
  };
}

/**
 * Delete a cache entry
 * @param key - Cache key
 */
export function deleteCached(key: string): void {
  delete cacheStore[key];
}

/**
 * Delete all cache entries matching a pattern
 * @param pattern - Regex pattern to match keys
 */
export function deleteMatchingCache(pattern: RegExp | string): void {
  const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
  Object.keys(cacheStore).forEach((key) => {
    if (regex.test(key)) {
      delete cacheStore[key];
    }
  });
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  Object.keys(cacheStore).forEach((key) => {
    delete cacheStore[key];
  });
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
  entries: Array<{
    key: string;
    ttl: number;
    expiresIn: number;
    isExpired: boolean;
  }>;
} {
  const now = Date.now();
  const entries = Object.entries(cacheStore).map(([key, entry]) => {
    const expiresIn = entry.ttl - (now - entry.timestamp);
    return {
      key,
      ttl: entry.ttl,
      expiresIn,
      isExpired: expiresIn <= 0,
    };
  });

  return {
    size: entries.length,
    keys: Object.keys(cacheStore),
    entries,
  };
}

/**
 * Cleanup expired cache entries
 */
export function cleanupExpiredCache(): number {
  const now = Date.now();
  let deletedCount = 0;

  Object.entries(cacheStore).forEach(([key, entry]) => {
    if (now - entry.timestamp > entry.ttl) {
      delete cacheStore[key];
      deletedCount++;
    }
  });

  return deletedCount;
}

/**
 * Cache wrapper function - executes function and caches result
 * @param key - Cache key
 * @param fn - Async function to execute
 * @param ttl - Time to live in milliseconds
 * @returns Cached or newly fetched data
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = CACHE_DEFAULTS.MEDIUM,
): Promise<T> {
  // Check if data is already cached
  const cached = getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute function and cache result
  const data = await fn();
  setCached(key, data, ttl);
  return data;
}

/**
 * Generate cache key from parameters
 * @param prefix - Prefix for the key
 * @param params - Parameters to include in key
 * @returns Generated cache key
 */
export function generateCacheKey(prefix: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return prefix;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(params[key])}`)
    .join("&");

  return `${prefix}:${sortedParams}`;
}
