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
  title: "Kazi Agency - Agencia de Servicios Digitales en Cataluña",
  description: "Soluciones digitales profesionales para negocios locales. Especialistas en Web, Reservas, Redes Sociales y Diseño Gráfico en Cataluña.",
  keywords: "agencia local, Cataluña, diseño web, reservas, redes sociales, diseño gráfico, automatización IA",
  ogImage: "/og-image.jpg",
  ogType: "website",
};

export const pageSEO: Record<string, SEOData> = {
  "/": {
    ...defaultSEO,
    title: "Kazi Agency - Agencia Local de Servicios Digitales",
    description: "Impulsa tu negocio local con soluciones digitales a medida. Especialistas en sistemas de reservas, gestión de redes sociales y diseño gráfico en Cataluña.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kazi Agency",
      "description": "Agencia de servicios digitales local en Cataluña enfocada en negocios locales",
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
        "areaServed": "ES",
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES",
      },
    },
  },
  "/about": {
    title: "Sobre Nosotros - Kazi Agency | Tu Agencia Local",
    description: "Conoce Kazi Agency, tu socio tecnológico en Cataluña. Ayudamos a los negocios locales a modernizarse con trato cercano y resultados profesionales.",
    keywords: "sobre Kazi Agency, agencia local, Cataluña, equipo local",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Sobre Kazi Agency",
      "description": "Tu socio tecnológico local en Cataluña",
    },
  },
  "/services": {
    title: "Our Services - Web, Social Media & Design | Kazi Agency",
    description: "Explore our digital solutions for local businesses: Web & Booking Systems, Social Media Management, and Graphic Design.",
    keywords: "local agency services, web design, social media, graphic design",
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
    description: "Ready to start your project? Request a quote from your local agency in Catalonia. Response within 24 hours.",
    keywords: "contact Kazi Agency, request quote, local agency, Catalonia",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Kazi Agency",
      "description": "Request a quote for your project",
    },
  },
  "/work-with-us": {
    title: "Work with Us - Join Our Local Talent Network | Kazi Agency",
    description: "Join Kazi Agency's network of vetted professionals in Catalonia. Apply for opportunities in web design, social media, and graphic design.",
    keywords: "freelance jobs, work with Kazi Agency, Catalonia talent, local jobs",
  },
  "/faq": {
    title: "FAQ - Frequently Asked Questions | Kazi Agency",
    description: "Find answers to frequently asked questions about our local digital services.",
    keywords: "FAQ, frequently asked questions, Kazi Agency help, local agency",
  },
  "/portfolio": {
    title: "Portfolio - Our Work | Kazi Agency",
    description: "View our portfolio of projects delivered for local businesses in Catalonia.",
    keywords: "portfolio, projects, work samples, case studies, local business",
  },
  "/pricing": {
    title: "Pricing - Transparent Rates | Kazi Agency",
    description: "View transparent pricing for Kazi Agency's digital services for local businesses. No hidden fees, clear quotes.",
    keywords: "pricing, rates, cost, transparent pricing, local business",
  },
};
