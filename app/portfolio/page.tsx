"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: number;
  title: string;
  category: string; // e.g., "Web Development", "Graphic Design"
  imageUrl: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    category: "Web Development",
    imageUrl: "/next.svg", // Placeholder image
    description: "Modernized the online store with improved UX and performance.",
  },
  {
    id: 2,
    title: "Brand Identity Creation",
    category: "Graphic Design",
    imageUrl: "/vercel.svg", // Placeholder image
    description: "Developed a comprehensive brand guide and visual assets.",
  },
  {
    id: 3,
    title: "Promotional Video for Startup",
    category: "Video Editing",
    imageUrl: "/file.svg", // Placeholder image
    description: "Engaging video content to boost startup's marketing efforts.",
  },
  {
    id: 4,
    title: "Mobile App UI/UX Design",
    category: "UX/UI Design", // Adding a new category for this example
    imageUrl: "/window.svg", // Placeholder image
    description: "Designed intuitive and user-friendly interface for a new mobile application.",
  },
  {
    id: 5,
    title: "AI-Powered Data Analysis Dashboard",
    category: "AI Services",
    imageUrl: "/globe.svg", // Placeholder image
    description: "Developed an intelligent dashboard for real-time data insights.",
  },
  {
    id: 6,
    title: "Academic Research Paper Formatting",
    category: "Academic Support",
    imageUrl: "/next.svg", // Placeholder image
    description: "Ensured precise formatting and citation for a complex research paper.",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">Our Work</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Delivering excellence across borders. Explore a selection of projects delivered by our vetted East African talent, fully managed by Kazi.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="rounded-full px-6 py-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <Card key={item.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="relative w-full h-48">
                <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" className="transform hover:scale-105 transition-transform duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
                <CardDescription className="text-sm text-primary">{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">{item.description}</p>
                <Button variant="link" className="mt-4 px-0">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
