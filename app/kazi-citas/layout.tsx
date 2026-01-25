import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kazi Citas - Smart Booking Solution",
  description: "A ready-to-use booking and loyalty platform for local businesses who want results without high website costs.",
};

export default function KaziCitasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
