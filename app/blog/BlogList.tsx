"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Tag } from "phosphor-react";
import { BlogPostMeta } from "@/lib/blog";
import Badge from "@/components/ui/Badge";

interface BlogListProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
      )
    : posts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-accent" />
            <span className="font-mono text-accent uppercase tracking-widest text-sm">
              Writing
            </span>
          </div>
          <h1 className="font-display text-display-lg font-bold tracking-tight mb-6">
            TECHNICAL
            <br />
            <span className="text-outline">BLOG</span>
          </h1>
          <p className="max-w-2xl text-muted font-mono text-lg">
            Thoughts on frontend development, React patterns, TypeScript, and
            building better web experiences.
          </p>
        </motion.div>

        {/* Tags Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border-2 transition-colors ${
              activeTag === null
                ? "bg-accent text-bg border-accent"
                : "border-border text-muted hover:border-fg hover:text-fg"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border-2 transition-colors ${
                activeTag === tag
                  ? "bg-accent text-bg border-accent"
                  : "border-border text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 border-2 border-border hover:border-accent transition-colors">
                  {/* Image */}
                  {post.image && (
                    <div className="lg:col-span-4 aspect-video lg:aspect-[4/3] overflow-hidden border-2 border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div
                    className={post.image ? "lg:col-span-8" : "lg:col-span-12"}
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-muted font-mono text-sm">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} weight="bold" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} weight="bold" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors flex items-start gap-4">
                      {post.title}
                      <ArrowUpRight
                        size={24}
                        className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </h2>

                    <p className="text-muted font-mono mb-6 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          <Tag size={12} weight="bold" className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-border"
          >
            <p className="text-muted font-mono">
              No posts found with this tag.
            </p>
            <button
              onClick={() => setActiveTag(null)}
              className="mt-4 font-mono text-accent hover:underline"
            >
              Clear filter
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
