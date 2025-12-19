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
  title: "Kazi Agency - Managed Offshoring to Vetted East African Talent",
  description: "Work delivered without the freelance hassle. Kazi Agency connects European companies with top 1% vetted talent from East Africa. Video Editing, Web Design, Graphic Design, AI Services & more.",
  keywords: "managed offshoring, East Africa, freelance, talent, video editing, web design, graphic design, AI services, academic support, photo editing",
  ogImage: "/og-image.jpg",
  ogType: "website",
};

export const pageSEO: Record<string, SEOData> = {
  "/": {
    ...defaultSEO,
    title: "Kazi Agency - Work Delivered, Without the Freelance Hassle",
    description: "Connect with top 1% vetted East African talent. Managed offshoring for video editing, web design, graphic design, AI services & academic support. 100+ projects delivered.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kazi Agency",
      "description": "Managed offshoring service connecting European companies with vetted East African talent",
      "url": "https://kaziagency.es",
      "logo": "https://kaziagency.es/logo.png",
      "sameAs": [
        "https://linkedin.com/company/kaziagency",
        "https://twitter.com/kaziagency",
        "https://instagram.com/kaziagency",
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
    title: "About Kazi Agency - Connecting Europe to East African Excellence",
    description: "Learn about Kazi Agency's mission to connect European companies with vetted East African talent. Meet our team and discover our values.",
    keywords: "about Kazi Agency, mission, team, East African talent, offshoring company",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Kazi Agency",
      "description": "Learn about Kazi Agency's mission to connect European companies with vetted East African talent",
    },
  },
  "/services": {
    title: "Our Services - Video Editing, Web Design & More | Kazi Agency",
    description: "Explore our managed offshoring services: Video Editing, Photo Editing, Web Design & Development, Graphic Design, AI Services, and Academic Support.",
    keywords: "video editing services, web design, graphic design, AI services, academic support, photo editing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Kazi Agency Services",
      "description": "Managed offshoring services for video editing, web design, graphic design, AI services, and academic support",
      "provider": {
        "@type": "Organization",
        "name": "Kazi Agency",
      },
    },
  },
  "/contact": {
    title: "Contact Us - Request a Quote | Kazi Agency",
    description: "Ready to start your project? Request a quote from Kazi Agency. Get connected with vetted East African talent. Response within 24 hours.",
    keywords: "contact Kazi Agency, request quote, hire talent, project quote",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Kazi Agency",
      "description": "Request a quote for your project",
    },
  },
  "/work-with-us": {
    title: "Work with Us - Join Our Network of Vetted Talent | Kazi Agency",
    description: "Join Kazi Agency's network of vetted East African professionals. Apply for opportunities in video editing, web design, graphic design, AI services, and more.",
    keywords: "freelance jobs, work with Kazi Agency, East African talent, remote work",
  },
  "/faq": {
    title: "FAQ - Frequently Asked Questions | Kazi Agency",
    description: "Find answers to frequently asked questions about Kazi Agency's managed offshoring services and process.",
    keywords: "FAQ, frequently asked questions, Kazi Agency help",
  },
  "/portfolio": {
    title: "Portfolio - Our Work | Kazi Agency",
    description: "View our portfolio of projects delivered by vetted East African talent. See the quality of work we deliver.",
    keywords: "portfolio, projects, work samples, case studies",
  },
  "/pricing": {
    title: "Pricing - Transparent Rates | Kazi Agency",
    description: "View transparent pricing for Kazi Agency's managed offshoring services. No hidden fees, clear quotes.",
    keywords: "pricing, rates, cost, transparent pricing",
  },
};
