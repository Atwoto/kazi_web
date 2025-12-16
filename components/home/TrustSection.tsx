import { ShieldCheck, Clock, Lock, FileCheck } from "lucide-react";

export default function TrustSection() {
  const trustPoints = [
    {
      icon: Clock,
      title: "24-hour Response",
      description: "We promise a prompt response to your inquiries within 24 hours.",
    },
    {
      icon: FileCheck,
      title: "Clear Revision Policy",
      description: "Transparent rules on revisions so you know exactly what to expect.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "Your funds are held securely. Milestone-based releases protect you.",
    },
    {
      icon: Lock,
      title: "Confidential Handling",
      description: "Strict NDAs and privacy protocols to keep your data safe.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-gray-900">
          Why Trust Kazi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-4 rounded-full mb-6 text-primary">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}