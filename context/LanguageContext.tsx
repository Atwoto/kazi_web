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
  const [language, setLanguage] = useState<Language>("es");
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    setHasMounted(true);
    async function initLanguage() {
      // Check if user has previously selected a language
      const savedLang = localStorage.getItem("kazi-lang") as Language;

      if (savedLang && (savedLang === "en" || savedLang === "es" || savedLang === "ca")) {
        setLanguage(savedLang);
        setIsAutoDetected(false);
        setIsInitialized(true);
        return;
      }

      // No saved language, force Spanish default as requested
      /*
      try {
        const detectedLang = await detectLanguage();
        setLanguage(detectedLang);
        setIsAutoDetected(true);
        localStorage.setItem("kazi-lang", detectedLang);
      } catch (error) {
        console.error("Language detection failed:", error);
        setLanguage("es");
        setIsAutoDetected(false);
      }
      */

      // Default to Spanish
      setLanguage("es");
      setIsAutoDetected(false);

      setIsInitialized(true);
    }

    initLanguage();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("kazi-lang", lang);
    setIsAutoDetected(false);
  };

  // On server, always render with Spanish
  if (!hasMounted) {
    return (
      <LanguageContext.Provider
        value={{
          language: "es",
          setLanguage: () => {},
          t: translations["es"],
          isAutoDetected: false,
        }}
      >
        <div suppressHydrationWarning>{children}</div>
      </LanguageContext.Provider>
    );
  }

  // To prevent hydration mismatch, we render the children but can handle 
  // the initialization state. If we render a spinner here, it MUST match 
  // what was on the server. Since server rendered {children}, client must 
  // initially render {children} too.
  
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
        isAutoDetected,
      }}
    >
      <div suppressHydrationWarning>
        {!isInitialized && !language ? (
           <div className="min-h-screen flex items-center justify-center bg-white">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
           </div>
        ) : children}
      </div>
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
