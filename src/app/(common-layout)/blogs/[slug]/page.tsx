// app/(common)/blog/[slug]/page.tsx

import { getBlogBySlugPublic } from "@/actions/client/public.client";
import { BlogDetailClient } from "@/components/modules/blog/BlogClientDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogBySlugPublic(slug);

  if (result.error || !result.data) {
    return {
      title: "Blog Post | EcoSpark Hub",
      description: "Read our latest blog post",
    };
  }

  const blog = result.data;
  return {
    title: `${blog.title} | EcoSpark Hub Blog`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogBySlugPublic(slug);

  if (result.error || !result.data) {
    notFound();
  }

  const blog = result.data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BlogDetailClient blog={blog} />
    </div>
  );
}
