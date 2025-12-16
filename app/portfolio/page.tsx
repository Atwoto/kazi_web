"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "FinTech Platform Revamp",
    category: "Web Development",
    imageUrl: "/file.svg", 
    description: "End-to-end redesign and development of a secure banking dashboard for a Swiss client.",
  },
  {
    id: 2,
    title: "EcoBrand Identity System",
    category: "Graphic Design",
    imageUrl: "/file.svg", 
    description: "Complete visual identity and brand guidelines for a sustainable fashion label in Berlin.",
  },
  {
    id: 3,
    title: "SaaS Launch Campaign",
    category: "Video Editing",
    imageUrl: "/file.svg", 
    description: "Series of high-conversion explainer videos and social cuts for a B2B SaaS product.",
  },
  {
    id: 4,
    title: "Legal Data Processing",
    category: "Data Operations",
    imageUrl: "/file.svg", 
    description: "Secure digitization and classification of 50,000+ legal documents with 99.9% accuracy.",
  },
  {
    id: 5,
    title: "24/7 Support Operations",
    category: "Customer Support",
    imageUrl: "/file.svg", 
    description: "Established a dedicated support team for a UK e-commerce giant, reducing response time by 60%.",
  },
  {
    id: 6,
    title: "Academic Research Assistance",
    category: "Academic Support",
    imageUrl: "/file.svg", 
    description: "Comprehensive editing and formatting for a multi-chapter doctoral thesis.",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">Our Work</h1>
        <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          Delivered by our managed teams. Quality controlled, on time, and on budget.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`rounded-full px-6 py-2 ${filter === category ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <Card key={item.id} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-gray-50 group">
              <div className="relative w-full h-56 bg-gray-200">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-gray-900">{item.title}</CardTitle>
                <CardDescription className="text-sm text-blue-600 font-medium uppercase tracking-wide">{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}