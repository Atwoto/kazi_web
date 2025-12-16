import { Heart } from "lucide-react";

export default function SocialImpactSection() {
  return (
    <section className="py-16 bg-blue-50 border-t border-blue-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
          <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Work that Changes Lives
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          We believe in giving back. For every project you start with Kazi,{" "}
          <span className="font-bold text-gray-900">€0.50</span> goes directly to support a 
          partnered Children's Home in Kenya. Your business growth helps provide essential care 
          and support to children in need.
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
          <span>❤️ 50 cents = ~80 KES Impact</span>
        </div>
      </div>
    </section>
  );
}
