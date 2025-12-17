import type { Metadata } from "next";
import FAQContent from "@/components/faq/FAQContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/faq"].title,
  description: pageSEO["/faq"].description,
};

export default function FAQPage() {
  return <FAQContent />;
}
