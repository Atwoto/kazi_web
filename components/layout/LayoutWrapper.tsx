"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isKaziCitasRoute = pathname === "/kazi-citas";

  if (isAdminRoute || isKaziCitasRoute) {
    // Admin routes and specialized pages like Kazi Citas get no default layout
    return <>{children}</>;
  }

  // Regular routes get full layout
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
