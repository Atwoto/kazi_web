"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function TaglineCarousel() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  
  // Use translated taglines or fallback to English if missing (safety check)
  const taglines = t.hero.taglines || ["Web Design", "SEO Strategy", "Automation", "eCommerce", "Growth"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [taglines.length]);

  return (
    <span className="inline-block relative min-w-[200px] text-blue-600">
      <AnimatePresence mode="wait">
        <motion.span
          key={index} // Key on index ensures animation triggers on change
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-0 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{taglines[0]}</span> {/* Spacer */}
    </span>
  );
}