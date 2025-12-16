export interface SearchableItem {
  id: string;
  type: "page" | "service" | "blog" | "portfolio";
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const searchData: SearchableItem[] = [
  // Pages
  {
    id: "home",
    type: "page",
    title: "Home",
    description: "Work delivered, without the freelance hassle. Kazi connects Europe to vetted East African talent.",
    url: "/",
    tags: ["home", "hero", "kazi", "offshoring", "europe", "africa", "talent"],
  },
  {
    id: "about",
    type: "page",
    title: "About Us",
    description: "Connecting Europe to East African Excellence. Learn about our mission, team, and values.",
    url: "/about",
    tags: ["about", "team", "mission", "vision", "values", "story", "company"],
  },
  {
    id: "services",
    type: "page",
    title: "Our Services",
    description: "Explore all services: Video Editing, Photo Editing, Web Design, Graphic Design, AI Services, Academic Support.",
    url: "/services",
    tags: ["services", "video editing", "photo editing", "web design", "graphic design", "ai services", "academic support"],
  },
  {
    id: "portfolio",
    type: "page",
    title: "Portfolio",
    description: "View our portfolio of projects delivered by vetted East African talent.",
    url: "/portfolio",
    tags: ["portfolio", "work", "projects", "gallery", "examples"],
  },
  {
    id: "pricing",
    type: "page",
    title: "Pricing",
    description: "Transparent pricing for academic support and general services.",
    url: "/pricing",
    tags: ["pricing", "cost", "rates", "academic support", "general services"],
  },
  {
    id: "contact",
    type: "page",
    title: "Contact / Request a Quote",
    description: "Get a quote for your project. Request what you need and we'll deliver.",
    url: "/contact",
    tags: ["contact", "quote", "request", "project", "hire"],
  },
  {
    id: "work-with-us",
    type: "page",
    title: "Work with Us",
    description: "Join our network of vetted East African talent.",
    url: "/work-with-us",
    tags: ["work", "join", "freelancer", "talent", "vetted", "apply"],
  },
  {
    id: "faq",
    type: "page",
    title: "FAQ",
    description: "Frequently asked questions about our services and process.",
    url: "/faq",
    tags: ["faq", "questions", "answers", "help", "support"],
  },

  // Services
  {
    id: "video-editing",
    type: "service",
    title: "Video Editing",
    description: "Turn raw footage into polished, professional content for social media or business.",
    url: "/services/video-editing",
    tags: ["video", "editing", "social media", "business", "motion graphics", "subtitles"],
  },
  {
    id: "photo-editing",
    type: "service",
    title: "Photo Editing",
    description: "Professional retouching and manipulation to make your images stand out.",
    url: "/services/photo-editing",
    tags: ["photo", "editing", "retouching", "manipulation", "product photography", "color correction"],
  },
  {
    id: "web-design-development",
    type: "service",
    title: "Web Design & Development",
    description: "Custom, responsive websites built for performance and user experience.",
    url: "/services/web-design-development",
    tags: ["web", "design", "development", "responsive", "website", "cms", "seo"],
  },
  {
    id: "graphic-design",
    type: "service",
    title: "Graphic Design",
    description: "Visual identity, marketing materials, and branding that communicates value.",
    url: "/services/graphic-design",
    tags: ["graphic", "design", "branding", "logo", "marketing", "brochures", "presentations"],
  },
  {
    id: "ai-services",
    type: "service",
    title: "AI Services",
    description: "Practical business use of AI to automate tasks and improve efficiency.",
    url: "/services/ai-services",
    tags: ["ai", "artificial intelligence", "automation", "chatbot", "data analysis", "workflow"],
  },
  {
    id: "academic-support",
    type: "service",
    title: "Academic Support",
    description: "Editing, proofreading, and coaching. We polish your work, we don't write it for you.",
    url: "/services/academic-support",
    tags: ["academic", "editing", "proofreading", "coaching", "dissertation", "formatting", "citations"],
  },
];

export function searchContent(query: string): SearchableItem[] {
  if (!query || query.trim() === "") {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  return searchData.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
    const tagsMatch = item.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    return titleMatch || descriptionMatch || tagsMatch;
  });
}
