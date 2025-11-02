# Quick Reference - SmartImage Component

## Why SmartImage?

External images (from WordPress) have paths like `/images/news/file.jpg` but only exist on the server as `smkn2-singosari.sch.id/wp-content/uploads/...`. SmartImage automatically detects this and handles it correctly.

## Basic Usage

```vue
<!-- Instead of this: -->
<NuxtImg :src="imageUrl" :alt="title" />

<!-- Use this: -->
<SmartImage :src="imageUrl" :alt="title" />
```

## With Images That Have srcset

```vue
<SmartImage 
  :src="news.thumbnail"
  :srcset="news.srcset"
  :alt="news.title"
  class="w-full h-auto"
/>
```

## Props Reference

```typescript
interface Props {
  src: string;                  // Image URL (required)
  srcset?: string;             // Multiple quality versions
  alt?: string;                // Alt text (default: "")
  width?: number | string;     // Image width
  height?: number | string;    // Image height
  class?: string;              // CSS classes
  loading?: "lazy" | "eager";  // Loading strategy (default: "lazy")
  decoding?: "async" | "sync" | "auto";  // (default: "async")
  provider?: string;           // Image provider (default: "ipx")
  preload?: boolean;           // Preload image (default: false)
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"; // (default: "cover")
  quality?: number;            // Image quality 0-100 (default: 80)
}
```

## Examples

### News Article Image
```vue
<SmartImage
  :src="news.thumbnail"
  :alt="news.title"
  class="w-full h-96 object-cover rounded-lg"
/>
```

### Responsive Image with Srcset
```vue
<SmartImage 
  :src="article.image"
  :srcset="article.imageSrcset"
  :alt="article.title"
  class="w-full md:w-1/2"
/>
```

### Gallery Image
```vue
<SmartImage
  :src="photo.url"
  :alt="photo.title"
  width="300"
  height="200"
  fit="cover"
  class="rounded-xl"
/>
```

### With Custom Quality
```vue
<SmartImage
  :src="image.url"
  :alt="image.title"
  :quality="90"
  class="w-full h-auto"
/>
```

## What SmartImage Does Automatically

1. **Detects external-only images:**
   - URLs starting with `http://` or `https://`
   - Paths containing `/wp-content/uploads/`
   - Srcset with WordPress URLs

2. **For external images:**
   - Uses plain `<img>` tag (no processing)
   - Extracts highest quality from srcset
   - Serves images as-is from external server

3. **For local images:**
   - Uses NuxtImg component
   - Applies optimization (WebP, AVIF)
   - Generates responsive sizes

## Common Scenarios

### Scenario 1: News Images
```vue
<SmartImage 
  :src="newsItem.thumbnail"
  :alt="newsItem.title"
  class="w-full h-80 object-cover rounded-xl"
/>
```
✅ SmartImage detects external-only image
✅ Extracts best quality from srcset automatically

### Scenario 2: Local Gallery Images
```vue
<SmartImage 
  :src="/images/gallery/photo.jpg"
  :alt="photo.title"
/>
```
✅ SmartImage detects local path
✅ Optimizes via NuxtImg component

### Scenario 3: Mixed Content
```vue
<SmartImage 
  :src="content.imageUrl"
  :alt="content.title"
/>
```
✅ SmartImage handles both local and external
✅ Automatic detection and routing

## Migration from NuxtImg

### Step 1: Install SmartImage (Already Done)
File is at: `app/components/SmartImage.vue`

### Step 2: Replace in Templates
```vue
<!-- Find: -->
<NuxtImg :src="thumbnail" />

<!-- Replace with: -->
<SmartImage :src="thumbnail" />
```

### Step 3: Test
- Local images should still be optimized
- External images should load without errors
- Responsive behavior should work

## Performance Tips

1. **Always use alt text:**
   ```vue
   <SmartImage :src="url" alt="Descriptive text" />
   ```

2. **Use lazy loading (default):**
   ```vue
   <SmartImage :src="url" loading="lazy" />
   ```

3. **Include dimensions when known:**
   ```vue
   <SmartImage :src="url" width="300" height="200" />
   ```

4. **Provide srcset for better quality:**
   ```vue
   <SmartImage :src="url" :srcset="srcsetString" />
   ```

## Debugging

### Check Which Mode Is Used
Add to component:
```javascript
const { SmartImage } = defineComponent({
  // Component will log: "Using external mode" or "Using NuxtImg mode"
});
```

### Inspect Network Requests
1. Open DevTools → Network tab
2. Filter by images
3. Check image URLs and response status
4. Verify quality versions (if using srcset)

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Image shows 404 | Check external domain is whitelisted in `nuxt.config.ts` |
| Quality is low | Ensure srcset includes high-res versions |
| Page loads slow | Use lazy loading (default) or image proxy |
| CORS error | Use image proxy route: `/api/image-proxy?url=...` |

## Using Image Utilities

### Get Highest Quality URL
```typescript
const { getHighestQualityFromSrcset } = useImageUrl();

const bestUrl = getHighestQualityFromSrcset(
  "url1.jpg 660w, url2.jpg 1024w, url3.jpg 2048w"
);
// Returns: url3.jpg (highest quality)
```

### Smart URL Selection
```typescript
const { getImageUrl } = useImageUrl();

const url = getImageUrl(
  "/images/news/file.jpg",  // local
  "https://example.com/file.jpg"  // external
);
// Uses external if available
```

## Advanced Configuration

### Custom Image Quality
Edit `nuxt.config.ts`:
```typescript
image: {
  quality: 85,  // Default 80 (1-100)
}
```

### Add External Domain
Edit `nuxt.config.ts`:
```typescript
image: {
  domains: [
    "smkn2-singosari.sch.id",
    "new-external-domain.com",  // Add here
  ]
}
```

### Enable Image Proxy
Use endpoint:
```typescript
const imageUrl = `/api/image-proxy?url=${encodeURIComponent(externalUrl)}`;
```

## Best Practices

✅ **DO:**
- Use SmartImage for all user-generated images
- Always provide alt text
- Use lazy loading for below-fold images
- Include width/height when known

❌ **DON'T:**
- Mix NuxtImg and SmartImage for same content
- Forget alt text (SEO important)
- Use high-quality images for thumbnails
- Process external images multiple times

## Support

For issues:
1. Check `EXTERNAL_IMAGES_FIX.md` (technical details)
2. Check `IMPLEMENTATION_SUMMARY.md` (overview)
3. Check browser console (errors)
4. Check server logs (proxy errors)

## Version Info
- Created: 2025-11-02
- Status: Production Ready ✅
- Dependencies: Vue 3, Nuxt 3, @nuxt/image
