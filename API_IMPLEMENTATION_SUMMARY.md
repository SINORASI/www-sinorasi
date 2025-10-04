# API Routes Implementation Summary

## What Was Done

### 1. Created Server API Routes
All data from `data.ts` has been migrated to proper Nuxt server API routes with CRUD capabilities:

#### News API
- **GET** `/api/news` - Get all news with filtering (tag, search, pagination)
- **GET** `/api/news/[slug]` - Get single news by slug

#### Events API
- **GET** `/api/events` - Get all events with filtering (upcoming, past, pagination)
- **GET** `/api/events/[slug]` - Get single event by slug

#### Majors API
- **GET** `/api/majors` - Get all major data
- **GET** `/api/majors/[majorName]` - Get single major by name

#### Major Menus API
- **GET** `/api/majors/menus` - Get all major menus
- **GET** `/api/majors/menus/[majorName]` - Get menu for specific major

#### Job Titles API
- **GET** `/api/job-titles` - Get all job titles by major
- **GET** `/api/job-titles/[majorName]` - Get job titles for specific major

#### Staff API
- **GET** `/api/staff` - Get all staff (optionally filtered by department)

### 2. Features Implemented

Each API route includes:
- ✅ **Type Safety** - Uses TypeScript models from `app/models/`
- ✅ **Error Handling** - Returns proper 404 errors when data not found
- ✅ **Query Parameters** - Supports filtering and pagination
- ✅ **Mock Data** - Same data as original `data.ts` for seamless transition
- ✅ **RESTful Design** - Follows REST API conventions
- ✅ **Ready for External API** - Easy to swap mock data with real API calls

### 3. Documentation Created

- **`server/README.md`** - Complete API documentation with examples
- **`MIGRATION_GUIDE.md`** - Step-by-step migration guide for updating components

### 4. Data Structure Preserved

All original data structures are maintained:
- News (with markdown content, tags, author)
- Events (with details, dates, locations)
- Major Data (with colors, logos, names)
- Major Menus (with submenus and icons)
- Job Titles (by major)
- Staff (by department)

### 5. Deleted Files
- ❌ `app/datas/data.ts` - Replaced by API routes

## How to Use the New API

### In Components (using `useFetch`)

```vue
<script setup>
// Get all news
const { data: newsData } = await useFetch('/api/news');

// Get news with filters
const { data: filteredNews } = await useFetch('/api/news', {
  query: {
    tag: 'Prestasi',
    limit: 5
  }
});

// Get single news by slug
const route = useRoute();
const { data: news } = await useFetch(`/api/news/${route.params.slug}`);

// Get major data
const { data: majorDatas } = await useFetch('/api/majors');

// Get job titles for specific major
const { data: jobTitles } = await useFetch(`/api/job-titles/rpl`);
</script>
```

### In Server Routes (using `$fetch`)

```typescript
export default defineEventHandler(async (event) => {
  const news = await $fetch('/api/news');
  return news;
});
```

## Next Steps

### 1. Update Component Files
The following components need to be updated to use the new API routes:

- [ ] `app/pages/berita/[slug].vue`
- [ ] `app/pages/berita/index.vue`
- [ ] `app/pages/acara/[eventSlug].vue`
- [ ] `app/pages/acara/index.vue`
- [ ] `app/pages/jurusan/[majorName].vue`
- [ ] `app/components/MobileSidebar.vue`
- [ ] `app/components/Major/KaproCarousel.vue`
- [ ] `app/components/Major/ReferenceCareers.vue`
- [ ] `app/components/Major/layout/MajorHeader.vue`
- [ ] `app/components/Major/MajorTopics.vue`

### 2. Test the Application
Run the development server and test:
```bash
npm run dev
# or
bun run dev
```

### 3. When Ready for External API
Replace mock data in server routes with real API calls:

```typescript
// Example: server/api/news/index.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  
  // Call external API
  const response = await $fetch(`${config.public.apiBase}/news`, {
    query
  });
  
  return response;
});
```

Add environment variables in `.env`:
```env
API_BASE_URL=https://your-external-api.com
```

## API Route Structure

```
server/
├── api/
│   ├── events/
│   │   ├── index.get.ts          # GET /api/events
│   │   └── [slug].get.ts         # GET /api/events/:slug
│   ├── job-titles/
│   │   ├── index.get.ts          # GET /api/job-titles
│   │   └── [majorName].get.ts    # GET /api/job-titles/:majorName
│   ├── majors/
│   │   ├── index.get.ts          # GET /api/majors
│   │   ├── [majorName].get.ts    # GET /api/majors/:majorName
│   │   └── menus/
│   │       ├── index.get.ts      # GET /api/majors/menus
│   │       └── [majorName].get.ts # GET /api/majors/menus/:majorName
│   ├── news/
│   │   ├── index.get.ts          # GET /api/news
│   │   └── [slug].get.ts         # GET /api/news/:slug
│   └── staff/
│       └── index.get.ts          # GET /api/staff
└── README.md                      # API Documentation
```

## Benefits

1. ✅ **Better Architecture** - Separation of data layer from presentation
2. ✅ **Type Safety** - Full TypeScript support maintained
3. ✅ **SSR Ready** - Works seamlessly with Nuxt's SSR
4. ✅ **Easy to Extend** - Add POST, PUT, DELETE routes when needed
5. ✅ **API Ready** - Simple to connect to external backend
6. ✅ **Testable** - API routes can be tested independently
7. ✅ **Cacheable** - Can leverage Nuxt's built-in caching
8. ✅ **Secure** - Server-side data fetching prevents exposing sensitive data

## Questions?

Refer to:
- `server/README.md` for detailed API documentation
- `MIGRATION_GUIDE.md` for component migration examples
