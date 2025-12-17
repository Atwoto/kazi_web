import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kazi.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/work-with-us",
    "/faq",
    "/portfolio",
    "/pricing",
    "/legal/privacy-policy",
    "/legal/terms-of-service",
    "/legal/cookies",
  ];

  const serviceRoutes = [
    "/services/web-design-development",
    "/services/graphic-design",
    "/services/virtual-assistance",
    "/services/content-writing",
    "/services/data-entry",
    "/services/customer-support",
    "/services/video-editing",
    "/services/photo-editing",
    "/services/ai-services",
    "/services/academic-support",
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...serviceRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
