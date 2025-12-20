"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/translations";
import { detectLanguage } from "@/lib/languageDetection";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations["en"];
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    async function initLanguage() {
      // Check if user has previously selected a language
      const savedLang = localStorage.getItem("kazi-lang") as Language;

      if (savedLang && (savedLang === "en" || savedLang === "es" || savedLang === "ca")) {
        setLanguage(savedLang);
        setIsAutoDetected(false);
        setIsInitialized(true);
        return;
      }

      // No saved language, auto-detect
      try {
        const detectedLang = await detectLanguage();
        setLanguage(detectedLang);
        setIsAutoDetected(true);
        // Save the detected language
        localStorage.setItem("kazi-lang", detectedLang);
      } catch (error) {
        console.error("Language detection failed:", error);
        setLanguage("en");
        setIsAutoDetected(false);
      }

      setIsInitialized(true);
    }

    initLanguage();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("kazi-lang", lang);
    setIsAutoDetected(false);
  };

  // Don't render children until language is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
        isAutoDetected,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
