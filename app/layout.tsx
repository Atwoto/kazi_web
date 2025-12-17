import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google"; // Import Quicksand for headings, Inter as a placeholder for Satoshi
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // Import the Navbar component
import Footer from "@/components/layout/Footer"; // Import the Footer component
import WhatsAppButton from "@/components/common/WhatsAppButton"; // Import WhatsAppButton
import AIAssistantWidget from "@/components/common/AIAssistantWidget"; // Import AIAssistantWidget
import { LanguageProvider } from "@/context/LanguageContext"; // Import LanguageProvider
import Analytics from "@/components/common/Analytics"; // Import Analytics component
import { defaultSEO } from "@/lib/seo";

// Define Quicksand for headings
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap", // Best practice for font loading
});

// Define Inter for body (placeholder for Satoshi)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Best practice for font loading
});

export const metadata: Metadata = {
  title: {
    default: defaultSEO.title,
    template: "%s | Kazi",
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kazi.com",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [
      {
        url: defaultSEO.ogImage || "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kazi - Premium Managed Services",
      },
    ],
  },
  icons: {
    icon: "/logo2.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${inter.variable} flex flex-col min-h-screen`}>
        <Analytics />
        <LanguageProvider>
          <Navbar /> {/* Render the Navbar */}
          <main className="flex-grow">{children}</main> {/* Main content area */}
          <Footer /> {/* Render the Footer */}
          <WhatsAppButton />
          <AIAssistantWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
