import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const generalPricing = [
    {
      title: "Basic Projects",
      price: "From €150",
      description: "Simple tasks with clear deliverables.",
      features: [
        "Scope assessment",
        "Vetted freelancer",
        "Standard delivery timeline",
        "Quality check",
      ],
      link: "/contact",
    },
    {
      title: "Complex Projects",
      price: "Custom Quote",
      description: "For specialized or large-scale needs.",
      features: [
        "Dedicated Project Manager",
        "Milestone-based payments",
        "Priority support",
        "Multiple revision rounds",
      ],
      link: "/contact",
    },
  ];

  const academicTiers = [
    {
      tier: "Tier 1",
      hours: "1 to 3 hours",
      price: "€40",
      description: "Proofread and edit up to a short report section.",
      examples: [
        "Fix grammar & clarity",
        "Structure suggestions",
        "Format references (in chosen style)",
      ],
    },
    {
      tier: "Tier 2",
      hours: "3 to 6 hours",
      price: "€70",
      description: "Edit and restructure a medium report.",
      examples: [
        "Improve argument flow",
        "Headings & citations formatting",
        "Create an outline & coaching notes",
      ],
    },
    {
      tier: "Tier 3",
      hours: "6 to 12 hours",
      price: "€110",
      description: "Deep edit for longer reports.",
      examples: [
        "Consistency checks",
        "Referencing cleanup",
        "Formatting & coaching notes",
        "Optional slide deck polish",
      ],
    },
  ];

  // Using the corrected text assuming "does not write" based on the "Do not market ghostwriting" rule.
  const disclaimer =
    "Kazi provides editing, proofreading, formatting, and coaching. Kazi does NOT write student submissions on a client's behalf. It is mandatory for the client to review their work, and any repercussion does not fall on Kazi.";

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">
          Transparent Pricing
        </h1>
        <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          Simple, fixed prices for academic support and clear custom quotes for creative projects.
        </p>

        {/* Academic Support Pricing */}
        <div className="mb-24">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-gray-900">Academic Support</h2>
          <p className="text-gray-500 text-center mb-12">Expert editing and coaching packages.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {academicTiers.map((tier) => (
              <Card key={tier.tier} className="border border-gray-100 shadow-lg hover:shadow-xl transition-shadow rounded-2xl flex flex-col justify-between">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-heading text-2xl font-bold text-gray-900">{tier.tier}</CardTitle>
                  <CardDescription className="text-sm uppercase tracking-wide font-semibold text-blue-500 mt-2">{tier.hours}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-400 text-sm"> / flat rate</span>
                  </div>
                  <p className="text-gray-600 text-center mb-6 text-sm">{tier.description}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.examples.map((example) => (
                      <li key={example} className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full rounded-full bg-primary hover:bg-blue-700">
                    <Link href="/contact">Book Support</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-800 text-sm italic text-center max-w-3xl mx-auto">
            {disclaimer}
          </div>
        </div>

        {/* General Services Pricing */}
        <div>
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-gray-900">General Services</h2>
          <p className="text-gray-500 text-center mb-12">Video, Design, Web, and AI projects.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {generalPricing.map((plan) => (
              <Card key={plan.title} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl font-bold text-gray-900">{plan.title}</CardTitle>
                  <CardDescription className="text-xl font-semibold text-primary mt-2">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <Check className="h-5 w-5 text-green-500 mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full rounded-full" variant="outline">
                    <Link href={plan.link}>Request Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}