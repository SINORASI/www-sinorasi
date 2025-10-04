# Migration Guide: From data.ts to API Routes

This guide explains the migration from the old `data.ts` file to the new Nuxt API routes.

## Overview

We've refactored the application to use Nuxt's server API routes instead of importing data directly from `data.ts`. This provides better separation of concerns and prepares the codebase for future integration with external APIs.

## Changes Summary

### Deleted
- `app/datas/data.ts` - All data has been moved to server API routes

### Added
- `server/api/news/index.get.ts` - Get all news with filtering
- `server/api/news/[slug].get.ts` - Get single news by slug
- `server/api/events/index.get.ts` - Get all events with filtering
- `server/api/events/[slug].get.ts` - Get single event by slug
- `server/api/majors/index.get.ts` - Get all majors
- `server/api/majors/[majorName].get.ts` - Get single major by name
- `server/api/majors/menus/index.get.ts` - Get all major menus
- `server/api/majors/menus/[majorName].get.ts` - Get major menu by name
- `server/api/job-titles/index.get.ts` - Get all job titles
- `server/api/job-titles/[majorName].get.ts` - Get job titles by major
- `server/api/staff/index.get.ts` - Get all staff with department filtering
- `server/README.md` - API documentation

## Migration Instructions

### 1. Update News Components

**Old way (data.ts):**
```vue
<script setup>
import { newsData } from '~/datas/data'
</script>

<template>
  <div v-for="news in newsData" :key="news.id">
    {{ news.title }}
  </div>
</template>
```

**New way (API):**
```vue
<script setup>
const { data: newsResponse } = await useFetch('/api/news');
const newsData = computed(() => newsResponse.value?.data || []);
</script>

<template>
  <div v-for="news in newsData" :key="news.id">
    {{ news.title }}
  </div>
</template>
```

### 2. Update Event Components

**Old way:**
```vue
<script setup>
import { eventData } from '~/datas/data'
</script>
```

**New way:**
```vue
<script setup>
const { data: eventsResponse } = await useFetch('/api/events');
const eventData = computed(() => eventsResponse.value?.data || []);
</script>
```

### 3. Update Major Components

**Old way:**
```vue
<script setup>
import { majorDatas } from '~/datas/data'
</script>
```

**New way:**
```vue
<script setup>
const { data: majorDatas } = await useFetch('/api/majors');
</script>
```

### 4. Update Major Menus

**Old way:**
```vue
<script setup>
import { majorMenus } from '~/datas/data'
</script>
```

**New way:**
```vue
<script setup>
const { data: majorMenus } = await useFetch('/api/majors/menus');
</script>
```

### 5. Update Job Titles

**Old way:**
```vue
<script setup>
import { JobTitles } from '~/datas/data'
const route = useRoute();
const major = route.params.majorName;
const Careers = JobTitles[major] || [];
</script>
```

**New way:**
```vue
<script setup>
const route = useRoute();
const major = route.params.majorName;
const { data: Careers } = await useFetch(`/api/job-titles/${major}`);
</script>
```

### 6. Update Staff Components

**Old way:**
```vue
<script setup>
import { staffData } from '~/datas/data'
</script>
```

**New way:**
```vue
<script setup>
// Get all staff
const { data: staffData } = await useFetch('/api/staff');

// Or get by department 
const { data: kepsekStaff } = await useFetch('/api/staff?department=kepsek');
</script>
```

### 7. Update Detail Pages (News/Events by Slug)

**Old way:**
```vue
<script setup>
import { newsData } from '~/datas/data'
const route = useRoute();
const slug = route.params.slug;
const news = computed(() => newsData.find(n => n.slug === slug));
</script>
```

**New way:**
```vue
<script setup>
const route = useRoute();
const slug = route.params.slug;
const { data: news } = await useFetch(`/api/news/${slug}`);
</script>
```

## Files That Need Updates

Based on the grep search, these files need to be updated:

1. ✅ `app/pages/berita/[slug].vue` - Update to use `/api/news/{slug}`
2. ✅ `app/pages/berita/index.vue` - Update to use `/api/news`
3. ✅ `app/pages/acara/[eventSlug].vue` - Update to use `/api/events/{slug}`
4. ✅ `app/pages/acara/index.vue` - Update to use `/api/events`
5. ✅ `app/pages/jurusan/[majorName].vue` - Update to use `/api/majors/{majorName}`
6. ✅ `app/components/MobileSidebar.vue` - Update to use `/api/news`
7. ✅ `app/components/Major/KaproCarousel.vue` - Update to use `/api/majors`
8. ✅ `app/components/Major/ReferenceCareers.vue` - Update to use `/api/job-titles/{major}`
9. ✅ `app/components/Major/layout/MajorHeader.vue` - Update to use `/api/majors` and `/api/majors/menus`
10. ✅ `app/components/Major/MajorTopics.vue` - Update to use `/api/majors`

## Benefits of This Migration

1. **Separation of Concerns**: Data fetching is now handled by the server layer
2. **API-Ready**: Easy to swap mock data with real external API calls
3. **Type Safety**: TypeScript types are maintained through the models
4. **Better Performance**: Can leverage Nuxt's caching and SSR capabilities
5. **Scalability**: Easier to add filtering, pagination, and other features
6. **Testability**: API routes can be tested independently

## Next Steps

1. Update all components to use the new API routes (see checklist above)
2. Test all pages to ensure data is loading correctly
3. When ready to connect to external API, update the server routes to fetch from the real backend
4. Add proper error handling and loading states in components
5. Consider adding caching strategies for better performance

## Example: Connecting to External API

When you're ready to connect to a real backend, update the server routes like this:

```typescript
// server/api/news/index.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  
  try {
    // Fetch from external API
    const response = await $fetch(`${config.public.apiBase}/api/news`, {
      query
    });
    
    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news'
    });
  }
});
```

Add to `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000'
    }
  }
})
```
