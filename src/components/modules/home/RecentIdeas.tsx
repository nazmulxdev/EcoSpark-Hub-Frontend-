import Link from "next/link";
import { Eye, ThumbsUp, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recentIdeas = [
  {
    id: 1,
    title: "Community Solar Garden Initiative",
    description:
      "A shared solar power system for neighborhoods to reduce carbon footprint.",
    category: "Energy",
    votes: 45,
    comments: 12,
    views: 230,
  },
  {
    id: 2,
    title: "Plastic Waste to Building Materials",
    description:
      "Converting recycled plastic into durable construction blocks.",
    category: "Recycling",
    votes: 38,
    comments: 8,
    views: 189,
  },
  {
    id: 3,
    title: "Urban Rooftop Farming Network",
    description:
      "Connecting building owners with urban farmers for sustainable food production.",
    category: "Food",
    votes: 52,
    comments: 15,
    views: 312,
  },
];

export function RecentIdeas() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Recent Ideas
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover what our community is sharing
            </p>
          </div>
          <Link href="/ideas">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  {idea.category}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {idea.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                {idea.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {idea.votes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {idea.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {idea.views}
                </div>
              </div>

              <Link href={`/ideas/${idea.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-green-600"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
