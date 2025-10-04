# Card Components API Migration - Summary

## Overview
This document summarizes the new models and API routes created for card components with looping data.

## New Models Created

### 1. Timeline (`app/models/Timeline.ts`)
Used for school history timeline display
```typescript
interface Timeline {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}
```

### 2. Achievement (`app/models/Achievement.ts`)
Used for school achievements carousel
```typescript
interface Achievement {
  id: string;
  image: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
}
```

### 3. Activity (`app/models/Activity.ts`)
Used for extracurricular and organization activities
```typescript
interface Activity {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  extracurricular?: string;
}
```

### 4. Teacher (`app/models/Teacher.ts`)
Used for teacher information by subject category
```typescript
interface Teacher {
  id: string;
  name: string;
  degree?: string;
  university?: string;
  quote?: string;
  image?: string;
}

interface TeacherCategory {
  id: string;
  title: string;
  description: string;
  classes: string[];
  materialsByClass: MaterialByClass[];
  teachingFocus: string;
  teachers: Teacher[];
}
```

### 5. Extracurricular (`app/models/Extracurricular.ts`)
Used for extracurricular details (basket, etc.)
```typescript
interface Extracurricular {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  statistics: ExtracurricularStats;
  registrationInfo: ExtracurricularInfo;
  activities: Activity[];
}
```

### 6. Organization (`app/models/Organization.ts`)
Used for organization details (PASKIBRA, OSIS, etc.)
```typescript
interface Organization {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  history?: string;
  statistics: {...};
  contactInfo?: {...};
  leadership: {...};
  sections: OrganizationSection[];
  activities: Activity[];
}
```

## API Routes Created

### Timeline API
- **GET** `/api/timeline` - Get all timeline items
  - Returns: `Timeline[]`
  - Mock data: 5 history milestones from 2007-2023

### Achievements API
- **GET** `/api/achievements` - Get achievements with pagination
  - Query params: `limit`, `offset`, `category`
  - Returns: `{ data: Achievement[], total: number }`
  - Mock data: 5 school achievements

- **GET** `/api/achievements/:id` - Get single achievement
  - Returns: `Achievement`

### Activities API
- **GET** `/api/activities` - Get activities with pagination
  - Query params: `limit`, `offset`, `extracurricular`
  - Returns: `{ data: Activity[], total: number }`
  - Mock data: 6 activities (4 basket, 2 paskibra)

- **GET** `/api/activities/:id` - Get single activity
  - Returns: `Activity`

### Teachers API
- **GET** `/api/teachers/categories` - Get teacher categories
  - Query params: `limit`, `offset`
  - Returns: `{ data: TeacherCategory[], total: number }`
  - Mock data: 4 categories (PAI, Produktif, Bahasa Indonesia, Matematika)

### Extracurriculars API
- **GET** `/api/extracurriculars` - Get all extracurriculars
  - Query params: `limit`, `offset`
  - Returns: `{ data: Extracurricular[], total: number }`
  - Mock data: 2 extracurriculars (Basket, Paskibra)

- **GET** `/api/extracurriculars/:slug` - Get extracurricular by slug
  - Returns: `Extracurricular`
  - Includes full details with activities

### Organizations API
- **GET** `/api/organizations` - Get all organizations
  - Query params: `limit`, `offset`
  - Returns: `{ data: Organization[], total: number }`
  - Mock data: 2 organizations (PASKIBRA, OSIS)

- **GET** `/api/organizations/:slug` - Get organization by slug
  - Returns: `Organization`
  - Includes full details with 10 sections, leadership, activities

## Usage Examples

### Fetching Timeline (pages/index.vue)
```typescript
const { data: timelineData } = await useFetch<Timeline[]>('/api/timeline');
const timelineItems = timelineData.value || [];
```

### Fetching Achievements (pages/index.vue)
```typescript
const { data: achievementsResponse } = await useFetch<{ data: Achievement[], total: number }>('/api/achievements', {
  query: { limit: 5 }
});
const achievements = achievementsResponse.value?.data || [];
```

### Fetching Extracurricular Activities (pages/ekstrakurikuler/[extra].vue)
```typescript
const route = useRoute();
const { data: extracurricularData } = await useFetch<Extracurricular>(`/api/extracurriculars/${route.params.extra}`);
const items = extracurricularData.value?.activities || [];
```

### Fetching Teacher Categories (pages/informasi/guru.vue)
```typescript
const { data: categoriesResponse } = await useFetch<{ data: TeacherCategory[], total: number }>('/api/teachers/categories');
const teacherCategories = categoriesResponse.value?.data || [];
```

### Fetching Organization Details (pages/organisasi/[organisasi].vue)
```typescript
const route = useRoute();
const { data: organizationData } = await useFetch<Organization>(`/api/organizations/${route.params.organisasi}`);
const organization = organizationData.value;
```

## Components That Should Be Updated

### 1. `app/pages/index.vue`
- **Timeline section**: Replace `timelineItems` array with API call to `/api/timeline`
- **Achievements section**: Replace `achievements` array with API call to `/api/achievements`

### 2. `app/pages/ekstrakurikuler/[extra].vue`
- **Activities section**: Replace `items` array with API call to `/api/extracurriculars/:slug` and use the `activities` property

### 3. `app/pages/informasi/guru.vue`
- **Teacher categories**: Replace `teacherCategories` ref with API call to `/api/teachers/categories`

### 4. `app/pages/organisasi/[organisasi].vue` & `app/pages/organisasi/index.vue`
- Replace hardcoded organization data with API calls to `/api/organizations/:slug`
- Use the full organization structure from the API response

## Mock Data Summary

All API routes currently return mock data. Each route includes a comment showing where to integrate real API calls:

```typescript
// TODO: Replace with actual API call
// const data = await $fetch('https://your-api.com/api/endpoint');
```

## Next Steps

1. **Update Components**: Modify the pages/components listed above to use the new API routes
2. **Add Type Safety**: Ensure all `useFetch` calls include proper type parameters
3. **Error Handling**: Add proper error handling for failed API requests
4. **External API Integration**: When backend is ready, replace mock data with real API calls
5. **Loading States**: Add loading indicators while data is being fetched

## File Structure

```
server/api/
├── timeline/
│   └── index.get.ts
├── achievements/
│   ├── index.get.ts
│   └── [id].get.ts
├── activities/
│   ├── index.get.ts
│   └── [id].get.ts
├── teachers/
│   └── categories/
│       └── index.get.ts
├── extracurriculars/
│   ├── index.get.ts
│   └── [slug].get.ts
└── organizations/
    ├── index.get.ts
    └── [slug].get.ts

app/models/
├── Timeline.ts
├── Achievement.ts
├── Activity.ts
├── Teacher.ts
├── Extracurricular.ts
└── Organization.ts
```

## Total Created
- **6 Models** (TypeScript interfaces)
- **11 API Routes** (Server endpoints with mock data)
- All routes support GET requests
- All include proper TypeScript typing
- All include error handling for 404 cases
