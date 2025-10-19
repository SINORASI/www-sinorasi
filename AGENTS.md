# Agent Guidelines for www-sinorasi

## Build/Lint/Test Commands

- **Build**: `nuxt build`
- **Dev server**: `nuxt dev`
- **Static generation**: `nuxt generate`
- **Preview**: `nuxt preview`
- **Postinstall setup**: `nuxt prepare`
- **Lint**: `bun run lint` (Biome JS)
- **Lint fix**: `bun run lint:fix` (Biome JS)
- **Format**: `bun run format` (Biome JS)
- **Test**: No test framework configured

## Code Style Guidelines

### Framework & Language
- **Nuxt 4** with **Vue 3** and **TypeScript**
- Use `<script setup lang="ts">` syntax for Vue components
- Server-side API routes in `server/api/` directory

### Imports
- Group imports: Vue composables first, then utilities, then components
- Use absolute imports with `~` prefix for project files
- Example:
```typescript
import { ref, onMounted } from "vue";
import { useRoute } from "#app";
import type { News } from "~/models/News";
```

### Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Consistent spacing around operators and braces

### Types & Interfaces
- Strong TypeScript usage throughout
- Define interfaces in `models/` directory
- Use `type` for complex types, `interface` for object shapes
- Example:
```typescript
export interface News {
  id: string;
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
}
```

### Naming Conventions
- **Variables/Functions**: camelCase (`userData`, `fetchNews`)
- **Components**: PascalCase (`NewsCard`, `AppHeader`)
- **Files**: kebab-case (`news-card.vue`, `api-handler.ts`)
- **Database**: snake_case columns (`user_id`, `created_at`)
- **API Routes**: kebab-case with HTTP methods (`news/index.get.ts`)

### Error Handling
- Use try-catch blocks in API handlers
- Log errors with `console.error()`
- Throw Nuxt errors with `createError()`
- Example:
```typescript
try {
  // operation
} catch (error) {
  console.error('Error:', error);
  throw createError({ statusCode: 500, statusMessage: 'Server error' });
}
```

### Vue Patterns
- Use Composition API with `<script setup>`
- Reactive state with `ref()` and `reactive()`
- Lifecycle hooks: `onMounted`, `onUnmounted`, etc.
- Template refs with `ref()` attribute
- Event handling with `@click`, `@submit`, etc.

### Database
- **Drizzle ORM** with PostgreSQL
- Schema definitions in `app/db/schema.ts`
- Table names: snake_case (`user`, `news`, `job_title`)
- Foreign keys with `references()` and cascade deletes
- JSON columns for complex data (`jsonb` type)

### Styling
- **Tailwind CSS** with custom theme
- Custom colors: `primary`, `secondary`, `tertiary`
- Responsive design with `md:`, `lg:` prefixes
- Utility-first approach
- Example: `class="flex flex-col gap-4 p-4 bg-primary rounded-lg"`

### API Design
- RESTful endpoints in `server/api/`
- Query parameters for filtering/pagination
- JSON responses with consistent structure
- Error responses with status codes and messages

### File Structure
- `app/` - Nuxt application code
- `server/api/` - Server-side API routes
- `models/` - TypeScript interfaces
- `utils/` - Utility functions
- `components/` - Vue components
- `layouts/` - Page layouts
- `pages/` - File-based routing