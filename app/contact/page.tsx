import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/contact"].title,
  description: pageSEO["/contact"].description,
};

export default function ContactPage() {
  return <ContactContent />;
}
