# Page Loading Issue - Fix Summary

## Problem
Pages were not loading properly after navigating from one page to another. Users had to manually refresh the page to see the content.

## Root Causes Identified

1. **Missing Page Loading Hooks**: The `app.vue` only used `page:loading:end` hook but not `page:loading:start`, causing loading states not to show when navigating.

2. **Missing Unique Fetch Keys**: Pages with `useFetch()` calls didn't have unique keys, causing potential caching issues and data not being properly refetched when navigating between similar pages (e.g., switching major pages).

3. **No Route Change Tracking**: Pages didn't properly track route changes to reset state when navigating.

4. **Aggressive Cache Rules**: The route rules had very long cache durations that could cause stale data to be served.

## Solutions Implemented

### 1. Fixed `app/app.vue`
- Added `page:loading:start` hook to show loading when navigation starts
- Added delay in `page:loading:end` to ensure content renders before hiding loading overlay
- Removed unnecessary `route` watch since hooks handle loading properly

### 2. Updated All Major Pages
Added unique fetch keys to all major/jurusan pages:
- `app/pages/jurusan/rpl.vue`
- `app/pages/jurusan/tkj.vue`
- `app/pages/jurusan/dkv.vue`
- `app/pages/jurusan/animasi.vue`
- `app/pages/jurusan/tav.vue`
- `app/pages/jurusan/broadcasting.vue`
- `app/pages/jurusan/tei.vue`
- `app/pages/jurusan/mekatronika.vue`
- `app/pages/jurusan/index.vue`

**Changed from:**
```typescript
const { data: majorDatas } = await useFetch<Record<MajorName, MajorData>>("/api/majors");
```

**Changed to:**
```typescript
const { data: majorDatas, refresh: refreshMajorData } = await useFetch<Record<MajorName, MajorData>>("/api/majors", {
  key: `major-data-${major}`,
});
```

### 3. Created `app/composables/usePageLoading.ts`
New composable to centralize page loading state management for future use.

### 4. Improved `nuxt.config.ts`
- Added proper page and layout transition classes with durations
- Updated route rules to use reasonable cache durations instead of very long ones
- Separated cache rules for different route types (API vs pages)

**Benefits:**
- API routes: No caching (always fresh)
- Page routes: Cached for 24 hours on client side
- Better control over what gets cached

## Testing Recommendations

1. Navigate between different major pages (RPL → TKJ → DKV, etc.)
2. Navigate from home to a major page and back
3. Navigate between different info pages
4. Check browser console for any errors
5. Verify loading overlay appears and disappears smoothly
6. Check network tab to ensure proper cache behavior

## Additional Notes

- The loading overlay now properly shows during navigation transitions
- Data is properly refetched when navigating to similar pages
- Page transitions are smoother with explicit transition classes
- Cache behavior is more intelligent and predictable
