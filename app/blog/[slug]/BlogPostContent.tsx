"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Tag,
  TwitterLogo,
  LinkedinLogo,
  Copy,
  Check,
} from "phosphor-react";
import { useState } from "react";
import { BlogPost, BlogPostMeta } from "@/lib/blog";
import Badge from "@/components/ui/Badge";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

export default function BlogPostContent({
  post,
  relatedPosts,
}: BlogPostContentProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-[900px] mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                <Tag size={12} weight="bold" className="mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted font-mono text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={16} weight="bold" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} weight="bold" />
              {post.readingTime}
            </span>
            <span>By {post.author}</span>
          </div>
        </motion.header>

        {/* Hero Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video overflow-hidden border-2 border-border mb-12"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:font-mono prose-p:text-muted prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-fg prose-strong:font-bold
            prose-code:text-accent prose-code:bg-border prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#111] prose-pre:border-2 prose-pre:border-border prose-pre:rounded-none
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
            prose-ul:font-mono prose-ol:font-mono
            prose-li:text-muted prose-li:marker:text-accent
            prose-hr:border-border
          "
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t-2 border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="font-mono text-sm uppercase tracking-wider text-muted">
              Share this article
            </span>
            <div className="flex gap-2">
              <button
                onClick={shareOnTwitter}
                className="p-3 border-2 border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="Share on Twitter"
              >
                <TwitterLogo size={20} weight="bold" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-3 border-2 border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="Share on LinkedIn"
              >
                <LinkedinLogo size={20} weight="bold" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-3 border-2 border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check size={20} weight="bold" className="text-accent" />
                ) : (
                  <Copy size={20} weight="bold" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-8 border-2 border-border"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-accent flex items-center justify-center font-display font-bold text-bg text-2xl flex-shrink-0">
              C
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">
                {post.author}
              </h3>
              <p className="text-muted font-mono text-sm mb-4">
                Senior Software Engineer with 6+ years of experience building
                web applications. Passionate about React, TypeScript, and
                creating great user experiences.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent hover:underline"
              >
                Learn more about me
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[1400px] mx-auto mt-24 pt-16 border-t-2 border-border"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group p-6 border-2 border-border hover:border-accent transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {relatedPost.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-muted font-mono text-sm line-clamp-2">
                  {relatedPost.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

// Simple markdown-like formatting (in production, use MDX properly)
function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|p|u|o|l|b|p])/gm, "<p>")
    .replace(/---/g, "<hr />")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<h[1-6]>)/g, "$1")
    .replace(/(<\/h[1-6]>)<\/p>/g, "$1")
    .replace(/<p>(<pre>)/g, "$1")
    .replace(/(<\/pre>)<\/p>/g, "$1")
    .replace(/<p>(<hr \/>)/g, "$1")
    .replace(/(<hr \/>)<\/p>/g, "$1");
}
