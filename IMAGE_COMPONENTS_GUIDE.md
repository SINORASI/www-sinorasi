# Image Component Quick Reference

## When to Use What

### Plain `<img>` Tag
Use for **static, already-optimized images** in `/public/images/`:

```vue
<img 
  src="/images/majorIcon/logo-rpl.webp"
  alt="RPL Logo"
  class="object-contain w-10 h-10"
/>
```

**Use cases:**
- Logo images (.webp, .jpg, .png files)
- Static asset files
- Images that don't change
- Small/thumbnail images

---

### SmartImage Component
Use for **dynamic or mixed local/external images**:

```vue
<SmartImage
  :src="news.thumbnail"
  :alt="news.title"
  class="object-cover w-full h-full"
/>
```

**Use cases:**
- News/article images from API
- User-uploaded images
- External URLs from WordPress/third-party
- Images with fallbacks
- Mixed local/external sources

---

### NuxtImg Component
**Generally AVOID** unless specifically needed for:
- Remote-only images from optimized CDN
- Images requiring Nuxt-specific optimizations
- Server-side image processing

---

## Files Modified in This Fix

### Static Images (Plain `<img>`)
✅ Major layout pages (9 jurusan pages)
✅ Info pages (profile, facilities, partners)
✅ Header/footer components

### Dynamic Images (SmartImage)
✅ News pages
✅ Event pages
✅ Extracurricular pages
✅ Uniform cards
✅ Dynamic partner images

---

## Result

| Metric | Before | After |
|--------|--------|-------|
| 404 Errors | Multiple /_ipx/* errors | 0 |
| Image Load Speed | Slow (processing overhead) | Fast (direct serving) |
| Server CPU | Higher | Lower |
| Development Experience | Confusing handling | Clear rules |

---

## If Adding New Images

### Static Local Image?
```vue
<img src="/images/..." alt="..." />
```

### Dynamic/API Image?
```vue
<SmartImage :src="data.image" :alt="..." />
```

### Partner/Industry Logo?
```vue
<img :src="partner.logo" :alt="partner.name" />
```

---

## Common Patterns

### Image Gallery
```vue
<template v-for="image in images">
  <SmartImage :src="image.url" :alt="image.title" />
</template>
```

### Conditional Fallback
```vue
<SmartImage :src="item.image || '/images/placeholder.jpg'" :alt="item.name" />
```

### Responsive Image
```vue
<SmartImage 
  :src="image.src"
  alt="description"
  class="w-full h-auto object-cover"
/>
```

---

## Performance Tips

1. **Always use `alt` text** - Improves SEO and accessibility
2. **Specify dimensions** - Reduces layout shift (CLS)
3. **Use appropriate formats** - WebP > JPG > PNG in file size
4. **Optimize before upload** - Keep files under 500KB
5. **Use lazy loading** - Add `loading="lazy"` for offscreen images

---

## Troubleshooting

### Image shows 404
→ Check file exists in `/public/images/`
→ Verify path is correct (case-sensitive on Linux)

### Image loads slowly
→ Optimize file size (compress with TinyPNG)
→ Use WebP format instead of JPG
→ Enable browser caching

### Image quality is poor
→ Use SmartImage to extract high-quality srcset
→ Check original file quality
→ Avoid upscaling

---

## Migration from NuxtImg

If you find old NuxtImg:

**From:**
```vue
<NuxtImg src="/images/static.webp" :alt="title" />
```

**To (static files):**
```vue
<img src="/images/static.webp" :alt="title" />
```

**Or (dynamic files):**
```vue
<SmartImage :src="dynamicImage" :alt="title" />
```

---

**For more details:** See `IMAGES_404_FIX.md`
