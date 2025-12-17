"use client";

import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const phoneNumber = t.contact.phoneNumber; // Get phone number from translations

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/\s/g, "")}`} // Remove spaces for the link
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce cursor-pointer group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
    </a>
  );
}
