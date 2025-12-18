export interface Service {
  slug: string;
  name: string;
  oneLiner: string;
  heroImage: string;
  ctaLink: string;
  deliverables: string[];
  examples: { title: string; description: string; imageUrl: string }[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  targetAudience?: string;
  startingPrice?: string;
  turnaround?: string;
}

export const servicesData: Service[] = [
  {
    slug: "web-design-development",
    name: "Web Development",
    oneLiner: "Enterprise-grade websites and platforms, delivered fully managed.",
    heroImage: "/web.png",
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
    faqs: [
      { question: "Do you provide hosting?", answer: "We can set up hosting for you on preferred providers like Vercel or AWS, but you will own the accounts." },
      { question: "Will I be able to edit the content myself?", answer: "Yes, we typically build with a CMS (like Sanity or Strapi) so you can manage text and images easily." },
      { question: "Do you offer maintenance?", answer: "We offer optional monthly maintenance packages for security updates and content changes." },
    ],
    targetAudience: "Startups & SMEs",
    startingPrice: "€25",
    turnaround: "2-4 Weeks"
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    oneLiner: "Strategic visual identity and marketing assets for your brand.",
    heroImage: "/graphics.jpg",
    ctaLink: "/contact",
    deliverables: ["Brand Strategy & Identity", "Marketing Collateral", "Social Media Suites", "Presentation Design"],
    examples: [],
    process: [],
    faqs: [
       { question: "What formats will I receive?", answer: "We provide all industry-standard formats: AI, EPS, PDF, JPG, and PNG." },
       { question: "How many revisions are included?", answer: "Our standard packages include 2-3 rounds of revisions." },
    ],
    targetAudience: "Marketing Teams",
    startingPrice: "€25",
    turnaround: "3-7 Days"
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
    faqs: [],
    targetAudience: "Busy Executives",
    startingPrice: "€25",
    turnaround: "Ongoing"
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
    faqs: [],
    targetAudience: "Digital Agencies",
    startingPrice: "€25",
    turnaround: "2-5 Days"
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
    faqs: [],
    targetAudience: "Enterprise",
    startingPrice: "Custom Quote",
    turnaround: "Scope Dependent"
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
    faqs: [],
    targetAudience: "SaaS Companies",
    startingPrice: "€25",
    turnaround: "Setup: 1 Week"
  },
  {
    slug: "video-editing",
    name: "Video Production",
    oneLiner: "Post-production services for high-impact visual storytelling.",
    heroImage: "/video.jpg",
    ctaLink: "/contact",
    deliverables: ["Corporate Explainers", "Social Media Reels", "Ads & Promos", "Full Post-Production"],
    examples: [],
    process: [],
    faqs: [
        { question: "What is your typical turnaround?", answer: "Simple edits are often done in 48h. Complex projects depend on scope." },
        { question: "How do I send large files?", answer: "We use Google Drive, Dropbox, or WeTransfer." },
    ],
    targetAudience: "Creators & Brands",
    startingPrice: "€25",
    turnaround: "48-72 Hours"
  },
  {
    slug: "photo-editing",
    name: "Image Retouching",
    oneLiner: "High-volume, high-quality retouching for e-commerce and media.",
    heroImage: "/photo.jpg",
    ctaLink: "/contact",
    deliverables: ["High-End Retouching", "E-commerce Standardization", "Color Correction", "Compositing"],
    examples: [],
    process: [],
    faqs: [
        { question: "Can you handle bulk orders?", answer: "Yes, our team is scalable to handle hundreds of images per day." },
    ],
    targetAudience: "E-commerce Stores",
    startingPrice: "€25",
    turnaround: "24-48 Hours"
  },
  {
    slug: "ai-services",
    name: "AI Solutions",
    oneLiner: "Implementing practical AI workflows to future-proof your business.",
    heroImage: "/AI.jpg",
    ctaLink: "/contact",
    deliverables: ["Workflow Automation", "Custom Chatbot Integration", "Data Analysis Models", "Process Optimization"],
    examples: [],
    process: [],
    faqs: [
        { question: "Is my data secure?", answer: "Yes, we prioritize data privacy and use secure, enterprise-grade APIs." },
    ],
    targetAudience: "Tech-Forward Biz",
    startingPrice: "€25",
    turnaround: "2-6 Weeks"
  },
  {
    slug: "academic-support",
    name: "Academic Editing",
    oneLiner: "Professional editing and coaching for academic excellence.",
    heroImage: "/academics.jpg",
    ctaLink: "/contact",
    deliverables: ["Dissertation Proofreading", "Style Guide Formatting", "Structure & Flow Analysis", "Citation Compliance"],
    examples: [],
    process: [],
    faqs: [
        { question: "Do you write essays from scratch?", answer: "No. We provide editing, proofreading, and coaching. We do not engage in academic dishonesty." },
        { question: "What referencing styles do you support?", answer: "We are experts in APA, Harvard, MLA, Chicago, and more." },
    ],
    targetAudience: "Students & Researchers",
    startingPrice: "€25",
    turnaround: "24h - 1 Week"
  },
];