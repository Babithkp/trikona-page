import { unstable_cache } from "next/cache";
import prisma from "./prisma";

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  readMin: number;
  imageUrl: string | null;
  createdAt: Date | string;
};

/**
 * Blog queries wrapped so a missing or unreachable database degrades to an
 * empty state instead of a 500. The marketing pages must stay online even if
 * the CMS backing store is down. Cached for 5 minutes for performance.
 */
const getCachedPosts = unstable_cache(
  async () => {
    try {
      return await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          readMin: true,
          imageUrl: true,
          createdAt: true,
        },
      });
    } catch (error) {
      console.error("[blog] Failed to load posts:", error);
      return [];
    }
  },
  ["blog-posts"],
  { revalidate: 300, tags: ["blog"] }
);

export async function getPublishedPosts(): Promise<BlogSummary[]> {
  return getCachedPosts();
}

const getCachedPost = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.blog.findUnique({ where: { slug } });
    } catch (error) {
      console.error(`[blog] Failed to load post "${slug}":`, error);
      return null;
    }
  },
  ["blog-post"],
  { revalidate: 300, tags: ["blog"] }
);

export async function getPostBySlug(slug: string) {
  return getCachedPost(slug);
}

/** "12 March 2025" — stable across locales, readable, and machine-parsable. */
export function formatPostDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateObj);
}
