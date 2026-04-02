import { FeaturesSection } from "@/components/modules/home/FeaturesSectin";
import { RecentIdeas } from "@/components/modules/home/RecentIdeas";
import { CTASection } from "@/components/modules/home/CTASection";
import { HeroSlider } from "@/components/modules/home/HeroSlider";

export const metadata = {
  title: "EcoSpark Hub | Share & Discover Sustainability Ideas",
  description:
    "Join our community to share eco-friendly ideas, vote on solutions, and make a difference for our planet.",
};

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <FeaturesSection />
      <RecentIdeas />
      <CTASection />
    </main>
  );
}
