/**
 * Cache management endpoint
 * Provides cache statistics and management operations
 * Use cautiously in production - consider adding authentication
 */

import { defineEventHandler, getQuery } from "h3";
import {
  getCacheStats,
  cleanupExpiredCache,
  clearCache,
  deleteMatchingCache,
  getCacheSize,
} from "../utils/cache";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const action = query.action as string;

  // Get cache statistics
  if (!action || action === "stats") {
    return {
      action: "stats",
      timestamp: new Date().toISOString(),
      data: getCacheStats(),
    };
  }

  // Cleanup expired cache entries
  if (action === "cleanup") {
    const deletedCount = cleanupExpiredCache();
    return {
      action: "cleanup",
      timestamp: new Date().toISOString(),
      message: `Cleaned up ${deletedCount} expired cache entries`,
      cacheSize: getCacheSize(),
    };
  }

  // Clear all cache
  if (action === "clear") {
    clearCache();
    return {
      action: "clear",
      timestamp: new Date().toISOString(),
      message: "All cache cleared successfully",
      cacheSize: getCacheSize(),
    };
  }

  // Delete cache entries matching a pattern
  if (action === "delete" && query.pattern) {
    try {
      deleteMatchingCache(query.pattern as string);
      return {
        action: "delete",
        timestamp: new Date().toISOString(),
        pattern: query.pattern,
        message: `Cache entries matching pattern "${query.pattern}" deleted`,
        cacheSize: getCacheSize(),
      };
    } catch (error) {
      return {
        action: "delete",
        error: "Invalid pattern",
        cacheSize: getCacheSize(),
      };
    }
  }

  // Default response with available actions
  return {
    message: "Cache Management API",
    availableActions: [
      {
        action: "stats",
        description: "Get cache statistics",
        url: "/api/cache?action=stats",
      },
      {
        action: "cleanup",
        description: "Clean up expired cache entries",
        url: "/api/cache?action=cleanup",
      },
      {
        action: "clear",
        description: "Clear all cache",
        url: "/api/cache?action=clear",
      },
      {
        action: "delete",
        description: "Delete cache entries matching a pattern",
        url: "/api/cache?action=delete&pattern=news",
      },
    ],
    cacheSize: getCacheSize(),
  };
});
