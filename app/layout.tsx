import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import Analytics from "@/components/common/Analytics";
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
  metadataBase: new URL('https://kaziagency.es'),
  applicationName: 'Kazi Agency',
  title: {
    default: defaultSEO.title,
    template: "%s | Kazi Agency",
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.es",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [
      {
        url: defaultSEO.ogImage || "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kazi Agency - Premium Managed Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [defaultSEO.ogImage || "/og-image.jpg"],
    url: "https://kaziagency.es",
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
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
