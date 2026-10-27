import { blogPosts, type BlogPost } from "./blog-posts";

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  readMin: number;
  imageUrl: string | null;
  createdAt: Date | string;
};

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

export async function getPublishedPosts(): Promise<BlogSummary[]> {
  return sortedPosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: post.description,
    readMin: post.readMin,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sortedPosts.find((post) => post.slug === slug) ?? null;
}

/** "12 March 2025" — stable across locales, readable, and machine-parsable. */
export function formatPostDate(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateObj);
}
