export interface Event {
  id: string;
  slug: string;
  title: string;
  details: string;
  date: string;
  imageUrl: string;
  content: string; // Markdown content
  publishedAt: string;
  author?: string;
  organizationSlug?: string;
}
