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
    description: "Kazi is a local agency in Catalonia helping businesses with digital solutions.",
    url: "/",
    tags: ["home", "hero", "kazi", "local agency", "catalonia", "reservas", "redes sociales"],
  },
  {
    id: "about",
    type: "page",
    title: "About Us",
    description: "Learn about our mission as a local agency in Catalonia. Meet our team and discover our values.",
    url: "/about",
    tags: ["about", "team", "mission", "vision", "values", "story", "company"],
  },
  {
    id: "services",
    type: "page",
    title: "Our Services",
    description: "Explore our digital solutions: Web & Booking Systems, Social Media Management, and Graphic Design.",
    url: "/services",
    tags: ["services", "web design", "social media", "graphic design", "ai services"],
  },
  {
    id: "portfolio",
    type: "page",
    title: "Portfolio",
    description: "View our portfolio of projects delivered for local businesses.",
    url: "/portfolio",
    tags: ["portfolio", "work", "projects", "gallery", "examples"],
  },
  {
    id: "pricing",
    type: "page",
    title: "Pricing",
    description: "Transparent pricing for our digital services for local businesses.",
    url: "/pricing",
    tags: ["pricing", "cost", "rates", "local business"],
  },
  {
    id: "contact",
    type: "page",
    title: "Contact / Request a Quote",
    description: "Contact your local digital agency in Catalonia for a quote.",
    url: "/contact",
    tags: ["contact", "quote", "request", "project", "demo"],
  },
  {
    id: "work-with-us",
    type: "page",
    title: "Work with Us",
    description: "Join our network of local talent in Catalonia.",
    url: "/work-with-us",
    tags: ["work", "join", "talent", "local", "apply"],
  },
  {
    id: "faq",
    type: "page",
    title: "FAQ",
    description: "Frequently asked questions about our local services.",
    url: "/faq",
    tags: ["faq", "questions", "answers", "help", "support"],
  },

  // Services
  {
    id: "web-design-development",
    type: "service",
    title: "Web & Booking Systems",
    description: "Custom, responsive websites with booking systems for local businesses.",
    url: "/services/web-design-development",
    tags: ["web", "design", "development", "responsive", "website", "reservas", "booking"],
  },
  {
    id: "social-media-management",
    type: "service",
    title: "Social Media Management",
    description: "Content management and growth for local businesses on Instagram and Google Maps.",
    url: "/services/social-media-management",
    tags: ["social media", "instagram", "google maps", "local business", "community management"],
  },
  {
    id: "graphic-design",
    type: "service",
    title: "Graphic Design",
    description: "Visual identity, marketing materials, and branding for your local business.",
    url: "/services/graphic-design",
    tags: ["graphic", "design", "branding", "logo", "marketing", "menus"],
  },
  {
    id: "ai-services",
    type: "service",
    title: "AI Automation",
    description: "Practical AI solutions like chatbots to automate tasks for your business.",
    url: "/services/ai-services",
    tags: ["ai", "artificial intelligence", "automation", "chatbot", "workflow"],
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
