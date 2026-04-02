import {
  checkPurchaseStatus,
  getIdeaBySlug,
} from "@/actions/client/idea.client";
import { getAuthSession } from "@/actions/client/auth.client";
import { IdeaDetailClient } from "@/components/modules/ideas/IdeaDetailClient";
import { notFound } from "next/navigation";
import { env } from "@/config/env";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata = {
  title: "Idea Details | EcoSpark Hub",
  description: "View sustainability idea details",
};

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Get the current session
  const session = await getAuthSession();

  // Check if user is authenticated
  const isAuthenticated = !!session.data?.user;
  const userId = session.data?.user?.id;
  const userRole = session.data?.user?.role;

  // Fetch idea details (server will handle access based on auth)
  const ideaResult = await getIdeaBySlug(slug);

  if (ideaResult.error || !ideaResult.data) {
    notFound();
  }

  const idea = ideaResult.data;

  // Determine access from the server response
  const hasAccess = idea.hasAccess === true;
  const requiresAccess = idea.requiresAccess === true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <IdeaDetailClient
        idea={idea}
        userId={userId}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        hasAccess={hasAccess}
        requiresAccess={requiresAccess}
        membershipPrice={Number(env.MEMBERSHIP_PRICE)}
      />
    </div>
  );
}
