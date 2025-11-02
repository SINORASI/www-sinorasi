# External Images Fix - Complete Solution

## Problem
Some news images reference local paths (e.g., `/images/news/filename.jpg`) but only exist on the external WordPress server, not in `/public/images/news/`. Nuxt was either:
1. Trying to process these non-existent local files and failing
2. Converting them incorrectly to local paths when they should remain external

## Root Cause Analysis
- **news_data.json** contains image thumbnails with local-style paths: `/images/news/-7636288913710442268_senang-622x440.jpeg`
- These files do NOT exist in `/public/images/news/` (only organized subdirectories by news ID exist there)
- The images ONLY exist on `smkn2-singosari.sch.id/wp-content/uploads/...` (external WordPress server)
- Nuxt Image was trying to process these non-existent paths as local images

## Solution Overview

### 1. **SmartImage Component** (`app/components/SmartImage.vue`)
A new intelligent image component that:
- Detects external-only images (using heuristics)
- Uses plain `<img>` tag for external-only images (no optimization needed)
- Uses `NuxtImg` for local images (optimization enabled)
- Automatically selects highest quality from srcset for external images

**Benefits:**
- ✅ Prevents Nuxt Image from failing on non-existent local paths
- ✅ Optimizes local images when available
- ✅ Serves external images without errors
- ✅ Automatic quality selection from srcset

### 2. **Image URL Composable** (`app/composables/useImageUrl.ts`)
Helper functions for:
- `getImageUrl()` - Smart URL selection between local and external
- `getHighestQualityFromSrcset()` - Extract best quality from srcset

### 3. **Updated Configuration** (`nuxt.config.ts`)
- ✅ Added `baseURL` configuration
- ✅ Added `alias` for proper path resolution
- ✅ Kept domain whitelist for validated external images
- ✅ Configured IPX provider for efficiency

### 4. **Image Proxy Route** (`server/routes/api/image-proxy.ts`)
Optional server-side proxy for:
- Proxying external images through your server
- Caching on your domain
- Bandwidth control

**Usage:** `/api/image-proxy?url=<encoded-url>`

## Implementation Guide

### Using SmartImage Component

**Before (with issues):**
```vue
<NuxtImg
  :src="news.thumbnail"
  :alt="news.title"
  class="w-full h-80 object-cover rounded-2xl"
/>
```

**After (recommended):**
```vue
<SmartImage
  :src="news.thumbnail"
  :srcset="news.srcset"
  :alt="news.title"
  class="w-full h-80 object-cover rounded-2xl"
/>
```

### Using Image URL Composable

```vue
<script setup>
const { getImageUrl, getHighestQualityFromSrcset } = useImageUrl();

// Get best available URL
const imageUrl = getImageUrl(
  "/images/news/file.jpg",  // local path
  "https://smkn2-singosari.sch.id/wp-content/uploads/2023/11/file.jpg"  // external
);

// Extract highest quality from srcset
const bestQuality = getHighestQualityFromSrcset(srcsetString);
</script>
```

## How It Works

### External Detection Logic
An image is considered "external-only" if:

1. **Starts with HTTP/HTTPS:**
   ```
   https://example.com/image.jpg → EXTERNAL
   ```

2. **Contains WordPress uploads path:**
   ```
   /wp-content/uploads/... → EXTERNAL (typically only on server)
   ```

3. **Has srcset with WordPress URLs:**
   ```
   srcset="... smkn2-singosari.sch.id/wp-content/uploads/... "
   → EXTERNAL (use highest quality from srcset)
   ```

### Fallback Logic
1. If external URLs are available → Use external URLs (highest quality first)
2. If only local path available → Use local path
3. If nothing works → Fall back gracefully to provided path

## Directory Structure
```
/public/images/
├── news/
│   ├── 100/               # Organization by news ID
│   │   └── [image files]
│   ├── 102/
│   │   └── [image files]
│   └── ...
├── guru/
├── major/
└── ...
```

## Important Notes

1. **Local images in /public/images/ still work:**
   - Nuxt Image optimizes them as before
   - No changes needed for truly local images

2. **External images are served as-is:**
   - No optimization applied (too much overhead)
   - srcset highest quality is preferred
   - Domain whitelist still enforced

3. **Configuration is backward compatible:**
   - Existing image code still works
   - Gradual migration to SmartImage is possible
   - No breaking changes

## Migration Path

### Phase 1: Keep Current Setup (No Changes)
- Everything works as-is with slight configuration tweaks
- Local images use NuxtImg
- External images served via domain whitelist

### Phase 2: Replace With SmartImage (Recommended)
Gradually replace `NuxtImg` with `SmartImage` in components:
1. Start with news/article pages
2. Update image-heavy components
3. Test thoroughly
4. Continue with other components

### Phase 3: Optimize Caching (Optional)
Implement server-side image proxy:
- Cache external images on your domain
- Better bandwidth control
- Faster CDN serving

## Troubleshooting

### Images Still Not Showing

1. **Check browser console:**
   - Network tab → See actual image requests
   - Look for 404 or 403 errors
   - Check response headers

2. **Verify domains are whitelisted:**
   ```typescript
   // In nuxt.config.ts
   domains: [
     "smkn2-singosari.sch.id",
     // Add any other domains here
   ]
   ```

3. **Check srcset format:**
   - Format should be: `url 660w, url2 1024w, ...`
   - Must have space after URL
   - Width descriptor must include 'w'

4. **Verify external URL structure:**
   - Should start with domain from whitelist
   - Path should exist on server
   - Check permissions/file access

### Performance Issues

1. **External images loading slowly:**
   - Use image proxy route (see server-side section)
   - Cache images on your own domain
   - Use CDN for /public images

2. **Large bundle size:**
   - SmartImage component is lightweight (~2KB)
   - Composable is minimal (~1KB)
   - No significant impact on bundle

## Production Deployment

1. **Build and test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Verify external image domains:**
   - Ensure external domain is reachable from server
   - Check firewall rules
   - Test image loading in browser dev tools

3. **Monitor error logs:**
   - Check for CORS issues
   - Look for proxy errors
   - Watch for timeout errors

4. **Cache headers:**
   - External images cached for 24 hours
   - Can be adjusted in image-proxy route
   - Static images served with long-term cache

## Performance Optimization Tips

1. **Use srcset properly:**
   - Include multiple sizes in srcset
   - Browser picks best match for device
   - Saves bandwidth for mobile devices

2. **Enable compression:**
   - Configuration already uses WebP/AVIF
   - 80% quality is good balance
   - Adjust in `nuxt.config.ts` if needed

3. **Lazy load images:**
   - `loading="lazy"` is default
   - Implemented in both components
   - Improves initial page load

## Security Considerations

1. **Domain whitelist enforced:**
   - Only specified domains can provide images
   - Prevents loading from arbitrary URLs
   - Add to whitelist for each trusted domain

2. **Image proxy validates URLs:**
   - Server-side validation
   - Whitelist check before proxying
   - Prevents malicious URL usage

3. **CORS considerations:**
   - External images may have CORS restrictions
   - Server-side proxy bypasses CORS
   - Useful if direct loading fails

## Future Enhancements

1. **Image Caching:**
   - Implement server-side cache for external images
   - Reduce external bandwidth usage
   - Better performance for frequently accessed images

2. **Advanced Optimization:**
   - Progressive image loading
   - Blur-up effect for external images
   - Automatic format selection based on browser

3. **Admin Interface:**
   - Upload images to /public to avoid external dependency
   - Bulk image optimization
   - Image management dashboard
