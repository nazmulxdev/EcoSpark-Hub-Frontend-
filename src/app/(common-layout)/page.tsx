import { FeaturesSection } from "@/components/modules/home/FeaturesSectin";

import { CTASection } from "@/components/modules/home/CTASection";
import { HeroSlider } from "@/components/modules/home/HeroSlider";
import { FeaturedIdeas } from "@/components/modules/home/FeaturedIdeas";
import { getAllIdeasPublic } from "@/actions/client/idea.client";
import { WhyJoinSection } from "@/components/modules/home/WhyJoinSection";
import { CommunityImpactSection } from "@/components/modules/home/CommunityImpactSection";

export const metadata = {
  title: "EcoSpark Hub | Share & Discover Sustainability Ideas",
  description:
    "Join our community to share eco-friendly ideas, vote on solutions, and make a difference for our planet.",
};

export default async function HomePage() {
  const result = await getAllIdeasPublic(1, 6, "", "true");
  const ideas = result.data?.data || [];
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <FeaturedIdeas ideas={ideas} />
      <CommunityImpactSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
