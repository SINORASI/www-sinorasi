# Quick Fix Action Plan

## Problem
Toggle/carousel images still showing `/_ipx/*` 404 errors

## Root Cause
Dev server cached old SmartImage component code

## Solution Status
✅ **Code Fixed** - SmartImage updated to always use plain `<img>` for `/images/*`
✅ **Cache Cleared** - `.nuxt` and `node_modules/.vite` deleted

## What YOU Need To Do

### 1. Stop Dev Server
Press `Ctrl+C` in terminal

### 2. Start Dev Server
```
npm run dev
```

### 3. Refresh Browser
Press `Ctrl+Shift+R` to hard refresh

### 4. Verify Fix
Open DevTools → Network tab → Toggle uniform images
- ✅ Should see `GET /images/seragam/...` with 200 status
- ❌ Should NOT see `/_ipx/*` with 404 status

---

## What Was Done

✅ SmartImage.vue updated:
```typescript
if (props.src.startsWith("/images/")) {
  return true;  // Use plain <img>, skip NuxtImg
}
```

✅ TypeScript imports added
✅ Build cache cleared
✅ Vite cache cleared

---

## Expected Behavior After Fix

**Uniform Images on Home Page:**
1. Page loads - images display correctly (no 404s)
2. Toggle class (10/11) - still shows correct image
3. Toggle gender (L/P) - images load on demand
4. All requests go to `/images/seragam/` not `/_ipx/`

---

## Need Help?

1. **Images still 404?** → Restart terminal completely
2. **Still see `/_ipx/*` URLs?** → Restart in incognito mode
3. **Want to verify the fix?** → Check `SmartImage.vue` line ~78 - should have `/images/` check

