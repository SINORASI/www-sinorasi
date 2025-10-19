export interface News {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  tags: string[];
  content: string;
  publishedAt: string;
  author?: string;
}
