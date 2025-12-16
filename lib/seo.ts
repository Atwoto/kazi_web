export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const defaultSEO: SEOData = {
  title: "Kazi - Managed Offshoring to Vetted East African Talent",
  description: "Work delivered without the freelance hassle. Kazi connects European companies with top 1% vetted talent from East Africa. Video Editing, Web Design, Graphic Design, AI Services & more.",
  keywords: "managed offshoring, East Africa, freelance, talent, video editing, web design, graphic design, AI services, academic support, photo editing",
  ogImage: "/og-image.jpg",
  ogType: "website",
};

export const pageSEO: Record<string, SEOData> = {
  "/": {
    ...defaultSEO,
    title: "Kazi - Work Delivered, Without the Freelance Hassle",
    description: "Connect with top 1% vetted East African talent. Managed offshoring for video editing, web design, graphic design, AI services & academic support. 100+ projects delivered.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kazi",
      "description": "Managed offshoring service connecting European companies with vetted East African talent",
      "url": "https://kazi.com",
      "logo": "https://kazi.com/logo.png",
      "sameAs": [
        "https://linkedin.com/company/kazi",
        "https://twitter.com/kazi",
        "https://instagram.com/kazi",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "Europe",
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "EU",
      },
    },
  },
  "/about": {
    title: "About Kazi - Connecting Europe to East African Excellence",
    description: "Learn about Kazi's mission to connect European companies with vetted East African talent. Meet our team and discover our values.",
    keywords: "about Kazi, mission, team, East African talent, offshoring company",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Kazi",
      "description": "Learn about Kazi's mission to connect European companies with vetted East African talent",
    },
  },
  "/services": {
    title: "Our Services - Video Editing, Web Design & More | Kazi",
    description: "Explore our managed offshoring services: Video Editing, Photo Editing, Web Design & Development, Graphic Design, AI Services, and Academic Support.",
    keywords: "video editing services, web design, graphic design, AI services, academic support, photo editing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Kazi Services",
      "description": "Managed offshoring services for video editing, web design, graphic design, AI services, and academic support",
      "provider": {
        "@type": "Organization",
        "name": "Kazi",
      },
    },
  },
  "/contact": {
    title: "Contact Us - Request a Quote | Kazi",
    description: "Ready to start your project? Request a quote from Kazi. Get connected with vetted East African talent. Response within 24 hours.",
    keywords: "contact Kazi, request quote, hire talent, project quote",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Kazi",
      "description": "Request a quote for your project",
    },
  },
  "/work-with-us": {
    title: "Work with Us - Join Our Network of Vetted Talent | Kazi",
    description: "Join Kazi's network of vetted East African professionals. Apply for opportunities in video editing, web design, graphic design, AI services, and more.",
    keywords: "freelance jobs, work with Kazi, East African talent, remote work",
  },
  "/faq": {
    title: "FAQ - Frequently Asked Questions | Kazi",
    description: "Find answers to frequently asked questions about Kazi's managed offshoring services and process.",
    keywords: "FAQ, frequently asked questions, Kazi help",
  },
  "/portfolio": {
    title: "Portfolio - Our Work | Kazi",
    description: "View our portfolio of projects delivered by vetted East African talent. See the quality of work we deliver.",
    keywords: "portfolio, projects, work samples, case studies",
  },
  "/pricing": {
    title: "Pricing - Transparent Rates | Kazi",
    description: "View transparent pricing for Kazi's managed offshoring services. No hidden fees, clear quotes.",
    keywords: "pricing, rates, cost, transparent pricing",
  },
};
