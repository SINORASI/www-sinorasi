export interface Event {
  id: string;
  slug: string;
  title: string;
  details: string;
  date: string;
  imageUrl: string;
  content: string;
  publishedAt: string;
  author?: string;
  organizationSlug?: string;
}
