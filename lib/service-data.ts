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
    slug: "video-editing",
    name: "Video Editing",
    oneLiner: "Turn raw footage into polished, professional content for social media or business.",
    heroImage: "/file.svg", 
    ctaLink: "/contact",
    deliverables: [
      "Short showreel style clips",
      "Color grading and audio mixing",
      "Motion graphics and subtitles",
      "YouTube & Social Media cuts",
    ],
    examples: [
      {
        title: "Social Media Reels",
        description: "Engaging short-form content for Instagram and TikTok.",
        imageUrl: "/file.svg", 
      },
      {
        title: "Corporate Explainers",
        description: "Professional overview videos for business websites.",
        imageUrl: "/file.svg", 
      },
    ],
    process: [
      { step: "Briefing", description: "Share your footage and vision." },
      { step: "Rough Cut", description: "Review the initial assembly and flow." },
      { step: "Polishing", description: "We add effects, sound, and color." },
      { step: "Delivery", description: "Final high-res files ready to post." },
    ],
  },
  {
    slug: "photo-editing",
    name: "Photo Editing",
    oneLiner: "Professional retouching and manipulation to make your images stand out.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "High-end retouching",
      "Background removal/replacement",
      "Color correction",
      "Product photography enhancement",
    ],
    examples: [
      {
        title: "E-commerce Products",
        description: "Clean, white-background product shots.",
        imageUrl: "/file.svg",
      },
      {
        title: "Event Photography",
        description: "Vibrant, color-corrected event highlights.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Upload", description: "Send us your raw images." },
      { step: "Editing", description: "We apply your specific style guidelines." },
      { step: "Review", description: "Check the proofs and request tweaks." },
      { step: "Download", description: "Get your full-resolution final images." },
    ],
  },
  {
    slug: "web-design-development",
    name: "Web Design & Development",
    oneLiner: "Custom, responsive websites built for performance and user experience.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "Responsive Website Design",
      "Frontend & Backend Development",
      "CMS Integration",
      "SEO-friendly structure",
    ],
    examples: [
      {
        title: "Business Portfolio",
        description: "Modern landing page for a consultancy.",
        imageUrl: "/file.svg",
      },
      {
        title: "E-commerce Store",
        description: "Full shop setup with payment integration.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Discovery", description: "We map out your site's goals and structure." },
      { step: "Design", description: "See wireframes and visual mockups." },
      { step: "Development", description: "We build the site with clean code." },
      { step: "Launch", description: "Testing, optimization, and go-live." },
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    oneLiner: "Visual identity, marketing materials, and branding that communicates value.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "Logo & Brand Identity",
      "Social Media Graphics",
      "Marketing Brochures",
      "Presentation Decks",
    ],
    examples: [
      {
        title: "Brand Identity",
        description: "Logo, color palette, and typography guide.",
        imageUrl: "/file.svg",
      },
      {
        title: "Social Campaigns",
        description: "Cohesive set of posts for a product launch.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Concept", description: "We explore different visual directions." },
      { step: "Drafts", description: "Review initial designs and give feedback." },
      { step: "Refinement", description: "Polishing the chosen concept." },
      { step: "Files", description: "Delivery of all source and export formats." },
    ],
  },
  {
    slug: "ai-services",
    name: "AI Services",
    oneLiner: "Practical business use of AI to automate tasks and improve efficiency.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "Workflow Automation",
      "Data Analysis & Insights",
      "Chatbot Setup",
      "Custom AI Prompts/Solutions",
    ],
    examples: [
      {
        title: "Customer Support Bot",
        description: "Automated responses for common queries.",
        imageUrl: "/file.svg",
      },
      {
        title: "Data Processing",
        description: "AI-assisted sorting of large datasets.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Assessment", description: "Identify where AI adds value." },
      { step: "Setup", description: "Configure tools and workflows." },
      { step: "Testing", description: "Ensure accuracy and reliability." },
      { step: "Handoff", description: "Training you to use the new system." },
    ],
  },
  {
    slug: "academic-support",
    name: "Academic Support",
    oneLiner: "Editing, proofreading, and coaching. We polish your work, we don't write it for you.",
    heroImage: "/file.svg",
    ctaLink: "/contact",
    deliverables: [
      "Proofreading & Editing",
      "Formatting & Citations",
      "Clarity & Structure Improvements",
      "Plagiarism Check Guidance",
    ],
    examples: [
      {
        title: "Dissertation Edit",
        description: "Grammar and flow correction for a thesis.",
        imageUrl: "/file.svg",
      },
      {
        title: "Report Formatting",
        description: "Aligning with strict style guidelines.",
        imageUrl: "/file.svg",
      },
    ],
    process: [
      { step: "Review", description: "We assess your draft and requirements." },
      { step: "Quote", description: "Tiered pricing based on length and depth." },
      { step: "Edit", description: "Detailed suggestions and corrections." },
      { step: "Final Polish", description: "Ready for your final review." },
    ],
  },
];
