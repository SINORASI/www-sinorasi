/**
 * Composable to handle image URLs that may be local or external
 * Prevents Nuxt Image from processing non-existent local paths
 */
export const useImageUrl = () => {
  /**
   * Get the correct image source, preferring external URLs when local files don't exist
   * @param localPath - The local path (e.g., /images/news/filename.jpg)
   * @param externalUrls - Array of external URLs or single URL
   * @returns The best available URL
   */
  const getImageUrl = (localPath: string, externalUrls?: string | string[]): string => {
    // If we have external URLs, return the first one (highest quality)
    // since local files don't exist for these images
    if (externalUrls) {
      if (Array.isArray(externalUrls)) {
        // externalUrls is an array - return the highest quality one (first in array)
        const validUrl = externalUrls.find(url => url && url.length > 0);
        if (validUrl) return validUrl;
      } else if (typeof externalUrls === 'string' && externalUrls.length > 0) {
        return externalUrls;
      }
    }
    
    // Fallback to local path if external URLs are not available
    return localPath;
  };

  /**
   * Extract the highest quality URL from a srcset string
   * @param srcset - The srcset attribute value
   * @returns The highest quality URL (last one in the srcset)
   */
  const getHighestQualityFromSrcset = (srcset: string): string => {
    if (!srcset) return '';
    
    // Split by comma to get individual URLs
    const urls = srcset.split(',').map(item => item.trim());
    
    // Get the last URL (highest quality)
    if (urls.length > 0) {
      // Remove the size descriptor (e.g., "660w") and get just the URL
      const lastItem = urls[urls.length - 1];
      if (lastItem) {
        const urlPart = lastItem.split(/\s+/)[0];
        if (urlPart) return urlPart;
      }
    }
    
    return '';
  };

  return {
    getImageUrl,
    getHighestQualityFromSrcset,
  };
};
