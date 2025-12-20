"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage, isAutoDetected } = useLanguage();

  const languages = [
    { code: "en" as const, label: "English", nativeName: "English" },
    { code: "es" as const, label: "Spanish", nativeName: "Español" },
    { code: "ca" as const, label: "Catalan", nativeName: "Català" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-9 px-0 hover:bg-accent relative"
        >
          <span className="font-bold text-xs uppercase">{language}</span>
          {isAutoDetected && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Language</span>
          {isAutoDetected && (
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Auto
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.label}</span>
            </div>
            {language === lang.code && (
              <Check className="w-4 h-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
