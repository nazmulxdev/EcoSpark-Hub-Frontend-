/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(common)/blog/page.tsx (Check this part)

import { getAllBlogsPublic } from "@/actions/client/public.client";
import { BlogClient } from "@/components/modules/blog/BlogClient";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const limit = 9;
  const searchTerm = params.searchTerm || "";

  const result = await getAllBlogsPublic(page, limit, searchTerm, "true");

  const blogs = result.data?.data || [];
  const meta = result.data?.meta || {
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  };

  console.log("Blogs array:", blogs);
  console.log("First blog author:", blogs[0]?.author);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BlogClient
        initialBlogs={blogs}
        initialMeta={meta}
        currentPage={page}
        currentSearchTerm={searchTerm}
      />
    </div>
  );
}
