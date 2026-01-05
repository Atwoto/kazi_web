"use client";

import { motion, useInView, UseInViewOptions, HTMLMotionProps } from "framer-motion";
import { useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number; // in seconds
  duration?: number; // in seconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
  scale?: boolean;
  viewport?: UseInViewOptions;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
  className,
  once = true,
  blur = false,
  scale = false,
  viewport,
  ...props
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-50px", 
    ...viewport 
  });
  
  const variants = useMemo(() => {
    const hidden: any = { opacity: 0 };
    
    if (direction === "up") hidden.y = distance;
    else if (direction === "down") hidden.y = -distance;
    else if (direction === "left") hidden.x = distance;
    else if (direction === "right") hidden.x = -distance;
    
    if (blur) hidden.filter = "blur(10px)";
    if (scale) hidden.scale = 0.95;

    const visible = {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      scale: 1,
    };

    return { hidden, visible };
  }, [direction, distance, blur, scale]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad-ish
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
