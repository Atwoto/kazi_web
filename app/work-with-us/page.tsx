import type { Metadata } from "next";
import WorkWithUsContent from "@/components/work-with-us/WorkWithUsContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/work-with-us"].title,
  description: pageSEO["/work-with-us"].description,
};

export default function WorkWithUsPage() {
  return <WorkWithUsContent />;
}
