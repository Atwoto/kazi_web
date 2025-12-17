import type { Metadata } from "next";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/portfolio"].title,
  description: pageSEO["/portfolio"].description,
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}