# API Documentation

This document describes the API routes available in the Nuxt server for SMKN 1 Sinorasi website.

## Base URL
All API routes are prefixed with `/api` when running in development or production.

---

## News API

### Get All News
**Endpoint:** `GET /api/news`

**Query Parameters:**
- `tag` (string, optional): Filter news by tag
- `search` (string, optional): Search in title and subtitle
- `limit` (number, optional): Limit number of results
- `offset` (number, optional): Offset for pagination

**Response:**
```json
{
  "data": [...],
  "total": 10,
  "offset": 0,
  "limit": 10
}
```

**Example:**
```javascript
const { data } = await useFetch('/api/news?limit=5&tag=Prestasi')
```

### Get News by Slug
**Endpoint:** `GET /api/news/{slug}`

**Response:**
```json
{
  "id": "1",
  "slug": "peluncuran-program-tahun-ajaran-baru",
  "title": "...",
  "subtitle": "...",
  "thumbnail": "...",
  "tags": [...],
  "content": "...",
  "publishedAt": "2024-07-01",
  "author": "..."
}
```

**Example:**
```javascript
const { data: news } = await useFetch('/api/news/peluncuran-program-tahun-ajaran-baru')
```

---

## Events API

### Get All Events
**Endpoint:** `GET /api/events`

**Query Parameters:**
- `upcoming` (boolean, optional): Filter upcoming events
- `past` (boolean, optional): Filter past events
- `limit` (number, optional): Limit number of results
- `offset` (number, optional): Offset for pagination

**Response:**
```json
{
  "data": [...],
  "total": 3,
  "offset": 0,
  "limit": 3
}
```

**Example:**
```javascript
const { data } = await useFetch('/api/events?upcoming=true')
```

### Get Event by Slug
**Endpoint:** `GET /api/events/{slug}`

**Response:**
```json
{
  "id": "1",
  "slug": "...",
  "title": "...",
  "details": "...",
  "date": "...",
  "imageUrl": "...",
  "content": "...",
  "publishedAt": "...",
  "author": "..."
}
```

**Example:**
```javascript
const { data: event } = await useFetch('/api/events/community-tech-meetup')
```

---

## Majors API

### Get All Majors
**Endpoint:** `GET /api/majors`

**Response:**
```json
{
  "rpl": {
    "logo": "...",
    "short": "RPL",
    "nameMajor": "Rekayasa Perangkat Lunak",
    "headerColor": "...",
    "bgColor": "...",
    "hoverBgColor": "...",
    "textColor": "...",
    "btnColor": "..."
  },
  ...
}
```

**Example:**
```javascript
const { data: majors } = await useFetch('/api/majors')
```

### Get Major by Name
**Endpoint:** `GET /api/majors/{majorName}`

**Path Parameters:**
- `majorName`: One of `rpl`, `tkj`, `dkv`, `animasi`, `broadcasting`, `tei`, `mekatronika`, `tav`

**Response:**
```json
{
  "logo": "...",
  "short": "RPL",
  "nameMajor": "Rekayasa Perangkat Lunak",
  ...
}
```

**Example:**
```javascript
const { data: major } = await useFetch('/api/majors/rpl')
```

---

## Major Menus API

### Get All Major Menus
**Endpoint:** `GET /api/majors/menus`

**Response:**
```json
{
  "rpl": [
    {
      "title": "Pengenalan",
      "submenu": [...]
    }
  ],
  ...
}
```

**Example:**
```javascript
const { data: menus } = await useFetch('/api/majors/menus')
```

### Get Major Menu by Name
**Endpoint:** `GET /api/majors/menus/{majorName}`

**Response:**
```json
[
  {
    "title": "Pengenalan",
    "submenu": [
      {
        "title": "Apa itu RPL?",
        "desc": "...",
        "icon": "lucide:info"
      }
    ]
  }
]
```

**Example:**
```javascript
const { data: menus } = await useFetch('/api/majors/menus/rpl')
```

---

## Job Titles API

### Get All Job Titles
**Endpoint:** `GET /api/job-titles`

**Response:**
```json
{
  "rpl": [
    {
      "id": "1",
      "image": "...",
      "title": "Software Engineer",
      "description": "..."
    }
  ],
  ...
}
```

**Example:**
```javascript
const { data: jobTitles } = await useFetch('/api/job-titles')
```

### Get Job Titles by Major
**Endpoint:** `GET /api/job-titles/{majorName}`

**Response:**
```json
[
  {
    "id": "1",
    "image": "...",
    "title": "Software Engineer",
    "description": "..."
  }
]
```

**Example:**
```javascript
const { data: jobs } = await useFetch('/api/job-titles/rpl')
```

---

## Staff API

### Get All Staff
**Endpoint:** `GET /api/staff`

**Query Parameters:**
- `department` (string, optional): Filter by department (`kepsek`, `wakasek`, `kurikulum`, `kesiswaan`, `sapras`, `humas`)

**Response (without department filter):**
```json
{
  "kepsek": [...],
  "wakasek": [...],
  "kurikulum": [...],
  "kesiswaan": [...],
  "sapras": [...],
  "humas": [...]
}
```

**Response (with department filter):**
```json
[
  {
    "image": "...",
    "name": "...",
    "position": "..."
  }
]
```

**Example:**
```javascript
// Get all staff
const { data: allStaff } = await useFetch('/api/staff')

// Get staff by department
const { data: kepsek } = await useFetch('/api/staff?department=kepsek')
```

---

## Usage in Components

### Example 1: Fetching News in a Component
```vue
<script setup>
const { data: newsData } = await useFetch('/api/news', {
  query: {
    limit: 8
  }
});
</script>

<template>
  <div v-for="news in newsData.data" :key="news.id">
    <h3>{{ news.title }}</h3>
    <p>{{ news.subtitle }}</p>
  </div>
</template>
```

### Example 2: Fetching Single News by Slug
```vue
<script setup>
const route = useRoute();
const { data: news } = await useFetch(`/api/news/${route.params.slug}`);
</script>

<template>
  <article v-if="news">
    <h1>{{ news.title }}</h1>
    <div v-html="news.content"></div>
  </article>
</template>
```

### Example 3: Fetching Major Data
```vue
<script setup>
const route = useRoute();
const major = route.params.majorName;
const { data: majorData } = await useFetch(`/api/majors/${major}`);
</script>

<template>
  <div v-if="majorData">
    <img :src="majorData.logo" />
    <h1>{{ majorData.nameMajor }}</h1>
  </div>
</template>
```

---

## Future Implementation

When ready to connect to an external API:

1. Replace the mock data in each API route with actual HTTP requests using `$fetch` or `useFetch`
2. Add environment variables for API endpoints in `.env`
3. Implement proper error handling and loading states
4. Add caching strategies if needed

Example of connecting to external API:
```typescript
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  try {
    const data = await $fetch(`${config.public.apiBase}/news`);
    return data;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news from external API'
    });
  }
});
```
