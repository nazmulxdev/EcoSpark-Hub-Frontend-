"use client";

import { motion } from "framer-motion";
import { Leaf, Lightbulb, Users, Award, Shield, Zap } from "lucide-react";

const features = [
  {
    title: "Share Ideas",
    description:
      "Post your eco-friendly ideas and get feedback from the community.",
    icon: Lightbulb,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    title: "Community Voting",
    description: "Vote on ideas and help the best solutions rise to the top.",
    icon: Users,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    title: "Premium Content",
    description: "Access exclusive premium ideas from sustainability experts.",
    icon: Award,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
  },
  {
    title: "Member Benefits",
    description: "Unlock special features and content as a premium member.",
    icon: Shield,
    color:
      "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
  },
  {
    title: "Fast & Secure",
    description: "Secure payments and protected data with Stripe integration.",
    icon: Zap,
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/50 dark:text-yellow-400",
  },
  {
    title: "Eco-Friendly",
    description: "Every idea contributes to a more sustainable future.",
    icon: Leaf,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose EcoSpark Hub?
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
