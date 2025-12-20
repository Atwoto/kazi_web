"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-right" | "fade-left" | "zoom-in";
  delay?: number;
  duration?: number;
}

export default function ScrollAnimation({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 500,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before the bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-up":
        return "translate-y-8";
      case "fade-right":
        return "-translate-x-8";
      case "fade-left":
        return "translate-x-8";
      case "zoom-in":
        return "scale-95";
      default:
        return "translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out opacity-0", // Start hidden
        isVisible && "opacity-100 transform-none", // End visible & reset transform
        !isVisible && getAnimationClass(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
