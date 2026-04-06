import { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  Users,
  Lightbulb,
  Globe,
  TrendingUp,
  Award,
  Heart,
  Shield,
  MessageCircle,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | EcoSpark Hub",
  description:
    "Learn about EcoSpark Hub - a community platform for sharing and discovering eco-friendly sustainability ideas.",
};

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Community Ideas", icon: Lightbulb },
    { value: "50+", label: "Active Members", icon: Users },
    { value: "1000+", label: "Votes Cast", icon: TrendingUp },
    { value: "10+", label: "Countries", icon: Globe },
  ];

  const values = [
    {
      title: "Sustainability First",
      description:
        "Every idea shared on our platform contributes to a greener, more sustainable future.",
      icon: Leaf,
      color:
        "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    },
    {
      title: "Community Driven",
      description:
        "We believe in the power of collective intelligence and community collaboration.",
      icon: Users,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      title: "Innovation & Impact",
      description:
        "We celebrate creative solutions that make a real difference in the world.",
      icon: Sparkles,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    },
    {
      title: "Transparency",
      description:
        "Open communication and honest feedback are at the heart of our platform.",
      icon: Shield,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
  ];

  const features = [
    {
      title: "Share Your Ideas",
      description:
        "Submit your eco-friendly ideas and get feedback from the community.",
      icon: Lightbulb,
    },
    {
      title: "Vote & Comment",
      description:
        "Engage with ideas by voting and leaving constructive comments.",
      icon: MessageCircle,
    },
    {
      title: "Premium Content",
      description:
        "Access exclusive premium ideas from sustainability experts.",
      icon: Award,
    },
    {
      title: "Member Benefits",
      description: "Become a member to unlock special features and content.",
      icon: Heart,
    },
    {
      title: "Watchlist",
      description: "Save interesting ideas to review and implement later.",
      icon: Target,
    },
    {
      title: "Fast & Secure",
      description:
        "Secure payments and protected user data with Stripe integration.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About EcoSpark Hub
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Empowering communities to share, discover, and implement sustainable
            solutions for a better tomorrow.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm mb-4">
              <Target className="w-4 h-4" />
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Building a Greener Future Together
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              EcoSpark Hub was born from a simple idea: what if we could create
              a space where anyone with a passion for sustainability could share
              their ideas and get meaningful feedback?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Today, we&apos;re proud to be a growing community of innovators,
              environmentalists, and everyday people who believe that small
              ideas can spark big changes. Our platform connects creative minds,
              encourages collaboration, and helps turn sustainable visions into
              reality.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl shadow-md mb-3">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at EcoSpark Hub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${value.color} mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to share, discover, and implement sustainable
            ideas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="p-2 bg-green-100 dark:bg-green-950/30 rounded-lg w-10 h-10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Whether you&apos;re an environmental expert, a student, or just
            someone who cares about the planet, there&apos;s a place for you at
            EcoSpark Hub.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/ideas">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Explore Ideas
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6">
            Join 500+ community members already making a difference
          </p>
        </div>
      </div>
    </div>
  );
}
