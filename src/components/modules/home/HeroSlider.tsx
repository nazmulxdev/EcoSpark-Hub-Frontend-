// components/home/HeroSlider.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Share Your Eco-Friendly Ideas",
    description:
      "Have a brilliant sustainability idea? Share it with our community and get valuable feedback.",
    buttonText: "Share Your Idea",
    buttonLink: "/ideas/new",
    icon: Lightbulb,
    gradient: "from-green-600 to-emerald-600",
    stats: { value: "500+", label: "Ideas Shared" },
  },
  {
    id: 2,
    title: "Discover Innovative Solutions",
    description:
      "Explore thousands of eco-friendly ideas from creative minds around the world.",
    buttonText: "Explore Ideas",
    buttonLink: "/ideas",
    icon: TrendingUp,
    gradient: "from-blue-600 to-cyan-600",
    stats: { value: "1000+", label: "Community Votes" },
  },
  {
    id: 3,
    title: "Join Our Growing Community",
    description:
      "Connect with like-minded individuals passionate about making our planet greener.",
    buttonText: "Join Now",
    buttonLink: "/register",
    icon: Users,
    gradient: "from-purple-600 to-pink-600",
    stats: { value: "50+", label: "Active Members" },
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} opacity-90`}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 min-h-[500px] md:min-h-[600px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
          >
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
                <Leaf className="w-4 h-4" />
                EcoSpark Hub
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentSlide.title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                {currentSlide.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={currentSlide.buttonLink}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {currentSlide.buttonText}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-8 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold">
                    {currentSlide.stats.value}
                  </div>
                  <div className="text-sm text-white/80">
                    {currentSlide.stats.label}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Community Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm text-white/80">To Join</div>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-32 h-32 text-white" />
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-5 -right-5 w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Leaf className="w-8 h-8 text-yellow-300" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-5 -left-5 w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Lightbulb className="w-10 h-10 text-green-300" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
