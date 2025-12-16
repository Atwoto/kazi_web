import ServiceTiles from "@/components/home/ServiceTiles";

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore a selection of projects delivered by our vetted East African talent, fully managed by Kazi.
        </p>
      </div>
      <ServiceTiles /> {/* Reusing the ServiceTiles component */}
    </div>
  );
}