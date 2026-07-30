import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site";

/** Keeps the sitemap in step with newly published posts. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "", priority: 1, changeFrequency: "weekly" },
      { path: "/services", priority: 0.9, changeFrequency: "monthly" },
      { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
      { path: "/process", priority: 0.8, changeFrequency: "monthly" },
      { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
      { path: "/contactus", priority: 0.7, changeFrequency: "yearly" },
      { path: "/careers", priority: 0.6, changeFrequency: "monthly" },
    ] as const
  ).map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Case studies come from the same source as the pages themselves, so a new
  // one can never go missing from the sitemap.
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/portfolio/${study.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const posts = await getPublishedPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
