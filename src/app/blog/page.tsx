import Link from "next/link";

import PostCard from "@/components/blog/PostCard";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog: UI/UX, Web Development & Product Insights",
  description:
    "Notes from the Trikona team on UI/UX design, product strategy, web development and shipping startup MVPs.",
  path: "/blog",
});


export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Trikona Blog",
    url: `${siteUrl}/blog`,
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: typeof post.createdAt === 'string'
        ? post.createdAt
        : post.createdAt.toISOString(),
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <main>
      <JsonLd
        schema={[blogSchema, breadcrumbSchema([{ name: "Blog", path: "/blog" }])]}
      />

      <PageHero
        title={
          <>
            Notes on custom software, AI and{" "}
            <span className="text-gradient">automation</span>
          </>
        }
        description="Practical guidance on building and buying business software, written for the owners and decision-makers who have to choose."
      />

      <Section compact aria-labelledby="posts-heading">
        <Container>
          <h2 id="posts-heading" className="sr-only">
            Articles
          </h2>

          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-lg rounded-2xl border border-dashed border-line-2 bg-surface p-12 text-center">
              <h3 className="text-h3 text-ink">Nothing published yet</h3>
              <p className="mt-3 text-ink-3">
                We&apos;re writing the first few pieces. In the meantime, take a
                look at how we work.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild variant="primary">
                  <Link href="/portfolio">See our work</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/process">Our process</Link>
                </Button>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col gap-10">
              <Reveal>
                <PostCard post={featured} featured priority />
              </Reveal>

              {rest.length > 0 ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <Reveal
                      as="li"
                      key={post.id}
                      delay={(i % 3) * 80}
                      className="flex"
                    >
                      <PostCard post={post} />
                    </Reveal>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection
        title="Have a project in mind?"
        description="We write about this work because we do it every day. If you'd rather talk than read, we're here."
      />
    </main>
  );
}
