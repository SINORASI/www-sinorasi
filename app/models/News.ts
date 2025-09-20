export interface News {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    tags: string[];
    content: string; // Markdown content
    publishedAt: string;
    author?: string;
}