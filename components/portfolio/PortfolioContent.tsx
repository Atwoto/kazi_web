"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioItem {
  id: number;
  title: string;
  categoryKey: string;
  imageUrl: string;
  description: string;
  isDocument?: boolean;
  liveUrl?: string;
}

const portfolioItems: PortfolioItem[] = [
  // Web Development Projects
  {
    id: 1,
    title: "SokoBridge",
    categoryKey: "webDev",
    imageUrl: "/samples/web/soko.jpg",
    description: "Business platform helping clients source products from Europe to Kenya and manage trade/shipping logistics efficiently.",
    liveUrl: "https://www.sokobridge.com/",
  },
  {
    id: 2,
    title: "Bills On Solar EA Limited",
    categoryKey: "webDev",
    imageUrl: "/samples/web/bill.jpg",
    description: "Kenyan renewable energy company providing solar solutions for residential, commercial, and off-grid use.",
    liveUrl: "https://billsonsolar.com/",
  },
  {
    id: 3,
    title: "Sambright Investment LTD",
    categoryKey: "webDev",
    imageUrl: "/samples/web/sambright.jpg",
    description: "Home and office improvement company offering painting, gypsum installation, epoxy flooring, and waterproofing services.",
    liveUrl: "https://www.sambrightinvestmentltd.com/",
  },
  {
    id: 4,
    title: "Mushosheke & Co Consultancy",
    categoryKey: "webDev",
    imageUrl: "/samples/web/mush.jpg",
    description: "Professional consultancy providing conference interpretation, translation services, and language solutions across East Africa.",
    liveUrl: "https://www.mushoshekeltd.co.ke/",
  },
  {
    id: 5,
    title: "Sambright Investment CRM",
    categoryKey: "webDev",
    imageUrl: "/samples/web/crm.jpg",
    description: "Custom CRM web application for managing leads, sales, contacts, projects, and internal business workflows.",
    liveUrl: "https://sambright-investment-crm.vercel.app/",
  },
  // Other Projects
  {
    id: 6,
    title: "EcoBrand Identity System",
    categoryKey: "graphicDesign",
    imageUrl: "/file.svg",
    description: "Complete visual identity and brand guidelines for a sustainable fashion label in Berlin.",
  },
  {
    id: 7,
    title: "SaaS Launch Campaign",
    categoryKey: "videoEditing",
    imageUrl: "/file.svg",
    description: "Series of high-conversion explainer videos and social cuts for a B2B SaaS product.",
  },
  {
    id: 8,
    title: "Legal Data Processing",
    categoryKey: "aiServices",
    imageUrl: "/file.svg",
    description: "Secure digitization and classification of 50,000+ legal documents with 99.9% accuracy.",
  },
  // Academic Documents
  {
    id: 9,
    title: "Communication with the Elderly",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Academic report on barriers, skills & resources for effective elderly communication.",
    isDocument: true,
  },
  {
    id: 10,
    title: "LSM-Trees: Write-Optimized Storage",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Technical paper on storage engines, compaction strategies & performance analysis.",
    isDocument: true,
  },
  {
    id: 11,
    title: "Social Media Effects on Relationships",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Research study with methodology, statistical analysis & literature review.",
    isDocument: true,
  },
  {
    id: 12,
    title: "Food Waste Analysis at Greenleaf Grocery",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Statistical analysis with ethical recommendations using Excel & regression models.",
    isDocument: true,
  },
  {
    id: 13,
    title: "The Optimal Global Population",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Comprehensive research paper on population sustainability & policy implications.",
    isDocument: true,
  },
  {
    id: 14,
    title: "Machine Vision for Medical Image Analysis",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Deep learning framework for medical imaging with CNN & explainable AI.",
    isDocument: true,
  },
];

export default function PortfolioContent() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const getCategoryName = (key: string) => {
    switch (key) {
      case "webDev": return t.footer.serviceNames.webDev;
      case "graphicDesign": return t.footer.serviceNames.graphicDesign;
      case "videoEditing": return t.footer.serviceNames.videoEditing;
      case "aiServices": return t.footer.serviceNames.aiServices;
      case "academicSupport": return t.footer.serviceNames.academicSupport;
      case "customerSupport": return "Customer Support"; // Fallback or add to translations
      default: return key;
    }
  };

  const categories = ["all", ...Array.from(new Set(portfolioItems.map(item => item.categoryKey)))];

  const filteredItems = filter === "all" ? portfolioItems : portfolioItems.filter(item => item.categoryKey === filter);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">
          {t.portfolio.pageTitle}
        </h1>
        <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          {t.portfolio.pageSubtitle}
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
              {category === "all" ? t.portfolio.filters.all : getCategoryName(category)}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <Card key={item.id} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-gray-50 group">
              {item.isDocument ? (
                // Document Card Design
                <div className="relative w-full h-56 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
                  <div className="w-16 h-20 bg-white rounded-lg shadow-md flex flex-col items-center justify-center border border-gray-200 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 text-blue-600 mb-1" />
                    <span className="text-[10px] font-bold text-blue-600 uppercase">DOCX</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Academic Paper
                    </span>
                  </div>
                </div>
              ) : (
                // Image Card Design
                <div className="relative w-full h-56 bg-gray-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-gray-900">{item.title}</CardTitle>
                <CardDescription className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                  {getCategoryName(item.categoryKey)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Site <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
