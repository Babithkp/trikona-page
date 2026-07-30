import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatPostDate, type BlogSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default function PostCard({
  post,
  featured = false,
  priority = false,
}: {
  post: BlogSummary;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-xs",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-md",
        "focus-within:-translate-y-1 focus-within:shadow-md",
        featured && "lg:flex-row",
      )}
    >
      {post.imageUrl ? (
        <div
          className={cn(
            "overflow-hidden bg-surface-3",
            featured ? "lg:w-[52%]" : "",
          )}
        >
          <Image
            src={post.imageUrl}
            alt=""
            width={1200}
            height={675}
            priority={priority}
            sizes={
              featured
                ? "(max-width: 1024px) 92vw, 620px"
                : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
            }
            className={cn(
              "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
              featured ? "aspect-[16/10] lg:h-full" : "aspect-[16/9]",
            )}
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col gap-3 p-6",
          featured && "justify-center sm:p-9",
        )}
      >
        <p className="flex items-center gap-2 text-xs text-ink-4">
          <time dateTime={typeof post.createdAt === 'string'
            ? post.createdAt
            : post.createdAt.toISOString()}>
            {formatPostDate(post.createdAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readMin} min read</span>
        </p>

        <h3
          className={cn(
            "font-display font-semibold tracking-tight text-ink",
            featured ? "text-h3" : "text-lg",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "text-sm leading-relaxed text-ink-3",
            featured ? "max-w-[56ch]" : "line-clamp-3",
          )}
        >
          {post.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-brand">
          Read article
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
