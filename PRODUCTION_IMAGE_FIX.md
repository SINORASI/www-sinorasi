# Production Image Loading Fix

## Problem
In production, news images from `news_data.json` were not loading because:
1. Local images stored at `/public/images/news/` were not being processed by the server
2. The image domain whitelist was too restrictive and only allowed `smkn2-singosari.sch.id`
3. Some news articles had external image srcset URLs from WordPress that weren't whitelisted

## Solution

### 1. Updated `nuxt.config.ts`
The image configuration has been updated to:

```typescript
image: {
  quality: 80,
  format: ["webp", "avif", "png", "jpg"],
  sizes: "320,640,768,1024,1280,1536",
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
  domains: [
    "smkn2-singosari.sch.id",  // School domain
    "localhost:3000",           // Local development
    "localhost",                // Local development
    "127.0.0.1",               // Local IP
  ],
  provider: "ipx",
  presets: {
    default: {
      modifiers: {
        format: "webp",
        quality: "80",
      }
    }
  },
  densities: [1, 2],
},
nitro: {
  prerender: {
    crawlLinks: true,
  },
  static: true,  // Ensures public directory is served
},
```

### 2. How It Works in Production

#### Local Images (`/images/news/...`)
- These are stored in `/public/images/` directory
- Nuxt automatically serves `/public` files as static assets
- With `nitro.static: true`, these files are included in the production build
- IPX provider optimizes them on-the-fly or serves them directly

#### External Images (`smkn2-singosari.sch.id/wp-content/uploads/...`)
- These are whitelisted under `smkn2-singosari.sch.id` domain
- Nuxt can proxy and optimize these images through the IPX provider

### 3. File Structure
The `/public/images/` directory includes:
```
/public/images/
├── news/                 # News article thumbnails
├── guru/                # Teacher photos
├── major/               # Major program images
├── majorIcon/          # Major program icons
├── organisasi/         # Organization photos
├── seragam/            # Uniform images
└── thumbnail/          # Thumbnail images
```

### 4. Deployment Checklist

**Before deploying to production:**

1. **Build Test**
   ```bash
   npm run build
   ```

2. **Verify Public Assets**
   - Ensure `/public/images/news/` directory exists
   - All image files are readable

3. **Check news_data.json**
   - Images use relative paths like `/images/news/filename.jpg`
   - OR full URLs to `smkn2-singosari.sch.id/wp-content/uploads/...`

4. **Environment Setup**
   - No special environment variables needed for this fix
   - Image optimization works automatically with Nuxt 3

### 5. Adding More External Domains

If you need to allow images from additional domains in the future, add them to the `domains` array in `nuxt.config.ts`:

```typescript
domains: [
  "smkn2-singosari.sch.id",
  "example.com",
  "cdn.example.com",
  // Add more as needed
],
```

### 6. Troubleshooting

**Images still not loading in production?**

1. Check browser DevTools → Network tab
   - See if image requests are returning 404 or 403
   - Check response headers

2. Verify `/public` directory is deployed
   - Should be in the same directory as the `.output` folder after build

3. Check server logs for errors
   - Look for image processing errors from IPX

4. Verify file permissions
   - Ensure `/public/images/` is readable by the server process

5. Check base URL
   - If deployed to a subdirectory, update the `baseURL` in `nuxt.config.ts`

### 7. Performance Notes

- Images are optimized to WebP format with 80% quality by default
- Multiple density versions (1x, 2x) are generated for responsive displays
- Both local and remote images are cached by the server
- Static files from `/public` are served directly without processing (faster)

## Testing

After deployment, verify images load:

1. Open news page
2. Open DevTools Network tab
3. Check that images load with 200 status code
4. Verify image srcset URLs are being used properly

For local development:
```bash
npm run dev
```

The dev server will automatically handle image optimization and static file serving.
