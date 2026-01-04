import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/lib/service-data";
import CityPageContent from "@/components/services/CityPageContent";

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

const cities: Record<string, { name: string; nameEs: string; region: string; keywords: string[] }> = {
  "barcelona": {
    name: "Barcelona",
    nameEs: "Barcelona",
    region: "Catalunya",
    keywords: ["diseño web Barcelona", "web profesional Barcelona", "tienda online Barcelona"]
  },
  "sabadell": {
    name: "Sabadell",
    nameEs: "Sabadell",
    region: "Vallès Occidental",
    keywords: ["diseño web Sabadell", "web para negocios Sabadell", "SEO local Sabadell"]
  },
  "terrassa": {
    name: "Terrassa",
    nameEs: "Terrassa",
    region: "Vallès Occidental",
    keywords: ["diseño web Terrassa", "página web Terrassa", "ecommerce Terrassa"]
  },
  "sant-cugat": {
    name: "Sant Cugat",
    nameEs: "Sant Cugat del Vallès",
    region: "Vallès Occidental",
    keywords: ["diseño web Sant Cugat", "web profesional Sant Cugat", "marketing digital Sant Cugat"]
  },
  "granollers": {
    name: "Granollers",
    nameEs: "Granollers",
    region: "Vallès Oriental",
    keywords: ["diseño web Granollers", "web para empresas Granollers", "SEO Granollers"]
  },
  "mollet-del-valles": {
    name: "Mollet del Vallès",
    nameEs: "Mollet del Vallès",
    region: "Vallès Oriental",
    keywords: ["diseño web Mollet", "web económica Mollet", "tienda online Mollet"]
  }
};

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = cities[resolvedParams.city.toLowerCase()];

  if (!city) {
    return {
      title: "Ciudad no encontrada | Kazi Agency",
      description: "Página no encontrada.",
    };
  }

  return {
    title: `Diseño Web ${city.nameEs} | Kazi Agency`,
    description: `Servicios de diseño web profesional en ${city.nameEs}, ${city.region}. Websites que convierten visitantes en clientes.`,
    keywords: [`diseño web ${city.nameEs}`, ...city.keywords],
    alternates: {
      canonical: `/servicios-web/${resolvedParams.city}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const cityKey = resolvedParams.city.toLowerCase();
  const city = cities[cityKey];

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Ciudad no encontrada</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return <CityPageContent city={city} />;
}
