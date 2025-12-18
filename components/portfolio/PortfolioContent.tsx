"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, X, ChevronLeft, ChevronRight, Images, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioItem {
  id: number;
  title: string;
  categoryKey: string;
  imageUrl: string;
  description: string;
  isDocument?: boolean;
  documentUrl?: string; // URL for the document file
  liveUrl?: string;
  gallery?: string[];
  highlights?: string[];
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
  // AI Services Projects
  {
    id: 6,
    title: "Billson Solar AI Sales Chatbot",
    categoryKey: "aiServices",
    imageUrl: "/samples/AI/bill.jpg",
    description: "Intelligent AI assistant integrated into solar e-commerce platform, guiding customers through the entire buying journey with conversational product discovery and cart automation.",
    liveUrl: "https://billsonsolar.com/",
    gallery: ["/samples/AI/bill.jpg", "/samples/AI/bill1.jpg", "/samples/AI/bill2.jpg"],
    highlights: [
      "Conversational product discovery",
      "AI-powered budgeting system",
      "Cart automation via chat",
      "Page navigation commands",
    ],
  },
  {
    id: 7,
    title: "WhatsApp Car Rental Automation",
    categoryKey: "aiServices",
    imageUrl: "/samples/AI/chat.jpg",
    description: "Full-stack WhatsApp automation system using Evolution API and Node.js for high-volume car rental bookings with AI-powered conversations and real-time availability checking.",
    gallery: ["/samples/AI/chat.jpg", "/samples/AI/chat1.jpg"],
    highlights: [
      "AI agent (OpenAI/Gemini)",
      "Real-time Google Sheets sync",
      "Automated booking confirmation",
      "Human agent handoff",
    ],
  },
  {
    id: 8,
    title: "Personal Brand Automation Workflow",
    categoryKey: "aiServices",
    imageUrl: "/samples/AI/brand.jpg",
    description: "n8n automation workflow that generates personal branding content including LinkedIn posts, AI headshots, and professional bios using OpenAI and Airtable integration.",
    gallery: ["/samples/AI/brand.jpg", "/samples/AI/brand1.jpg"],
    highlights: [
      "Dynamic service routing",
      "AI image processing (Gemini)",
      "LinkedIn content generation",
      "Airtable data sync",
    ],
  },
  {
    id: 9,
    title: "Lead Gen Subscriber AI Agent",
    categoryKey: "aiServices",
    imageUrl: "/samples/AI/lead.jpg",
    description: "n8n automation that captures, validates, and enriches leads for AI marketing funnels with duplicate checking, AI-powered insights, and CRM integration.",
    gallery: ["/samples/AI/lead.jpg"],
    highlights: [
      "Webform data capture & cleaning",
      "Duplicate checking via Airtable",
      "AI-powered lead enrichment",
      "Automatic CRM follow-ups",
    ],
  },
  {
    id: 10,
    title: "AI Color Advisor Agent",
    categoryKey: "aiServices",
    imageUrl: "/samples/AI/sam.jpg",
    description: "Vision-powered AI workflow that analyzes house images and generates professional color palettes with structured recommendations and 3D visual previews.",
    gallery: ["/samples/AI/sam.jpg", "/samples/AI/sam1.jpg", "/samples/AI/sam2.jpg", "/samples/AI/sam3.jpg"],
    highlights: [
      "Gemini 2.5 Flash vision model",
      "Structured JSON color palettes",
      "Dynamic recommendations",
      "3D preview generation",
    ],
  },
  // Academic Documents
  {
    id: 13,
    title: "Communication with the Elderly",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Academic report on barriers, skills & resources for effective elderly communication.",
    isDocument: true,
    documentUrl: "/samples/academic/report.docx",
  },
  {
    id: 14,
    title: "LSM-Trees: Write-Optimized Storage",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Technical paper on storage engines, compaction strategies & performance analysis.",
    isDocument: true,
    documentUrl: "/samples/academic/LSM1.docx",
  },
  {
    id: 15,
    title: "Social Media Effects on Relationships",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Research study with methodology, statistical analysis & literature review.",
    isDocument: true,
    documentUrl: "/samples/academic/20240324 3.0.docx",
  },
  {
    id: 16,
    title: "Food Waste Analysis at Greenleaf Grocery",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Statistical analysis with ethical recommendations using Excel & regression models.",
    isDocument: true,
    documentUrl: "/samples/academic/Green leaf.docx",
  },
  {
    id: 17,
    title: "The Optimal Global Population",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Comprehensive research paper on population sustainability & policy implications.",
    isDocument: true,
    documentUrl: "/samples/academic/05-03.docx",
  },
  {
    id: 18,
    title: "Machine Vision for Medical Image Analysis",
    categoryKey: "academicSupport",
    imageUrl: "/file.svg",
    description: "Deep learning framework for medical imaging with CNN & explainable AI.",
    isDocument: true,
    documentUrl: "/samples/academic/Machine Vision for Medical Image Analysis (1) (1).docx",
  },
];

