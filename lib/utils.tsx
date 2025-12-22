import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatText(text: string) {
  if (!text) return "";
  
  // Split by double asterisks to find bold parts
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Bold text
      const content = part.slice(2, -2);
      return <strong key={index} className="font-bold text-gray-900">{content}</strong>;
    }
    
    // Handle newlines in the remaining parts
    const lines = part.split("\n");
    return lines.map((line, lineIndex) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  });
}
