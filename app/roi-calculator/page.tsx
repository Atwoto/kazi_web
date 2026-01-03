import ROICalculator from "@/components/common/ROICalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator | Kazi Agency",
  description: "Calculate your potential revenue growth with a high-performance website.",
};

export default function ROICalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
       <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Calculate Your Potential Growth
          </h1>
          <p className="text-xl text-gray-500">
            See exactly how much revenue you're leaving on the table with a standard website versus a conversion-optimized Kazi platform.
          </p>
       </div>
       <ROICalculator />
    </div>
  );
}
