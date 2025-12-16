export interface Service {
  slug: string;
  name: string;
  oneLiner: string;
  heroImage: string;
  ctaLink: string;
  deliverables: string[];
  examples: { title: string; description: string; imageUrl: string }[];
  process: { step: string; description: string }[];
}

export const servicesData: Service[] = [
  {
    slug: "web-design-development",
    name: "Web Development",
    oneLiner: "Enterprise-grade websites and platforms, delivered fully managed.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "Custom UI/UX Design",
      "Full-Stack Development (React/Next.js)",
      "CMS & E-commerce Integration",
      "QA Testing & Deployment",
    ],
    examples: [
      {
        title: "FinTech Dashboard",
        description: "Secure, scalable platform with real-time data visualization.",
        imageUrl: "/file.svg",
      },
      {
        title: "Corporate Identity Site",
        description: "High-performance marketing site with CMS management.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Discovery", description: "We align on your business goals and technical requirements." },
      { step: "Development", description: "Our managed team builds your solution in agile sprints." },
      { step: "Quality Assurance", description: "Rigorous testing to ensure European standards." },
      { step: "Launch & Handover", description: "Seamless deployment and full IP transfer." },
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    oneLiner: "Strategic visual identity and marketing assets for your brand.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Brand Strategy & Identity", "Marketing Collateral", "Social Media Suites", "Presentation Design"],
    examples: [],
    process: [],
  },
  {
    slug: "virtual-assistance",
    name: "Virtual Assistance",
    oneLiner: "Managed administrative support to streamline your operations.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Executive Inbox Management", "Complex Scheduling", "Operational Support", "Travel Logistics"],
    examples: [],
    process: [],
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    oneLiner: "Professional copy and content strategies that drive engagement.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Thought Leadership Articles", "SEO-Driven Blog Content", "Website Copywriting", "Technical Documentation"],
    examples: [],
    process: [],
  },
  {
    slug: "data-entry",
    name: "Data Operations",
    oneLiner: "Secure, accurate, and scalable data processing solutions.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Data Cleaning & Validation", "Lead Enrichment", "CRM Management", "Large-Scale Transcription"],
    examples: [],
    process: [],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    oneLiner: "Dedicated support teams to enhance your customer experience.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Omni-channel Support", "L1/L2 Ticket Resolution", "Live Chat Management", "Knowledge Base Maintenance"],
    examples: [],
    process: [],
  },
  {
    slug: "video-editing",
    name: "Video Production",
    oneLiner: "Post-production services for high-impact visual storytelling.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Corporate Explainers", "Social Media Reels", "Ads & Promos", "Full Post-Production"],
    examples: [],
    process: [],
  },
  {
    slug: "photo-editing",
    name: "Image Retouching",
    oneLiner: "High-volume, high-quality retouching for e-commerce and media.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["High-End Retouching", "E-commerce Standardization", "Color Correction", "Compositing"],
    examples: [],
    process: [],
  },
  {
    slug: "ai-services",
    name: "AI Solutions",
    oneLiner: "Implementing practical AI workflows to future-proof your business.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Workflow Automation", "Custom Chatbot Integration", "Data Analysis Models", "Process Optimization"],
    examples: [],
    process: [],
  },
  {
    slug: "academic-support",
    name: "Academic Editing",
    oneLiner: "Professional editing and coaching for academic excellence.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: ["Dissertation Proofreading", "Style Guide Formatting", "Structure & Flow Analysis", "Citation Compliance"],
    examples: [],
    process: [],
  },
];