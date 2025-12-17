import type { Metadata } from "next";
import { pageSEO } from "@/lib/seo";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: pageSEO["/about"].title,
  description: pageSEO["/about"].description,
};

export default function AboutPage() {
  return <AboutContent />;
}