import { Metadata } from "next";
import BlogList from "./BlogList";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles about React, TypeScript, Next.js, and modern web development.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogList posts={posts} tags={tags} />;
}
