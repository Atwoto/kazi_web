"use client";

interface SchemaOrgProps {
  organization?: boolean;
  localBusiness?: boolean;
  service?: {
    name: string;
    description: string;
    url: string;
  };
}

export default function SchemaOrg({ organization = true, localBusiness = false, service }: SchemaOrgProps) {
  // Note: useLanguage removed as it needs to be outside the LanguageProvider for head scripts

  const baseOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kazi Agency",
    "url": "https://kazi.agency",
    "logo": "https://kazi.agency/logo.jpg",
    "sameAs": [
      "https://www.instagram.com/kazi.agency",
      "https://www.linkedin.com/company/kazi-agency"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34-600-000-000",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "Catalan", "English"],
      "areaServed": "Catalonia, Spain"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kazi Agency",
    "image": "https://kazi.agency/logo.jpg",
    "url": "https://kazi.agency",
    "telephone": "+34-600-000-000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressRegion": "Catalonia",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.3851,
      "longitude": 2.1734
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "€€",
    "areaServed": {
      "@type": "Place",
      "name": "Barcelona, Vallès Occidental, Vallès Oriental"
    }
  };

  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "Organization",
      "name": "Kazi Agency",
      "url": "https://kazi.agency"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Catalonia, Spain"
    }
  } : null;

  const schemaData = organization ? baseOrg : localBusiness ? localBusinessSchema : serviceSchema;

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

// Website Schema - No client dependencies
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kazi Agency",
    "url": "https://kazi.agency",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://kazi.agency/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Page Schema
export function ServicePageSchema({ service }: { service: { name: string; description: string; url: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "Organization",
      "name": "Kazi Agency"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
