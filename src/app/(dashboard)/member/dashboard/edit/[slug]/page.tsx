import { getMyIdeaBySlug } from "@/actions/client/idea.client";
import { getAllCatgory } from "@/actions/client/admin.client";

import { notFound } from "next/navigation";
import { EditIdeaClient } from "@/components/modules/member/idea/EditIdeaClient";

export const metadata = {
  title: "Edit Idea | Member Dashboard",
  description: "Edit your sustainability idea",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditIdeaPage({ params }: PageProps) {
  const { slug } = await params;

  const [ideaResult, categoriesResult] = await Promise.all([
    getMyIdeaBySlug(slug),
    getAllCatgory(1, 100),
  ]);

  if (ideaResult.error || !ideaResult.data) {
    notFound();
  }

  const categories = categoriesResult.data?.data || [];
  const idea = ideaResult.data;

  // Only allow editing drafts or rejected ideas
  if (idea.status !== "DRAFT" && idea.status !== "REJECTED") {
    notFound();
  }

  return (
    <div className="space-y-8">
      <EditIdeaClient idea={idea} categories={categories} />
    </div>
  );
}
