import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import PostCard from "@/components/blog/PostCard";
import CtaSection from "@/components/shared/CtaSection";
import Aurora from "@/components/ui/Aurora";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { formatPostDate, getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { site, siteUrl } from "@/lib/site";

type PageParams = { params: Promise<{ slug: string }> };

/** Matches the blog index: content refreshes without a redeploy. */
export const revalidate = 300;

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const metadata = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
  });

  if (post.imageUrl) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [{ url: post.imageUrl, alt: post.title }],
    };
    metadata.twitter = { ...metadata.twitter, images: [post.imageUrl] };
  }

  return metadata;
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  // Previously the "similar topics" list included the article you were
  // already reading.
  const related = allPosts.filter((item) => item.slug !== slug).slice(0, 3);

  const publishedAt = typeof post.createdAt === 'string'
    ? post.createdAt
    : post.createdAt.toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
    image: post.imageUrl ? [post.imageUrl] : undefined,
    timeRequired: `PT${post.readMin}M`,
    author: { "@type": "Organization", name: site.name, url: siteUrl },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };

  return (
    <main>
      <JsonLd
        schema={[
          articleSchema,
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <article>
        <header className="relative isolate -mt-16 overflow-hidden pt-28 pb-10 sm:-mt-18 sm:pt-32">
          <Aurora variant="soft" />
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                All articles
              </Link>

              <Reveal className="mt-8 flex flex-col gap-5">
                <p className="flex items-center gap-2 text-sm text-ink-4">
                  <time dateTime={publishedAt}>
                    {formatPostDate(post.createdAt)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMin} min read</span>
                </p>

                <h1 className="text-h1 text-ink">{post.title}</h1>
                <p className="text-lead text-ink-3">{post.description}</p>
              </Reveal>
            </div>
          </Container>
        </header>

        {post.imageUrl ? (
          <Container>
            <Reveal className="mx-auto max-w-4xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 1024px) 92vw, 896px"
                className="aspect-[16/9] w-full rounded-2xl border border-line object-cover shadow-md"
              />
            </Reveal>
          </Container>
        ) : null}

        <Section compact>
          <Container>
            {/* Markdown content converted to HTML. Styled by .prose-trikona so post
                bodies inherit the site's typography instead of browser
                defaults. */}
            <div
              className="prose-trikona mx-auto max-w-[70ch]"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section
          compact
          aria-labelledby="related-posts-heading"
          className="border-t border-line bg-surface"
        >
          <Container>
            <h2 id="related-posts-heading" className="text-h3 text-ink">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 80} className="flex">
                  <PostCard post={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </main>
  );
}