export default function PortfolioContent() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getCategoryName = (key: string) => {
    switch (key) {
      case "webDev": return t.footer.serviceNames.webDev;
      case "graphicDesign": return t.footer.serviceNames.graphicDesign;
      case "videoEditing": return t.footer.serviceNames.videoEditing;
      case "aiServices": return t.footer.serviceNames.aiServices;
      case "academicSupport": return t.footer.serviceNames.academicSupport;
      case "photoEditing": return t.footer.serviceNames.photoEditing;
      default: return key;
    }
  };

  const categories = ["all", ...Array.from(new Set(portfolioItems.map(item => item.categoryKey)))];
  const filteredItems = filter === "all" ? portfolioItems : portfolioItems.filter(item => item.categoryKey === filter);

  const openGallery = (item: PortfolioItem) => {
    if ((item.gallery && item.gallery.length > 0) || item.isDocument) {
      setSelectedItem(item);
      setCurrentImageIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.gallery!.length);
    }
  };

  const prevImage = () => {
    if (selectedItem?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.gallery!.length) % selectedItem.gallery!.length);
    }
  };

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
            <Card key={item.id} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-gray-50 group flex flex-col h-full">
              {item.isDocument ? (
                // Document Card Design (Enhanced)
                <div 
                  className="relative w-full h-56 bg-slate-100 overflow-hidden flex items-center justify-center p-6 group-hover:bg-blue-50 transition-colors duration-500 cursor-pointer"
                  onClick={() => openGallery(item)}
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                  
                  {/* Paper Simulation */}
                  <div className="relative w-3/4 h-full bg-white shadow-xl shadow-slate-200/50 rounded-t-sm border-t-4 border-blue-600 p-5 flex flex-col items-center text-center transform group-hover:-translate-y-2 transition-transform duration-300">
                    {/* Stacked Paper Effect (Pseudo-elements simulation) */}
                    <div className="absolute top-2 left-1 right-1 h-full bg-white border border-gray-100 rounded-t-sm -z-10 shadow-sm transform translate-y-1 scale-[0.98]" />
                    <div className="absolute top-3 left-2 right-2 h-full bg-white border border-gray-100 rounded-t-sm -z-20 shadow-sm transform translate-y-2 scale-[0.96]" />

                    {/* Content Preview */}
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>

                    <h3 className="font-heading font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-3">
                      {item.title}
                    </h3>
                    
                    <div className="w-8 h-0.5 bg-blue-200 rounded-full mb-3" />

                    {/* Abstract Text Lines */}
                    <div className="w-full space-y-1.5 opacity-30 mt-auto pb-2">
                      <div className="w-full h-1 bg-slate-400 rounded-full" />
                      <div className="w-5/6 h-1 bg-slate-400 rounded-full mx-auto" />
                      <div className="w-full h-1 bg-slate-400 rounded-full" />
                      <div className="w-4/5 h-1 bg-slate-400 rounded-full mx-auto" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-0 right-2">
                      <div className="w-4 h-6 bg-red-500 rounded-b-sm shadow-sm" title="A+ Quality" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <span className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-full shadow-sm">
                         <Eye className="w-4 h-4" /> Preview
                       </span>
                    </div>
                  </div>
                </div>
              ) : item.gallery ? (
                // AI Project with Gallery
                <div
                  className="relative w-full h-56 bg-gray-200 cursor-pointer"
                  onClick={() => openGallery(item)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 rounded-full flex items-center gap-2">
                      <Images className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-600">View Gallery ({item.gallery.length})</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-block bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      AI Project
                    </span>
                  </div>
                </div>
              ) : (
                // Regular Image Card Design
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
              <CardContent className="flex-grow flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
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
                  {item.gallery && (
                    <button
                      onClick={() => openGallery(item)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      View Gallery <Images className="w-4 h-4" />
                    </button>
                  )}
                  {item.isDocument && item.documentUrl && (
                    <button
                      onClick={() => openGallery(item)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Read Document <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gallery/Document Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeGallery}>
          <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute -top-10 right-0 md:-right-8 text-white hover:text-gray-300 transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Content Container */}
            <div className="relative w-full flex-grow bg-white md:rounded-t-2xl overflow-hidden flex flex-col">
              
              {selectedItem.isDocument && selectedItem.documentUrl ? (
                // DOCUMENT VIEWER
                <div className="w-full h-full bg-slate-100 flex flex-col">
                   <div className="bg-slate-900 text-white p-3 flex justify-between items-center shrink-0">
                      <span className="font-medium truncate">{selectedItem.title}</span>
                      <a 
                        href={selectedItem.documentUrl} 
                        download 
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
                      >
                        Download Original
                      </a>
                   </div>
                   <div className="flex-grow w-full relative">
                      <iframe 
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                           typeof window !== 'undefined' ? `${window.location.origin}${selectedItem.documentUrl}` : selectedItem.documentUrl
                        )}&embedded=true`} 
                        className="w-full h-full border-none"
                        title="Document Viewer"
                      />
                   </div>
                </div>
              ) : selectedItem.gallery ? (
                // IMAGE GALLERY
                <div className="w-full h-full bg-gray-900 relative">
                  <Image
                    src={selectedItem.gallery[currentImageIndex]}
                    alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                  />

                  {/* Navigation Arrows */}
                  {selectedItem.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">
                      {currentImageIndex + 1} / {selectedItem.gallery.length}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Project Info Footer */}
            <div className="bg-white md:rounded-b-2xl p-6 shrink-0 max-h-[30vh] overflow-y-auto">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>

              {selectedItem.highlights && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedItem.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.liveUrl && !selectedItem.isDocument && (
                <a
                  href={selectedItem.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Visit Live Site <ExternalLink className="w-4 h-4" />
                </a>
              )}
              
              {/* Thumbnail Strip (Only for Gallery) */}
              {selectedItem.gallery && selectedItem.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {selectedItem.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} layout="fill" objectFit="cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

