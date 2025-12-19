"use client";

import { Clock, MessageSquare, CheckCircle2, Shield } from "lucide-react";

export default function PMStandards() {
  const standards = [
    {
      icon: Clock,
      title: "EU Timezone Support",
      description: "Monday-Friday 9:00-18:00 CET. Response within 24 hours on business days.",
    },
    {
      icon: MessageSquare,
      title: "Single Communication Channel",
      description: "One dedicated point of contact per client via email or WhatsApp. Optional Slack integration for teams.",
    },
    {
      icon: CheckCircle2,
      title: "Milestone Previews",
      description: "Every deliverable includes a preview or first milestone for your approval before final delivery.",
    },
    {
      icon: Shield,
      title: "Internal QA Checklist",
      description: "All work undergoes internal quality assurance before reaching your inbox.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Project Management Standards
          </h2>
          <p className="text-lg text-gray-500">
            European project management with transparent processes and clear communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => (
            <div key={index} className="flex items-start p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-xl mr-4 shrink-0">
                <standard.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{standard.title}</h3>
                <p className="text-gray-600 leading-relaxed">{standard.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-900 font-semibold">All processes documented and transparent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
